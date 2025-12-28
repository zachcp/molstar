#!/usr/bin/env python3
"""Add .ts extensions to all relative imports in TypeScript files."""

import re
from pathlib import Path

def fix_imports(content: str) -> str:
    """Add .ts extension to relative imports."""
    # Match: from './path' or from "../path"
    # Don't match: already has .ts/.tsx, starts with @, or is absolute
    pattern = r'''from\s+(['"])(\.\.?/[^'"]+)(?<!\.ts)(?<!\.tsx)\1'''

    def replace_import(match):
        quote = match.group(1)
        path = match.group(2)
        return f'from {quote}{path}.ts{quote}'

    return re.sub(pattern, replace_import, content)

def main():
    src_dir = Path("src")
    count = 0

    for ts_file in src_dir.rglob("*.ts"):
        if ts_file.name.endswith(".d.ts"):
            continue

        original = ts_file.read_text(encoding='utf-8')
        fixed = fix_imports(original)

        if fixed != original:
            ts_file.write_text(fixed, encoding='utf-8')
            count += 1
            print(f"Fixed: {ts_file}")

    # Also fix .tsx files
    for tsx_file in src_dir.rglob("*.tsx"):
        original = tsx_file.read_text(encoding='utf-8')
        fixed = fix_imports(original)

        if fixed != original:
            tsx_file.write_text(fixed, encoding='utf-8')
            count += 1
            print(f"Fixed: {tsx_file}")

    print(f"\nTotal files fixed: {count}")

if __name__ == "__main__":
    main()
