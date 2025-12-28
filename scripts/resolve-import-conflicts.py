#!/usr/bin/env python3
"""
Smart merge helper for resolving import conflicts between upstream and JSR changes.

This script helps resolve conflicts where:
- Upstream (HEAD) has new code but old import style (no .ts extensions)
- JSR (2025-jsr) has .ts extensions and type imports

Strategy: Take upstream code + apply JSR import style

Usage:
    python scripts/resolve-import-conflicts.py <file>
    python scripts/resolve-import-conflicts.py --all  # Process all conflicts
"""

import argparse
import re
import subprocess
import sys
from pathlib import Path
from typing import List, Optional, Tuple


def run_cmd(cmd: str) -> str:
    """Run a shell command and return output."""
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return result.stdout


def get_conflict_files() -> List[str]:
    """Get list of conflicted files."""
    output = run_cmd("git status --short")
    conflicts = []
    for line in output.split("\n"):
        if line.startswith("UU"):
            filepath = line[3:].strip()
            conflicts.append(filepath)
    return conflicts


def get_versions(filepath: str) -> Tuple[Optional[str], Optional[str]]:
    """Get both versions of a file (ours=HEAD, theirs=2025-jsr)."""
    try:
        ours = run_cmd(f"git show :2:{filepath}")
        theirs = run_cmd(f"git show :3:{filepath}")
        return ours, theirs
    except Exception as e:
        print(f"Error getting versions: {e}", file=sys.stderr)
        return None, None


def extract_imports(content: str) -> List[str]:
    """Extract all import statements from content."""
    lines = content.split("\n")
    imports = []
    in_import = False
    current_import = []

    for line in lines:
        # Check if line starts an import
        if re.match(r"^\s*import\s+", line):
            in_import = True
            current_import = [line]

            # Check if import ends on same line
            if ";" in line or (
                not line.rstrip().endswith(",") and not line.rstrip().endswith("{")
            ):
                imports.append("\n".join(current_import))
                in_import = False
                current_import = []
        elif in_import:
            current_import.append(line)
            # Check if import statement ends
            if ";" in line or re.match(r"^\s*\}\s*;?\s*$", line):
                imports.append("\n".join(current_import))
                in_import = False
                current_import = []

    return imports


def convert_to_jsr_import(import_stmt: str) -> str:
    """Convert an import statement to JSR style (.ts extensions, type imports)."""

    # Add .ts extension to relative imports if not present
    def add_ts_ext(match):
        path = match.group(1)
        quote = match.group(2)
        # Only add .ts to relative imports that don't already have it
        if (
            path.startswith(".")
            and not path.endswith(".ts")
            and not path.endswith(".tsx")
        ):
            # Don't add .ts if it's already there or if it ends with /
            if not path.endswith("/"):
                return f"from '{path}.ts'{quote}"
        return match.group(0)

    result = re.sub(r"from ['\"]([^'\"]+)['\"]([;,]?)", add_ts_ext, import_stmt)

    # Convert to type import if importing only types
    # This is a heuristic - look for type-only names (capitalized)
    if " type " not in result and re.search(r"import\s+\{[^}]*\}", result):
        # Check if all imported names look like types (start with capital)
        import_match = re.search(r"import\s+\{([^}]+)\}", result)
        if import_match:
            names = [n.strip() for n in import_match.group(1).split(",")]
            # Remove 'type' keyword if already present
            names = [n.replace("type ", "").strip() for n in names]
            all_types = all(n[0].isupper() or n.startswith("type ") for n in names if n)
            if all_types and len(names) > 0:
                # Add 'type' to import
                result = result.replace("import {", "import type {")

    return result


def merge_imports(ours_imports: List[str], theirs_imports: List[str]) -> List[str]:
    """Merge imports, preferring upstream content but JSR style."""
    # Use upstream imports as base
    merged = []

    for our_import in ours_imports:
        # Convert to JSR style
        jsr_import = convert_to_jsr_import(our_import)
        merged.append(jsr_import)

    return merged


