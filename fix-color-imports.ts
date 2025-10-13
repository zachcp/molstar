#!/usr/bin/env -S deno run --allow-read --allow-write

/**
 * Fix imports that reference mol-util/color.ts to mol-util/color/index.ts
 * since color is a directory, not a file at that level.
 */

import { walk } from "https://deno.land/std@0.208.0/fs/walk.ts";

const SRC_DIR = "./src";

// Process a single file
async function processFile(filePath: string): Promise<number> {
    const content = await Deno.readTextFile(filePath);
    let modified = content;
    let changeCount = 0;

    // Fix mol-util/color.ts -> mol-util/color/index.ts
    const pattern = /from\s+(['"`])(.*?)\/mol-util\/color\.ts\1/g;

    const before = modified;
    modified = modified.replace(pattern, 'from $1$2/mol-util/color/index.ts$1');

    if (before !== modified) {
        changeCount = (before.match(pattern) || []).length;
    }

    if (modified !== content) {
        await Deno.writeTextFile(filePath, modified);
        return changeCount;
    }

    return 0;
}

// Main execution
async function main() {
    let totalFiles = 0;
    let modifiedFiles = 0;
    let totalChanges = 0;

    console.log("Processing TypeScript files...");

    for await (const entry of walk(SRC_DIR, {
        includeDirs: false,
        exts: [".ts", ".tsx"],
    })) {
        totalFiles++;
        const changes = await processFile(entry.path);

        if (changes > 0) {
            modifiedFiles++;
            totalChanges += changes;
            console.log(`✓ ${entry.path} (${changes} changes)`);
        }

        if (totalFiles % 100 === 0) {
            console.log(`  Processed ${totalFiles} files...`);
        }
    }

    console.log("\n" + "=".repeat(60));
    console.log(`✓ Complete!`);
    console.log(`  Total files scanned: ${totalFiles}`);
    console.log(`  Files modified: ${modifiedFiles}`);
    console.log(`  Total changes: ${totalChanges}`);
    console.log("=".repeat(60));
}

if (import.meta.main) {
    main().catch(console.error);
}
