#!/usr/bin/env -S deno run --allow-read --allow-write

/**
 * Fix critical import path errors that block JSR publishing
 *
 * This script handles:
 * 1. Imports from .d.ts files that need the extension removed
 * 2. Directory/file name conflicts (color.ts vs color/ directory)
 * 3. Type-only imports that need .ts extension
 */

import { walk } from "https://deno.land/std@0.224.0/fs/walk.ts";
import { relative } from "https://deno.land/std@0.224.0/path/mod.ts";

const fixes = [
  {
    file: "src/mol-util/param-definition.ts",
    from: "from './color.ts'",
    to: "from './color/color.ts'",
    description: "Fix color.ts import (directory conflict)"
  },
  {
    file: "src/mol-io/reader/gro/parser.ts",
    from: "from './schema.ts'",
    to: "from './schema'",
    description: "Fix .d.ts import (should not have extension)"
  },
  {
    file: "src/mol-canvas3d/helper/interaction-events.ts",
    from: "type Canvas3D = import('../canvas3d').Canvas3D",
    to: "type Canvas3D = import('../canvas3d.ts').Canvas3D",
    description: "Add .ts extension to type import"
  },
  {
    file: "src/mol-canvas3d/helper/interaction-events.ts",
    from: "type HoverEvent = import('../canvas3d').Canvas3D.HoverEvent",
    to: "type HoverEvent = import('../canvas3d.ts').Canvas3D.HoverEvent",
    description: "Add .ts extension to type import"
  },
  {
    file: "src/mol-canvas3d/helper/interaction-events.ts",
    from: "type DragEvent = import('../canvas3d').Canvas3D.DragEvent",
    to: "type DragEvent = import('../canvas3d.ts').Canvas3D.DragEvent",
    description: "Add .ts extension to type import"
  },
  {
    file: "src/mol-canvas3d/helper/interaction-events.ts",
    from: "type ClickEvent = import('../canvas3d').Canvas3D.ClickEvent",
    to: "type ClickEvent = import('../canvas3d.ts').Canvas3D.ClickEvent",
    description: "Add .ts extension to type import"
  },
  {
    file: "src/mol-model/structure/structure/unit/rings/compute.ts",
    from: "from './rings'",
    to: "from './rings.ts'",
    description: "Add .ts extension to rings import"
  },
  {
    file: "src/mol-util/color/palette.ts",
    from: 'import { Color } from "."',
    to: 'import { Color } from "./color.ts"',
    description: "Fix relative import from directory index"
  }
];

async function applyFixes() {
  let appliedCount = 0;
  let skippedCount = 0;

  for (const fix of fixes) {
    const filePath = fix.file;

    try {
      const content = await Deno.readTextFile(filePath);

      if (content.includes(fix.from)) {
        const newContent = content.replace(new RegExp(escapeRegex(fix.from), 'g'), fix.to);
        await Deno.writeTextFile(filePath, newContent);
        console.log(`✓ ${fix.description}`);
        console.log(`  ${filePath}`);
        appliedCount++;
      } else {
        console.log(`⊘ Already fixed or not found: ${fix.description}`);
        console.log(`  ${filePath}`);
        skippedCount++;
      }
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        console.log(`✗ File not found: ${filePath}`);
        skippedCount++;
      } else {
        throw error;
      }
    }
  }

  console.log(`\n✓ Applied: ${appliedCount}`);
  console.log(`⊘ Skipped: ${skippedCount}`);
  console.log(`Total: ${fixes.length}`);
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Check for other potential .d.ts import issues
async function findDtsImports() {
  console.log("\n\nScanning for other .d.ts imports...");
  const dtsImports: string[] = [];

  for await (const entry of walk("src", { exts: [".ts", ".tsx"] })) {
    if (entry.isFile) {
      const content = await Deno.readTextFile(entry.path);
      const matches = content.match(/from ['"]\.\.?\/[^'"]*\.d\.ts['"]/g);
      if (matches) {
        for (const match of matches) {
          dtsImports.push(`${entry.path}: ${match}`);
        }
      }
    }
  }

  if (dtsImports.length > 0) {
    console.log("\nFound .d.ts imports that may need fixing:");
    dtsImports.forEach(line => console.log(`  ${line}`));
  } else {
    console.log("No problematic .d.ts imports found.");
  }
}

// Main execution
if (import.meta.main) {
  console.log("Fixing critical import path errors...\n");
  await applyFixes();
  await findDtsImports();
  console.log("\n✓ Done!");
}
