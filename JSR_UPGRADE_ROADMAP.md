# JSR Upgrade Roadmap

**Package:** `@zachcp/molstar`  
**Purpose:** Guide for upgrading to new upstream Molstar releases

---

## Overview

This document provides a step-by-step guide for merging new upstream Molstar releases into the JSR-compatible fork and publishing updated versions to the Deno JSR registry.

---

## Prerequisites

- Git repository with `jsr-v5.3.0` branch tracking JSR-compatible changes
- Upstream remote configured: `git remote add upstream https://github.com/molstar/molstar.git`
- Deno installed: `deno --version`
- JSR publish permissions for `@zachcp/molstar`

---

## Step 1: Sync with Upstream

### Fetch Latest Changes

```bash
# Fetch upstream tags and commits
git fetch upstream
git fetch upstream --tags

# List available upstream tags
git tag -l "v*" | tail -10

# Check what's new in target version
git log --oneline v5.3.0..vX.X.X  # Replace X.X.X with target version
```

### Create Merge Branch

```bash
# Ensure you're on the JSR branch
git checkout jsr-v5.3.0

# Create a branch for the merge
git checkout -b merge-vX.X.X  # Replace X.X.X with target version
```

---

## Step 2: Merge Upstream Changes

### Attempt Automatic Merge

```bash
# Try to merge the upstream tag
git merge vX.X.X -m "Merge upstream vX.X.X"
```

### Handle Merge Conflicts

If conflicts occur, resolve them systematically:

```bash
# See conflicted files
git status

# Common conflict areas:
# - src/extensions/mvs/* (MVS extension files)
# - src/mol-canvas3d/* (Canvas3D changes)
# - src/mol-plugin/* (Plugin context/state)
# - src/mol-state/state.ts (State management)
# - deno.json (version number)
```

**Conflict Resolution Strategy:**

1. **For `.ts` extension imports:** Always keep JSR version (with `.ts` extensions)
2. **For `override` modifiers:** Keep JSR version (with `override` keywords)
3. **For deno.json:** Manually merge, prioritize JSR config
4. **For new features:** Accept upstream, then add `.ts` extensions
5. **For formatting:** Accept JSR version (formatted for Deno)

```bash
# For each conflicted file:
# 1. Open in editor and resolve conflicts
# 2. Ensure .ts extensions on all imports
# 3. Ensure override modifiers on overridden methods
# 4. Save and stage

git add path/to/resolved-file.ts

# After resolving all conflicts:
git merge --continue
```

---

## Step 3: Fix New Type Issues

### Check for TypeScript Errors

```bash
# MUST be zero for JSR compatibility
deno check --all src/mod.ts
```

### Common Issues and Fixes

**Missing `override` modifiers:**
```bash
# Find new extension files
find src/extensions -name "*.ts" -newer .git/refs/tags/vX.X.X

# Check each for missing override
# Add override to update(), register(), unregister() methods
```

**Missing `.ts` extensions:**
```bash
# Find imports without .ts
grep -r "from ['\"]\..*[^t][^s]['\"]" src/extensions/*/

# Add .ts to each import
```

**New Node.js compatibility issues:**
```bash
# If crypto/fs/path errors appear:
# Verify skipLibCheck is in deno.json compilerOptions
# Should already be present from v5.3.16+
```

---

## Step 4: Check New Extensions

### Identify New Extensions

```bash
# Compare extension directories
diff -r <(ls src/extensions/) <(git ls-tree --name-only upstream/vX.X.X src/extensions/)
```

### Type-Check New Extensions

For each new extension:

```bash
# Test type checking
deno check --all src/extensions/NEW_EXTENSION/index.ts

# If errors appear, apply fixes:
# 1. Add override modifiers to behavior handlers
# 2. Add .ts extensions to imports
# 3. Check for Node.js built-in usage
```

### Add to Exports

If new extension type-checks cleanly:

```typescript
// In src/mod.ts
export * from "./extensions/NEW_EXTENSION/index.ts";
```

Update count comment:
```typescript
// Extensions - Type-clean viewer extensions (14/16)  <- Update numbers
```

---

## Step 5: Update Package Version

### Determine Version Number

Follow semantic versioning based on upstream changes:

- **Patch:** Bug fixes only → 5.3.X
- **Minor:** New features, backward compatible → 5.X.0
- **Major:** Breaking changes → X.0.0

```bash
# Check upstream CHANGELOG
git show vX.X.X:CHANGELOG.md | head -50
```

### Update deno.json

```json
{
  "name": "@zachcp/molstar",
  "version": "5.3.X",  // ← Update this
  ...
}
```

---

## Step 6: Test and Validate

