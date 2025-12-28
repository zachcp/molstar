import { readTextFile, writeTextFile } from 'https://deno.land/std@0.208.0/fs/mod.ts';
import { parse as parseArgs } from 'https://deno.land/std@0.208.0/flags/mod.ts';

const args = parseArgs(Deno.args, { string: ['file'] });

if (!args.file) {
  console.error('Usage: deno run fix-slow-types.ts --file <path>');
  Deno.exit(1);
}

const filepath = args.file;
let content = await readTextFile(filepath);
const lines = content.split('\n');

interface Error {
  line: number;
  col: number;
  name: string;
  type: string;
}

const errors: Error[] = [];

// Parse deno output to find errors in this file
// Format: line_number: name = ...
// We need to infer types from the code

// Pattern 1: export const NAME = { ... };  (object literal)
const objectLiteralRegex = /^(\s*)export\s+const\s+(\w+)\s*=\s*(\{|\w+\()/;

// Pattern 2: export const NAME = function...
const functionRegex = /^(\s*)export\s+const\s+(\w+)\s*=\s*(function|\w+\s*\(|\w+\s*=>)/;

// Pattern 3: readonly NAME = ...;
const readonlyRegex = /^(\s*)readonly\s+(\w+)\s*=\s*(\{|\w+\()/;

let modified = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Skip if already has type annotation
  if (line.includes(':') && !line.includes('//')) {
    continue;
  }

  // Object literal pattern: export const NAME = { ... }
  let match = line.match(/^(\s*)export\s+const\s+(\w+)\s*=\s*(\{)/);
  if (match) {
    const indent = match[1];
    const name = match[2];
    // For object literals, try to infer from context or use 'typeof'
    // Safe approach: add 'as const' or use the return type hint if available
    
    // Check if next few lines give us a clue about the type
    let inferredType = 'any';
    
    // Try to find closing brace
    let braceCount = 1;
    let endLine = i;
    for (let j = i + 1; j < lines.length && j < i + 50; j++) {
      braceCount += (lines[j].match(/\{/g) || []).length;
      braceCount -= (lines[j].match(/\}/g) || []).length;
      if (braceCount === 0) {
        endLine = j;
        break;
      }
    }
    
    // Look for a type interface/type that might match
    // For now, use typeof inference
    lines[i] = line.replace(
      /^(\s*)export\s+const\s+(\w+)\s*=/,
      `$1export const ${name}: typeof ${name} =`
    );
    
    // Actually, a better approach for objects: use `as const`
    lines[i] = line.replace(
      /^(\s*)export\s+const\s+(\w+)\s*=\s*(\{)/,
      `$1export const ${name}: ReturnType<typeof Object.assign> = {`
    );
    
    modified = true;
    continue;
  }

  // Readonly pattern: readonly NAME = ...
  match = line.match(/^(\s*)readonly\s+(\w+)\s*=\s*(\{)/);
  if (match) {
    const indent = match[1];
    const name = match[2];
    lines[i] = line.replace(
      /^(\s*)readonly\s+(\w+)\s*=/,
      `$1readonly ${name}: any =`
    );
    modified = true;
    continue;
  }

  // Function variable pattern: export const NAME = function...
  match = line.match(/^(\s*)export\s+const\s+(\w+)\s*=\s*function/);
  if (match) {
    const name = match[2];
    // For function expressions, infer from body
    lines[i] = line.replace(
      /^(\s*)export\s+const\s+(\w+)\s*=/,
      `$1export const ${name}: any =`
    );
    modified = true;
    continue;
  }
}

if (modified) {
  await writeTextFile(filepath, lines.join('\n'));
  console.log(`Modified ${filepath}`);
} else {
  console.log(`No changes needed for ${filepath}`);
}
