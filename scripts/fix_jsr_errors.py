#!/usr/bin/env python3
"""
Fix remaining JSR publication errors for Mol* migration.
Handles TS2729, TS2345, TS2322, TS2565, TS2722, TS4115, TS2786, and other errors.
"""

import re
import subprocess
import sys
from pathlib import Path
from typing import List, Dict, Tuple
from collections import defaultdict


def run_deno_check() -> str:
    """Run deno publish --dry-run and capture output."""
    result = subprocess.run(
        ["deno", "publish", "--dry-run"],
        cwd=Path(__file__).parent.parent,
        capture_output=True,
        text=True,
    )
    return result.stdout + result.stderr


def parse_errors(output: str) -> List[Dict]:
    """Parse deno publish errors into structured data."""
    errors = []
    lines = output.split("\n")
    i = 0

    while i < len(lines):
        line = lines[i]

        # Match error lines like: TS2729 [ERROR]: ...
        error_match = re.match(r"^(TS\d+) \[ERROR\]: (.+)$", line)
        if error_match:
            error_code = error_match.group(1)
            error_msg = error_match.group(2)

            # Look for file location on following lines
            file_path = None
            line_num = None
            col_num = None
            context_line = None

            j = i + 1
            while j < len(lines) and j < i + 10:
                # Match: at file:///path/to/file.ts:123:45
                location_match = re.search(
                    r"at file:///.+/molstar/(.+):(\d+):(\d+)", lines[j]
                )
                if location_match:
                    file_path = location_match.group(1)
                    line_num = int(location_match.group(2))
                    col_num = int(location_match.group(3))

                    # Look for the code context line (usually 1-2 lines before location)
                    if (
                        j > 0
                        and lines[j - 1].strip()
                        and not lines[j - 1].strip().startswith("at ")
                    ):
                        context_line = lines[j - 1].strip()

                    break
                j += 1

            if file_path:
                errors.append(
                    {
                        "code": error_code,
                        "message": error_msg,
                        "file": file_path,
                        "line": line_num,
                        "column": col_num,
                        "context": context_line,
                    }
                )

        i += 1

    return errors


def fix_ts2729_errors(errors: List[Dict]) -> int:
    """Fix TS2729: Property used before initialization."""
    fixed = 0
    files_to_fix = defaultdict(list)

    for error in errors:
        if error["code"] == "TS2729":
            files_to_fix[error["file"]].append(error)

    for file_path, file_errors in files_to_fix.items():
        full_path = (
            Path("src") / file_path
            if not file_path.startswith("src/")
            else Path(file_path)
        )

        if not full_path.exists():
            continue

        content = full_path.read_text()
        lines = content.split("\n")
        modified = False

        for error in sorted(file_errors, key=lambda e: e["line"], reverse=True):
            line_idx = error["line"] - 1
            if line_idx < 0 or line_idx >= len(lines):
                continue

            line = lines[line_idx]

            # Pattern 1: readonly property = new Something(this.plugin)
            # Fix: Move to constructor or add !
            if "readonly" in line and "=" in line and "new" in line:
                # Add definite assignment assertion
                if "!" not in line:
                    # Find the property name
                    match = re.search(r"readonly\s+(\w+)\s*=", line)
                    if match:
                        prop_name = match.group(1)
                        lines[line_idx] = line.replace(
                            f"readonly {prop_name}", f"readonly {prop_name}!"
                        )
                        modified = True
                        fixed += 1

        if modified:
            full_path.write_text("\n".join(lines))
            print(f"Fixed {len(file_errors)} TS2729 errors in {file_path}")

    return fixed


def fix_ts2565_errors(errors: List[Dict]) -> int:
    """Fix TS2565: Property used before being assigned."""
    fixed = 0

    for error in errors:
        if error["code"] != "TS2565":
            continue

        file_path = (
            Path("src") / error["file"]
            if not error["file"].startswith("src/")
            else Path(error["file"])
        )

        if not file_path.exists():
            continue

        content = file_path.read_text()
        lines = content.split("\n")

        # Find the property declaration and add !
        # Look backwards from the error line to find the property declaration
        for i in range(error["line"] - 1, max(0, error["line"] - 50), -1):
            line = lines[i]
            # Look for property declaration
            if (
                "shape" in error["context"]
                and "shape" in line
                and ":" in line
                and "=" not in line
            ):
                if "!" not in line:
                    # Add definite assignment assertion
                    lines[i] = line.replace("shape:", "shape!:")
                    file_path.write_text("\n".join(lines))
                    fixed += 1
                    print(f"Fixed TS2565 in {error['file']} at line {i + 1}")
                break

    return fixed