### Run Full Test Suite

```bash
# Type checking (must pass)
deno task check

# Format check
deno task fmt-check

# Lint (warnings OK, errors investigate)
deno task lint

# Publish dry-run
deno publish --dry-run --allow-slow-types
```

### Verify Key Exports

Create a test file `test-exports.ts`:

```typescript
// Test core imports
import {
  createPluginUI,
  PluginContext,
  PluginSpec,
} from "./src/mod.ts";

// Test utilities
import {
  Color,
  Asset,
  BackgroundParams,
} from "./src/mod.ts";

// Test extensions
import {
  MolViewSpec,
  MVSData,
} from "./src/mod.ts";

console.log("All exports OK");
```

Run:
```bash
deno run test-exports.ts
rm test-exports.ts
```

---

## Step 7: Commit and Tag

### Commit Changes

```bash
# Stage all changes
git add -A

# Commit with descriptive message
git commit -m "chore: Merge upstream v5.3.X and update JSR compatibility

- Merge upstream Molstar v5.3.X
- Fix type errors in [list extensions]
- Add [N] new extensions to exports
- Update package version to 5.3.X"
```

### Create Version Tag

```bash
# Tag the release
git tag -a v5.3.X -m "Release v5.3.X: Merge upstream v5.3.X"

# Verify tag
git tag -l "v5.3.*" | tail -5
```

### Push to Origin

```bash
# Push branch
git push origin jsr-v5.3.0

# Push tag
git push origin v5.3.X
```

---

## Step 8: Publish to JSR

### Final Pre-Publish Check

```bash
# One last verification
deno check --all src/mod.ts
deno publish --dry-run --allow-slow-types 2>&1 | tail -20
```

### Publish to JSR

```bash
# Publish to JSR registry
deno publish --allow-slow-types
```

Expected output:
```
Publishing @zachcp/molstar@5.3.X ...
Success! Published @zachcp/molstar@5.3.X
Visit https://jsr.io/@zachcp/molstar@5.3.X
```

### Verify Publication

1. Visit https://jsr.io/@zachcp/molstar
2. Confirm new version appears
3. Check documentation renders correctly
4. Test import in a new project:

```bash
# In a new directory
echo 'import { createPluginUI } from "jsr:@zachcp/molstar@5.3.X"; console.log("OK");' | deno run -
```

---

## Step 9: Document Changes

### Update README.md

Update version references:
```markdown
## Installation

```typescript
import { createPluginUI } from "jsr:@zachcp/molstar@5.3.X";
```

### Create Release Notes (Optional)

Create `RELEASE_v5.3.X.md`:

```markdown
# Release v5.3.X

## Upstream Changes
- [List major changes from upstream]

## JSR Compatibility Updates
- [List type fixes applied]
- [List new extensions exported]

## Breaking Changes
- [If any]

