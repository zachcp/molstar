#!/usr/bin/env -S deno run --allow-read --allow-write

/**
 * Batch fix missing return types based on deno publish output
 */

import { walkSync } from "https://deno.land/std@0.224.0/fs/walk.ts";
import * as path from "https://deno.land/std@0.224.0/path/mod.ts";

interface ErrorInfo {
    file: string;
    line: number;
    functionName: string;
    type: 'getter' | 'method' | 'function';
}

async function getDenoErrors(): Promise<ErrorInfo[]> {
    const cmd = new Deno.Command("deno", {
        args: ["publish", "--dry-run"],
        stdout: "piped",
        stderr: "piped",
    });
    
    const output = await cmd.output();
    const text = new TextDecoder().decode(output.stderr) + new TextDecoder().decode(output.stdout);
    
    const errors: ErrorInfo[] = [];
    const lines = text.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('error[missing-explicit-return-type]')) {
            // Look for the file path in next few lines
            for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
                const match = lines[j].match(/-->\s*.*\/molstar\/(src\/[^:]+):(\d+):\d+/);
                if (match) {
                    const file = match[1];
                    const line = parseInt(match[2]);
                    
                    // Check line content for pattern
                    for (let k = j + 1; k < Math.min(j + 5, lines.length); k++) {
                        if (lines[k].includes('|') && (lines[k].includes('get ') || lines[k].includes('function '))) {
                            const funcMatch = lines[k].match(/get\s+(\w+)\(\)/);
                            if (funcMatch) {
                                errors.push({
                                    file,
                                    line,
                                    functionName: funcMatch[1],
                                    type: 'getter'
                                });
                            }
                            break;
                        }
                    }
                    break;
                }
            }
        }
    }
    
    return errors;
}

async function fixFile(filePath: string, errors: ErrorInfo[]) {
    const content = await Deno.readTextFile(filePath);
    const lines = content.split('\n');
    let modified = false;
    
    for (const error of errors) {
        if (error.file !== filePath) continue;
        
        const lineIdx = error.line - 1;
        if (lineIdx < 0 || lineIdx >= lines.length) continue;
        
        const line = lines[lineIdx];
        
        // Fix getter without return type
        if (error.type === 'getter') {
            const getterMatch = line.match(/^(\s*)((?:static\s+)?get\s+\w+)\(\)\s*\{/);
            if (getterMatch) {
                // Try to infer return type from the getter body
                const indent = getterMatch[1];
                const getterDecl = getterMatch[2];
                
                // Look at next line for return statement
                if (lineIdx + 1 < lines.length) {
                    const nextLine = lines[lineIdx + 1];
                    const returnMatch = nextLine.match(/return\s+(.+?);/);
                    
                    if (returnMatch) {
                        const returnExpr = returnMatch[1].trim();
                        let returnType = inferReturnType(returnExpr, content);
                        
                        if (returnType) {
                            lines[lineIdx] = `${indent}${getterDecl}(): ${returnType} {`;
                            modified = true;
                            console.log(`Fixed ${filePath}:${error.line} - added return type: ${returnType}`);
                        }
                    }
                }
            }
        }
    }
    
    if (modified) {
        await Deno.writeTextFile(filePath, lines.join('\n'));
        return true;
    }
    return false;
}

function inferReturnType(returnExpr: string, fileContent: string): string | null {
    // Simple heuristics for common patterns
    if (returnExpr === 'this') return 'this';
    if (returnExpr === 'true' || returnExpr === 'false') return 'boolean';
    if (returnExpr.match(/^\d+$/)) return 'number';
    if (returnExpr.match(/^['"`]/)) return 'string';
    if (returnExpr.startsWith('this._') && returnExpr.endsWith('[]')) return 'any[]';
    
    // Check if it's a property access
    const propMatch = returnExpr.match(/^this\.(_?\w+)$/);
    if (propMatch) {
        const propName = propMatch[1];
        // Look for property declaration
        const propDeclMatch = fileContent.match(new RegExp(`${propName}:\\s*([^;=\\n]+)`));
        if (propDeclMatch) {
            return propDeclMatch[1].trim();
        }
    }
    
    return null;
}

// Main execution
const errors = await getDenoErrors();
console.log(`Found ${errors.length} return type errors`);

const fileGroups = new Map<string, ErrorInfo[]>();
for (const error of errors) {
    if (!fileGroups.has(error.file)) {
        fileGroups.set(error.file, []);
    }
    fileGroups.get(error.file)!.push(error);
}

console.log(`Errors in ${fileGroups.size} files`);

let fixed = 0;
for (const [file, fileErrors] of fileGroups) {
    const didFix = await fixFile(file, fileErrors);
    if (didFix) fixed++;
}

console.log(`Fixed ${fixed} files`);
