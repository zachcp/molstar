#!/usr/bin/env python3
"""
Compare dependencies between deno.json and upstream package.json.

Usage:
    python scripts/compare-dependencies.py
"""

import json
import subprocess
from typing import Dict, Set


def get_upstream_package_json() -> dict:
    """Get upstream package.json content."""
    result = subprocess.run(
        ["git", "show", "upstream/master:package.json"],
        capture_output=True,
        text=True,
        check=True,
    )
    return json.loads(result.stdout)


def get_deno_json() -> dict:
    """Get current deno.json content."""
    with open("deno.json", "r") as f:
        return json.load(f)


def parse_npm_version(npm_specifier: str) -> tuple[str, str]:
    """Parse npm:package@version into (package, version)."""
    if not npm_specifier.startswith("npm:"):
        return ("", "")

    rest = npm_specifier[4:]  # Remove "npm:"

    # Handle scoped packages like @types/react
    if rest.startswith("@"):
        # Find the @ that separates package from version
        parts = rest.split("@")
        if len(parts) >= 3:  # @scope/package@version
            package = f"@{parts[1]}"
            version = parts[2] if len(parts) > 2 else ""
        else:
            package = rest
            version = ""
    else:
        if "@" in rest:
            package, version = rest.split("@", 1)
        else:
            package = rest
            version = ""

    return (package, version)


def normalize_version(version: str) -> str:
    """Normalize version for comparison (remove ^ and ~)."""
    return version.lstrip("^~")


def main():
    print("# Dependency Comparison: deno.json vs upstream package.json\n")

    # Load files
    upstream_pkg = get_upstream_package_json()
    deno_cfg = get_deno_json()

    # Get dependencies
    upstream_deps = upstream_pkg.get("dependencies", {})
    upstream_peer_deps = upstream_pkg.get("peerDependencies", {})
    upstream_all = {**upstream_deps, **upstream_peer_deps}

    deno_imports = deno_cfg.get("imports", {})

    # Parse deno imports
    deno_deps: Dict[str, str] = {}
    for key, value in deno_imports.items():
        if isinstance(value, str) and value.startswith("npm:"):
            pkg, ver = parse_npm_version(value)
            if pkg:
                deno_deps[pkg] = ver

    # Get all package names
    all_packages = set(upstream_all.keys()) | set(deno_deps.keys())

    # Compare
    missing_in_deno = []
    missing_in_upstream = []
    version_mismatches = []
    matches = []

    # Calculate intersection first
    both = set(upstream_all.keys()) & set(deno_deps.keys())

    for pkg in sorted(all_packages):
        upstream_ver = upstream_all.get(pkg, "")
        deno_ver = deno_deps.get(pkg, "")

        if pkg in upstream_all and pkg not in deno_deps:
            missing_in_deno.append((pkg, upstream_ver))
        elif pkg in deno_deps and pkg not in upstream_all:
            missing_in_upstream.append((pkg, deno_ver))
        elif pkg in both:
            upstream_norm = normalize_version(upstream_ver)
            deno_norm = normalize_version(deno_ver)

            if upstream_norm != deno_norm:
                version_mismatches.append((pkg, upstream_ver, deno_ver))
            else:
                matches.append((pkg, upstream_ver, deno_ver))

    # Print results
    print("## Summary\n")
    print(f"- **Total packages in upstream:** {len(upstream_all)}")
    print(f"- **Total packages in deno.json:** {len(deno_deps)}")
    print(f"- **Matches:** {len(matches)}")
    print(f"- **Version mismatches:** {len(version_mismatches)}")
    print(f"- **Missing in deno.json:** {len(missing_in_deno)}")
    print(f"- **Extra in deno.json:** {len(missing_in_upstream)}")
    print()

    if version_mismatches:
        print("## ⚠️ Version Mismatches\n")
        print("| Package | Upstream | deno.json |")
        print("|---------|----------|-----------|")
        for pkg, up_ver, deno_ver in version_mismatches:
            print(f"| `{pkg}` | `{up_ver}` | `{deno_ver}` |")
        print()

    if missing_in_deno:
        print("## ❌ Missing in deno.json\n")
        print("| Package | Upstream Version | Type |")
        print("|---------|------------------|------|")
        for pkg, ver in missing_in_deno:
            pkg_type = "peer" if pkg in upstream_peer_deps else "regular"
            print(f"| `{pkg}` | `{ver}` | {pkg_type} |")
        print()

    if missing_in_upstream:
        print("## ➕ Extra in deno.json\n")
        print("| Package | Version |")
        print("|---------|---------|")
        for pkg, ver in missing_in_upstream:
            print(f"| `{pkg}` | `{ver}` |")
        print()

    if matches:
        print("## ✅ Matching Versions\n")
        print("<details>")
        print("<summary>Click to expand</summary>\n")
        print("| Package | Version |")
        print("|---------|---------|")
        for pkg, up_ver, _ in matches:
            print(f"| `{pkg}` | `{up_ver}` |")
        print("\n</details>")
        print()

    # Recommendations
    print("## 🔧 Recommendations\n")

    if version_mismatches:
        print("### Update Version Mismatches\n")
        print("```bash")
        print("# Update deno.json to match upstream versions:")
        for pkg, up_ver, _ in version_mismatches:
            print(f"# {pkg}: {up_ver}")
        print("```\n")

    if missing_in_deno:
        print("### Missing Dependencies\n")
        peer_missing = [p for p, _ in missing_in_deno if p in upstream_peer_deps]
        regular_missing = [p for p, _ in missing_in_deno if p not in upstream_peer_deps]

        if regular_missing:
            print("**Regular dependencies** - Should probably add:\n")
            for pkg in regular_missing:
                ver = upstream_all[pkg]
                print(f"- `{pkg}@{ver}`")
            print()

        if peer_missing:
            print(
                "**Peer dependencies** - Optional (already in deno.json if needed):\n"
            )
            for pkg in peer_missing:
                ver = upstream_all[pkg]
                print(f"- `{pkg}@{ver}` (optional)")
            print()


if __name__ == "__main__":
    main()