## Migration Guide
- [If needed]
```

---

## Troubleshooting

### Merge Conflicts in Extensions

**Problem:** Many conflicts in `src/extensions/mvs/*`

**Solution:**
```bash
# Accept theirs (upstream) first
git checkout --theirs src/extensions/mvs/

# Then re-apply JSR fixes
# 1. Add .ts extensions to imports
# 2. Add override modifiers
# 3. Format with Deno

# Use previous version as reference:
git show HEAD~1:src/extensions/mvs/behavior.ts
```

### New Extension Won't Type-Check

**Problem:** New extension has type errors

**Solution:**
1. Check for missing `override` modifiers
2. Verify all imports have `.ts` extensions
3. Look for usage of Node.js built-ins
4. If still broken, exclude from exports and document in JSR_TYPE_CONVERSION_OVERVIEW.md

### JSR Publish Fails

**Problem:** `deno publish` fails with errors

**Solution:**
```bash
# Check for actual TypeScript errors (vs warnings)
deno check --all src/mod.ts

# If TS errors exist, must fix before publishing
# If only slow-type warnings, use --allow-slow-types

# Common issues:
# - Missing exports in deno.json
# - Circular dependencies
# - Invalid semver in version field
```

### Slow-Type Warnings Increased

**Problem:** Warning count went from 493 to 550+

**Solution:**
```bash
# Check what changed
deno publish --dry-run 2>&1 | grep "error\[" | grep -v "crypto" | head -20

# If new params were added by upstream:
# 1. Check if they use PD.Group, PD.MappedStatic, spreads
# 2. These are safe to ignore - document in notes
# 3. Don't try to fix unless they're simple standalone params
```

---

## Quick Reference

### Essential Commands

```bash
# Sync upstream
git fetch upstream --tags

# Merge specific version
git merge v5.3.X

# Type check (MUST be 0 errors)
deno check --all src/mod.ts

# Full validation
deno task check && deno publish --dry-run --allow-slow-types

# Commit and tag
git commit -m "chore: Merge upstream v5.3.X"
git tag -a v5.3.X -m "Release v5.3.X"
git push origin jsr-v5.3.0 v5.3.X

# Publish
deno publish --allow-slow-types
```

### File Locations

- **Version:** `deno.json` → `version` field
- **Exports:** `src/mod.ts` → Extensions section
- **Compiler options:** `deno.json` → `compilerOptions`
- **Type docs:** `JSR_TYPE_CONVERSION_OVERVIEW.md`

### Decision Tree

```
New Upstream Release
  ├─ Merge upstream tag
  ├─ Resolve conflicts
  │   ├─ Keep .ts extensions
  │   ├─ Keep override modifiers
  │   └─ Accept new features
  ├─ Check for new extensions
  │   ├─ Type-check each
  │   ├─ Fix if simple issues
  │   └─ Export if clean
  ├─ Update version in deno.json
  ├─ Run deno check (must be 0 errors)
  ├─ Commit, tag, push
  └─ Publish to JSR
```

---

## Best Practices

### Always Do

1. ✅ **Test immediately after merging** - Run `deno check` before any other work
2. ✅ **Keep override modifiers** - They're correct TypeScript
3. ✅ **Keep .ts extensions** - Required for Deno
4. ✅ **Commit frequently** - After each major conflict resolution
5. ✅ **Use --allow-slow-types** - The 493 warnings are architectural

### Never Do

1. ❌ **Don't remove override modifiers** - Even if upstream doesn't have them
2. ❌ **Don't remove .ts extensions** - Even if upstream uses no extension
3. ❌ **Don't try to fix all slow-type warnings** - 99% are unfixable safely
4. ❌ **Don't publish with TypeScript errors** - Must be zero always
5. ❌ **Don't add explicit types to PD.Params** - Will break inference

### Document

- New extensions that can't be exported (and why)
- Any breaking changes from upstream
- New workarounds or fixes discovered
- Update JSR_TYPE_CONVERSION_OVERVIEW.md if patterns change

---

## Maintenance Schedule

### Recommended Cadence

- **Major upstream releases:** Within 1 week
- **Minor upstream releases:** Within 2 weeks
- **Patch releases:** As needed (security issues immediately)

### Monitoring

Watch for:
- New Molstar releases: https://github.com/molstar/molstar/releases
- JSR tooling updates: https://deno.com/blog
- User issues with imports/types

---

## Support and Resources

### Documentation
- JSR_TYPE_CONVERSION_OVERVIEW.md - Type system decisions and limitations
- EXTENSION_TYPE_FIXES.md - Historical fix details (archive)
- EXPORTED_UTILITIES.md - User-facing utility documentation (archive)

### Upstream
- Molstar GitHub: https://github.com/molstar/molstar
- Molstar Docs: https://molstar.org/docs

### JSR
- Package Page: https://jsr.io/@zachcp/molstar
- JSR Docs: https://jsr.io/docs
- Slow Types: https://jsr.io/docs/about-slow-types

---

## Emergency Rollback

If a published version has critical issues:

```bash
# Don't panic - JSR keeps all versions

# Users can pin to previous version:
# import { ... } from "jsr:@zachcp/molstar@5.3.15";

# Fix issues in new patch version
git checkout jsr-v5.3.0
# ... make fixes ...
git tag -a v5.3.X+1 -m "Fix: [describe issue]"
git push origin jsr-v5.3.0 v5.3.X+1
deno publish --allow-slow-types

# Optionally deprecate broken version (JSR UI)
```

---

## Success Criteria

A successful upgrade has:

- ✅ Zero TypeScript errors (`deno check --all src/mod.ts`)
- ✅ All previously exported extensions still exported
- ✅ New extensions evaluated and exported if possible
- ✅ Package version updated appropriately
- ✅ Git tagged and pushed
- ✅ Published to JSR successfully
- ✅ Tested with simple import verification
- ✅ Documentation updated as needed

Slow-type warning count may increase slightly with new features - this is acceptable.

---

## Conclusion

This roadmap provides a repeatable process for upgrading the JSR-compatible Molstar fork. The key principles are:

1. **Preserve JSR compatibility** (.ts extensions, override modifiers)
2. **Maintain zero TypeScript errors** (non-negotiable)
3. **Accept slow-type warnings** (architectural, not bugs)
4. **Test thoroughly** (but efficiently)
5. **Document changes** (help future maintainers)

With this process, routine upgrades should take 1-3 hours depending on upstream changes.