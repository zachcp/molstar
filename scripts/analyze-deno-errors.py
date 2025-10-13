#!/usr/bin/env python3
"""
Analyze Deno publish errors to identify patterns and prioritize fixes.

Usage:
    deno publish --dry-run 2>&1 | tee /tmp/deno_errors.txt
    python3 scripts/analyze-deno-errors.py
"""

import re
from collections import defaultdict
from pathlib import Path


def strip_ansi_codes(text):
    """Remove ANSI color codes from text."""
    ansi_escape = re.compile(r"\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])")
    return ansi_escape.sub("", text)


def parse_error_file(filepath="/tmp/deno_errors.txt"):
    """Parse the Deno error output file."""
    try:
        with open(filepath, "r") as f:
            content = f.read()
            # Strip ANSI color codes that interfere with parsing
            return strip_ansi_codes(content)
    except FileNotFoundError:
        print(f"Error: {filepath} not found.")
        print("Run: deno publish --dry-run 2>&1 | tee /tmp/deno_errors.txt")
        return None


def extract_errors(content):
    """Extract error information from the content."""
    errors = []

    # Pattern to match error blocks
    # Captures: filepath, line_number, and the code line
    # Now that ANSI codes are stripped, pattern is simpler
    # Format: error[type]: message\n  --> filepath\n   | \n123 | code
    pattern = (
        r"error\[([^\]]+)\][^\n]*\n\s+-->\s+([^\n]+)\n\s+\|\s*\n(\d+)\s+\|\s+([^\n]+)"
    )

    for match in re.finditer(pattern, content, re.DOTALL):
        error_type, filepath, line_num, code_line = match.groups()

        # Extract just the filename and relative path
        if "/molstar/" in filepath:
            rel_path = filepath.split("/molstar/")[1].split(":")[0]
        else:
            rel_path = filepath.split(":")[0]

        errors.append(
            {
                "type": error_type,
                "file": rel_path,
                "line": line_num,
                "code": code_line.strip(),
            }
        )

    return errors


def categorize_errors(errors):
    """Categorize errors by pattern type."""
    categories = defaultdict(list)

    for error in errors:
        code = error["code"]

        # Detect pattern types
        if code.startswith("get "):
            categories["getter"].append(error)
        elif "static " in code and "(" in code:
            categories["static_method"].append(error)
        elif code.startswith("export function"):
            categories["export_function"].append(error)
        elif code.strip().startswith("function "):
            categories["regular_function"].append(error)
        elif code.strip().startswith("export ") and "const" in code:
            categories["export_const"].append(error)
        elif "(" in code and ")" in code:
            categories["method"].append(error)
        else:
            categories["other"].append(error)

    return categories


def group_by_directory(errors):
    """Group errors by directory."""
    dirs = defaultdict(int)

    for error in errors:
        parts = error["file"].split("/")
        if len(parts) >= 2:
            dir_key = "/".join(parts[:2])
            dirs[dir_key] += 1

    return dirs


def find_common_patterns(errors):
    """Find the most common error patterns."""
    pattern_counts = defaultdict(int)

    for error in errors:
        code = error["code"]
        # Simplify the code to find patterns
        # Remove variable names and types to find structural patterns
        simplified = re.sub(r"\([^)]*\)", "()", code)  # Remove parameter details
        simplified = re.sub(r"<[^>]*>", "<>", simplified)  # Remove generic types
        pattern_counts[simplified] += 1

    return pattern_counts


