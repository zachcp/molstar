#!/usr/bin/env python3
"""
Quick analysis of Deno publish errors for systematic fixing.
"""

import json
import re
import subprocess
from collections import defaultdict
from pathlib import Path


def get_errors():
    """Get all missing-explicit-return-type errors."""
    result = subprocess.run(
        ["deno", "publish", "--dry-run"],
        capture_output=True,
        text=True,
        cwd="/Users/zcpowers/Documents/Projects/molstar",
    )

    errors = []
    lines = result.stderr.split("\n")

    i = 0
    while i < len(lines):
        if "error[missing-explicit-return-type]" in lines[i]:
            # Next line should have the file location
            i += 1
            while i < len(lines) and "-->" in lines[i]:
                location_match = re.match(r"\s*-->\s+(.+):(\d+):(\d+)", lines[i])
                if location_match:
                    filepath = location_match.group(1).replace(
                        "/Users/zcpowers/Documents/Projects/molstar/", ""
                    )
                    line_num = int(location_match.group(2))
                    col_num = int(location_match.group(3))

                    # Look for the code line
                    code_line = ""
                    symbol = ""
                    j = i + 1
                    while j < len(lines) and j < i + 10:
                        if "|" in lines[j]:
                            # Check if this is the line with our code
                            code_match = re.match(r"\s*(\d+)\s*\|\s*(.+)", lines[j])
                            if code_match and int(code_match.group(1)) == line_num:
                                code_line = code_match.group(2).strip()
                                break
                        j += 1

                    # Extract symbol from code
                    if "export function" in code_line:
                        m = re.search(r"export function\s+(\w+)", code_line)
                        if m:
                            symbol = m.group(1)
                    elif "export const" in code_line:
                        m = re.search(r"export const\s+(\w+)", code_line)
                        if m:
                            symbol = m.group(1)
                    elif "const" in code_line:
                        m = re.search(r"const\s+(\w+)", code_line)
                        if m:
                            symbol = m.group(1)

                    errors.append(
                        {
                            "file": filepath,
                            "line": line_num,
                            "col": col_num,
                            "code": code_line,
                            "symbol": symbol,
                        }
                    )
                    break  # Only take first location per error
        i += 1

    return errors


def categorize(error):
    """Categorize an error as easy, medium, or hard."""
    code = error["code"]
    symbol = error["symbol"]
    filepath = error["file"]

    # Read actual file for more context if needed
    try:
        full_path = f"/Users/zcpowers/Documents/Projects/molstar/{filepath}"
        with open(full_path, "r") as f:
            lines = f.readlines()
            if error["line"] <= len(lines):
                # Get 5 lines of context
                start = max(0, error["line"] - 2)
                end = min(len(lines), error["line"] + 3)
                context = "".join(lines[start:end])
    except:
        context = ""

    # HARD: Params-related (these cause TypeScript errors)
    if symbol and "Params" in symbol:
        return "hard", "Params definition (causes TS errors)"

    # HARD: Functions returning PD.* types
    if "PD." in context and ("return" in context or "=>" in code):
        if any(
            pd in context
            for pd in ["PD.Group", "PD.Optional", "PD.Select", "PD.Numeric"]
        ):
            return "hard", "Returns PD.* type (causes TS errors)"

    # EASY: Factory/constructor functions
    if "export function" in code:
        if symbol:
            # Color-related
            if symbol in ["Color", "ColorMap", "ColorTable", "ColorSwatch"]:
                return "easy", f"{symbol} factory (returns {symbol})"
            # Material
            if symbol == "Material":
                return "easy", "Material factory (returns Material)"
            # Format functions
            if "format" in symbol.lower() or "toString" in symbol:
                return "easy", "Format function (returns string)"
            # Predicates
            if symbol.startswith("is") or symbol.startswith("has"):
                return "easy", "Predicate (returns boolean)"
            # Getters/setters
            if symbol.startswith("get"):
                return "easy", "Getter function"
            if symbol.startswith("set"):
                return "easy", "Setter (returns void)"

    # EASY: Simple factory patterns
    if "export function" in code and symbol:
        if any(p in symbol for p in ["create", "from", "make"]):
            # Try to infer return type from name
            type_hint = (
                symbol.replace("create", "").replace("from", "").replace("make", "")
            )
            return "easy", f"Factory function (likely returns {type_hint})"

    # MEDIUM: Arrow functions
    if "=>" in code or "=>" in context:
        if "export const" in code:
            return "medium", "Export const arrow function"
        return "medium", "Arrow function"

    # MEDIUM: Regular functions
    if "export function" in code:
        return "medium", "Regular export function"

    # MEDIUM: Export const
    if "export const" in code:
        return "medium", "Export const definition"

    return "medium", "Unknown pattern"


