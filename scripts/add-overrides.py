#!/usr/bin/env python3
"""
Add override keywords to methods that need them
"""
import re
import sys

files_to_fix = [
    'src/mol-plugin-state/manager/snapshots.ts',
    'src/mol-plugin-ui/controls/parameters.tsx',
    'src/mol-plugin-ui/structure/superposition.tsx',
    'src/mol-plugin-ui/viewport.tsx',
]

# Methods that typically need override
patterns = [
    (r'^(\s+)(render\(\))', r'\1override \2'),
    (r'^(\s+)(state\s*[:=])', r'\1override \2'),
    (r'^(\s+)(componentDidMount\(\))', r'\1override \2'),
    (r'^(\s+)(componentDidUpdate\()', r'\1override \2'),
    (r'^(\s+)(protected updateState\()', r'\1override \2'),
    (r'^(\s+)(dispose\(\))', r'\1override \2'),
]

def fix_file(filepath):
    try:
        with open(filepath, 'r') as f:
            content = f.read()

        lines = content.split('\n')
        modified = False

        for i, line in enumerate(lines):
            # Skip if already has override
            if 'override' in line:
                continue

            for pattern, replacement in patterns:
                if re.match(pattern, line):
                    lines[i] = re.sub(pattern, replacement, line)
                    modified = True
                    break

        if modified:
            with open(filepath, 'w') as f:
                f.write('\n'.join(lines))
            print(f"Fixed: {filepath}")
            return True
        return False
    except Exception as e:
        print(f"Error fixing {filepath}: {e}")
        return False

def main():
    fixed_count = 0
    for filepath in files_to_fix:
        if fix_file(filepath):
            fixed_count += 1

    print(f"\nTotal files fixed: {fixed_count}")

if __name__ == '__main__':
    main()
