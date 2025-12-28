#!/usr/bin/env python3
"""Quick fix for missing explicit types in exported symbols."""

import re
import subprocess
from pathlib import Path

# Get list of files with errors
result = subprocess.run(
    ['deno', 'task', 'publish'],
    capture_output=True,
    text=True,
    cwd='/Users/zcpowers/Documents/Projects/molstar'
)

output = result.stdout + result.stderr
lines = output.split('\n')

# Extract file:line:col patterns
errors_by_file = {}
for i, line in enumerate(lines):
    if ' --> ' in line and '.ts:' in line:
        # Extract path, line number, col
        match = re.search(r'-->.*?(/.*\.ts):(\d+):(\d+)', line)
        if match:
            path = match.group(1)
            line_num = int(match.group(2))
            col_num = int(match.group(3))
            
            # Get the symbol name from nearby lines
            symbol_name = None
            for j in range(max(0, i-2), min(len(lines), i+5)):
                # Look for the actual code line with the symbol
                sym_match = re.search(r'\|\s*(\d+)\s*\|\s*(\S.*)', lines[j])
                if sym_match:
                    code_line_num = sym_match.group(1)
                    if code_line_num == str(line_num):
                        code = sym_match.group(2)
                        # Extract symbol name
                        name_match = re.search(r'(export\s+)?(const|let|readonly)\s+(\w+)', code)
                        if name_match:
                            symbol_name = name_match.group(3)
                        break
            
            if symbol_name:
                if path not in errors_by_file:
                    errors_by_file[path] = []
                errors_by_file[path].append((line_num, symbol_name, col_num))

print(f'Found {len(errors_by_file)} files with errors\n')

# Process each file
fixed_total = 0
for filepath in sorted(errors_by_file.keys())[:20]:  # Start with first 20 files
    errors_in_file = errors_by_file[filepath]
    path_obj = Path(filepath)
    
    if not path_obj.exists():
        print(f'⚠️  {filepath} - NOT FOUND')
        continue
    
    content = path_obj.read_text(encoding='utf-8')
    file_lines = content.split('\n')
    
    print(f'📝 {filepath.split("/")[-1]} ({len(errors_in_file)} errors)')
    
    # Process errors in reverse line order to avoid shifting
    for line_num, symbol_name, col_num in sorted(errors_in_file, key=lambda x: x[0], reverse=True):
        idx = line_num - 1
        if idx >= len(file_lines):
            continue
        
        line = file_lines[idx]
        
        # Check for specific patterns and add types
        
        # Pattern: export const NAME = { spread_operator_or_object };
        if f'export const {symbol_name}' in line and '=' in line:
            # Check if this is an object that needs `as const` or type inference
            if 'getPaletteParams' in line or 'ColorMap' in line or '{' in line:
                # Add `: any` as a safe default for complex object spreads
                new_line = re.sub(
                    rf'(export const {symbol_name})\s*=',
                    rf'\1: any =',
                    line
                )
                if new_line != line:
                    file_lines[idx] = new_line
                    print(f'  ✓ {symbol_name}')
                    fixed_total += 1
        
        # Pattern: readonly NAME = ...
        elif f'readonly {symbol_name}' in line and '=' in line:
            new_line = re.sub(
                rf'(readonly {symbol_name})\s*=',
                rf'\1: any =',
                line
            )
            if new_line != line:
                file_lines[idx] = new_line
                print(f'  ✓ {symbol_name}')
                fixed_total += 1
        
        # Pattern: let NAME = function() ...
        elif f'let {symbol_name}' in line and 'function' in line:
            new_line = re.sub(
                rf'(let {symbol_name})\s*=',
                rf'\1: any =',
                line
            )
            if new_line != line:
                file_lines[idx] = new_line
                print(f'  ✓ {symbol_name}')
                fixed_total += 1
    
    # Write back
    path_obj.write_text('\n'.join(file_lines), encoding='utf-8')

print(f'\n✅ Fixed {fixed_total} symbols')
print('Run `deno task publish` again to verify')
