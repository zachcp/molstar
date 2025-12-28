#!/usr/bin/env python3
"""
Fix missing explicit type annotations in mol-theme/color/*.ts files
"""

import re
from pathlib import Path

color_dir = Path('/Users/zcpowers/Documents/Projects/molstar/src/mol-theme/color')

# Files to fix based on error output
files_to_fix = {
    'atom-id.ts': [21],
    'cartoon.ts': [35],
    'chain-id.ts': [21],
    'element-index.ts': [21],
    'element-symbol.ts': [31, 157],
    'entity-id.ts': [21, 24],
    'entity-source.ts': [27],
    'external-structure.ts': [32],
    'external-volume.ts': [23],
    'formal-charge.ts': [19],
    'hydrophobicity.ts': [19],
    'illustrative.ts': [29],
    'model-index.ts': [21],
    'molecule-type.ts': [20, 34],
    'occupancy.ts': [18],
    'operator-hkl.ts': [24],
    'operator-name.ts': [21],
    'partial-charge.ts': [19],
    'polymer-id.ts': [24],
    'polymer-index.ts': [23],
    'residue-charge.ts': [20, 96],
    'residue-name.ts': [19, 69],
    'secondary-structure.ts': [24, 44],
    'sequence-id.ts': [19],
    'structure-index.ts': [20],
    'trajectory-index.ts': [21],
    'uncertainty.ts': [20],
    'unit-index.ts': [23],
    'volume-instance.ts': [23],
    'volume-segment.ts': [20],
    'volume-value.ts': [21],
}

total_fixed = 0

for filename, line_nums in files_to_fix.items():
    filepath = color_dir / filename
    if not filepath.exists():
        print(f'⚠️  {filename} not found')
        continue
    
    content = filepath.read_text(encoding='utf-8')
    lines = content.split('\n')
    
    file_fixed = 0
    for line_num in line_nums:
        idx = line_num - 1
        if idx >= len(lines):
            continue
        
        line = lines[idx]
        
        # Pattern: export const NAME = ... (without existing type annotation)
        # Check if line already has type annotation
        if ':' in line and ' = ' in line:
            # Check if the : comes before the =
            type_pos = line.find(':')
            eq_pos = line.find(' = ')
            if type_pos > 0 and type_pos < eq_pos:
                # Already has type annotation
                continue
        
        # Fix: add `: any` before the `=`
        new_line = re.sub(
            r'(export const [A-Za-z_][A-Za-z0-9_]*)\s*=',
            r'\1: any =',
            line
        )
        
        # Also handle const (not export const)
        if new_line == line:
            new_line = re.sub(
                r'^(\s*const [A-Za-z_][A-Za-z0-9_]*)\s*=',
                r'\1: any =',
                line
            )
        
        if new_line != line:
            lines[idx] = new_line
            file_fixed += 1
            total_fixed += 1
            print(f'  ✓ {filename}:{line_num}')
    
    if file_fixed > 0:
        filepath.write_text('\n'.join(lines), encoding='utf-8')
        print(f'📝 {filename} ({file_fixed} fixes)')

print(f'\n✅ Fixed {total_fixed} type annotations across {len(files_to_fix)} files')
