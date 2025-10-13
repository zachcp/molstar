#!/usr/bin/env -S deno run --allow-read --allow-write

/**
 * Fix Node.js built-in imports by adding 'node:' prefix.
 * Changes 'fs' to 'node:fs', 'path' to 'node:path', etc.
 */

import { walk } from "https://deno.land/std@0.208.0/fs/walk.ts";

const SRC_DIR = "./src";

// List of Node.js built-in modules that need the 'node:' prefix
const NODE_BUILTINS = [
    'fs',
    'path',
    'util',
    'stream',
    'buffer',
    'crypto',
    'events',
    'http',
    'https',
    'net',
    'os',
    'process',
    'querystring',
    'url',
    'zlib',
    'child_process',
    'cluster',
    'dns',
    'domain',
    'readline',
    'tls',
    'tty',
    'dgram',
    'vm',
    'worker_threads',
    'perf_hooks',
    'async_hooks',
    'timers',
    'assert',
    'console',
    'constants',
    'module',
    'v8',
];

// Process a single file
async function processFile(filePath: string): Promise<number> {
    const content = await Deno.readTextFile(filePath);
    let modified = content;
    let changeCount = 0;

    for (const builtin of NODE_BUILTINS) {
        // Match: from 'fs' or from "fs" or from 'fs/promises'
        // Don't match if already has node: prefix
        const patterns = [
            // from 'fs'
            new RegExp(`from\\s+(['"\`])${builtin}\\1`, 'g'),
            // from 'fs/promises'
            new RegExp(`from\\s+(['"\`])${builtin}/`, 'g'),
            // import('fs')
            new RegExp(`import\\((['"\`])${builtin}\\1\\)`, 'g'),
            // import('fs/promises')
            new RegExp(`import\\((['"\`])${builtin}/`, 'g'),
            // require('fs')
            new RegExp(`require\\((['"\`])${builtin}\\1\\)`, 'g'),
            // require('fs/promises')
            new RegExp(`require\\((['"\`])${builtin}/`, 'g'),
        ];

        for (const pattern of patterns) {
            const before = modified;

            // Replace with node: prefix
            modified = modified.replace(pattern, (match) => {
                // Check if it already has node: prefix
                if (match.includes('node:')) {
                    return match;
                }

                // Add node: prefix
                if (match.includes(`'${builtin}'`)) {
                    return match.replace(`'${builtin}'`, `'node:${builtin}'`);
                } else if (match.includes(`"${builtin}"`)) {
                    return match.replace(`"${builtin}"`, `"node:${builtin}"`);
                } else if (match.includes(`\`${builtin}\``)) {
                    return match.replace(`\`${builtin}\``, `\`node:${builtin}\``);
                } else if (match.includes(`'${builtin}/`)) {
                    return match.replace(`'${builtin}/`, `'node:${builtin}/`);
                } else if (match.includes(`"${builtin}/`)) {
                    return match.replace(`"${builtin}/`, `"node:${builtin}/`);
                } else if (match.includes(`\`${builtin}/`)) {
                    return match.replace(`\`${builtin}/`, `\`node:${builtin}/`);
                }
                return match;
            });

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
