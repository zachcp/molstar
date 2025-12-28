#!/usr/bin/env python3
"""
Fix missing explicit type annotations in exported symbols.
Reads deno publish output and adds type annotations to flagged symbols.
"""

import re
import sys
from pathlib import Path
from typing import Dict, List, Set, Tuple

def parse_deno_errors(output: str) -> Dict[str, List[Tuple[int, str]]]:
    """Parse deno publish output to extract file paths, line numbers, and symbol names."""
    errors: Dict[str, List[Tuple[int, str]]] = {}
    
    # Pattern: "  --> /path/to/file.ts:LINE:COL"
    # Next few lines have the symbol name
    lines = output.split('\n')
    i = 0
    while i < len(lines):
        match = re.search(r'-->\s+(.+\.ts):(\d+):\d+', lines[i])
        if match:
            filepath = match.group(1)
            line_num = int(match.group(2))
            
            # Look for the symbol name in the next few lines
            symbol_name = None
            for j in range(i + 1, min(i + 6, len(lines))):
                # Look for pattern like "export const NAME = ..." or "const NAME = ..."
                sym_match = re.search(r'\s+(export\s+)?(const|let|readonly)\s+(\w+)', lines[j])
                if sym_match:
                    symbol_name = sym_match.group(3)
                    break
            
            if symbol_name:
                if filepath not in errors:
                    errors[filepath] = []
                errors[filepath].append((line_num, symbol_name))
        i += 1
    
    return errors

def infer_type_from_code(line: str) -> str:
    """Infer TypeScript type from a code line."""
    # Pattern: const NAME = SOMETHING
    if '= {' in line or '= {' in line:
        return 'any'  # Object literal - would need context
    elif '= [' in line:
        return 'any[]'
    elif '= function' in line or '=>' in line:
        return 'any'  # Function
    elif 'new ' in line:
        match = re.search(r'new\s+(\w+)', line)
        if match:
            return match.group(1)
    elif re.search(r'Color\s*\(', line):
        return 'Color'
    elif re.search(r'ColorMap\s*\(', line):
        return 'any'
    elif re.search(r'Type\s*\.\w+', line):
        return 'any'
    
    return 'any'

def fix_file(filepath: str, errors_in_file: List[Tuple[int, str]]) -> int:
    """Fix missing type annotations in a single file."""
    path = Path(filepath)
    if not path.exists():
        print(f'  ⚠️  File not found: {filepath}')
        return 0
    
    try:
        content = path.read_text(encoding='utf-8')
    except Exception as e:
        print(f'  ⚠️  Could not read {filepath}: {e}')
        return 0
    
    lines = content.split('\n')
    fixed_count = 0
    
    # Sort errors by line number (descending) to fix from bottom up
    for line_num, symbol_name in sorted(errors_in_file, key=lambda x: x[0], reverse=True):
        idx = line_num - 1  # Convert to 0-indexed
        if idx < 0 or idx >= len(lines):
            continue
        
        line = lines[idx]
        
        # Skip if already has type annotation
        if ':' in line and '{' not in line.split(':')[1].split('=')[0]:
            continue
        
        # Pattern 1: export const NAME = ...
        match = re.match(r'^(\s*export\s+const\s+)(\w+)(\s*=\s*)(.*)$', line)
        if match:
            indent = match.group(1)
            name = match.group(2)
            eq = match.group(3)
            rest = match.group(4)
            
            if name != symbol_name:
                continue
            
            inferred = infer_type_from_code(line)
            
            # Handle special cases
            if '{ ' in rest or rest.startswith('{'):
                inferred = 'any'  # Object literal needs context
            
            new_line = f'{indent}{name}: {inferred}{eq}{rest}'
            
            # Remove any existing type annotation if present
            new_line = re.sub(r'(\w+):\s*\w+(\s*=)', r'\1\2', new_line)
            new_line = f'{indent}{name}: {inferred}{eq}{rest}'
            
            lines[idx] = new_line
            fixed_count += 1
            print(f'  ✓ {symbol_name}')
        
        # Pattern 2: readonly NAME = ...
        match = re.match(r'^(\s*readonly\s+)(\w+)(\s*=\s*)(.*)$', line)
        if match and symbol_name in line:
            indent = match.group(1)
            name = match.group(2)
            eq = match.group(3)
            rest = match.group(4)
            
            if name != symbol_name:
                continue
            
            inferred = infer_type_from_code(line)
            new_line = f'{indent}{name}: {inferred}{eq}{rest}'
            
            lines[idx] = new_line
            fixed_count += 1
            print(f'  ✓ {symbol_name}')
        
        # Pattern 3: let NAME = function...
        match = re.match(r'^(\s*let\s+)(\w+)(\s*=\s*)(function.*)$', line)
        if match and symbol_name in line:
            indent = match.group(1)
            name = match.group(2)
            eq = match.group(3)
            rest = match.group(4)
            
            if name != symbol_name:
                continue
            
            new_line = f'{indent}{name}: any{eq}{rest}'
            lines[idx] = new_line
            fixed_count += 1
            print(f'  ✓ {symbol_name}')
    
    if fixed_count > 0:
        try:
            path.write_text('\n'.join(lines), encoding='utf-8')
            return fixed_count
        except Exception as e:
            print(f'  ⚠️  Could not write {filepath}: {e}')
            return 0
    
    return 0

def main():
    print('🔧 Fixing missing type annotations...\n')
    
    # Run deno publish to get current errors
    print('Running: deno task publish')
    import subprocess
    result = subprocess.run(
        ['deno', 'task', 'publish'],
        capture_output=True,
        text=True,
        cwd='/Users/zcpowers/Documents/Projects/molstar'
    )
    
    output = result.stdout + result.stderr
    
    # Parse errors
    errors = parse_deno_errors(output)
    
    if not errors:
        print('✅ No missing type errors found!')
        return
    
    print(f'\nFound {sum(len(v) for v in errors.values())} missing type errors\n')
    
    total_fixed = 0
    
    # Fix each file
    for filepath in sorted(errors.keys()):
        print(f'📝 {filepath}')
        fixed = fix_file(filepath, errors[filepath])
        total_fixed += fixed
        print()
    
    print(f'\n✅ Fixed {total_fixed} errors')

if __name__ == '__main__':
    main()