def get_non_import_content(content: str) -> str:
    """Get content after all imports."""
    lines = content.split("\n")
    import_end = 0

    for i, line in enumerate(lines):
        if re.match(r"^\s*import\s+", line) or (
            i > 0 and re.match(r"^\s*[}\)]", line) and i > import_end
        ):
            import_end = i + 1
        elif (
            line.strip()
            and not line.strip().startswith("//")
            and not line.strip().startswith("/*")
            and not line.strip().startswith("*")
        ):
            # First non-import, non-comment line
            if import_end > 0:
                break

    return "\n".join(lines[import_end:])


def smart_merge(filepath: str) -> Optional[str]:
    """Smart merge: upstream code + JSR import style."""
    ours, theirs = get_versions(filepath)

    if ours is None or theirs is None:
        return None

    # Get copyright/header (usually first comment block)
    header_lines = []
    for line in ours.split("\n"):
        if (
            line.strip().startswith("/*")
            or line.strip().startswith("*")
            or line.strip().startswith("//")
            or not line.strip()
        ):
            header_lines.append(line)
        else:
            break

    # Extract imports from both versions
    ours_imports = extract_imports(ours)
    theirs_imports = extract_imports(theirs)

    # Merge imports (upstream content, JSR style)
    merged_imports = merge_imports(ours_imports, theirs_imports)

    # Get non-import content from upstream (they have the new code)
    non_import_content = get_non_import_content(ours)

    # Combine
    result_parts = []
    if header_lines:
        result_parts.append("\n".join(header_lines))
    if merged_imports:
        result_parts.append("\n".join(merged_imports))
    if non_import_content:
        result_parts.append(non_import_content)

    return "\n".join(result_parts)


def resolve_file(filepath: str, dry_run: bool = False) -> bool:
    """Resolve conflicts in a file."""
    print(f"Processing {filepath}...")

    merged = smart_merge(filepath)

    if merged is None:
        print(f"  ❌ Could not merge {filepath}", file=sys.stderr)
        return False

    if dry_run:
        print(f"  ✓ Would write {len(merged)} bytes")
        return True

    # Write merged content
    try:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(merged)

        # Stage the file
        subprocess.run(["git", "add", filepath], check=True)
        print(f"  ✅ Resolved and staged")
        return True
    except Exception as e:
        print(f"  ❌ Error writing file: {e}", file=sys.stderr)
        return False


def main():
    parser = argparse.ArgumentParser(
        description="Smart merge helper for import conflicts"
    )
    parser.add_argument("files", nargs="*", help="Files to process")
    parser.add_argument(
        "--all", action="store_true", help="Process all conflicted files"
    )
    parser.add_argument(
        "--dry-run", action="store_true", help="Show what would be done"
    )
    parser.add_argument(
        "--simple-only",
        action="store_true",
        help="Only process files with simple import-only conflicts",
    )

    args = parser.parse_args()

    if args.all:
        files = get_conflict_files()
        if not files:
            print("No conflicted files found!")
            return 0
        print(f"Found {len(files)} conflicted files")
    elif args.files:
        files = args.files
    else:
        parser.print_help()
        return 1

    # Filter to simple conflicts if requested
    if args.simple_only:
        # TODO: Add logic to detect simple import-only conflicts
        print("--simple-only not yet implemented")
        return 1

    success_count = 0
    fail_count = 0

    for filepath in files:
        if resolve_file(filepath, args.dry_run):
            success_count += 1
        else:
            fail_count += 1

    print()
    print(f"Results: {success_count} succeeded, {fail_count} failed")

    if not args.dry_run and success_count > 0:
        print("\nFiles have been staged. Review with 'git diff --cached'")
        print("If conflicts remain in a file, manually resolve them.")

    return 0 if fail_count == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
