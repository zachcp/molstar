#!/usr/bin/env python3
"""Fix imports that point to directories - should use /index.ts."""

import re
from pathlib import Path

def fix_directory_imports(file_path: Path, content: str) -> str:
    """Fix imports that should point to index.ts in directories."""
    pattern = r'''from\s+(['"])(\.\.?/[^'"]+)\.ts\1'''

    def replace_if_directory(match):
        quote = match.group(1)
        import_path = match.group(2)

        # Resolve relative to the file's directory
        current_dir = file_path.parent
        target_path = current_dir / f"{import_path}.ts"

        # Check if removing .ts gives us a directory
        potential_dir = current_dir / import_path

        if potential_dir.is_dir() and (potential_dir / "index.ts").exists():
            # This should be a directory import
            return f'from {quote}{import_path}/index.ts{quote}'
        else:
            # Keep as-is (it's a file import)
            return match.group(0)

    return re.sub(pattern, replace_if_directory, content)

def main():
    src_dir = Path("src")
    count = 0

    for ts_file in src_dir.rglob("*.ts"):
        if ts_file.name.endswith(".d.ts"):
            continue

        original = ts_file.read_text(encoding='utf-8')
        fixed = fix_directory_imports(ts_file, original)

        if fixed != original:
            ts_file.write_text(fixed, encoding='utf-8')
            count += 1
            print(f"Fixed: {ts_file}")

    for tsx_file in src_dir.rglob("*.tsx"):
        original = tsx_file.read_text(encoding='utf-8')
        fixed = fix_directory_imports(tsx_file, original)

        if fixed != original:
            tsx_file.write_text(fixed, encoding='utf-8')
            count += 1
            print(f"Fixed: {tsx_file}")

    print(f"\nTotal files fixed: {count}")

if __name__ == "__main__":
    main()
