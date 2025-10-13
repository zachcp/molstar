#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run

/**
 * Script to automatically add 'override' modifiers to methods that override base class members
 *
 * This fixes TS4114 errors: "This member must have an 'override' modifier because it overrides a member in the base class"
 *
 * Usage:
 *   deno run --allow-read --allow-write --allow-run scripts/fix-override-modifiers.ts
 */

interface OverrideError {
  file: string;
  line: number;
  column: number;
  methodName: string;
}

async function getOverrideErrors(): Promise<OverrideError[]> {
  console.log("Running type check to find override errors...");

  const command = new Deno.Command("deno", {
    args: ["publish", "--dry-run", "--allow-dirty"],
    stdout: "piped",
    stderr: "piped",
  });

  const { stdout, stderr } = await command.output();
  const output =
    new TextDecoder().decode(stdout) + new TextDecoder().decode(stderr);

  const errors: OverrideError[] = [];
  const lines = output.split("\n");

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (
      line.includes("TS4114 [ERROR]") &&
      line.includes("must have an 'override' modifier")
    ) {
      // Next line should have the method signature with underscores
      i++;
      if (i >= lines.length) break;

      const methodLine = lines[i].trim();

      // Next line should have the file location
      i++;
      if (i >= lines.length) break;

      const locationLine = lines[i];
      const fileMatch = locationLine.match(/at file:\/\/(.+):(\d+):(\d+)/);

      if (fileMatch) {
        const [, filePath, lineNum, colNum] = fileMatch;

        // Extract method name - remove the underscores/tildes that mark the error
        const methodMatch = methodLine.replace(/~/g, "").match(/(\w+)\s*[(:=]/);
        const methodName = methodMatch ? methodMatch[1] : "";

        errors.push({
          file: filePath,
          line: parseInt(lineNum, 10),
          column: parseInt(colNum, 10),
          methodName,
        });
      }
    }

    i++;
  }

  return errors;
}

async function fixFile(filePath: string, lineNumber: number): Promise<boolean> {
  try {
    const content = await Deno.readTextFile(filePath);
    const lines = content.split("\n");

    // Line numbers are 1-based, array is 0-based
    const lineIndex = lineNumber - 1;

    if (lineIndex < 0 || lineIndex >= lines.length) {
      console.error(`  ❌ Line ${lineNumber} out of bounds in ${filePath}`);
      return false;
    }

    const line = lines[lineIndex];

    // Check if override is already there
    if (line.includes("override ")) {
      console.log(`  ⏭️  Already has override at line ${lineNumber}`);
      return true;
    }

    // Find the indentation and the position to insert 'override'
    const indentMatch = line.match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1] : "";

    // Different patterns for method declarations
    const patterns = [
      // Regular method: methodName(...) {
      /^(\s*)(async\s+)?(\w+\??)\s*\(/,
      // Property method: methodName = (...) =>
      /^(\s*)(readonly\s+|private\s+|protected\s+|public\s+|static\s+)*(\w+\??)\s*[:=]/,
      // Getter/setter
      /^(\s*)(get|set)\s+(\w+)/,
    ];

    let modified = false;
    for (const pattern of patterns) {
      const match = line.match(pattern);
      if (match) {
        // Insert 'override ' after the indentation and any access modifiers
        const modifierMatch = line.match(
          /^(\s*)((?:private|protected|public|static|readonly|async)\s+)*/,
        );
        if (modifierMatch) {
          const [fullMatch, spaces, modifiers = ""] = modifierMatch;
          const restOfLine = line.slice(fullMatch.length);
          lines[lineIndex] = `${spaces}${modifiers}override ${restOfLine}`;
          modified = true;
          break;
        }
      }
    }

    if (!modified) {
      // Fallback: just add override after indentation
      const trimmed = line.trimStart();
      lines[lineIndex] = `${indent}override ${trimmed}`;
      modified = true;
    }

    if (modified) {
      await Deno.writeTextFile(filePath, lines.join("\n"));
      return true;
    }

    return false;
  } catch (error) {
    console.error(`  ❌ Error fixing file ${filePath}:`, error);
    return false;
  }
}

async function main() {
  console.log("🔍 Finding override modifier errors...\n");

  const errors = await getOverrideErrors();

  if (errors.length === 0) {
    console.log("✅ No override errors found!");
    return;
  }

  console.log(`Found ${errors.length} override errors\n`);

  // Group errors by file
  const errorsByFile = new Map<string, OverrideError[]>();
  for (const error of errors) {
    const existing = errorsByFile.get(error.file) || [];
    existing.push(error);
    errorsByFile.set(error.file, existing);
  }

  console.log(`Affected files: ${errorsByFile.size}\n`);

  let fixedCount = 0;
  let failedCount = 0;

  // Process each file
  for (const [file, fileErrors] of errorsByFile.entries()) {
    // Sort by line number descending so we can modify from bottom to top
    // This prevents line numbers from shifting
    fileErrors.sort((a, b) => b.line - a.line);

    console.log(`📝 ${file}`);
    console.log(`   ${fileErrors.length} error(s) to fix`);

    for (const error of fileErrors) {
      const success = await fixFile(error.file, error.line);
      if (success) {
        fixedCount++;
        console.log(
          `   ✅ Fixed line ${error.line}${error.methodName ? ` (${error.methodName})` : ""}`,
        );
      } else {
        failedCount++;
        console.log(
          `   ❌ Failed line ${error.line}${error.methodName ? ` (${error.methodName})` : ""}`,
        );
      }
    }

    console.log("");
  }

  console.log("━".repeat(60));
  console.log(`\n📊 Summary:`);
  console.log(`   Total errors found: ${errors.length}`);
  console.log(`   Successfully fixed: ${fixedCount}`);
  console.log(`   Failed: ${failedCount}`);
  console.log(
    `   Success rate: ${((fixedCount / errors.length) * 100).toFixed(1)}%`,
  );

  if (fixedCount > 0) {
    console.log("\n🔄 Running type check to verify fixes...\n");

    const verifyCommand = new Deno.Command("deno", {
      args: ["publish", "--dry-run", "--allow-dirty"],
      stdout: "piped",
      stderr: "piped",
    });

    const { stdout, stderr } = await verifyCommand.output();
    const output =
      new TextDecoder().decode(stdout) + new TextDecoder().decode(stderr);

    const remainingTS4114 = (output.match(/TS4114 \[ERROR\]/g) || []).length;
    const totalErrorsMatch = output.match(/Found (\d+) errors?\./);
    const totalErrors = totalErrorsMatch
      ? parseInt(totalErrorsMatch[1], 10)
      : 0;

    console.log(`\n📈 Results after fix:`);
    console.log(`   TS4114 errors remaining: ${remainingTS4114}`);
    console.log(`   Total errors: ${totalErrors}`);

    if (remainingTS4114 === 0) {
      console.log("\n🎉 All override modifier errors resolved!");
    } else {
      console.log(
        `\n⚠️  ${remainingTS4114} override errors still remain (may need manual review)`,
      );
    }
  }
}

if (import.meta.main) {
  await main();
}
