#!/usr/bin/env python3
"""
Analyze merge conflicts and generate a resolution plan.

Usage:
    python scripts/analyze-merge-conflicts.py > MERGE_PLAN.md
"""

import re
import subprocess
import sys
from pathlib import Path
from typing import Dict, List, Tuple


def run_cmd(cmd: str) -> str:
    """Run a shell command and return output."""
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return result.stdout.strip()


def get_conflict_files() -> List[Tuple[str, str]]:
    """Get list of conflicted files with their status."""
    output = run_cmd("git status --short")
    conflicts = []
    for line in output.split("\n"):
        if line.startswith("UU") or line.startswith("UD") or line.startswith("DU"):
            status = line[:2]
            filepath = line[3:].strip()
            conflicts.append((status, filepath))
    return conflicts


def get_conflict_stats(filepath: str) -> Dict[str, int]:
    """Get statistics about conflicts in a file."""
    try:
        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()

        # Count conflict markers
        ours_markers = content.count("<<<<<<< HEAD")
        theirs_markers = content.count(">>>>>>> 2025-jsr")
        separators = content.count("=======")

        # Count lines in conflict sections
        lines = content.split("\n")
        in_conflict = False
        ours_lines = 0
        theirs_lines = 0
        current_section = None

        for line in lines:
            if "<<<<<<< HEAD" in line:
                in_conflict = True
                current_section = "ours"
            elif "=======" in line and in_conflict:
                current_section = "theirs"
            elif ">>>>>>>" in line and in_conflict:
                in_conflict = False
                current_section = None
            elif in_conflict and current_section == "ours":
                ours_lines += 1
            elif in_conflict and current_section == "theirs":
                theirs_lines += 1

        return {
            "conflicts": ours_markers,
            "ours_lines": ours_lines,
            "theirs_lines": theirs_lines,
            "total_lines": len(lines),
        }
    except Exception as e:
        return {
            "conflicts": 0,
            "ours_lines": 0,
            "theirs_lines": 0,
            "total_lines": 0,
            "error": str(e),
        }


def categorize_file(filepath: str) -> str:
    """Categorize file by its path."""
    if "mvs" in filepath:
        return "MVS Extension"
    elif "mol-canvas3d" in filepath:
        return "Canvas3D"
    elif "mol-plugin" in filepath:
        return "Plugin"
    elif "mol-gl" in filepath:
        return "WebGL/Graphics"
    elif "mol-math" in filepath:
        return "Math/Linear Algebra"
    elif "mol-model" in filepath:
        return "Model/Structure"
    elif "mol-util" in filepath:
        return "Utilities"
    elif "mol-state" in filepath:
        return "State Management"
    elif filepath.endswith(".json"):
        return "Configuration"
    else:
        return "Other"


def get_file_preview(filepath: str, max_lines: int = 5) -> str:
    """Get a preview of the first conflict in a file."""
    try:
        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
            lines = f.readlines()

        in_conflict = False
        conflict_lines = []

        for line in lines:
            if "<<<<<<< HEAD" in line:
                in_conflict = True
                conflict_lines.append(line.rstrip())
            elif in_conflict:
                conflict_lines.append(line.rstrip())
                if ">>>>>>>" in line:
                    break
                if len(conflict_lines) >= max_lines + 3:  # +3 for markers
                    conflict_lines.append("... (truncated)")
                    break

        if conflict_lines:
            return "\n".join(conflict_lines)
        return "(No conflict markers found)"
    except Exception as e:
        return f"(Error reading file: {e})"


def main():
    print("# Merge Conflict Analysis")
    print()
    print("**Generated:** `git diff 2025-jsr..upstream/master`")
    print()

    conflicts = get_conflict_files()

    if not conflicts:
        print("✅ No conflicts found!")
        return

    print(f"**Total Conflicts:** {len(conflicts)}")
    print()

    # Categorize conflicts
    by_category = {}
    for status, filepath in conflicts:
        category = categorize_file(filepath)
        if category not in by_category:
            by_category[category] = []
        by_category[category].append((status, filepath))

    # Summary by category
    print("## Summary by Category")
    print()
    for category in sorted(by_category.keys()):
        files = by_category[category]
        print(f"- **{category}**: {len(files)} file(s)")
    print()

    # Special handling for deleted files
    deleted_files = [(s, f) for s, f in conflicts if s in ["UD", "DU"]]
    if deleted_files:
        print("## ⚠️ Deleted Files (Need Decision)")
        print()
        for status, filepath in deleted_files:
            if status == "UD":
                print(f"- `{filepath}` - **Deleted in yours, modified in upstream**")
                print(
                    f"  - ✅ **Recommendation:** Keep deleted (JSR doesn't need package.json)"
                )
            else:
                print(f"- `{filepath}` - **Deleted in upstream, modified in yours**")
                print(f"  - ⚠️ **Recommendation:** Manual review needed")
        print()

    # Content conflicts by category
    content_conflicts = [(s, f) for s, f in conflicts if s == "UU"]

    for category in sorted(by_category.keys()):
        category_files = [f for s, f in by_category[category] if s == "UU"]
        if not category_files:
            continue

        print(f"## {category} ({len(category_files)} files)")
        print()

        for filepath in sorted(category_files):
            stats = get_conflict_stats(filepath)

            print(f"### `{filepath}`")
            print()

            if "error" in stats:
                print(f"❌ Error: {stats['error']}")
                print()
                continue

            print(f"- **Conflicts:** {stats['conflicts']}")
            print(
                f"- **Lines (ours/theirs):** {stats['ours_lines']} / {stats['theirs_lines']}"
            )
            print(f"- **File size:** {stats['total_lines']} lines")
            print()

            # Resolution strategy
            ratio = stats["theirs_lines"] / max(stats["ours_lines"], 1)

            if ratio > 3:
                strategy = "Likely mostly JSR type additions. Review and accept most of 'theirs'."
            elif ratio < 0.3:
                strategy = "Likely mostly upstream changes. Carefully merge both."
            else:
                strategy = "Mixed changes. Careful line-by-line review needed."

            print(f"**Strategy:** {strategy}")
            print()

            # Preview
            print("<details>")
            print("<summary>First conflict preview</summary>")
            print()
            print("```")
            print(get_file_preview(filepath))
            print("```")
            print()
            print("</details>")
            print()

    print("## Resolution Steps")
    print()
    print("1. **Handle deleted files first:**")
    print("   ```bash")
    print("   git rm package-lock.json package.json  # We use deno.json instead")
    print("   ```")
    print()
    print("2. **Resolve conflicts by category:**")
    print("   - Start with smallest files")
    print("   - Use LLM assistance for complex merges")
    print("   - Test after each category")
    print()
    print("3. **For each file:**")
    print("   ```bash")
    print("   # View conflict")
    print("   git diff --ours <file>")
    print("   git diff --theirs <file>")
    print("   ")
    print("   # Edit to resolve")
    print("   # Then mark as resolved:")
    print("   git add <file>")
    print("   ```")
    print()
    print("4. **Test frequently:**")
    print("   ```bash")
    print("   deno check src/mod.ts")
    print("   deno publish --dry-run 2>&1 | tail -5")
    print("   ```")
    print()
    print("5. **Commit when all resolved:**")
    print("   ```bash")
    print("   git commit -m 'Merge JSR changes onto v5.3.0'")
    print("   ```")


if __name__ == "__main__":
    main()
