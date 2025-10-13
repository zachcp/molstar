#!/usr/bin/env -S deno run --allow-read --allow-write

/**
 * Fix imports that reference .tsx files but incorrectly use .ts extension.
 * Changes './plugin.ts' to './plugin.tsx' when plugin.tsx exists but plugin.ts doesn't.
 */

import { walk } from "https://deno.land/std@0.208.0/fs/walk.ts";
import { dirname, join, relative } from "https://deno.land/std@0.208.0/path/mod.ts";

const SRC_DIR = "./src";

// Find all .tsx files
async function findTsxFiles(): Promise<Set<string>> {
    const tsxFiles = new Set<string>();

    for await (const entry of walk(SRC_DIR, {
        includeDirs: false,
        exts: [".tsx"]
    })) {
        // Get the path relative to src, without extension
        const relativePath = entry.path
            .replace(/\\/g, '/')
            .replace(/^\.\/src\//, '')
            .replace(/\.tsx$/, '');
        tsxFiles.add(relativePath);
    }

    return tsxFiles;
}

// Process a single file
async function processFile(filePath: string, tsxFiles: Set<string>): Promise<number> {
    const content = await Deno.readTextFile(filePath);
    let modified = content;
    let changeCount = 0;

    // Match import/export statements with .ts extensions
    const importRegex = /from\s+(['"])(.+?)\.ts\1/g;

    modified = content.replace(importRegex, (match, quote, importPath) => {
        // Resolve the import path relative to the current file
        const currentDir = dirname(filePath).replace(/^\.\/src\//, '');

        let resolvedPath: string;
        if (importPath.startsWith('./') || importPath.startsWith('../')) {
            // Relative import - resolve it
            if (currentDir === 'src') {
                resolvedPath = importPath.replace(/^\.\//, '');
            } else {
                const fullCurrentDir = 'src/' + currentDir;
                resolvedPath = join(fullCurrentDir, importPath)
                    .replace(/\\/g, '/')
                    .replace(/^src\//, '');
            }

            // Normalize the path (remove ./ and ../)
            const parts = resolvedPath.split('/');
            const normalized: string[] = [];
            for (const part of parts) {
                if (part === '..') {
                    normalized.pop();
                } else if (part !== '.' && part !== '') {
                    normalized.push(part);
                }
            }
            resolvedPath = normalized.join('/');
        } else {
            // Absolute import from src root
            resolvedPath = importPath;
        }

        // Check if this path exists as a .tsx file
        if (tsxFiles.has(resolvedPath)) {
            changeCount++;
            return `from ${quote}${importPath}.tsx${quote}`;
        }

        return match;
    });

    if (modified !== content) {
        await Deno.writeTextFile(filePath, modified);
        return changeCount;
    }

    return 0;
}

// Main execution
async function main() {
    console.log("Finding .tsx files...");
    const tsxFiles = await findTsxFiles();
    console.log(`Found ${tsxFiles.size} .tsx files`);

    let totalFiles = 0;
    let modifiedFiles = 0;
    let totalChanges = 0;

    console.log("\nProcessing TypeScript files...");

    for await (const entry of walk(SRC_DIR, {
        includeDirs: false,
        exts: [".ts", ".tsx"],
    })) {
        totalFiles++;
        const changes = await processFile(entry.path, tsxFiles);

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
