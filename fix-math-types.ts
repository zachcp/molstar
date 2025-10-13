#!/usr/bin/env -S deno run --allow-read --allow-write

/**
 * Fix return types for math library functions (Vec3, Vec4, Mat3, Mat4, Quat, etc.)
 * These have predictable patterns.
 */

async function fixMathFile(filepath: string) {
  const content = await Deno.readTextFile(filepath);
  const lines = content.split('\n');
  let modified = false;
  let fixCount = 0;

  // Determine the type from filename
  const typeMatch = filepath.match(/(vec[234]|mat[34]|quat|sphere3d)/i);
  if (!typeMatch) return { modified: false, count: 0 };
  
  const typeName = typeMatch[1].charAt(0).toUpperCase() + typeMatch[1].slice(1);
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip lines that already have return types
    if (line.includes('): ')) continue;
    
    // Pattern 1: Functions returning the same type (e.g., zero, clone, create, set, copy, etc.)
    if (line.match(/export function (zero|clone|create|set|copy|add|subtract|multiply|divide|scale|negate|normalize|cross|lerp|slerp|fromValues|fromArray|min|max|floor|ceil|round|abs)/)) {
      if (line.match(/export function \w+\([^)]*\) \{/)) {
        lines[i] = line.replace(/\) \{/, `): ${typeName} {`);
        modified = true;
        fixCount++;
      }
    }
    
    // Pattern 2: Functions returning boolean
    if (line.match(/export function (equals|exactEquals|isFinite|hasNaN)/)) {
      if (line.match(/export function \w+\([^)]*\) \{/)) {
        lines[i] = line.replace(/\) \{/, `): boolean {`);
        modified = true;
        fixCount++;
      }
    }
    
    // Pattern 3: Functions returning number
    if (line.match(/export function (dot|length|squaredLength|distance|squaredDistance|angle)/)) {
      if (line.match(/export function \w+\([^)]*\) \{/)) {
        lines[i] = line.replace(/\) \{/, `): number {`);
        modified = true;
        fixCount++;
      }
    }
    
    // Pattern 4: toObj returns object
    if (line.match(/export function toObj\([^)]*\) \{/)) {
      lines[i] = line.replace(/\) \{/, `): { x: number; y: number; z: number } {`);
      modified = true;
      fixCount++;
    }
    
    // Pattern 5: toArray returns T
    if (line.match(/export function toArray<T[^>]*>\([^)]*\) \{/)) {
      lines[i] = line.replace(/\) \{/, `): T {`);
      modified = true;
      fixCount++;
    }
    
    // Pattern 6: toString returns string
    if (line.match(/export function toString\([^)]*\) \{/)) {
      lines[i] = line.replace(/\) \{/, `): string {`);
      modified = true;
      fixCount++;
    }
  }

  if (modified) {
    await Deno.writeTextFile(filepath, lines.join('\n'));
  }

  return { modified, count: fixCount };
}

const mathFiles = [
  'src/mol-math/linear-algebra/3d/vec2.ts',
  'src/mol-math/linear-algebra/3d/vec3.ts',
  'src/mol-math/linear-algebra/3d/vec4.ts',
  'src/mol-math/linear-algebra/3d/mat3.ts',
  'src/mol-math/linear-algebra/3d/mat4.ts',
  'src/mol-math/linear-algebra/3d/quat.ts',
  'src/mol-math/geometry/primitives/sphere3d.ts',
];

let totalFixed = 0;
for (const file of mathFiles) {
  console.log(`Processing ${file}...`);
  const result = await fixMathFile(file);
  if (result.modified) {
    console.log(`  ✓ Fixed ${result.count} functions`);
    totalFixed += result.count;
  } else {
    console.log(`  - No changes needed`);
  }
}

console.log(`\nTotal fixed: ${totalFixed}`);
console.log('\nRun deno publish --dry-run to verify fixes');
