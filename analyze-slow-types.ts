#!/usr/bin/env -S deno run --allow-read --allow-write

/**
 * Analyze slow type errors to find patterns and create a report
 */

// Strip ANSI color codes
function stripAnsi(text: string): string {
  return text.replace(/\x1B\[[0-9;]*m/g, '');
}

interface SlowTypeError {
  file: string;
  line: number;
  functionName: string;
  context: string;
  category: string;
}

async function analyzeSlowTypes() {
  const content = await Deno.readTextFile('slow-types-full.txt');
  const cleanContent = stripAnsi(content);
  const lines = cleanContent.split('\n');
  const errors: SlowTypeError[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('error[missing-explicit-return-type]')) {
      if (i + 1 < lines.length) {
        const pathLine = lines[i + 1];
        const pathMatch = pathLine.match(/-->\s+(.+?):(\d+):(\d+)/);
        
        if (pathMatch) {
          let [, filePath, lineNum, _colNum] = pathMatch;

          if (filePath.includes('/molstar/')) {
            filePath = filePath.substring(filePath.indexOf('/molstar/') + 9);
          }

          let context = '';
          let functionName = 'unknown';

          for (let j = i + 2; j < Math.min(i + 10, lines.length); j++) {
            const contextLine = lines[j];
            const codeMatch = contextLine.match(/^\s*(\d+)\s*\|\s*(.+)$/);
            if (codeMatch) {
              context = codeMatch[2].trim();
              const nameMatch = context.match(/(?:export\s+)?(?:get|set|async|function|static)?\s*(\w+)\s*\(/);
              if (nameMatch) {
                functionName = nameMatch[1];
              }
              break;
            }
          }

          // Categorize the error
          let category = 'other';
          if (context.includes('get ')) category = 'getter';
          else if (context.includes('set ')) category = 'setter';
          else if (context.includes('static ')) category = 'static-method';
          else if (context.includes('export function')) category = 'exported-function';
          else if (context.includes('function ')) category = 'function';
          else if (context.includes('async ')) category = 'async-method';
          else category = 'method';

          errors.push({
            file: filePath,
            line: parseInt(lineNum, 10),
            functionName,
            context,
            category
          });
        }
      }
    }
  }

  // Generate report
  console.log(`Found ${errors.length} slow type errors\n`);

  // Category breakdown
  const byCategory = new Map<string, SlowTypeError[]>();
  for (const error of errors) {
    if (!byCategory.has(error.category)) {
      byCategory.set(error.category, []);
    }
    byCategory.get(error.category)!.push(error);
  }

  console.log('By category:');
  for (const [category, categoryErrors] of Array.from(byCategory.entries()).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  ${category.padEnd(20)}: ${categoryErrors.length}`);
  }
  console.log();

  // By file
  const byFile = new Map<string, SlowTypeError[]>();
  for (const error of errors) {
    if (!byFile.has(error.file)) {
      byFile.set(error.file, []);
    }
    byFile.get(error.file)!.push(error);
  }

  console.log('Top 20 files:');
  let count = 0;
  for (const [file, fileErrors] of Array.from(byFile.entries()).sort((a, b) => b[1].length - a[1].length)) {
    if (count++ >= 20) break;
    console.log(`  ${fileErrors.length.toString().padStart(3)} - ${file}`);
  }
  console.log();

  // Generate markdown report
  const report = [
    '# Slow Types Analysis Report',
    '',
    `**Total Errors:** ${errors.length}`,
    '',
    '## By Category',
    '',
  ];

  for (const [category, categoryErrors] of Array.from(byCategory.entries()).sort((a, b) => b[1].length - a[1].length)) {
    report.push(`### ${category} (${categoryErrors.length} errors)`);
    report.push('');
    
    // Show first 10 examples
    for (let i = 0; i < Math.min(10, categoryErrors.length); i++) {
      const error = categoryErrors[i];
      report.push(`- \`${error.file}:${error.line}\` - \`${error.functionName}()\``);
      report.push(`  \`\`\`typescript`);
      report.push(`  ${error.context}`);
      report.push(`  \`\`\``);
    }
    if (categoryErrors.length > 10) {
      report.push(`  ... and ${categoryErrors.length - 10} more`);
    }
    report.push('');
  }

  report.push('## By File (Top 30)');
  report.push('');
  count = 0;
  for (const [file, fileErrors] of Array.from(byFile.entries()).sort((a, b) => b[1].length - a[1].length)) {
    if (count++ >= 30) break;
    report.push(`### ${file} (${fileErrors.length} errors)`);
    report.push('');
    
    for (const error of fileErrors) {
      report.push(`- Line ${error.line}: \`${error.functionName}()\` - ${error.category}`);
      report.push(`  \`\`\`typescript`);
      report.push(`  ${error.context}`);
      report.push(`  \`\`\``);
    }
    report.push('');
  }

  await Deno.writeTextFile('SLOW_TYPES_ANALYSIS.md', report.join('\n'));
  console.log('✓ Report saved to SLOW_TYPES_ANALYSIS.md');
}

if (import.meta.main) {
  await analyzeSlowTypes();
}
