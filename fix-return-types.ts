#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run

/**
 * Automatically add missing explicit return type annotations to functions.
 * This script analyzes the deno publish errors and uses TypeScript's type inference
 * to add explicit return types where they're missing.
 */

import { walk } from "https://deno.land/std@0.208.0/fs/walk.ts";

interface ReturnTypeError {
  file: string;
  line: number;
  column: number;
  functionName: string;
}

// Parse the deno publish output to extract return type errors
async function getReturnTypeErrors(): Promise<ReturnTypeError[]> {
  const command = new Deno.Command("deno", {
    args: ["publish", "--dry-run"],
    stdout: "piped",
    stderr: "piped",
  });

  const { stdout, stderr } = await command.output();
  const output =
    new TextDecoder().decode(stdout) + new TextDecoder().decode(stderr);

  const errors: ReturnTypeError[] = [];
  const lines = output.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes("error[missing-explicit-return-type]")) {
      // Next line should have the file path
      if (i + 1 < lines.length) {
        const pathLine = lines[i + 1];
        const match = pathLine.match(/-->\s+(.+?):(\d+):(\d+)/);
        if (match) {
          let [, filePath, lineNum, colNum] = match;
          // Convert absolute path to relative
          if (filePath.includes("/molstar/")) {
            filePath = filePath.substring(filePath.indexOf("/molstar/") + 9);
          }
          // Extract the function name from context
          if (i + 3 < lines.length) {
            const codeLine = lines[i + 3];
            const funcMatch = codeLine.match(
              /\d+\s*\|\s*.*?(?:get|set|function|export\s+function)?\s*(\w+)/,
            );
            errors.push({
              file: filePath,
              line: parseInt(lineNum, 10),
              column: parseInt(colNum, 10),
              functionName: funcMatch ? funcMatch[1] : "unknown",
            });
          }
        }
      }
    }
  }

  return errors;
}

// Use deno's LSP to get the inferred type at a specific location
async function getInferredType(
  file: string,
  line: number,
  column: number,
): Promise<string | null> {
  try {
    // Read the file content
    const content = await Deno.readTextFile(file);
    const lines = content.split("\n");

    if (line <= 0 || line > lines.length) return null;

    const targetLine = lines[line - 1];

    // Try to detect the return type from the function body
    // This is a heuristic approach

    // Check for void functions (no return statement or return without value)
    const functionStart = line - 1;
    let braceCount = 0;
    let hasReturn = false;
    let returnValue = "";

    for (
      let i = functionStart;
      i < Math.min(lines.length, functionStart + 50);
      i++
    ) {
      const currentLine = lines[i];
      braceCount += (currentLine.match(/{/g) || []).length;
      braceCount -= (currentLine.match(/}/g) || []).length;

      const returnMatch = currentLine.match(/return\s+([^;]+)/);
      if (returnMatch) {
        hasReturn = true;
        returnValue = returnMatch[1].trim();
        break;
      }

      if (braceCount < 0) break;
    }

    // Heuristics for common return types
    if (!hasReturn) {
      return "void";
    }

    if (returnValue === "true" || returnValue === "false") {
      return "boolean";
    }

    if (returnValue.match(/^\d+$/) || returnValue.includes("Math.")) {
      return "number";
    }

    if (returnValue.match(/^['"`]/) || returnValue.includes("String(")) {
      return "string";
    }

    if (returnValue === "this") {
      return "this";
    }

    if (returnValue.startsWith("Vec3")) {
      return "Vec3";
    }

    if (returnValue.startsWith("Vec4")) {
      return "Vec4";
    }

    if (returnValue.startsWith("Mat4")) {
      return "Mat4";
    }

    if (returnValue.startsWith("Mat3")) {
      return "Mat3";
    }

    // Check if it's a getter returning a property
    if (targetLine.includes("get ") && targetLine.includes("return this.")) {
      const propMatch = targetLine.match(/return this\.(\w+)/);
      if (propMatch) {
        // Try to find the property type in the class
        for (let i = Math.max(0, line - 100); i < line; i++) {
          const declLine = lines[i];
          const typeMatch = declLine.match(
            new RegExp(`${propMatch[1]}\\s*:\\s*([^;=]+)`),
          );
          if (typeMatch) {
            return typeMatch[1].trim();
          }
        }
      }
    }

    // Default to unknown - will need manual review
    return null;
  } catch (e) {
    console.error(`Error processing ${file}:${line}:${column}`, e);
    return null;
  }
}

// Add return type annotation to a function
async function addReturnType(
  file: string,
  line: number,
  returnType: string,
): Promise<boolean> {
  try {
    const content = await Deno.readTextFile(file);
    const lines = content.split("\n");

    if (line <= 0 || line > lines.length) return false;

    const targetLine = lines[line - 1];

    // Handle different function declaration patterns
    let modified = false;
    let newLine = targetLine;

    // Pattern 1: get property() { ... }
    if (targetLine.match(/get\s+\w+\(\)\s*{/)) {
      newLine = targetLine.replace(/(\w+)\(\)\s*{/, `$1(): ${returnType} {`);
      modified = true;
    }
    // Pattern 2: functionName() { ... }
    else if (targetLine.match(/\w+\(\)\s*{/)) {
      newLine = targetLine.replace(/(\w+)\(\)\s*{/, `$1(): ${returnType} {`);
      modified = true;
    }
    // Pattern 3: function with parameters
    else if (targetLine.match(/\w+\([^)]*\)\s*{/)) {
      newLine = targetLine.replace(/\)\s*{/, `): ${returnType} {`);
      modified = true;
    }
    // Pattern 4: arrow function
    else if (targetLine.match(/=>\s*{/)) {
      newLine = targetLine.replace(/\)\s*=>/, `): ${returnType} =>`);
      modified = true;
    }

    if (modified && newLine !== targetLine) {
      lines[line - 1] = newLine;
      await Deno.writeTextFile(file, lines.join("\n"));
      return true;
    }

    return false;
  } catch (e) {
    console.error(`Error modifying ${file}:${line}`, e);
    return false;
  }
}

// Main execution
async function main() {
  console.log("Fetching return type errors from deno publish...");
  const errors = await getReturnTypeErrors();
  console.log(`Found ${errors.length} functions missing return types`);

  let fixed = 0;
  let skipped = 0;

  const processedFiles = new Set<string>();

  for (const error of errors) {
    // Group by file to avoid conflicts
    const fileKey = `${error.file}:${error.line}`;
    if (processedFiles.has(fileKey)) continue;
    processedFiles.add(fileKey);

    console.log(
      `Processing ${error.file}:${error.line} (${error.functionName})`,
    );

    const inferredType = await getInferredType(
      error.file,
      error.line,
      error.column,
    );

    if (inferredType) {
      console.log(`  Inferred type: ${inferredType}`);
      const success = await addReturnType(error.file, error.line, inferredType);
      if (success) {
        fixed++;
        console.log(`  ✓ Fixed`);
      } else {
        skipped++;
        console.log(`  ✗ Could not modify`);
      }
    } else {
      skipped++;
      console.log(`  ✗ Could not infer type`);
    }

    // Avoid rate limiting and allow inspection
    if (fixed % 10 === 0 && fixed > 0) {
      console.log(`\nProgress: ${fixed} fixed, ${skipped} skipped\n`);
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Fixed: ${fixed}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Total: ${errors.length}`);
  console.log(`\nRun 'deno publish --dry-run' again to see remaining errors.`);
}

if (import.meta.main) {
  await main();
}