def fix_ts2345_unknown_errors(errors: List[Dict]) -> int:
    """Fix TS2345: Argument of type 'unknown' is not assignable to parameter of type 'string'."""
    fixed = 0

    for error in errors:
        if error["code"] != "TS2345" or "unknown" not in error["message"]:
            continue

        if "string" not in error["message"]:
            continue

        file_path = (
            Path("src") / error["file"]
            if not error["file"].startswith("src/")
            else Path(error["file"])
        )

        if not file_path.exists():
            continue

        content = file_path.read_text()
        lines = content.split("\n")
        line_idx = error["line"] - 1

        if line_idx < 0 or line_idx >= len(lines):
            continue

        line = lines[line_idx]

        # Pattern: Result.error(e) or similar where e is unknown
        # Fix: Cast to string or use String(e) or e?.toString() || 'Unknown error'
        if "Result.error(e)" in line:
            lines[line_idx] = line.replace("Result.error(e)", "Result.error(String(e))")
            file_path.write_text("\n".join(lines))
            fixed += 1
            print(
                f"Fixed TS2345 (unknown->string) in {error['file']} at line {error['line']}"
            )
        elif ".next(e)" in line:
            lines[line_idx] = line.replace(".next(e)", ".next(String(e))")
            file_path.write_text("\n".join(lines))
            fixed += 1
            print(
                f"Fixed TS2345 (unknown->string) in {error['file']} at line {error['line']}"
            )
        elif "console.error(e.message)" in line:
            lines[line_idx] = line.replace(
                "console.error(e.message)", "console.error((e as Error).message)"
            )
            file_path.write_text("\n".join(lines))
            fixed += 1
            print(
                f"Fixed TS2345 (unknown->string) in {error['file']} at line {error['line']}"
            )

    return fixed


def fix_ts2345_array_errors(errors: List[Dict]) -> int:
    """Fix TS2345: Argument of type 'Uint8Array' is not assignable to parameter of type 'number[]'."""
    fixed = 0

    for error in errors:
        if error["code"] != "TS2345":
            continue

        if (
            "Uint8Array" not in error["message"]
            and "SimpleBuffer" not in error["message"]
        ):
            continue

        file_path = (
            Path("src") / error["file"]
            if not error["file"].startswith("src/")
            else Path(error["file"])
        )

        if not file_path.exists():
            continue

        content = file_path.read_text()
        lines = content.split("\n")
        line_idx = error["line"] - 1

        if line_idx < 0 or line_idx >= len(lines):
            continue

        line = lines[line_idx]

        # Pattern: String.fromCharCode.apply(null, array)
        # Fix: String.fromCharCode.apply(null, Array.from(array))
        if "String.fromCharCode.apply(null," in line:
            # Find the array argument
            match = re.search(r"String\.fromCharCode\.apply\(null,\s*([^)]+)\)", line)
            if match:
                array_expr = match.group(1)
                if "Array.from" not in array_expr:
                    new_expr = f"String.fromCharCode.apply(null, Array.from({array_expr}) as any)"
                    lines[line_idx] = line.replace(
                        f"String.fromCharCode.apply(null, {array_expr})", new_expr
                    )
                    file_path.write_text("\n".join(lines))
                    fixed += 1
                    print(
                        f"Fixed TS2345 (array) in {error['file']} at line {error['line']}"
                    )

    return fixed


def fix_ts2722_errors(errors: List[Dict]) -> int:
    """Fix TS2722: Cannot invoke an object which is possibly 'undefined'."""
    fixed = 0

    for error in errors:
        if error["code"] != "TS2722":
            continue

        file_path = (
            Path("src") / error["file"]
            if not error["file"].startswith("src/")
            else Path(error["file"])
        )

        if not file_path.exists():
            continue

        content = file_path.read_text()
        lines = content.split("\n")
        line_idx = error["line"] - 1

        if line_idx < 0 or line_idx >= len(lines):
            continue

        line = lines[line_idx]

        # Pattern: await gl.makeXRCompatible()
        # Fix: await gl.makeXRCompatible?.()
        if "makeXRCompatible()" in line and "?" not in line:
            lines[line_idx] = line.replace("makeXRCompatible()", "makeXRCompatible?.()")
            file_path.write_text("\n".join(lines))
            fixed += 1
            print(f"Fixed TS2722 in {error['file']} at line {error['line']}")

    return fixed


