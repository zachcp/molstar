/**
 * Automatically add explicit return types to functions using TypeScript's compiler API
 *
 * Usage: deno run --allow-read --allow-write scripts/add-return-types.ts [path]
 */

import * as ts from 'npm:typescript';
import * as fs from 'node:fs';
import * as path from 'node:path';

interface FunctionInfo {
    node: ts.FunctionDeclaration | ts.MethodDeclaration | ts.FunctionExpression | ts.ArrowFunction;
    name: string;
    inferredType: string;
    line: number;
}

function getAllTsFiles(dir: string): string[] {
    const files: string[] = [];

    function walk(currentPath: string) {
        const entries = fs.readdirSync(currentPath, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentPath, entry.name);

            if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
                walk(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.ts') && !entry.name.endsWith('.d.ts')) {
                files.push(fullPath);
            }
        }
    }

    walk(dir);
    return files;
}

function needsReturnType(
    node: ts.FunctionDeclaration | ts.MethodDeclaration | ts.FunctionExpression | ts.ArrowFunction
): boolean {
    // Already has return type
    if (node.type) return false;

    // Constructors don't need return types
    if (ts.isConstructorDeclaration(node)) return false;

    // Only add to exported functions or class methods
    if (ts.isFunctionDeclaration(node)) {
        const hasExport = node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword);
        if (!hasExport) return false;
    }

    if (ts.isMethodDeclaration(node)) {
        // Only public methods (or methods without private/protected)
        const isPrivate = node.modifiers?.some(m =>
            m.kind === ts.SyntaxKind.PrivateKeyword ||
            m.kind === ts.SyntaxKind.ProtectedKeyword
        );
        if (isPrivate) return false;
    }

    return true;
}

function getFunctionName(node: ts.FunctionDeclaration | ts.MethodDeclaration | ts.FunctionExpression | ts.ArrowFunction): string {
    if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) {
        return node.name?.getText() || 'anonymous';
    }
    return 'anonymous';
}

function processFile(filePath: string, dryRun: boolean = false): { modified: boolean; count: number } {
    const sourceCode = fs.readFileSync(filePath, 'utf-8');
    const sourceFile = ts.createSourceFile(
        filePath,
        sourceCode,
        ts.ScriptTarget.Latest,
        true
    );

    // Create program for type checking
    const compilerOptions: ts.CompilerOptions = {
        target: ts.ScriptTarget.Latest,
        module: ts.ModuleKind.ESNext,
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
    };

    const program = ts.createProgram([filePath], compilerOptions);
    const checker = program.getTypeChecker();

    const functionsToUpdate: FunctionInfo[] = [];

    function visit(node: ts.Node) {
        if (
            (ts.isFunctionDeclaration(node) ||
             ts.isMethodDeclaration(node) ||
             ts.isFunctionExpression(node) ||
             ts.isArrowFunction(node)) &&
            needsReturnType(node as any)
        ) {
            try {
                const signature = checker.getSignatureFromDeclaration(node as ts.SignatureDeclaration);
                if (signature) {
                    const returnType = checker.getReturnTypeOfSignature(signature);
                    let typeString = checker.typeToString(returnType, node,
                        ts.TypeFormatFlags.NoTruncation |
                        ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope
                    );

                    // Simplify some common patterns
                    typeString = typeString.replace(/import\(".*?"\)\./g, '');

                    const lineAndChar = sourceFile.getLineAndCharacterOfPosition(node.getStart());

                    functionsToUpdate.push({
                        node: node as any,
                        name: getFunctionName(node as any),
                        inferredType: typeString,
                        line: lineAndChar.line + 1
                    });
                }
            } catch (e) {
                // Skip if we can't infer the type
            }
        }

        ts.forEachChild(node, visit);
    }

    visit(sourceFile);

    if (functionsToUpdate.length === 0) {
        return { modified: false, count: 0 };
    }

    if (dryRun) {
        console.log(`\n${filePath}:`);
        for (const func of functionsToUpdate) {
            console.log(`  Line ${func.line}: ${func.name}() → ${func.inferredType}`);
        }
        return { modified: false, count: functionsToUpdate.length };
    }

    // Sort by position (descending) so we can modify from end to start
    functionsToUpdate.sort((a, b) => b.node.getStart() - a.node.getStart());

    let modifiedSource = sourceCode;

    for (const funcInfo of functionsToUpdate) {
        const node = funcInfo.node;

        // Find the position to insert the return type
        let insertPos: number;

        if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) {
            // Insert after the closing parenthesis of parameters
            insertPos = node.parameters.end + 1; // After ')'
        } else if (ts.isArrowFunction(node)) {
            // For arrow functions: (params) => body
            insertPos = node.parameters.end + 1;
        } else {
            continue;
        }

        // Make sure we're inserting in the right place
        const before = modifiedSource.substring(0, insertPos);
        const after = modifiedSource.substring(insertPos);

        modifiedSource = before + `: ${funcInfo.inferredType}` + after;
    }

    fs.writeFileSync(filePath, modifiedSource, 'utf-8');
    console.log(`✓ Updated ${filePath} (${functionsToUpdate.length} functions)`);

    return { modified: true, count: functionsToUpdate.length };
}

function main() {
    const args = Deno.args;
    const dryRun = args.includes('--dry-run');
    const targetPath = args.find(arg => !arg.startsWith('--')) || 'src';

    console.log(`Scanning for TypeScript files in: ${targetPath}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'WRITE'}\n`);

    const files = getAllTsFiles(targetPath);
    console.log(`Found ${files.length} TypeScript files\n`);

    let totalModified = 0;
    let totalFunctions = 0;

    for (const file of files) {
        try {
            const result = processFile(file, dryRun);
            if (result.modified || result.count > 0) {
                totalModified++;
                totalFunctions += result.count;
            }
        } catch (e) {
            console.error(`Error processing ${file}:`, e.message);
        }
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`Summary:`);
    console.log(`  Files processed: ${files.length}`);
    console.log(`  Files ${dryRun ? 'with changes' : 'modified'}: ${totalModified}`);
    console.log(`  Functions updated: ${totalFunctions}`);
    console.log(`${'='.repeat(60)}`);

    if (dryRun) {
        console.log('\nRun without --dry-run to apply changes');
    }
}

if (import.meta.main) {
    main();
}