def main():
    print("Analyzing Deno errors...\n")

    errors = get_errors()
    total = len(errors)

    if total == 0:
        print("No errors found!")
        return

    # Categorize
    easy = []
    medium = []
    hard = []

    for error in errors:
        difficulty, reason = categorize(error)
        error["reason"] = reason
        if difficulty == "easy":
            easy.append(error)
        elif difficulty == "hard":
            hard.append(error)
        else:
            medium.append(error)

    # Summary
    print(f"Total errors: {total}")
    print(f"  EASY:   {len(easy):3d} ({100 * len(easy) / total:.1f}%)")
    print(f"  MEDIUM: {len(medium):3d} ({100 * len(medium) / total:.1f}%)")
    print(f"  HARD:   {len(hard):3d} ({100 * len(hard) / total:.1f}%)")

    # Group by reason
    print("\n" + "=" * 80)
    print("EASY FIXES (Can be automated)")
    print("=" * 80)

    easy_groups = defaultdict(list)
    for e in easy:
        easy_groups[e["reason"]].append(e)

    for reason, items in sorted(easy_groups.items(), key=lambda x: -len(x[1])):
        print(f"\n{reason} ({len(items)} errors):")
        for item in items[:3]:
            print(f"  {item['file']}:{item['line']}")
            if item["symbol"]:
                print(f"    Symbol: {item['symbol']}")
        if len(items) > 3:
            print(f"  ... and {len(items) - 3} more")

    # Show hard ones to avoid
    print("\n" + "=" * 80)
    print("HARD FIXES (SKIP THESE - cause TypeScript errors)")
    print("=" * 80)

    hard_groups = defaultdict(list)
    for h in hard:
        hard_groups[h["reason"]].append(h)

    for reason, items in sorted(hard_groups.items(), key=lambda x: -len(x[1])):
        print(f"\n{reason} ({len(items)} errors):")
        for item in items[:2]:
            print(f"  {item['file']}:{item['line']}")
            if item["symbol"]:
                print(f"    Symbol: {item['symbol']}")
        if len(items) > 2:
            print(f"  ... and {len(items) - 2} more")

    # Generate fix commands for easy ones
    print("\n" + "=" * 80)
    print("SUGGESTED FIX COMMANDS")
    print("=" * 80)

    # Group easy fixes by type
    color_funcs = [e for e in easy if "Color" in e.get("symbol", "")]
    if color_funcs:
        print(f"\n# Color factory functions ({len(color_funcs)} errors)")
        for e in color_funcs[:2]:
            if e["symbol"]:
                print(f"# {e['file']}:{e['line']} - add ': {e['symbol']}' return type")

    predicates = [
        e
        for e in easy
        if "Predicate" in e["reason"] or "has-check" in e["reason"].lower()
    ]
    if predicates:
        print(f"\n# Predicate functions ({len(predicates)} errors) - add ': boolean'")
        for e in predicates[:2]:
            if e["symbol"]:
                print(f"# {e['file']}:{e['line']} - function {e['symbol']}")

    setters = [e for e in easy if "Setter" in e["reason"]]
    if setters:
        print(f"\n# Setter functions ({len(setters)} errors) - add ': void'")
        for e in setters[:2]:
            if e["symbol"]:
                print(f"# {e['file']}:{e['line']} - function {e['symbol']}")

    # Save for processing
    data = {"easy": easy, "medium": medium, "hard": hard, "total": total}

    with open("/tmp/error_analysis.json", "w") as f:
        json.dump(data, f, indent=2)

    print(f"\nSaved detailed analysis to /tmp/error_analysis.json")
    print("\nREMEMBER: After each fix, check for TypeScript errors:")
    print("  deno publish --dry-run 2>&1 | grep 'TS[0-9]' | wc -l")
    print("  If > 0, REVERT the change!")


if __name__ == "__main__":
    main()
