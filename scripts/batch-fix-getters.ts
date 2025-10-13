#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run

/**
 * Batch fix missing return types for getters
 *
 * Usage: deno run --allow-read --allow-write --allow-run scripts/batch-fix-getters.ts
 */

interface GetterError {
  file: string;
  line: number;
  getterName: string;
}

async function getGetterErrors(): Promise<GetterError[]> {
  console.log("Running deno publish to find getter errors...");
  const cmd = new Deno.Command("deno", {
    args: ["publish", "--dry-run"],
    stdout: "piped",
    stderr: "piped",
  });

  const output = await cmd.output();
  const text = new TextDecoder().decode(output.stderr);

  const errors: GetterError[] = [];
  const lines = text.split("\n");

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("error[missing-explicit-return-type]")) {
      // Look for file path
      for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
        const pathMatch = lines[j].match(
          /-->\s+.*\/molstar\/(src\/[^:]+):(\d+):\d+/,
        );
        if (pathMatch) {
          const file = pathMatch[1];
          const lineNum = parseInt(pathMatch[2]);

          // Look for getter pattern
          for (let k = j + 1; k < Math.min(j + 5, lines.length); k++) {
            const getterMatch = lines[k].match(/\d+\s+\|\s+get\s+(\w+)\(\)/);
            if (getterMatch) {
              errors.push({
                file,
                line: lineNum,
                getterName: getterMatch[1],
              });
              break;
            }
          }
          break;
        }
      }
    }
  }

  return errors;
}

async function fixGetterInFile(
  filePath: string,
  errors: GetterError[],
): Promise<number> {
  const content = await Deno.readTextFile(filePath);
  const lines = content.split("\n");
  let fixCount = 0;

  for (const error of errors) {
    if (error.file !== filePath) continue;

    const lineIdx = error.line - 1;
    if (lineIdx < 0 || lineIdx >= lines.length) continue;

    const line = lines[lineIdx];

    // Check if it's a getter without return type
    const getterMatch = line.match(
      /^(\s*)((?:static\s+)?get\s+(\w+))\(\s*\)\s*\{/,
    );
    if (!getterMatch || getterMatch[3] !== error.getterName) continue;

    const indent = getterMatch[1];
    const getterDecl = getterMatch[2];

    // Try to infer return type
    let returnType: string | null = null;

    // Check if it's a single-line getter
    const singleLineMatch = line.match(
      /get\s+\w+\(\s*\)\s*\{\s*return\s+(.+?);\s*\}/,
    );
    if (singleLineMatch) {
      returnType = inferTypeFromExpression(
        singleLineMatch[1],
        content,
        error.getterName,
      );
    } else {
      // Multi-line getter - check next line
      if (lineIdx + 1 < lines.length) {
        const nextLine = lines[lineIdx + 1].trim();
        const returnMatch = nextLine.match(/^return\s+(.+?);$/);
        if (returnMatch) {
          returnType = inferTypeFromExpression(
            returnMatch[1],
            content,
            error.getterName,
          );
        }
      }
    }

    if (returnType) {
      // For single-line getters
      if (singleLineMatch) {
        lines[lineIdx] = line.replace(
          /get\s+(\w+)\(\s*\)\s*\{/,
          `get $1(): ${returnType} {`,
        );
      } else {
        // For multi-line getters
        lines[lineIdx] = `${indent}${getterDecl}(): ${returnType} {`;
      }
      fixCount++;
      console.log(
        `✓ Fixed ${filePath}:${error.line} - ${error.getterName}(): ${returnType}`,
      );
    } else {
      console.log(
        `⚠ Could not infer type for ${filePath}:${error.line} - ${error.getterName}`,
      );
    }
  }

  if (fixCount > 0) {
    await Deno.writeTextFile(filePath, lines.join("\n"));
  }

  return fixCount;
}

function inferTypeFromExpression(
  expr: string,
  fileContent: string,
  getterName: string,
): string | null {
  expr = expr.trim();

  // Literal values
  if (expr === "true" || expr === "false") return "boolean";
  if (expr.match(/^\d+$/)) return "number";
  if (expr.match(/^\d+\.\d+$/)) return "number";
  if (expr.match(/^['"`]/)) return "string";
  if (expr === "null") return "null";
  if (expr === "undefined") return "undefined";
  if (expr === "void 0") return "undefined";

  // Array literals
  if (expr.startsWith("[") && expr.endsWith("]")) return "any[]";

  // Object literals
  if (expr.startsWith("{") && expr.endsWith("}")) return "any";

  // this reference
  if (expr === "this") return "this";

  // Property access - this._property or this.property
  const propMatch = expr.match(/^this\.(_?\w+)$/);
  if (propMatch) {
    const propName = propMatch[1];

    // Look for property declaration with type annotation
    const patterns = [
      new RegExp(
        `(?:private|protected|public|readonly)?\\s+${propName}:\\s*([^;=\\n\\{]+?)(?:[;=\\{]|$)`,
        "m",
      ),
      new RegExp(
        `(?:private|protected|public|readonly)?\\s+${propName}!:\\s*([^;=\\n\\{]+?)(?:[;=\\{]|$)`,
        "m",
      ),
    ];

    for (const pattern of patterns) {
      const typeMatch = fileContent.match(pattern);
      if (typeMatch) {
        let type = typeMatch[1].trim();
        // Clean up the type
        type = type.replace(/\s*\/\/.*$/, ""); // Remove inline comments
        type = type.replace(/\s+/g, " "); // Normalize whitespace
        return type;
      }
    }
  }

  // Cast expressions: something as Type
  const castMatch = expr.match(/as\s+([\w\.<>]+(?:\[\])?)\s*$/);
  if (castMatch) {
    return castMatch[1];
  }

  // Type assertions: expr as const, etc
  if (expr.includes(" as const")) {
    return null; // Skip these for manual review
  }

  // Readonly wrapper: expr as Readonly<Type>
  const readonlyMatch = expr.match(/as\s+Readonly<([^>]+)>/);
  if (readonlyMatch) {
    return `Readonly<${readonlyMatch[1]}>`;
  }

  // Method calls that might have obvious return types
  if (expr.includes(".map(")) return "any[]";
  if (expr.includes(".filter(")) return "any[]";
  if (expr.includes(".find(")) return "any";

  return null;
}

// Main execution
if (import.meta.main) {
  console.log("🔍 Finding getter errors...\n");
  const errors = await getGetterErrors();
  console.log(`\nFound ${errors.length} getter errors\n`);

  if (errors.length === 0) {
    console.log("No getter errors found!");
    Deno.exit(0);
  }

  // Group by file
  const fileGroups = new Map<string, GetterError[]>();
  for (const error of errors) {
    if (!fileGroups.has(error.file)) {
      fileGroups.set(error.file, []);
    }
    fileGroups.get(error.file)!.push(error);
  }

  console.log(`Errors spread across ${fileGroups.size} files\n`);
  console.log("🔧 Fixing getters...\n");

  let totalFixed = 0;
  let filesFixed = 0;

  for (const [file, fileErrors] of fileGroups) {
    const fixed = await fixGetterInFile(file, fileErrors);
    if (fixed > 0) {
      totalFixed += fixed;
      filesFixed++;
    }
  }

  console.log(`\n✅ Summary:`);
  console.log(`   Fixed ${totalFixed} getters in ${filesFixed} files`);
  console.log(
    `   Remaining: ${errors.length - totalFixed} getters need manual review`,
  );

  if (totalFixed > 0) {
    console.log(`\n🧪 Run 'deno publish --dry-run' to verify fixes`);
  }
}
