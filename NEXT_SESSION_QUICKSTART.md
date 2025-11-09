# Next Session Quick-Start Guide

**Status:** 494 total errors (42% complete)
- 126 `missing-explicit-return-type` (functions) - 83% done
- 334 `missing-explicit-type` (variables/constants) - 10% done (37/371 fixed)
- 34 `unsupported-super-class-expr` (unfixable)

**TypeScript Errors:** 0 ✅

---

## 🎯 Quick Commands

```bash
# Check total errors
deno publish --dry-run 2>&1 | tail -1

# Count by type
deno publish --dry-run 2>&1 | grep -c "error\[missing-explicit-return-type\]"
deno publish --dry-run 2>&1 | grep -c "error\[missing-explicit-type\]"

# Must always be 0!
deno publish --dry-run 2>&1 | grep "TS[0-9]" | wc -l

# See top files with variable-type errors
deno publish --dry-run 2>&1 | grep "missing-explicit-type" -A 1 | grep "\-\->" | sed 's/.*src/src/' | cut -d':' -f1 | sort | uniq -c | sort -rn | head -10

# Commit progress
git add -A && git commit -m "Fix N variable-type errors: description (X→Y)"
```

---

## ⚠️ CRITICAL PATTERNS

### ✅ SAFE to Fix (Variable Types)

**Simple Param Definitions** - No spread, no PD.Group/PD.MappedStatic:
```typescript
export const SimpleParams: PD.Params = {
  enabled: PD.Boolean(false),
  alpha: PD.Numeric(1, { min: 0, max: 1 }),
};
export type SimpleParams = typeof SimpleParams;
```

**Completed Files (37 errors fixed):**
- ✅ `mol-theme/size/*.ts` (4 files) - size theme params
- ✅ `mol-model-props/computed/interactions/*.ts` (7 files) - interaction params
- ✅ Earlier: camera, type, mask, state, transformer, color themes (26 files)

### ❌ DANGEROUS - Skip These!

**Complex Params** - cause TypeScript errors:
```typescript
// ❌ PD.Group, PD.MappedStatic
export const ComplexParams: PD.Params = {
  variant: PD.MappedStatic('off', {
    on: PD.Group(SubParams),
    off: PD.Group({})
  })
};

// ❌ Spread operators
export const ExtendedParams: PD.Params = {
  ...BaseParams,
  newProp: PD.Boolean(true)
};

// ❌ Typeof patterns (need inference)
export const Params = { ...spread };
export type Params = typeof Params;  // Don't add type!
```

**Files to AVOID:**
- Any file with `PD.Group()`, `PD.MappedStatic()`, `PD.Optional()` in params
- Any file with spread operators (`...`) in param definitions
- `mol-canvas3d/canvas3d.ts`, `mol-repr/volume/*.ts`
- `mol-plugin-state/builder/structure/*.ts` (param functions)
- Any color theme with `...getPaletteParams()`

---

## 🎬 Current Strategy

### Focus: Variable Type Errors (334 remaining)

**Look for:**
1. Files with 1-3 errors (easier to verify)
2. Simple params with only `PD.Numeric`, `PD.Boolean`, `PD.Select`
3. No spread operators, no `PD.Group`, no typeof patterns

**Workflow:**
```bash
# Find low-error files
deno publish --dry-run 2>&1 | grep "missing-explicit-type" -A 1 | grep "\-\->" | sed 's/.*src/src/' | cut -d':' -f1 | sort | uniq -c | sort -rn | grep "^   [123] "

# Check specific file
deno publish --dry-run 2>&1 | grep "missing-explicit-type" -A 3 | grep -A 3 "FILENAME"

# Read file, verify safety, fix
# Test immediately: deno publish --dry-run 2>&1 | grep "TS[0-9]" | wc -l

# Revert on ANY TypeScript error
git checkout src/path/to/file.ts

# Commit after 2-3 successful fixes
```

---

## 📊 Top Files Remaining

### Variable Type Errors (334 total)
```
13 src/mol-script/language/symbol-table/core.ts
11 src/mol-plugin/context.ts
11 src/mol-plugin-state/builder/structure/representation-preset.ts
10 src/mol-plugin/behavior/dynamic/representation.ts
10 src/mol-gl/renderable/schema.ts
9  src/mol-script/language/symbol-table/structure-query.ts
7  src/mol-plugin/state.ts
7  src/mol-plugin-state/actions/structure.ts
7  src/mol-model/structure/model/model.ts
```

### Return Type Errors (126 total - HARDER)
```
32 src/mol-plugin-state/objects.ts (factory functions - skip)
14 src/mol-state/state/selection.ts
14 src/mol-script/language/symbol-table/core.ts
14 src/mol-plugin/context.ts
13 src/mol-plugin-state/builder/structure/representation-preset.ts (param functions - skip)
11 src/mol-script/language/symbol-table/structure-query.ts
10 src/mol-plugin/behavior/dynamic/representation.ts
10 src/mol-plugin-state/builder/structure/hierarchy-preset.ts (param functions - skip)
```

---

## 🚨 Safety Rules

1. **Test after EVERY file:** `deno publish --dry-run 2>&1 | grep "TS[0-9]" | wc -l` must be 0
2. **Revert immediately** on any TypeScript error
3. **Read the file first** - verify it's a simple pattern
4. **When in doubt, skip it** - better to skip 100 files than break 1
5. **Commit frequently** - after 2-3 successful fixes
6. **Document new dangerous patterns** in this file

---

## 📈 Progress Summary

**Session Progress:** 505 → 494 errors (11 errors fixed)
- Variable types: 345 → 334 (primarily simple param objects)
- Zero TypeScript errors maintained throughout

**Overall Progress:** ~42% complete (641/857 fixable errors done)

**Next milestone:** Focus on simple param files, aim for <320 variable-type errors