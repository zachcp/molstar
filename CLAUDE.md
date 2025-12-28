# Mol* JSR Migration - Comprehensive Guide for AI Assistants

**Last Updated:** 2025-12-28  
**Current Branch:** `2025-jsr`  
**Status:** v5.0.0 stable and publishable with 493 JSR slow-type warnings

---

## Executive Summary

This branch ports Mol* (Molstar) to Deno's JSR (JavaScript Registry). The project successfully publishes to JSR with 493 accepted slow-type warnings. An attempt to merge upstream v5.5.0 revealed that upstream has 132 TypeScript strict mode violations that block JSR publishing.

### Quick Status

| Metric | Value | Status |
|--------|-------|--------|
| **Current Branch** | `2025-jsr` | ✅ Active |
| **JSR Version** | 5.0.0 | ✅ Published |
| **Upstream Version** | v5.0.0 | ⚠️ Master is at v5.5.0 |
| **JSR Slow-Type Warnings** | 493 | 🟡 Accepted (75% complete) |
| **TypeScript Errors** | 0 | ✅ Clean |
| **Publishing Status** | Working | ✅ `deno publish --dry-run --allow-slow-types` succeeds |

---

## Table of Contents

1. [Understanding JSR Requirements](#understanding-jsr-requirements)
2. [Strategy for Handling TypeScript Errors](#strategy-for-handling-typescript-errors)
3. [Merge Process for New Releases](#merge-process-for-new-releases)
4. [Common Error Types and Fixes](#common-error-types-and-fixes)
5. [Automated Fix Scripts](#automated-fix-scripts)
6. [v5.5.0 Merge Attempt Analysis](#v550-merge-attempt-analysis)
7. [Safe vs Dangerous Patterns](#safe-vs-dangerous-patterns)
8. [Testing and Validation](#testing-and-validation)

---

## Understanding JSR Requirements

### What JSR Requires

1. **Explicit File Extensions**: All imports must include `.ts` or `.tsx`
   ```typescript
   // ❌ Node.js style
   import { foo } from './module'
   
   // ✅ JSR/Deno style
   import { foo } from './module.ts'
   ```

2. **Zero TypeScript Errors**: Must pass strict type checking
   - JSR runs `tsc --strict` on all code
   - No TS errors allowed (TS2307, TS2564, TS4114, etc.)
   - Slow-type warnings are allowed with `--allow-slow-types`

3. **No Node.js Built-ins**: Cannot use `Buffer`, `process`, etc. without polyfills

### What JSR Allows

- **Slow-Type Warnings**: Implicit types that JSR can't fully analyze
  - `missing-explicit-return-type`: Function return types not explicit
  - `missing-explicit-type`: Variable/const types not explicit
  - Use `--allow-slow-types` flag to publish with these warnings

### Current Status: 493 Slow-Type Warnings

The 2025-jsr branch has **493 slow-type warnings** that are architecturally necessary:
- 126 missing return types (generic builders, factory functions)
- 333 missing variable types (spread operators, discriminated unions)
- 34 unsupported super-class expressions (Deno JSR limitation)

**These warnings are ACCEPTED** - fixing them would require 2-4 weeks of architectural refactoring with high regression risk.

---

## Strategy for Handling TypeScript Errors

### JSR vs Node.js: Fundamental Difference

**Node.js/npm**: Loose type checking, runtime errors acceptable  
**JSR/Deno**: Strict type checking at publish time, zero errors required

When merging upstream releases, you'll encounter TypeScript errors that were acceptable in Node.js but block JSR publishing.

### Three Categories of TypeScript Errors

#### 1. Import/Module Errors (TS2307) - **EASY FIX**

**Cause**: Missing `.ts`/`.tsx` extensions or incorrect directory imports

**Fix**: Automated with scripts (see [Automated Fix Scripts](#automated-fix-scripts))

**Example:**
```typescript
// Error: Cannot find module './foo'
import { bar } from './foo'

// Fix: Add extension
import { bar } from './foo.ts'

// Or for directories:
import { bar } from './foo/index.ts'
```

#### 2. Upstream Type Errors - **BLOCK MERGE**

**Cause**: Upstream code has TypeScript strict mode violations

**Detection**: Run `deno check --all src/mod.ts` on clean upstream branch BEFORE merging

**Strategy**: **DO NOT MERGE** if upstream has >50 TypeScript errors

**Example from v5.5.0 merge attempt:**
- Upstream had 132 TypeScript errors
- 47 missing type definitions (Buffer, XRSession, etc.)
- 85+ strict mode violations (uninitialized properties, etc.)
- **Result**: Blocked merge, stayed on v5.0.0

**Actions:**
1. Document the blocker in CLAUDE.md
2. Report to upstream (optional)
3. Wait for upstream fix in next release
4. Stay on current working version

#### 3. JSR Architecture Conflicts - **ACCEPT AS WARNINGS**

**Cause**: Codebase patterns that conflict with JSR's type analysis

**Examples:**
- `typeof` pattern with parameter definitions
- Spread operators in complex types
- Discriminated unions with `PD.MappedStatic`
- Generic builders that need inference

**Strategy**: Accept as slow-type warnings, use `--allow-slow-types`

**Why:** Fixing requires architectural changes (2-4 weeks), high regression risk

---

## Merge Process for New Releases

### Step 1: Check Upstream Health (CRITICAL)

**Always check upstream BEFORE merging to avoid wasted effort**

```bash
# Fetch latest upstream
git fetch upstream --tags

# Create test branch from upstream release
git checkout -b test-upstream-vX.X.X upstream/vX.X.X

# Test for TypeScript errors
deno check --all src/mod.ts 2>&1 | grep "TS[0-9]" | wc -l

# Count errors
deno check --all src/mod.ts 2>&1 | tee upstream-errors.log
```

**Decision Matrix:**

| Upstream TS Errors | Action | Reason |
|-------------------|--------|--------|
| 0-10 errors | ✅ Proceed with merge | Minor issues, likely fixable |
| 11-50 errors | ⚠️ Investigate | Medium risk, check if fixable |
| 51+ errors | ❌ BLOCK MERGE | High risk, wait for upstream fix |

**If blocked:**
```bash
# Clean up test branch
git checkout 2025-jsr
git branch -D test-upstream-vX.X.X

# Document in CLAUDE.md (see template below)
```

### Step 2: Create Merge Branch

```bash
# Ensure you're on 2025-jsr
git checkout 2025-jsr

# Create merge branch
git checkout -b merge-vX.X.X
```

### Step 3: Merge Taking Upstream Version

```bash
# Start merge (will have conflicts)
git merge upstream/vX.X.X --no-commit --no-ff

# Take their version for all conflicts
git checkout --theirs .

# Remove Node.js files (we use deno.json)
git rm -f package.json package-lock.json 2>/dev/null || true

# Stage all changes
git add -A
```

**Why `--theirs`?**
- Keeps all upstream changes (new features, bug fixes)
- We re-add JSR compatibility with scripts (automated)
- Using `--ours` loses upstream changes (learned from v5.5.0 attempt)

### Step 4: Run Automated Fix Scripts

**Order matters** - run in sequence:

```bash
# 1. Add .ts/.tsx extensions to all imports
python3 scripts/add-ts-extensions.py

# 2. Fix directory imports (change ./foo.ts to ./foo/index.ts)
python3 scripts/fix-directory-imports.py

# 3. Fix .tsx imports (change ./bar.ts to ./bar.tsx where needed)
python3 scripts/fix-tsx-imports.py

# 4. Remove empty imports (import {} from '...')
bash scripts/remove-empty-imports.sh
```

See [Automated Fix Scripts](#automated-fix-scripts) for script implementations.

### Step 5: Test Thoroughly

```bash
# Must have ZERO module errors
deno check --all src/mod.ts 2>&1 | grep "TS2307" | wc -l
# Output: 0

# Must have ZERO TypeScript errors (any TS code)
deno check --all src/mod.ts 2>&1 | grep "TS[0-9]" | wc -l
# Output: 0

# JSR publish test (slow-type warnings OK)
deno publish --dry-run --allow-slow-types
# Should output: "Dry run complete"

# Check slow-type warning count (should be < 600)
deno publish --dry-run 2>&1 | grep "Found" | head -1
```

**If ANY TypeScript errors appear:**
1. Investigate the cause
2. If from upstream code: BLOCK merge, document reason
3. If from our scripts: Fix scripts and re-run
4. Never commit code with TypeScript errors

### Step 6: Commit and Merge

```bash
# Commit merge with details
git commit -m "Merge upstream vX.X.X with JSR compatibility

- Merged upstream vX.X.X (Y new files, Z modified)
- Applied JSR compatibility fixes:
  - Added .ts/.tsx extensions to imports
  - Fixed directory imports to /index.ts
  - Removed empty import statements
- TypeScript errors: 0
- JSR slow-type warnings: N (acceptable)

Tested with: deno publish --dry-run --allow-slow-types"

# Merge to main JSR branch
git checkout 2025-jsr
git merge merge-vX.X.X --ff-only

# Tag the release
git tag jsr-vX.X.X
git push origin 2025-jsr --tags
```

### Step 7: Update Documentation

Update version in these files:
- `deno.json` - version field
- `CLAUDE.md` - Quick Status table
- `CHANGELOG.md` - Add entry for JSR release

---

## Common Error Types and Fixes

### TS2307: Cannot Find Module

**Cause:** Missing `.ts`/`.tsx` extension or wrong path for directories

**Automated Fix:** `add-ts-extensions.py` + `fix-directory-imports.py`

**Manual Check:**
```bash
# Find all TS2307 errors
deno check --all src/mod.ts 2>&1 | grep "TS2307"

# Check specific import
ls src/path/to/module.ts
ls src/path/to/module.tsx
ls src/path/to/module/index.ts
```

### TS2564: Property Has No Initializer

**Cause:** Class properties not initialized and no `!` assertion

**Example:**
```typescript
class Foo {
  private bar: number; // ❌ Error: not initialized
}
```

**Fix Options:**
```typescript
// Option 1: Initialize
class Foo {
  private bar: number = 0;
}

// Option 2: Make optional
class Foo {
  private bar?: number;
}

// Option 3: Definite assignment (if initialized elsewhere)
class Foo {
  private bar!: number;
}
```

**When upstream has these errors:** BLOCK MERGE - not our responsibility to fix

### TS4114: Missing Override Keyword

**Cause:** Method overrides parent without `override` keyword

**Fix:**
```typescript
class Child extends Parent {
  // ❌ Missing override
  method() { }
  
  // ✅ Add override keyword
  override method() { }
}
```

**Script Detection:**
```bash
# Find all TS4114 errors
deno check --all src/mod.ts 2>&1 | grep "TS4114" -A 2
```

**Fix Strategy:**
- If upstream has these: BLOCK MERGE
- If we introduced: Add `override` keywords manually

### Missing Type Definitions (Buffer, XRSession, etc.)

**Cause:** Node.js built-ins or Web APIs not available in Deno

**Example Errors:**
```
error: Cannot find name 'Buffer'
error: Cannot find name 'XRSession'
error: Cannot find name 'XRWebGLLayer'
```

**When upstream has these:** BLOCK MERGE - requires polyfills or upstream fix

**If we must fix:**
```typescript
// Add type definitions
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

// Or use Deno types
import { Buffer } from "node:buffer";
```

### Parse Errors (Deno Stricter Than TypeScript)

**Cause:** Deno's parser rejects some valid TypeScript

**Example:** Empty imports
```typescript
import {} from './module.ts'; // ❌ Deno parse error
```

**Automated Fix:** `remove-empty-imports.sh`

### Slow-Type Warnings (Not Errors)

**Cause:** Implicit types that JSR can't fully analyze

**Types:**
- `missing-explicit-return-type`: Function return not typed
- `missing-explicit-type`: Variable not typed
- `unsupported-super-class-expr`: Class extends computed expression

**Strategy:** Accept these, use `--allow-slow-types`

**Do NOT try to fix if:**
- Uses `typeof` pattern with parameter definitions
- Has spread operators in type definitions
- Uses `PD.Group`, `PD.MappedStatic`, discriminated unions
- Generic builders that need inference

See [Safe vs Dangerous Patterns](#safe-vs-dangerous-patterns) for details.

---

## Automated Fix Scripts

These scripts automate the repetitive JSR compatibility fixes after merging upstream.

### 1. Add TypeScript Extensions (`add-ts-extensions.py`)

Adds `.ts` to all relative imports:

```python
#!/usr/bin/env python3
"""Add .ts extensions to all relative imports in TypeScript files."""

import re
from pathlib import Path

def fix_imports(content: str) -> str:
    """Add .ts extension to relative imports."""
    # Match: from './path' or from "../path"
    # Don't match: already has .ts/.tsx, starts with @, or is absolute
    pattern = r'''from\s+(['"])(\.\.?/[^'"]+)(?<!\.ts)(?<!\.tsx)\1'''
    
    def replace_import(match):
        quote = match.group(1)
        path = match.group(2)
        return f'from {quote}{path}.ts{quote}'
    
    return re.sub(pattern, replace_import, content)

def main():
    src_dir = Path("src")
    count = 0
    
    for ts_file in src_dir.rglob("*.ts"):
        if ts_file.name.endswith(".d.ts"):
            continue
            
        original = ts_file.read_text(encoding='utf-8')
        fixed = fix_imports(original)
        
        if fixed != original:
            ts_file.write_text(fixed, encoding='utf-8')
            count += 1
            print(f"Fixed: {ts_file}")
    
    # Also fix .tsx files
    for tsx_file in src_dir.rglob("*.tsx"):
        original = tsx_file.read_text(encoding='utf-8')
        fixed = fix_imports(original)
        
        if fixed != original:
            tsx_file.write_text(fixed, encoding='utf-8')
            count += 1
            print(f"Fixed: {tsx_file}")
    
    print(f"\nTotal files fixed: {count}")

if __name__ == "__main__":
    main()
```

**Usage:**
```bash
python3 scripts/add-ts-extensions.py
```

### 2. Fix Directory Imports (`fix-directory-imports.py`)

Changes `./foo.ts` to `./foo/index.ts` when foo is a directory:

```python
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
```

**Usage:**
```bash
python3 scripts/fix-directory-imports.py
```

### 3. Fix TSX Imports (`fix-tsx-imports.py`)

Changes `.ts` to `.tsx` when target file is `.tsx`:

```python
#!/usr/bin/env python3
"""Fix imports that should use .tsx instead of .ts."""

import re
from pathlib import Path

def fix_tsx_imports(file_path: Path, content: str) -> str:
    """Fix imports where target is .tsx but we used .ts."""
    pattern = r'''from\s+(['"])(\.\.?/[^'"]+)\.ts\1'''
    
    def replace_if_tsx(match):
        quote = match.group(1)
        import_path = match.group(2)
        
        # Resolve relative to the file's directory
        current_dir = file_path.parent
        target_ts = current_dir / f"{import_path}.ts"
        target_tsx = current_dir / f"{import_path}.tsx"
        
        # If .ts doesn't exist but .tsx does, fix it
        if not target_ts.exists() and target_tsx.exists():
            return f'from {quote}{import_path}.tsx{quote}'
        else:
            # Keep as-is
            return match.group(0)
    
    return re.sub(pattern, replace_if_tsx, content)

def main():
    src_dir = Path("src")
    count = 0
    
    for ts_file in src_dir.rglob("*.ts"):
        if ts_file.name.endswith(".d.ts"):
            continue
            
        original = ts_file.read_text(encoding='utf-8')
        fixed = fix_tsx_imports(ts_file, original)
        
        if fixed != original:
            ts_file.write_text(fixed, encoding='utf-8')
            count += 1
            print(f"Fixed: {ts_file}")
    
    for tsx_file in src_dir.rglob("*.tsx"):
        original = tsx_file.read_text(encoding='utf-8')
        fixed = fix_tsx_imports(tsx_file, original)
        
        if fixed != original:
            tsx_file.write_text(fixed, encoding='utf-8')
            count += 1
            print(f"Fixed: {tsx_file}")
    
    print(f"\nTotal files fixed: {count}")

if __name__ == "__main__":
    main()
```

**Usage:**
```bash
python3 scripts/fix-tsx-imports.py
```

### 4. Remove Empty Imports (`remove-empty-imports.sh`)

Removes `import {} from '...'` statements that Deno's parser rejects:

```bash
#!/bin/bash
# Remove empty import statements that Deno doesn't accept

echo "Removing empty import statements..."

find src -name "*.ts" -o -name "*.tsx" | while read file; do
  # Use Perl for multiline regex
  perl -i -0pe 's/import \{\s*\}\s*from\s*["\x27][^"\x27]+["\x27];?\s*\n//g' "$file"
done

echo "Done removing empty imports"
```

**Usage:**
```bash
bash scripts/remove-empty-imports.sh
```

### Creating the Scripts Directory

```bash
# Create scripts directory
mkdir -p scripts

# Save each script (shown above) to scripts/
# - scripts/add-ts-extensions.py
# - scripts/fix-directory-imports.py
# - scripts/fix-tsx-imports.py
# - scripts/remove-empty-imports.sh

# Make executable
chmod +x scripts/*.py scripts/*.sh
```

---

## v5.5.0 Merge Attempt Analysis

### Attempt Date: 2025-12-28

### Outcome: ⚠️ BLOCKED

**Reason:** Upstream Molstar v5.5.0 has **132 TypeScript strict mode errors** that prevent JSR publishing.

### What Was Attempted

1. ✅ Fetched upstream v5.5.0
2. ✅ Merged with `--theirs` strategy
3. ✅ Applied all JSR compatibility fixes:
   - Added `.ts` extensions (automated)
   - Fixed 98 directory imports
   - Fixed 24 `.tsx` imports
   - Removed 63 empty imports
4. ✅ Achieved zero module resolution errors (TS2307)
5. ❌ **BLOCKED:** Discovered 132 TypeScript errors from upstream

### Error Breakdown

**47 Missing Type Definitions:**
- `Buffer` (Node.js built-in)
- `XRSession`, `XRWebGLLayer` (WebXR APIs)
- Requires polyfills or type declarations

**85+ Strict Mode Violations:**
- TS2564: Properties without initializers
- TS4114: Missing `override` keywords
- TS2345: Type mismatches
- TS2729: Property doesn't exist on type

### Key Findings

1. **The JSR branch (v5.0.0) CAN publish** ✅
   - 0 TypeScript errors
   - 493 slow-type warnings (acceptable)
   - `deno publish --dry-run --allow-slow-types` succeeds

2. **Upstream v5.5.0 CANNOT publish** ❌
   - 132 TypeScript errors
   - JSR requires zero errors
   - `--allow-slow-types` only affects warnings, not errors

3. **The errors are from upstream, not our merge process** ✅
   - Tested by checking clean upstream branch
   - Same errors appear on `upstream/master`
   - Our JSR compatibility fixes are correct

### Lessons Learned

#### ❌ Don't Use `git checkout --ours`

**First attempt used:**
```bash
git merge upstream/master --no-commit
git checkout --ours .  # ❌ WRONG
```

**Problem:** Lost all upstream changes (new properties, methods, features)

**Result:** 18 TypeScript errors from missing upstream additions

#### ✅ Do Use `git checkout --theirs`

**Correct approach:**
```bash
git merge upstream/vX.X.X --no-commit
git checkout --theirs .  # ✅ CORRECT
```

**Benefits:**
- Keeps all upstream changes
- We re-add JSR compatibility with scripts
- Easier to test and verify

#### ⚠️ Always Check Upstream Health FIRST

**What we should have done:**
```bash
# BEFORE merging, check upstream
git checkout -b test-upstream-v5.5.0 upstream/v5.5.0
deno check --all src/mod.ts 2>&1 | grep "TS[0-9]" | wc -l
# Output: 132 ← BLOCK MERGE immediately
```

**This saves hours of work** - no point in fixing imports if upstream has unfixable errors.

### Recommendation

**Stay on v5.0.0 until upstream fixes TypeScript errors.**

Options:
1. **Wait for v5.5.1+**: Monitor upstream releases for fixes
2. **Report to upstream**: File issue about strict mode violations (optional)
3. **Stay on v5.0.0**: Current working version, stable and publishable
4. **Fix ourselves**: Not recommended (132 errors, not our responsibility)

### Current State After Attempt

- **Active branch:** `2025-jsr` (v5.0.0, clean, working)
- **Test branch:** `merge-v5.5.0` (all import fixes applied, blocked by upstream errors)
- **Action:** Stayed on v5.0.0, documented findings
- **Time invested:** 2 hours (merge attempt + tooling development)
- **Outcome:** Successful learning experience, created reusable scripts

### Documentation Updates

Updated these sections based on v5.5.0 attempt:
- Added "Check Upstream Health" as critical first step
- Documented `--theirs` vs `--ours` strategy
- Created automated fix scripts
- Added decision matrix for upstream error counts
- Clarified what blocks a merge vs what's acceptable

---

## Safe vs Dangerous Patterns

This section documents patterns for fixing JSR slow-type warnings. Based on 75% completion of fixable errors (642/857).

### ✅ SAFE to Fix: Simple Parameter Definitions

**Criteria:**
- No spread operators (`...`)
- No `PD.Group()`, `PD.MappedStatic()`, `PD.Optional()`, `PD.Interval()`
- No `typeof` type alias used elsewhere
- Only simple PD functions: `PD.Boolean()`, `PD.Numeric()`, `PD.Select()`

**Example:**
```typescript
// ✅ SAFE - simple params
export const SimpleParams: PD.Params = {
  enabled: PD.Boolean(false),
  alpha: PD.Numeric(1, { min: 0, max: 1 }),
  mode: PD.Select('auto', [['auto', 'Auto'], ['manual', 'Manual']]),
};
export type SimpleParams = typeof SimpleParams;
```

**Test immediately after fixing:**
```bash
deno check --all src/mod.ts 2>&1 | grep "TS[0-9]" | wc -l
# Output: 0 (no increase)
```

**If ANY TypeScript errors appear, revert immediately:**
```bash
git checkout src/path/to/file.ts
```

### ❌ DANGEROUS - Do Not Fix

#### Spread Operators

```typescript
// ❌ DANGEROUS - adding type breaks spread
export const ExtendedParams: PD.Params = {  // Don't add this type!
  ...BaseParams,  // Breaks when BaseParams is generic
  newProp: PD.Boolean(true)
};
```

**Why it breaks:** TypeScript can't spread generic `PD.Params` type

**Files with spread operators (AVOID):**
- `mol-repr/volume/*.ts` - all use `...BaseGeometry.Params`
- `mol-repr/structure/visual/util/common.ts` - spreads into multiple files
- `mol-canvas3d/canvas3d.ts` - complex spreads
- Any geometry file - typically use base param spreading

#### Complex PD Functions

```typescript
// ❌ DANGEROUS - discriminated unions need inference
export const ComplexParams: PD.Params = {  // Don't add this type!
  variant: PD.MappedStatic('off', {
    on: PD.Group(SubParams),
    off: PD.Group({})
  })
};
```

**Why it breaks:** Discriminated unions lose type information, code checking `props.variant.name === 'on'` breaks

**Dangerous PD functions:**
- `PD.Group()` - nested parameter groups
- `PD.MappedStatic()` - discriminated unions
- `PD.Optional()` - optional parameter groups
- `PD.Interval()` - accessed as arrays (`props.interval[0]`)

#### Typeof Patterns

```typescript
// ❌ DANGEROUS - typeof needs specific structure
export const Params = { ...spread };
export type Params = typeof Params;  // Don't add type to const!
```

**Why it breaks:** Adding type to const makes `typeof Params` just "PD.Params", losing specifics

#### Schema Objects (Not PD.Params)

```typescript
// ❌ NOT PD.Params - don't add type
export const renderableSchema = {
  uColor: ValueCell.create(...),
  uSize: ValueCell.create(...),
};
```

**Why:** These are WebGL shader schemas, not parameter definitions

**Files to avoid:**
- `mol-gl/renderable/schema.ts`
- `mol-data/db/column.ts` (Column.Schema)
- Any file with `ValueCell.create()`

### Statistics: Why Most Errors Are Unfixable

**Of 493 remaining errors:**
- ~100 are NOT PD.Params (schemas, DSLs, class properties)
- ~180 use dangerous PD functions
- ~40 use spread operators
- ~140 are return-type errors (generic builders need inference)
- ~34 are unfixable Deno JSR limitations (super-class expressions)
- **~3 might be safely fixable** (extremely simple, standalone params)

**Realistic completion:** 75% of actually-fixable errors done (642/857)

**Remaining errors require:** 2-4 weeks of architectural refactoring with high regression risk

**Recommendation:** Accept current state, use `--allow-slow-types`

---

## Testing and Validation

### After Every Code Change

```bash
# 1. Check for module errors (must be 0)
deno check --all src/mod.ts 2>&1 | grep "TS2307" | wc -l

# 2. Check for ANY TypeScript errors (must be 0)
deno check --all src/mod.ts 2>&1 | grep "TS[0-9]" | wc -l

# 3. Test JSR publish
deno publish --dry-run --allow-slow-types
```

### After Merge

```bash
# Full validation suite
echo "=== Module Resolution ==="
deno check --all src/mod.ts 2>&1 | grep "TS2307" | wc -l
# Expected: 0

echo "=== TypeScript Errors ==="
deno check --all src/mod.ts 2>&1 | grep "TS[0-9]" | wc -l
# Expected: 0

echo "=== Slow-Type Warnings ==="
deno publish --dry-run 2>&1 | grep "Found" | head -1
# Expected: "Found X errors" where X < 600

echo "=== JSR Publish Test ==="
deno publish --dry-run --allow-slow-types
# Expected: "Dry run complete"
```

### CI/CD Integration

Add to GitHub Actions:

```yaml
name: JSR Validation

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: denoland/setup-deno@v1
      
      - name: Type Check
        run: |
          ERROR_COUNT=$(deno check --all src/mod.ts 2>&1 | grep "TS[0-9]" | wc -l)
          if [ $ERROR_COUNT -ne 0 ]; then
            echo "❌ TypeScript errors found: $ERROR_COUNT"
            exit 1
          fi
          echo "✅ Zero TypeScript errors"
      
      - name: JSR Publish Test
        run: deno publish --dry-run --allow-slow-types
      
      - name: Check Slow-Type Warning Count
        run: |
          WARNING_COUNT=$(deno publish --dry-run 2>&1 | grep "Found" | grep -o "[0-9]\+" | head -1)
          if [ $WARNING_COUNT -gt 600 ]; then
            echo "⚠️ Warning count increased to $WARNING_COUNT"
            exit 1
          fi
          echo "✅ Warning count: $WARNING_COUNT (acceptable)"
```

---

## Quick Reference Commands

```bash
# Check upstream health before merging
git checkout -b test-upstream-vX.X.X upstream/vX.X.X
deno check --all src/mod.ts 2>&1 | grep "TS[0-9]" | wc -l

# Run all JSR compatibility fixes
python3 scripts/add-ts-extensions.py
python3 scripts/fix-directory-imports.py
python3 scripts/fix-tsx-imports.py
bash scripts/remove-empty-imports.sh

# Validate (all must pass)
deno check --all src/mod.ts 2>&1 | grep "TS2307" | wc -l  # Must be 0
deno check --all src/mod.ts 2>&1 | grep "TS[0-9]" | wc -l  # Must be 0
deno publish --dry-run --allow-slow-types  # Must succeed

# Check slow-type warning count
deno publish --dry-run 2>&1 | grep "Found" | head -1

# Publish to JSR (when ready)
deno publish --allow-slow-types
```

---

## Additional Resources

- **NEXT_SESSION_QUICKSTART.md**: Detailed guide for fixing slow-type warnings
- **SESSION_SUMMARY.md**: Historical session notes
- **COMMANDS.md**: Command reference for common tasks
- **Upstream Molstar**: https://github.com/molstar/molstar
- **JSR Documentation**: https://jsr.io/docs
- **Deno Documentation**: https://deno.land/manual

---

## For Future Merges: Template for Blocked Merges

When a merge is blocked by upstream errors, document it here:

```markdown
## Update: vX.X.X Merge Attempt (YYYY-MM-DD)

### Status: ⚠️ BLOCKED - [Reason]

**Upstream version:** vX.X.X  
**TypeScript errors:** N errors  
**Error types:** [List main error types]

### What Was Tested

1. Checked upstream health: `git checkout upstream/vX.X.X && deno check --all src/mod.ts`
2. Result: N TypeScript errors found
3. Decision: BLOCKED merge until upstream fixes errors

### Error Breakdown

- X errors: [Type 1 description]
- Y errors: [Type 2 description]

### Recommendation

[Wait for upstream fix | Report to upstream | Other]

**Next check:** When upstream releases vX.X.Y

### Branch State

- **Active branch:** `2025-jsr` (vPREV, stable)
- **Test branch:** Created and deleted after testing
- **Action:** Documented and stayed on current version
```

---

**End of Guide**
