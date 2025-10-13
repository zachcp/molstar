#!/usr/bin/env -S deno run --allow-read --allow-write

/**
 * Fix cross-module imports that reference directories as files.
 * Changes '../mol-task.ts' to '../mol-task/index.ts' where mol-task is a directory.
 */

import { walk } from "https://deno.land/std@0.208.0/fs/walk.ts";

const SRC_DIR = "./src";

// Find all directories with index.ts files (these are modules)
async function findModuleDirs(): Promise<Set<string>> {
    const modules = new Set<string>();

    for await (const entry of walk(SRC_DIR, {
        includeDirs: false,
        match: [/index\.ts$/]
    })) {
        // Get the directory path relative to src
        const dir = entry.path
            .replace(/\\/g, '/')
            .replace(/^\.\/src\//, '')
            .replace(/\/index\.ts$/, '');
        modules.add(dir);
    }

    return modules;
}

// Process a single file
async function processFile(filePath: string, modules: Set<string>): Promise<number> {
    const content = await Deno.readTextFile(filePath);
    let modified = content;
    let changeCount = 0;

    // For each module directory, fix imports that treat it as a file
    for (const module of modules) {
        const moduleName = module.split('/').pop()!;

        // Pattern: from '../mol-something.ts' or from '../../mol-something.ts' etc
        // Replace with: from '../mol-something/index.ts'
        const patterns = [
            // Single parent: '../mol-task.ts'
            new RegExp(`from (['"]\\.\\.\/${moduleName})\\.ts(['"])`, 'g'),
            // Multiple parents: '../../mol-task.ts', '../../../mol-task.ts' etc
            new RegExp(`from (['"](?:\\.\\.\\/)+${moduleName})\\.ts(['"])`, 'g'),
        ];

        for (const pattern of patterns) {
            const before = modified;
            modified = modified.replace(pattern, `from $1/index.ts$2`);
            if (before !== modified) {
                changeCount++;
            }
        }
    }

    // Also fix any remaining bare cross-module imports (without .ts extension)
    // Pattern: from '../mol-something' -> from '../mol-something/index.ts'
    for (const module of modules) {
        const moduleName = module.split('/').pop()!;

        const patterns = [
            // Single parent without extension: '../mol-task'
            new RegExp(`from (['"]\\.\\.\/${moduleName})(['"])`, 'g'),
            // Multiple parents without extension
            new RegExp(`from (['"](?:\\.\\.\\/)+${moduleName})(['"])`, 'g'),
        ];

        for (const pattern of patterns) {
            const before = modified;
            modified = modified.replace(pattern, `from $1/index.ts$2`);
            if (before !== modified) {
                changeCount++;
            }
        }
    }

    if (modified !== content) {
        await Deno.writeTextFile(filePath, modified);
        return changeCount;
    }

    return 0;
}

// Main execution
async function main() {
    console.log("Finding module directories...");
    const modules = await findModuleDirs();
    console.log(`Found ${modules.size} module directories`);

    let totalFiles = 0;
    let modifiedFiles = 0;
    let totalChanges = 0;

    console.log("\nProcessing TypeScript files...");

    for await (const entry of walk(SRC_DIR, {
        includeDirs: false,
        exts: [".ts", ".tsx"],
    })) {
        totalFiles++;
        const changes = await processFile(entry.path, modules);

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