def print_summary(errors, categories, dirs, patterns):
    """Print a comprehensive summary of the errors."""
    print("=" * 80)
    print("DENO PUBLISH ERROR ANALYSIS")
    print("=" * 80)
    print()

    print(f"📊 TOTAL ERRORS: {len(errors)}")
    print()

    # Error types
    error_types = defaultdict(int)
    for error in errors:
        error_types[error["type"]] += 1

    print("Error Types:")
    for error_type, count in sorted(error_types.items(), key=lambda x: -x[1]):
        print(f"  {error_type}: {count}")
    print()

    # Unique files
    unique_files = len(set(e["file"] for e in errors))
    print(f"📁 UNIQUE FILES WITH ERRORS: {unique_files}")
    print()

    # Directory breakdown
    print("Errors by Directory:")
    for dir_name in sorted(dirs.keys(), key=lambda x: -dirs[x]):
        print(f"  {dir_name}: {dirs[dir_name]} errors")
    print()

    # Category breakdown
    print("Errors by Pattern Category:")
    for cat_name in sorted(categories.keys(), key=lambda x: -len(categories[x])):
        count = len(categories[cat_name])
        print(f"  {cat_name}: {count} errors")
    print()

    # Most common patterns
    print("🎯 TOP 20 MOST COMMON ERROR PATTERNS:")
    sorted_patterns = sorted(patterns.items(), key=lambda x: -x[1])[:20]
    for i, (pattern, count) in enumerate(sorted_patterns, 1):
        if count > 1:
            print(f"{i:2}. [{count:3}x] {pattern[:70]}")
    print()

    # Category examples
    print("=" * 80)
    print("CATEGORY EXAMPLES (first 3 of each)")
    print("=" * 80)
    print()

    for cat_name in sorted(categories.keys(), key=lambda x: -len(categories[x])):
        items = categories[cat_name][:3]
        if items:
            print(
                f"\n{cat_name.upper().replace('_', ' ')} ({len(categories[cat_name])} total):"
            )
            for item in items:
                print(f"  {item['file']}:{item['line']}")
                print(f"    {item['code'][:80]}")
    print()


def suggest_batch_fixes(categories):
    """Suggest batch fix strategies."""
    print("=" * 80)
    print("💡 SUGGESTED BATCH FIX STRATEGIES")
    print("=" * 80)
    print()

    # Getters are usually easy to fix
    if categories["getter"]:
        print(f"1. GETTERS ({len(categories['getter'])} errors)")
        print("   Pattern: get propertyName() {{ ... }}")
        print("   Fix: Add return type annotation")
        print("   Script idea: Infer from return statement or property type")
        print()

    # Export functions
    if categories["export_function"]:
        print(f"2. EXPORT FUNCTIONS ({len(categories['export_function'])} errors)")
        print("   Pattern: export function name(...) {{ ... }}")
        print("   Fix: Add return type after parameters")
        print("   Script idea: Infer from return statements")
        print()

    # Methods
    if categories["method"]:
        print(f"3. METHODS ({len(categories['method'])} errors)")
        print("   Pattern: methodName(...) {{ ... }}")
        print("   Fix: Add return type after parameters")
        print("   Script idea: Check for void vs return statements")
        print()

    # Static methods
    if categories["static_method"]:
        print(f"4. STATIC METHODS ({len(categories['static_method'])} errors)")
        print("   Pattern: static methodName(...) {{ ... }}")
        print("   Fix: Add return type after parameters")
        print()


def main():
    """Main function."""
    content = parse_error_file()
    if not content:
        return

    errors = extract_errors(content)
    if not errors:
        print("No errors found or failed to parse errors.")
        return

    categories = categorize_errors(errors)
    dirs = group_by_directory(errors)
    patterns = find_common_patterns(errors)

    print_summary(errors, categories, dirs, patterns)
    suggest_batch_fixes(categories)

    # Save detailed report
    output_file = "/tmp/deno_error_analysis.txt"
    with open(output_file, "w") as f:
        f.write("DETAILED ERROR LIST\n")
        f.write("=" * 80 + "\n\n")
        for error in errors:
            f.write(f"{error['file']}:{error['line']}\n")
            f.write(f"  Type: {error['type']}\n")
            f.write(f"  Code: {error['code']}\n\n")

    print(f"\n📝 Detailed error list saved to: {output_file}")


if __name__ == "__main__":
    main()
