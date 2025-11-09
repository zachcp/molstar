#!/usr/bin/env python3
"""
Fix TS2564 errors by adding definite assignment assertions to properties.

This script adds the '!' operator to class properties that are initialized
outside the constructor, which causes TS2564 errors in strict TypeScript.
"""

import subprocess
import re
import sys
from pathlib import Path
from collections import defaultdict


def strip_ansi(text):
    """Remove ANSI escape codes from text."""
    ansi_escape = re.compile(r"\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])")
    return ansi_escape.sub("", text)


def parse_ts2564_errors():
    """Parse TS2564 errors from deno check output."""
    try:
        result = subprocess.run(
            ["deno", "check", "--all"],
            capture_output=True,
            text=True,
            cwd="/Users/zcpowers/Documents/Projects/molstar",
        )

        output = strip_ansi(result.stderr)
        lines = output.split("\n")

        errors = []
        i = 0
        while i < len(lines):
            line = lines[i]
            if "TS2564" in line and "Property" in line:
                # Extract property name
                match = re.search(r"Property '([^']+)'", line)
                prop_name = match.group(1) if match else "unknown"

                # Look for file path in next few lines
                file_path = None
                line_num = None
                for j in range(i + 1, min(i + 5, len(lines))):
                    if "at file://" in lines[j]:
                        file_match = re.search(r"at file:///(.*):(\d+):", lines[j])
                        if file_match:
                            full_path = file_match.group(1)
                            line_num = int(file_match.group(2))
                            # Extract just the relative path from src/
                            if "src/" in full_path:
                                idx = full_path.find("src/")
                                file_path = full_path[idx:]
                            elif "scripts/" in full_path:
                                idx = full_path.find("scripts/")
                                file_path = full_path[idx:]
                            else:
                                # Last resort - take everything after molstar/
                                if "molstar/" in full_path:
                                    idx = full_path.find("molstar/") + len("molstar/")
                                    file_path = full_path[idx:]
                                else:
                                    file_path = full_path
                            break

                if file_path and line_num:
                    errors.append(
                        {
                            "property": prop_name,
                            "file": file_path,
                            "line": line_num,
                            "message": line.strip(),
                        }
                    )
            i += 1

        return errors

    except Exception as e:
        print(f"Error running deno check: {e}", file=sys.stderr)
        return []


def fix_property_initialization(file_path, line_num, property_name):
    """
    Add definite assignment assertion to a property declaration.

    Returns True if fix was applied, False otherwise.
    """
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            lines = f.readlines()

        if line_num > len(lines) or line_num < 1:
            return False

        # Get the line (convert to 0-based index)
        idx = line_num - 1
        line = lines[idx]

        # Check if this is a property declaration
        # Patterns to match:
        # - private property: Type;
        # - public property: Type;
        # - readonly property: Type;
        # - property: Type;

        # Skip if already has definite assignment assertion
        if "!" in line and property_name in line:
            return False

        # Skip if property is initialized with a value
        if "=" in line and property_name in line:
            return False

        # Find the property declaration and add '!' before ':'
        # Match patterns like: "property: Type;" or "private property: Type;"
        pattern = rf"(\s*)([a-z]+\s+)?({re.escape(property_name)})(\s*)(:)"

        match = re.search(pattern, line)
        if match:
            # Insert '!' before the colon
            new_line = re.sub(pattern, rf"\1\2\3!:", line)

            lines[idx] = new_line

            # Write back to file
            with open(file_path, "w", encoding="utf-8") as f:
                f.writelines(lines)

            return True

        return False

    except Exception as e:
        print(f"Error fixing {file_path}:{line_num}: {e}", file=sys.stderr)
        return False


def main():
    base_path = Path("/Users/zcpowers/Documents/Projects/molstar")

    print("Parsing TS2564 errors...")
    errors = parse_ts2564_errors()

    if not errors:
        print("No TS2564 errors found!")
        return

    print(f"Found {len(errors)} TS2564 errors\n")

    # Group by file
    by_file = defaultdict(list)
    for error in errors:
        by_file[error["file"]].append(error)

    fixed_count = 0
    failed_count = 0
    failed_fixes = []

    # Process each file
    for file_path in sorted(by_file.keys()):
        full_path = base_path / file_path

        if not full_path.exists():
            print(f"⚠️  File not found: {file_path}")
            failed_count += len(by_file[file_path])
            continue

        print(f"\n📝 Processing {file_path}")

        # Sort errors by line number (descending) to avoid line number shifts
        file_errors = sorted(by_file[file_path], key=lambda x: x["line"], reverse=True)

        file_fixed = 0
        file_failed = 0

        for error in file_errors:
            success = fix_property_initialization(
                full_path, error["line"], error["property"]
            )

            if success:
                file_fixed += 1
                fixed_count += 1
                print(f"  ✓ Line {error['line']}: {error['property']}")
            else:
                file_failed += 1
                failed_count += 1
                failed_fixes.append(error)
                print(f"  ✗ Line {error['line']}: {error['property']}")

        print(f"  Fixed {file_fixed}/{len(file_errors)} in this file")

    # Summary
    print("\n" + "=" * 80)
    print("SUMMARY")
    print("=" * 80)
    print(f"Total errors found: {len(errors)}")
    print(f"Successfully fixed: {fixed_count}")
    print(f"Failed to fix: {failed_count}")
    print(f"Success rate: {(fixed_count / len(errors) * 100):.1f}%")

    if failed_fixes:
        print("\n" + "=" * 80)
        print("FAILED FIXES")
        print("=" * 80)
        for error in failed_fixes[:20]:  # Show first 20
            print(f"  {error['file']}:{error['line']} - {error['property']}")
        if len(failed_fixes) > 20:
            print(f"  ... and {len(failed_fixes) - 20} more")

    print("\n" + "=" * 80)
    print("Re-running deno check to verify...")
    print("=" * 80)

    # Re-run check
    result = subprocess.run(
        ["deno", "check", "--all"],
        capture_output=True,
        text=True,
        cwd="/Users/zcpowers/Documents/Projects/molstar",
    )

    output = strip_ansi(result.stderr)
    remaining_ts2564 = output.count("TS2564")

    print(f"\nRemaining TS2564 errors: {remaining_ts2564}")

    if remaining_ts2564 < len(errors):
        print(f"✅ Reduced errors by {len(errors) - remaining_ts2564}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
