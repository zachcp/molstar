#!/usr/bin/env -S deno run --allow-read --allow-write

/**
 * Fix simple return types (boolean, number, string) based on name patterns
 * and initialization values
 */

// Strip ANSI
function stripAnsi(text: string): string {
  return text.replace(/\x1B\[[0-9;]*m/g, '');
}

interface SimpleError {
  file: string;
  line: number;
  name: string;
  context: string;
  category: 'getter' | 'method' | 'function';
}

async function parseErrors(): Promise<SimpleError[]> {
  const content = await Deno.readTextFile('slow-types-full.txt');
  const cleanContent = stripAnsi(content);
  const lines = cleanContent.split('\n');
  const errors: SimpleError[] = [];

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
              
              let category: 'getter' | 'method' | 'function' = 'method';
              let name = 'unknown';
              
              if (context.includes('get ')) {
                category = 'getter';
                const match = context.match(/get\s+(\w+)\s*\(/);
                if (match) name = match[1];
              } else if (context.match(/export\s+function\s+\w+/)) {
                category = 'function';
                const match = context.match(/function\s+(\w+)\s*\(/);
                if (match) name = match[1];
              } else {
                const match = context.match(/(\w+)\s*\(/);
                if (match) name = match[1];
              }

              errors.push({
                file: filePath,
                line: parseInt(lineNum, 10),
                name,
                context,
                category
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

async function inferSimpleType(file: string, line: number, name: string, category: string): Promise<string | null> {
  try {
    const content = await Deno.readTextFile(file);
    const lines = content.split('\n');

    const targetLine = lines[line - 1];

    // Boolean patterns
    if (name.match(/^(is|has|can|should|will|are|were|was)[A-Z]/)) return 'boolean';
    if (name === 'equals' || name === 'exactEquals') return 'boolean';

    // Number patterns  
    if (name.match(/^(count|index|size|length|width|height|depth|radius|distance|angle)$/i)) return 'number';

    // String patterns
    if (name === 'toString' || name === 'toStr') return 'string';

    // Check getter returning primitive property
    if (category === 'getter') {
      // Look for property initialization
      const returnMatch = targetLine.match(/return\s+this\.(_?\w+)/);
      if (returnMatch) {
        const propName = returnMatch[1];
        
        // Search for property declaration
        for (let i = Math.max(0, line - 100); i < line; i++) {
          const searchLine = lines[i];
          
          // Pattern: private _prop = 0; (inferred as number)
          if (searchLine.includes(`${propName} = 0`) || searchLine.includes(`${propName}= 0`)) {
            return 'number';
          }
          // Pattern: private _prop = true/false;
          if (searchLine.match(new RegExp(`${propName}\\s*=\\s*(true|false)`))) {
            return 'boolean';
          }
          // Pattern: private _prop = '';
          if (searchLine.match(new RegExp(`${propName}\\s*=\\s*['"']`))) {
            return 'string';
          }
        }
      }
    }

    // Check for explicit type in nearby lines for getters
    if (category === 'getter') {
      const returnMatch = targetLine.match(/return\s+this\.(_?\w+)/);
      if (returnMatch) {
        const propName = returnMatch[1];
        
        for (let i = Math.max(0, line - 100); i < line; i++) {
          const searchLine = lines[i];
          const typeMatch = searchLine.match(new RegExp(`${propName}\\s*:\\s*(number|boolean|string)[^A-Za-z]`));
          if (typeMatch) {
            return typeMatch[1];
          }
        }
      }
    }

    return null;
  } catch (e) {
    return null;
  }
}

async function addReturnType(file: string, line: number, returnType: string): Promise<boolean> {
  try {
    const content = await Deno.readTextFile(file);
    const lines = content.split('\n');

    if (line <= 0 || line > lines.length) return false;

    const targetLine = lines[line - 1];
    
    // Skip if already has return type
    if (targetLine.includes('): ')) return false;

    let newLine = targetLine;

    // Various patterns
    if (targetLine.match(/(get|set|function|async)?\s*\w+\s*\([^)]*\)\s*\{/)) {
      newLine = targetLine.replace(/(\([^)]*\))\s*\{/, `$1: ${returnType} {`);
    } else if (targetLine.match(/(get|set|function|async)?\s*\w+\s*\([^)]*\)\s*\{.*\}/)) {
      newLine = targetLine.replace(/(\([^)]*\))\s*\{/, `$1: ${returnType} {`);
    }

    if (newLine !== targetLine) {
      lines[line - 1] = newLine;
      await Deno.writeTextFile(file, lines.join('\n'));
      return true;
    }

    return false;
  } catch (e) {
    return false;
  }
}

async function main() {
  console.log('Parsing errors for simple types...');
  const errors = await parseErrors();
  console.log(`Found ${errors.length} total errors\n`);

  // Filter to simple types only
  const simpleErrors = [];
  for (const error of errors) {
    const inferredType = await inferSimpleType(error.file, error.line, error.name, error.category);
    if (inferredType && ['boolean', 'number', 'string'].includes(inferredType)) {
      simpleErrors.push({ ...error, inferredType });
    }
  }

  console.log(`Identified ${simpleErrors.length} errors with simple types (boolean, number, string)`);
  console.log(`  - boolean: ${simpleErrors.filter(e => e.inferredType === 'boolean').length}`);
  console.log(`  - number: ${simpleErrors.filter(e => e.inferredType === 'number').length}`);
  console.log(`  - string: ${simpleErrors.filter(e => e.inferredType === 'string').length}\n`);

  // Group by file
  const byFile = new Map();
  for (const error of simpleErrors) {
    if (!byFile.has(error.file)) {
      byFile.set(error.file, []);
    }
    byFile.get(error.file).push(error);
  }

  let fixed = 0;
  let skipped = 0;

  for (const [file, fileErrors] of byFile) {
    console.log(`\n${file} (${fileErrors.length} simple types)...`);
    
    // Sort descending
    fileErrors.sort((a: any, b: any) => b.line - a.line);

    for (const error of fileErrors) {
      console.log(`  Line ${error.line}: ${error.name}() -> ${error.inferredType}`);
      const success = await addReturnType(error.file, error.line, error.inferredType);
      if (success) {
        fixed++;
      } else {
        skipped++;
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Simple type errors: ${simpleErrors.length}`);
  console.log(`Fixed: ${fixed}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Success rate: ${((fixed / simpleErrors.length) * 100).toFixed(1)}%`);
  console.log('='.repeat(60));

  if (fixed > 0) {
    console.log('\n✅ Run "deno publish --dry-run" to verify fixes');
  }
}

if (import.meta.main) {
  await main();
}
