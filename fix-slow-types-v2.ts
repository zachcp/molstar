#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run

/**
 * Fix "slow types" errors from deno publish --dry-run
 * These are functions/getters missing explicit return type annotations.
 */

interface SlowTypeError {
  file: string;
  line: number;
  column: number;
  functionName: string;
  context: string;
}

/**
 * Parse the deno publish dry-run output to extract slow type errors
 */
async function parseSlowTypeErrors(outputFile: string): Promise<SlowTypeError[]> {
  const content = await Deno.readTextFile(outputFile);
  const lines = content.split('\n');
  const errors: SlowTypeError[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Look for error line: "error[missing-explicit-return-type]:"
    if (line.includes('error[missing-explicit-return-type]:')) {
      // Next line has the file path: "  --> /path/to/file.ts:123:45"
      if (i + 1 < lines.length) {
        const pathLine = lines[i + 1];
        const pathMatch = pathLine.match(/-->\s+(.+?):(\d+):(\d+)/);
        
        if (pathMatch) {
          let [, filePath, lineNum, colNum] = pathMatch;

          // Convert absolute path to relative
          if (filePath.includes('/molstar/')) {
            filePath = filePath.substring(filePath.indexOf('/molstar/') + 9);
          }

          // Look ahead for the code context (usually 3-4 lines after the path)
          let context = '';
          let functionName = 'unknown';

          for (let j = i + 2; j < Math.min(i + 10, lines.length); j++) {
            const contextLine = lines[j];

            // Find the actual code line (has line number and pipe)
            // Format: "36 |   get viewport() {"
            const codeMatch = contextLine.match(/^\s*(\d+)\s*\|\s*(.+)$/);
            if (codeMatch) {
              context = codeMatch[2].trim();

              // Extract function name from context
              // Patterns: get name(), set name(), functionName(), async functionName()
              const nameMatch = context.match(/(?:get|set|async)?\s*(\w+)\s*\(/);
              if (nameMatch) {
                functionName = nameMatch[1];
              }
              break;
            }
          }

          errors.push({
            file: filePath,
            line: parseInt(lineNum, 10),
            column: parseInt(colNum, 10),
            functionName,
            context
          });
        }
      }
    }
  }

  return errors;
}

/**
 * Read a file and get lines around a specific line number
 */
async function getFileContext(file: string, lineNum: number, contextLines: number = 20): Promise<string[]> {
  try {
    const content = await Deno.readTextFile(file);
    const lines = content.split('\n');
    const start = Math.max(0, lineNum - contextLines);
    const end = Math.min(lines.length, lineNum + contextLines);
    return lines.slice(start, end);
  } catch (e) {
    console.error(`Error reading ${file}:`, e);
    return [];
  }
}

/**
 * Try to infer the return type from the function body
 */
function inferReturnType(lines: string[], targetLineIndex: number): string | null {
  const targetLine = lines[targetLineIndex];

  // Check if it's a getter
  const isGetter = targetLine.includes('get ');
  const isSetter = targetLine.includes('set ');

  if (isSetter) {
    return 'void';
  }

  // Find the function body
  let braceCount = 0;
  let started = false;
  const bodyLines: string[] = [];

  for (let i = targetLineIndex; i < lines.length; i++) {
    const line = lines[i];

    if (line.includes('{')) {
      started = true;
      braceCount += (line.match(/{/g) || []).length;
    }

    if (started) {
      bodyLines.push(line);
      braceCount -= (line.match(/}/g) || []).length;

      if (braceCount === 0) break;
    }

    // Safety: don't read too far
    if (i - targetLineIndex > 100) break;
  }

  const body = bodyLines.join('\n');

  // Check for return statements
  const returnMatches = body.match(/return\s+([^;]+)/g);

  if (!returnMatches || returnMatches.length === 0) {
    // No return statement = void
    return 'void';
  }

  // Get the first return statement value
  const firstReturn = returnMatches[0].replace(/return\s+/, '').trim();

  // Simple heuristics
  if (firstReturn === 'true' || firstReturn === 'false') return 'boolean';
  if (firstReturn === 'this') return 'this';
  if (firstReturn.match(/^["'`]/)) return 'string';
  if (firstReturn.match(/^\d+$/)) return 'number';
  if (firstReturn === 'undefined') return 'void';

  // Check for property access on getter
  if (isGetter && firstReturn.startsWith('this.')) {
    const propName = firstReturn.replace('this.', '').split(/[.\[(\s]/)[0];

    // Look for property declaration
    for (let i = Math.max(0, targetLineIndex - 50); i < targetLineIndex; i++) {
      const line = lines[i];
      const propMatch = line.match(new RegExp(`${propName}\\s*[:!]\\s*([^;=]+?)\\s*[;=]`));
      if (propMatch) {
        let type = propMatch[1].trim();
        // Handle optional types
        if (line.includes(`${propName}?:`)) {
          type = type + ' | undefined';
        }
        return type;
      }
    }
  }

  // Check for common type names in return value
  if (firstReturn.match(/^Vec3\./)) return 'Vec3';
  if (firstReturn.match(/^Vec4\./)) return 'Vec4';
  if (firstReturn.match(/^Mat4\./)) return 'Mat4';
  if (firstReturn.match(/^Mat3\./)) return 'Mat3';
  if (firstReturn.match(/^Color\./)) return 'Color';
  if (firstReturn.includes('new Array') || firstReturn.startsWith('[')) return 'any[]';
  if (firstReturn.startsWith('{')) return 'object';

  // Can't infer
  return null;
}

/**
 * Add return type to a function
 */
async function addReturnType(
  file: string,
  lineNum: number,
  returnType: string
): Promise<boolean> {
  try {
    const content = await Deno.readTextFile(file);
    const lines = content.split('\n');

    if (lineNum <= 0 || lineNum > lines.length) return false;

    const targetLine = lines[lineNum - 1];
    let newLine = targetLine;
    let modified = false;

    // Pattern 1: get/set property() {
    if (targetLine.match(/\s*(get|set)\s+\w+\s*\([^)]*\)\s*\{/)) {
      newLine = targetLine.replace(/(\([^)]*\))\s*\{/, `$1: ${returnType} {`);
      modified = true;
    }
    // Pattern 2: get/set property() on same line with body
    else if (targetLine.match(/\s*(get|set)\s+\w+\s*\([^)]*\)\s*\{.*\}/)) {
      newLine = targetLine.replace(/(\([^)]*\))\s*\{/, `$1: ${returnType} {`);
      modified = true;
    }
    // Pattern 3: regular function with params
    else if (targetLine.match(/\s*\w+\s*\([^)]*\)\s*\{/)) {
      newLine = targetLine.replace(/(\([^)]*\))\s*\{/, `$1: ${returnType} {`);
      modified = true;
    }
    // Pattern 4: arrow function
    else if (targetLine.match(/\s*\w+\s*=\s*\([^)]*\)\s*=>/)) {
      newLine = targetLine.replace(/(\([^)]*\))\s*=>/, `$1: ${returnType} =>`);
      modified = true;
    }
    // Pattern 5: async function
    else if (targetLine.match(/\s*async\s+\w+\s*\([^)]*\)\s*\{/)) {
      newLine = targetLine.replace(/(\([^)]*\))\s*\{/, `$1: ${returnType} {`);
      modified = true;
    }

    if (modified && newLine !== targetLine) {
      lines[lineNum - 1] = newLine;
      await Deno.writeTextFile(file, lines.join('\n'));
      return true;
    }

    return false;
  } catch (e) {
    console.error(`Error modifying ${file}:${lineNum}:`, e);
    return false;
  }
}

/**
 * Group errors by file for efficient processing
 */
function groupErrorsByFile(errors: SlowTypeError[]): Map<string, SlowTypeError[]> {
  const grouped = new Map<string, SlowTypeError[]>();

  for (const error of errors) {
    if (!grouped.has(error.file)) {
      grouped.set(error.file, []);
    }
    grouped.get(error.file)!.push(error);
  }

  return grouped;
}

/**
 * Main execution
 */
async function main() {
  const args = Deno.args;

  // Check if we should run dry-run first
  let outputFile = 'slow-types-full.txt';

  if (args.includes('--refresh') || !await exists(outputFile)) {
    console.log('Running deno publish --dry-run to get latest errors...');
    const command = new Deno.Command('deno', {
      args: ['publish', '--dry-run'],
      stdout: 'piped',
      stderr: 'piped',
    });

    const { stdout, stderr } = await command.output();
    const output = new TextDecoder().decode(stdout) + new TextDecoder().decode(stderr);
    await Deno.writeTextFile(outputFile, output);
    console.log(`Saved output to ${outputFile}\n`);
  }

  console.log(`Parsing slow type errors from ${outputFile}...`);
  const errors = await parseSlowTypeErrors(outputFile);
  console.log(`Found ${errors.length} slow type errors\n`);

  if (errors.length === 0) {
    console.log('❌ No slow type errors found!');
    console.log('This might mean:');
    console.log('  1. The output file is empty or malformed');
    console.log('  2. All errors have been fixed');
    console.log('  3. The parser needs updating');
    console.log('\nTry running: deno publish --dry-run 2>&1 > slow-types-full.txt');
    return;
  }

  // Group by file
  const grouped = groupErrorsByFile(errors);
  console.log(`Errors span ${grouped.size} files\n`);

  // Show top 10 files by error count
  const sortedFiles = Array.from(grouped.entries())
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 10);

  console.log('Top 10 files with most slow type errors:');
  for (const [file, fileErrors] of sortedFiles) {
    console.log(`  ${fileErrors.length.toString().padStart(4)} - ${file}`);
  }
  console.log();

  // Process errors
  let fixed = 0;
  let skipped = 0;
  let manualReview: SlowTypeError[] = [];

  const dryRun = args.includes('--dry-run');
  const maxFixes = args.includes('--limit')
    ? parseInt(args[args.indexOf('--limit') + 1] || '100', 10)
    : Infinity;

  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n');
  }

  for (const [file, fileErrors] of grouped) {
    if (fixed >= maxFixes) {
      console.log(`\nReached fix limit of ${maxFixes}`);
      break;
    }

    console.log(`\nProcessing ${file} (${fileErrors.length} errors)...`);

    // Read file once for all errors
    const content = await Deno.readTextFile(file);
    const lines = content.split('\n');

    // Sort errors by line number (descending) to avoid line number shifts
    fileErrors.sort((a, b) => b.line - a.line);

    for (const error of fileErrors) {
      if (fixed >= maxFixes) break;

      const contextLines = lines.slice(
        Math.max(0, error.line - 15),
        Math.min(lines.length, error.line + 5)
      );
      const targetLineIndex = Math.min(14, error.line - 1);

      const inferredType = inferReturnType(contextLines, targetLineIndex);

      if (inferredType) {
        console.log(`  Line ${error.line}: ${error.functionName}() -> ${inferredType}`);

        if (!dryRun) {
          const success = await addReturnType(file, error.line, inferredType);
          if (success) {
            fixed++;
          } else {
            skipped++;
            console.log(`    ⚠️  Could not modify (complex syntax)`);
            manualReview.push(error);
          }
        } else {
          fixed++; // Count as if we would fix it
        }
      } else {
        skipped++;
        console.log(`  Line ${error.line}: ${error.functionName}() -> ❌ Cannot infer`);
        console.log(`    Context: ${error.context}`);
        manualReview.push(error);
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total errors:        ${errors.length}`);
  console.log(`Fixed:               ${fixed}`);
  console.log(`Skipped:             ${skipped}`);
  console.log(`Needs manual review: ${manualReview.length}`);
  console.log('='.repeat(60));

  if (manualReview.length > 0 && manualReview.length <= 50) {
    console.log('\nFiles needing manual review:');
    const reviewByFile = groupErrorsByFile(manualReview);
    for (const [file, fileErrors] of reviewByFile) {
      console.log(`\n${file}:`);
      for (const error of fileErrors) {
        console.log(`  Line ${error.line}: ${error.functionName}()`);
        console.log(`    ${error.context}`);
      }
    }
  } else if (manualReview.length > 50) {
    console.log(`\n${manualReview.length} items need manual review.`);
    console.log('Run with --limit to process in batches.');
  }

  if (!dryRun && fixed > 0) {
    console.log('\n✅ Run "deno publish --dry-run" again to verify fixes');
  }

  if (dryRun) {
    console.log('\n💡 Run without --dry-run to apply fixes');
  }
}

async function exists(path: string): Promise<boolean> {
  try {
    await Deno.stat(path);
    return true;
  } catch {
    return false;
  }
}

if (import.meta.main) {
  await main();
}