def fix_ts4115_errors(errors: List[Dict]) -> int:
    """Fix TS4115: Parameter property must have 'override' modifier."""
    fixed = 0

    for error in errors:
        if error["code"] != "TS4115":
            continue

        file_path = (
            Path("src") / error["file"]
            if not error["file"].startswith("src/")
            else Path(error["file"])
        )

        if not file_path.exists():
            continue

        content = file_path.read_text()
        lines = content.split("\n")
        line_idx = error["line"] - 1

        if line_idx < 0 or line_idx >= len(lines):
            continue

        line = lines[line_idx]

        # Pattern: constructor(public spec: Type)
        # Fix: constructor(override public spec: Type)
        if "constructor" in line and "public" in line and "override" not in line:
            lines[line_idx] = line.replace(
                "constructor(public", "constructor(override public"
            )
            file_path.write_text("\n".join(lines))
            fixed += 1
            print(f"Fixed TS4115 in {error['file']} at line {error['line']}")

    return fixed


def fix_ts2532_errors(errors: List[Dict]) -> int:
    """Fix TS2532: Object is possibly 'undefined'."""
    fixed = 0

    for error in errors:
        if error["code"] != "TS2532":
            continue

        file_path = (
            Path("src") / error["file"]
            if not error["file"].startswith("src/")
            else Path(error["file"])
        )

        if not file_path.exists():
            continue

        content = file_path.read_text()
        lines = content.split("\n")
        line_idx = error["line"] - 1

        if line_idx < 0 or line_idx >= len(lines):
            continue

        line = lines[line_idx]

        # Pattern: (range ? value : [min, value]).map(...)
        # The problem is value might be undefined
        # Fix: Add ! or proper type guard
        if ".map(" in line and "range" in line:
            # Add non-null assertion to value
            if "value!" not in line:
                # This is tricky - we need to add ! carefully
                # For now, wrap in a type assertion
                if "trimAlignValue" in line:
                    lines[line_idx] = line.replace(
                        "(range ? value : [min, value])",
                        "(range ? value : [min, value!])",
                    )
                    file_path.write_text("\n".join(lines))
                    fixed += 1
                    print(f"Fixed TS2532 in {error['file']} at line {error['line']}")

    return fixed


def fix_ts7023_errors(errors: List[Dict]) -> int:
    """Fix TS7023: Function implicitly has return type 'any'."""
    fixed = 0

    for error in errors:
        if error["code"] != "TS7023":
            continue

        file_path = (
            Path("src") / error["file"]
            if not error["file"].startswith("src/")
            else Path(error["file"])
        )

        if not file_path.exists():
            continue

        content = file_path.read_text()
        lines = content.split("\n")
        line_idx = error["line"] - 1

        if line_idx < 0 or line_idx >= len(lines):
            continue

        line = lines[line_idx]

        # Pattern: function classNames(_classes: { ... })
        # Fix: function classNames(_classes: { ... }): string
        if (
            "function classNames" in line
            and ")" in line
            and ":" not in line.split(")")[-1]
        ):
            lines[line_idx] = line.replace(")", "): string")
            file_path.write_text("\n".join(lines))
            fixed += 1
            print(f"Fixed TS7023 in {error['file']} at line {error['line']}")

    return fixed


def fix_ts2322_webgl_errors(errors: List[Dict]) -> int:
    """Fix TS2322: WebGL type predicate errors."""
    fixed = 0

    for error in errors:
        if error["code"] != "TS2322":
            continue

        if "type predicate" not in error["message"]:
            continue

        file_path = (
            Path("src") / error["file"]
            if not error["file"].startswith("src/")
            else Path(error["file"])
        )

        if not file_path.exists():
            continue

        content = file_path.read_text()
        lines = content.split("\n")
        line_idx = error["line"] - 1

        if line_idx < 0 or line_idx >= len(lines):
            continue

        line = lines[line_idx]

        # Pattern: isVertexArray: gl.isVertexArray.bind(gl)
        # Fix: Add wrapper function with type predicate
        if "isVertexArray:" in line and ".bind(gl)" in line:
            indent = len(line) - len(line.lstrip())
            if "gl.isVertexArray.bind(gl)" in line:
                lines[line_idx] = (
                    " " * indent
                    + "isVertexArray: (value: any): value is WebGLVertexArrayObject => gl.isVertexArray(value) as boolean,"
                )
            elif "ext.isVertexArrayOES.bind(ext)" in line:
                lines[line_idx] = (
                    " " * indent
                    + "isVertexArray: (value: any): value is WebGLVertexArrayObject => ext.isVertexArrayOES(value) as boolean,"
                )
            file_path.write_text("\n".join(lines))
            fixed += 1
            print(
                f"Fixed TS2322 (type predicate) in {error['file']} at line {error['line']}"
            )
        elif "getQuery:" in line and "gl.getQuery.bind(gl)" in line:
            # Fix getQuery return type issue
            indent = len(line) - len(line.lstrip())
            lines[line_idx] = (
                " " * indent
                + "getQuery: (target: number, pname: number) => (gl.getQuery(target, pname) ?? 0) as number | WebGLQuery,"
            )
            file_path.write_text("\n".join(lines))
            fixed += 1
            print(f"Fixed TS2322 (getQuery) in {error['file']} at line {error['line']}")

    return fixed


