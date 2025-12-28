#!/usr/bin/env python3
"""Fix imports that should use .tsx instead of .ts."""

import re
from pathlib import Path

def fix_tsx_imports(file_path: Path, content: str) -> str:
    """Fix imports where target is .tsx but we used .ts."""
    pattern = r'''from\s+(['"])(\.\.?/[^'"]+)\.ts\1'''

    def replace_if_tsx(match):
        quote = match.group(1)
        import_path = match.group(2)

        # Resolve relative to the file's directory
        current_dir = file_path.parent
        target_ts = current_dir / f"{import_path}.ts"
        target_tsx = current_dir / f"{import_path}.tsx"

        # If .ts doesn't exist but .tsx does, fix it
        if not target_ts.exists() and target_tsx.exists():
            return f'from {quote}{import_path}.tsx{quote}'
        else:
            # Keep as-is
            return match.group(0)

    return re.sub(pattern, replace_if_tsx, content)

def main():
    src_dir = Path("src")
    count = 0

    for ts_file in src_dir.rglob("*.ts"):
        if ts_file.name.endswith(".d.ts"):
            continue

        original = ts_file.read_text(encoding='utf-8')
        fixed = fix_tsx_imports(ts_file, original)

        if fixed != original:
            ts_file.write_text(fixed, encoding='utf-8')
            count += 1
            print(f"Fixed: {ts_file}")

    for tsx_file in src_dir.rglob("*.tsx"):
        original = tsx_file.read_text(encoding='utf-8')
        fixed = fix_tsx_imports(tsx_file, original)

        if fixed != original:
            tsx_file.write_text(fixed, encoding='utf-8')
            count += 1
            print(f"Fixed: {tsx_file}")

    print(f"\nTotal files fixed: {count}")

if __name__ == "__main__":
    main()
