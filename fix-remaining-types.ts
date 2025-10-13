#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run

/**
 * Fix remaining slow type errors more carefully
 */

// Strip ANSI
function stripAnsi(text: string): string {
  return text.replace(/\x1B\[[0-9;]*m/g, '');
}

interface ErrorInfo {
  file: string;
  line: number;
  name: string;
  context: string;
}

async function parseSlowTypes(): Promise<ErrorInfo[]> {
  const content = await Deno.readTextFile('slow-types-full.txt');
  const cleanContent = stripAnsi(content);
  const lines = cleanContent.split('\n');
  const errors: ErrorInfo[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('error[missing-explicit-return-type]')) {
      if (i + 1 < lines.length) {
        const pathLine = lines[i + 1];
        const pathMatch = pathLine.match(/-->\s+(.+?):(\d+):(\d+)/);
        
        if (pathMatch) {
          let [, filePath, lineNum] = pathMatch;

          if (filePath.includes('/molstar/')) {
            filePath = filePath.substring(filePath.indexOf('/molstar/') + 9);
          }

          for (let j = i + 2; j < Math.min(i + 10, lines.length); j++) {
            const contextLine = lines[j];
            const codeMatch = contextLine.match(/^\s*(\d+)\s*\|\s*(.+)$/);
            if (codeMatch) {
              const context = codeMatch[2].trim();
              const nameMatch = context.match(/(?:export\s+)?(?:function|get|set|async|static)?\s*(\w+)\s*\(/);
              const name = nameMatch ? nameMatch[1] : 'unknown';

              errors.push({
                file: filePath,
                line: parseInt(lineNum, 10),
                name,
                context
              });
              break;
            }
          }
        }
      }
    }
  }

  return errors;
}

async function inferAndFixType(file: string, line: number, name: string, context: string): Promise<{ success: boolean; type?: string; reason?: string }> {
  try {
    const content = await Deno.readTextFile(file);
    const lines = content.split('\n');

    if (line <= 0 || line > lines.length) {
      return { success: false, reason: 'Invalid line number' };
    }

    const targetLine = lines[line - 1];

    // Skip if already has return type
    if (targetLine.match(/\)\s*:\s*[A-Z]/)) {
      return { success: false, reason: 'Already has type' };
    }

    // Determine type based on name pattern and context
    let inferredType: string | null = null;

    // Boolean patterns
    if (name.match(/^(is|has|can|should|will|are|were|was)[A-Z]/)) {
      inferredType = 'boolean';
    } else if (name === 'equals' || name === 'exactEquals' || name === 'areEqual') {
      inferredType = 'boolean';
    }
    // Number patterns
    else if (name.match(/^(count|index|size|length|width|height|depth)$/i)) {
      inferredType = 'number';
    }
    // String patterns
    else if (name === 'toString') {
      inferredType = 'string';
    }
    // Void patterns (setters, update methods)
    else if (context.includes('set ') || name.startsWith('update') || name.startsWith('set')) {
      inferredType = 'void';
    }

    if (!inferredType) {
      return { success: false, reason: 'Cannot infer type' };
    }

    // Only apply fix if the line is simple (single line getter/method)
    if (!targetLine.includes('{') || !targetLine.includes('}')) {
      // Multi-line function, more careful needed
      // Only fix if it's a simple getter on one line
      if (targetLine.trim().startsWith('get ') && targetLine.includes('()')) {
        // This is a multi-line getter - skip for safety
        return { success: false, reason: 'Multi-line getter - needs manual fix' };
      }
    }

    // Apply the fix
    let newLine = targetLine;
    
    // Match pattern: functionName() {
    if (targetLine.match(/\w+\s*\(\s*\)\s*\{/)) {
      newLine = targetLine.replace(/(\w+)\s*\(\s*\)\s*\{/, `$1(): ${inferredType} {`);
    }
    // Match pattern: get name() {
    else if (targetLine.match(/get\s+\w+\s*\(\s*\)\s*\{/)) {
      newLine = targetLine.replace(/(get\s+\w+)\s*\(\s*\)\s*\{/, `$1(): ${inferredType} {`);
    }
    // Match pattern: function with params
    else if (targetLine.match(/\w+\s*\([^)]+\)\s*\{/)) {
      newLine = targetLine.replace(/(\w+\s*\([^)]+\))\s*\{/, `$1: ${inferredType} {`);
    }
    // Match pattern: export function
    else if (targetLine.match(/export\s+function\s+\w+/)) {
      newLine = targetLine.replace(/(\w+\s*\([^)]*\))\s*\{/, `$1: ${inferredType} {`);
    }

    if (newLine !== targetLine) {
      lines[line - 1] = newLine;
      await Deno.writeTextFile(file, lines.join('\n'));
      return { success: true, type: inferredType };
    }

    return { success: false, reason: 'Could not match pattern' };
  } catch (e) {
    return { success: false, reason: `Error: ${e}` };
  }
}

async function main() {
  console.log('Parsing slow type errors...');
  const errors = await parseSlowTypes();
  console.log(`Found ${errors.length} total errors\n`);

  // Group by file
  const byFile = new Map<string, ErrorInfo[]>();
  for (const error of errors) {
    if (!byFile.has(error.file)) {
      byFile.set(error.file, []);
    }
    byFile.get(error.file)!.push(error);
  }

  let fixed = 0;
  let skipped = 0;
  const reasons = new Map<string, number>();

  for (const [file, fileErrors] of byFile) {
    // Sort descending
    fileErrors.sort((a, b) => b.line - a.line);

    for (const error of fileErrors) {
      const result = await inferAndFixType(error.file, error.line, error.name, error.context);
      
      if (result.success) {
        fixed++;
        console.log(`✓ ${file}:${error.line} ${error.name}() -> ${result.type}`);
      } else {
        skipped++;
        const reason = result.reason || 'Unknown';
        reasons.set(reason, (reasons.get(reason) || 0) + 1);
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total errors: ${errors.length}`);
  console.log(`Fixed: ${fixed}`);
  console.log(`Skipped: ${skipped}`);
  console.log('='.repeat(60));

  if (reasons.size > 0) {
    console.log('\nSkip reasons:');
    for (const [reason, count] of Array.from(reasons.entries()).sort((a, b) => b[1] - a[1])) {
      console.log(`  ${count.toString().padStart(4)} - ${reason}`);
    }
  }

  if (fixed > 0) {
    console.log('\n✅ Run "deno publish --dry-run" again to check progress');
  }
}

if (import.meta.main) {
  await main();
}