def main():
    print("Analyzing JSR publication errors...")

    output = run_deno_check()
    errors = parse_errors(output)

    print(f"\nFound {len(errors)} errors")

    # Group by error code
    by_code = defaultdict(list)
    for error in errors:
        by_code[error["code"]].append(error)

    print("\nError breakdown:")
    for code in sorted(by_code.keys()):
        print(f"  {code}: {len(by_code[code])} errors")

    print("\n" + "=" * 60)
    print("Starting fixes...")
    print("=" * 60 + "\n")

    total_fixed = 0

    # Fix TS2729 errors (property used before initialization)
    print("\n[1/9] Fixing TS2729 errors...")
    fixed = fix_ts2729_errors(errors)
    total_fixed += fixed
    print(f"  Fixed {fixed} errors")

    # Fix TS2565 errors (property used before being assigned)
    print("\n[2/9] Fixing TS2565 errors...")
    fixed = fix_ts2565_errors(errors)
    total_fixed += fixed
    print(f"  Fixed {fixed} errors")

    # Fix TS2345 unknown errors
    print("\n[3/9] Fixing TS2345 errors (unknown type)...")
    fixed = fix_ts2345_unknown_errors(errors)
    total_fixed += fixed
    print(f"  Fixed {fixed} errors")

    # Fix TS2345 array errors
    print("\n[4/9] Fixing TS2345 errors (array type)...")
    fixed = fix_ts2345_array_errors(errors)
    total_fixed += fixed
    print(f"  Fixed {fixed} errors")

    # Fix TS2722 errors
    print("\n[5/9] Fixing TS2722 errors...")
    fixed = fix_ts2722_errors(errors)
    total_fixed += fixed
    print(f"  Fixed {fixed} errors")

    # Fix TS4115 errors
    print("\n[6/9] Fixing TS4115 errors...")
    fixed = fix_ts4115_errors(errors)
    total_fixed += fixed
    print(f"  Fixed {fixed} errors")

    # Fix TS2532 errors
    print("\n[7/9] Fixing TS2532 errors...")
    fixed = fix_ts2532_errors(errors)
    total_fixed += fixed
    print(f"  Fixed {fixed} errors")

    # Fix TS7023 errors
    print("\n[8/9] Fixing TS7023 errors...")
    fixed = fix_ts7023_errors(errors)
    total_fixed += fixed
    print(f"  Fixed {fixed} errors")

    # Fix TS2322 WebGL errors
    print("\n[9/9] Fixing TS2322 errors (WebGL)...")
    fixed = fix_ts2322_webgl_errors(errors)
    total_fixed += fixed
    print(f"  Fixed {fixed} errors")

    print("\n" + "=" * 60)
    print(f"Total fixes applied: {total_fixed}")
    print("=" * 60)

    # Run check again to see remaining errors
    print("\nRunning final check...")
    output = run_deno_check()
    remaining_errors = parse_errors(output)

    print(f"\nRemaining errors: {len(remaining_errors)}")

    if remaining_errors:
        by_code = defaultdict(list)
        for error in remaining_errors:
            by_code[error["code"]].append(error)

        print("\nRemaining error breakdown:")
        for code in sorted(by_code.keys()):
            print(f"  {code}: {len(by_code[code])} errors")
            for error in by_code[code][:3]:  # Show first 3 of each type
                print(
                    f"    - {error['file']}:{error['line']} - {error['message'][:80]}..."
                )


if __name__ == "__main__":
    main()
