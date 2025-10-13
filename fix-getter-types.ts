#!/usr/bin/env -S deno run --allow-read --allow-write

/**
 * Fix return types for getter methods by looking up the property type
 */

interface GetterError {
  file: string;
  line: number;
  getterName: string;
}

// Strip ANSI color codes
function stripAnsi(text: string): string {
  return text.replace(/\x1B\[[0-9;]*m/g, '');
}

async function parseGetterErrors(): Promise<GetterError[]> {
  const content = await Deno.readTextFile('slow-types-full.txt');
  const cleanContent = stripAnsi(content);
  const lines = cleanContent.split('\n');
  const errors: GetterError[] = [];

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

          // Look for getter context
          for (let j = i + 2; j < Math.min(i + 10, lines.length); j++) {
            const contextLine = lines[j];
            const codeMatch = contextLine.match(/^\s*(\d+)\s*\|\s*(.+)$/);
            if (codeMatch) {
              const context = codeMatch[2].trim();
              
              // Only process getters
              if (context.includes('get ')) {
                const nameMatch = context.match(/get\s+(\w+)\s*\(/);
                if (nameMatch) {
                  errors.push({
                    file: filePath,
                    line: parseInt(lineNum, 10),
                    getterName: nameMatch[1]
                  });
                }
              }
              break;
            }
          }
        }
      }
    }
  }

  return errors;
}

async function findPropertyType(file: string, getterLine: number, getterName: string): Promise<string | null> {
  try {
    const content = await Deno.readTextFile(file);
    const lines = content.split('\n');

    // Check the getter itself for inline return with type cast
    const getterLineContent = lines[getterLine - 1];
    
    // Pattern: get prop() { return this._prop as Type; }
    const inlineMatch = getterLineContent.match(/return\s+this\._?\w+\s+as\s+([^;]+);/);
    if (inlineMatch) {
      return inlineMatch[1].trim();
    }

    // Look for property declaration in the class
    // Search backwards from getter line
    for (let i = getterLine - 2; i >= Math.max(0, getterLine - 100); i--) {
      const line = lines[i];
      
      // Pattern: private _propName: Type;
      const privateMatch = line.match(new RegExp(`(?:private|protected|public)?\\s+_?${getterName}\\s*[!?]?\\s*:\\s*([^;=]+)`));
      if (privateMatch) {
        let type = privateMatch[1].trim();
        // Remove comments
        type = type.split('//')[0].trim();
        return type;
      }
    }

    // Check if getter returns this.property
    let bodyLines = '';
    for (let i = getterLine - 1; i < Math.min(lines.length, getterLine + 10); i++) {
      bodyLines += lines[i] + '\n';
      if (lines[i].includes('}')) break;
    }

    const returnMatch = bodyLines.match(/return\s+this\.(_?\w+)/);
    if (returnMatch) {
      const propName = returnMatch[1];
      
      // Search for this property
      for (let i = Math.max(0, getterLine - 100); i < getterLine; i++) {
        const line = lines[i];
        const propMatch = line.match(new RegExp(`(?:private|protected|public)?\\s+${propName}\\s*[!?]?\\s*:\\s*([^;=]+)`));
        if (propMatch) {
          let type = propMatch[1].trim();
          type = type.split('//')[0].trim();
          return type;
        }
      }
    }

    return null;
  } catch (e) {
    console.error(`Error reading ${file}:`, e);
    return null;
  }
}

async function addGetterReturnType(file: string, line: number, returnType: string): Promise<boolean> {
  try {
    const content = await Deno.readTextFile(file);
    const lines = content.split('\n');

    if (line <= 0 || line > lines.length) return false;

    const targetLine = lines[line - 1];
    
    // Skip if already has return type
    if (targetLine.match(/get\s+\w+\(\)\s*:/)) return false;

    let newLine = targetLine;
    
    // Pattern: get property() {
    if (targetLine.match(/get\s+\w+\(\)\s*\{/)) {
      newLine = targetLine.replace(/(\w+)\(\)\s*\{/, `$1(): ${returnType} {`);
    }
    // Pattern: get property() { return ... }
    else if (targetLine.match(/get\s+\w+\(\)\s*\{.*\}/)) {
      newLine = targetLine.replace(/(\w+)\(\)\s*\{/, `$1(): ${returnType} {`);
    }

    if (newLine !== targetLine) {
      lines[line - 1] = newLine;
      await Deno.writeTextFile(file, lines.join('\n'));
      return true;
    }

    return false;
  } catch (e) {
    console.error(`Error modifying ${file}:${line}:`, e);
    return false;
  }
}

async function main() {
  console.log('Parsing getter errors...');
  const errors = await parseGetterErrors();
  console.log(`Found ${errors.length} getter methods without return types\n`);

  if (errors.length === 0) {
    console.log('No getter errors found!');
    return;
  }

  // Group by file
  const byFile = new Map<string, GetterError[]>();
  for (const error of errors) {
    if (!byFile.has(error.file)) {
      byFile.set(error.file, []);
    }
    byFile.get(error.file)!.push(error);
  }

  let fixed = 0;
  let skipped = 0;

  for (const [file, fileErrors] of byFile) {
    console.log(`\n${file} (${fileErrors.length} getters)...`);
    
    // Sort by line number descending to avoid line shifts
    fileErrors.sort((a, b) => b.line - a.line);

    for (const error of fileErrors) {
      const inferredType = await findPropertyType(error.file, error.line, error.getterName);

      if (inferredType) {
        console.log(`  Line ${error.line}: get ${error.getterName}() -> ${inferredType}`);
        const success = await addGetterReturnType(error.file, error.line, inferredType);
        if (success) {
          fixed++;
        } else {
          skipped++;
          console.log(`    ⚠️  Could not modify`);
        }
      } else {
        skipped++;
        console.log(`  Line ${error.line}: get ${error.getterName}() -> ❌ Cannot find property type`);
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total getters: ${errors.length}`);
  console.log(`Fixed: ${fixed}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Success rate: ${((fixed / errors.length) * 100).toFixed(1)}%`);
  console.log('='.repeat(60));

  if (fixed > 0) {
    console.log('\n✅ Run "deno publish --dry-run" to verify fixes');
  }
}

if (import.meta.main) {
  await main();
}
