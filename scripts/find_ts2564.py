#!/usr/bin/env python3
"""
Extract TS2564 errors with their file paths from deno check output.
"""

import subprocess
import re
import sys
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
                for j in range(i + 1, min(i + 5, len(lines))):
                    if "at file://" in lines[j]:
                        file_match = re.search(r"at file:///(.*):(\d+):", lines[j])
                        if file_match:
                            full_path = file_match.group(1)
                            line_num = file_match.group(2)
                            # Strip the base path
                            if (
                                "/Users/zcpowers/Documents/Projects/molstar/"
                                in full_path
                            ):
                                file_path = full_path.replace(
                                    "/Users/zcpowers/Documents/Projects/molstar/", ""
                                )
                            else:
                                file_path = full_path
                            file_path = f"{file_path}:{line_num}"
                            break

                if file_path:
                    errors.append(
                        {
                            "property": prop_name,
                            "file": file_path,
                            "message": line.strip(),
                        }
                    )
            i += 1

        return errors

    except Exception as e:
        print(f"Error running deno check: {e}", file=sys.stderr)
        return []


def main():
    errors = parse_ts2564_errors()

    if not errors:
        print("No TS2564 errors found!")
        return

    print(f"Found {len(errors)} TS2564 errors:\n")

    # Group by file
    by_file = defaultdict(list)
    for error in errors:
        file_base = error["file"].rsplit(":", 1)[0]
        by_file[file_base].append(error)

    # Print grouped by file
    for file_path in sorted(by_file.keys()):
        print(f"\n{file_path}")
        for error in by_file[file_path]:
            line_num = error["file"].split(":")[-1]
            print(f"  Line {line_num}: {error['property']}")

    print(f"\n\nTotal: {len(errors)} errors in {len(by_file)} files")

    # Print file list for easy access
    print("\n\nFiles with errors:")
    for file_path in sorted(by_file.keys()):
        print(f"  {file_path} ({len(by_file[file_path])} errors)")


if __name__ == "__main__":
    main()
