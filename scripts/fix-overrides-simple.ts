#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run

/**
 * Simple script to fix TS4114 errors by adding 'override' modifiers
 */

interface OverrideError {
  file: string;
  line: number;
  method: string;
}

async function getErrors(): Promise<OverrideError[]> {
  console.log('🔍 Scanning for TS4114 errors...\n');

  const cmd = new Deno.Command('deno', {
    args: ['publish', '--dry-run', '--allow-dirty'],
    stdout: 'piped',
    stderr: 'piped',
  });

  const { stdout, stderr } = await cmd.output();
  const output = new TextDecoder().decode(stdout) + new TextDecoder().decode(stderr);
  const lines = output.split('\n');

  const errors: OverrideError[] = [];

  for (let i = 0; i < lines.length - 3; i++) {
    const line = lines[i];

    if (line.includes('TS4114 [ERROR]') && line.includes("must have an 'override' modifier")) {
      // Line i+1 has the method signature
      // Line i+2 has the ~~~~ underline
      // Line i+3 has the file location
      const methodLine = lines[i + 1];
      const locationLine = lines[i + 3];

      const locMatch = locationLine.match(/at file:\/\/(.+):(\d+):\d+/);
      if (locMatch) {
        const [, filePath, lineNum] = locMatch;
        const method = methodLine.trim().replace(/~/g, '');

        errors.push({
          file: filePath,
          line: parseInt(lineNum, 10),
          method: method.substring(0, 50), // truncate for display
        });
      }
    }
  }

  return errors;
}

async function fixLine(filePath: string, lineNum: number): Promise<boolean> {
  try {
    const content = await Deno.readTextFile(filePath);
    const lines = content.split('\n');
    const idx = lineNum - 1; // Convert to 0-based

    if (idx < 0 || idx >= lines.length) {
      return false;
    }

    const line = lines[idx];

    // Skip if already has override
    if (line.includes('override ')) {
      return true;
    }

    // Pattern: find method/property declaration
    // Match: (whitespace)(modifiers)(methodName)(
    const match = line.match(/^(\s*)((?:private|protected|public|static|readonly|async)\s+)*(\w+)/);

    if (match) {
      const [, indent, modifiers, rest] = match;
      const mods = modifiers || '';
      const after = line.slice((indent + mods).length);
      lines[idx] = `${indent}${mods}override ${after}`;

      await Deno.writeTextFile(filePath, lines.join('\n'));
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

async function main() {
  const errors = await getErrors();

  if (errors.length === 0) {
    console.log('✅ No TS4114 errors found!\n');
    return;
  }

  console.log(`Found ${errors.length} errors in ${new Set(errors.map(e => e.file)).size} files\n`);

  // Group by file
  const byFile = new Map<string, OverrideError[]>();
  for (const err of errors) {
    const list = byFile.get(err.file) || [];
    list.push(err);
    byFile.set(err.file, list);
  }

  let fixed = 0;
  let failed = 0;

  for (const [file, errs] of byFile.entries()) {
    // Sort descending to fix from bottom up (prevents line shifts)
    errs.sort((a, b) => b.line - a.line);

    const shortPath = file.replace(/.*\/molstar\//, '');
    console.log(`📝 ${shortPath} (${errs.length} errors)`);

    for (const err of errs) {
      if (await fixLine(err.file, err.line)) {
        fixed++;
        console.log(`   ✅ Line ${err.line}`);
      } else {
        failed++;
        console.log(`   ❌ Line ${err.line}`);
      }
    }
  }

  console.log('\n' + '━'.repeat(60));
  console.log(`\n📊 Fixed: ${fixed} | Failed: ${failed} | Total: ${errors.length}`);
  console.log(`   Success rate: ${((fixed / errors.length) * 100).toFixed(1)}%\n`);

  if (fixed > 0) {
    console.log('🔄 Verifying...\n');

    const checkCmd = new Deno.Command('deno', {
      args: ['publish', '--dry-run', '--allow-dirty'],
      stdout: 'piped',
      stderr: 'piped',
    });

    const { stdout, stderr } = await checkCmd.output();
    const output = new TextDecoder().decode(stdout) + new TextDecoder().decode(stderr);

    const remaining = (output.match(/TS4114 \[ERROR\]/g) || []).length;
    const totalMatch = output.match(/Found (\d+) errors?\./);
    const total = totalMatch ? parseInt(totalMatch[1], 10) : 0;

    console.log(`📈 TS4114 errors: ${errors.length} → ${remaining}`);
    console.log(`📈 Total errors: ${total}`);

    if (remaining === 0) {
      console.log('\n🎉 All TS4114 errors fixed!\n');
    } else {
      console.log(`\n⚠️  ${remaining} TS4114 errors remain\n`);
    }
  }
}

if (import.meta.main) {
  await main();
}
