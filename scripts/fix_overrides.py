#!/usr/bin/env python3
"""
Script to automatically add 'override' modifiers to methods that override base class members.
This fixes TS4114 errors in the Mol* JSR migration.

Usage:
    python3 scripts/fix_overrides.py
"""

import re
import subprocess
from pathlib import Path
from collections import defaultdict


def get_errors():
    """Run deno publish and parse TS4114 errors."""
    print("🔍 Scanning for TS4114 errors...\n")

    result = subprocess.run(
        ["deno", "publish", "--dry-run", "--allow-dirty"],
        capture_output=True,
        text=True,
        cwd=Path(__file__).parent.parent,
    )

    output = result.stdout + result.stderr

    # Strip ANSI escape codes (color formatting)
    ansi_escape = re.compile(r"\x1b\[[0-9;]*m")
    output = ansi_escape.sub("", output)

    lines = output.split("\n")

    errors = []
    i = 0
    while i < len(lines) - 3:
        if (
            "TS4114 [ERROR]" in lines[i]
            and "must have an 'override' modifier" in lines[i]
        ):
            # Line i+1 has method signature
            # Line i+2 has underscores
            # Line i+3 has file location
            location_line = lines[i + 3]
            match = re.search(r"at file://(.+):(\d+):(\d+)", location_line)
            if match:
                file_path, line_num, col = match.groups()
                errors.append(
                    {
                        "file": file_path,
                        "line": int(line_num),
                    }
                )
        i += 1

    return errors


def fix_file_line(file_path, line_num):
    """Add override modifier to a specific line in a file."""
    try:
        with open(file_path, "r") as f:
            lines = f.readlines()

        idx = line_num - 1  # Convert to 0-based
        if idx < 0 or idx >= len(lines):
            return False

        line = lines[idx]

        # Skip if already has override
        if "override " in line:
            return True

        # Match: (whitespace)(modifiers)(rest of line)
        match = re.match(
            r"^(\s*)((?:private|protected|public|static|readonly|async)\s+)*(.+)$", line
        )
        if match:
            indent, modifiers, rest = match.groups()
            modifiers = modifiers or ""
            lines[idx] = f"{indent}{modifiers}override {rest}"

            with open(file_path, "w") as f:
                f.writelines(lines)
            return True

        return False
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False


def main():
    errors = get_errors()

    if not errors:
        print("✅ No TS4114 errors found!\n")
        return

    print(f"Found {len(errors)} errors\n")

    # Group by file
    by_file = defaultdict(list)
    for err in errors:
        by_file[err["file"]].append(err)

    print(f"Affected files: {len(by_file)}\n")

    fixed = 0
    failed = 0

    for file_path, file_errors in by_file.items():
        # Sort by line descending to fix from bottom up
        file_errors.sort(key=lambda e: e["line"], reverse=True)

        short_path = file_path.replace(
            "/Users/zcpowers/Documents/Projects/molstar/", ""
        )
        print(f"📝 {short_path} ({len(file_errors)} errors)")

        for err in file_errors:
            if fix_file_line(err["file"], err["line"]):
                fixed += 1
                print(f"   ✅ Line {err['line']}")
            else:
                failed += 1
                print(f"   ❌ Line {err['line']}")

    print("\n" + "━" * 60)
    print(f"\n📊 Fixed: {fixed} | Failed: {failed} | Total: {len(errors)}")
    print(f"   Success rate: {(fixed / len(errors) * 100):.1f}%\n")

    if fixed > 0:
        print("🔄 Verifying fixes...\n")

        result = subprocess.run(
            ["deno", "publish", "--dry-run", "--allow-dirty"],
            capture_output=True,
            text=True,
            cwd=Path(__file__).parent.parent,
        )

        output = result.stdout + result.stderr
        remaining = len(re.findall(r"TS4114 \[ERROR\]", output))

        total_match = re.search(r"Found (\d+) errors?\.", output)
        total = int(total_match.group(1)) if total_match else 0

        print(f"📈 TS4114 errors: {len(errors)} → {remaining}")
        print(f"📈 Total errors: {total}")

        if remaining == 0:
            print("\n🎉 All TS4114 errors fixed!\n")
        else:
            print(f"\n⚠️  {remaining} TS4114 errors remain\n")


if __name__ == "__main__":
    main()
