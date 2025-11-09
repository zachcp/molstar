# Next Session Quick-Start Guide

**Status:** 505 total errors remaining  
**Breakdown:**
- 126 `missing-explicit-return-type` (functions) - 83% complete (604/730 fixed)
- 345 `missing-explicit-type` (variables/constants) - **7% complete (26/371 fixed)**
- 34 `unsupported-super-class-expr` (unfixable class inheritance)

---

## 🎯 Current State

**Return Type Errors:** 126 `missing-explicit-return-type`  
**Variable Type Errors:** 345 `missing-explicit-type` (26 fixed this session!)  
**Unfixable:** 34 `unsupported-super-class-expr`  
**TypeScript Errors:** 0 ✅

**Total JSR Problems:** 505

---

## ⚠️ CRITICAL LEARNINGS

**This Session Progress:** Fixed 26 `missing-explicit-type` errors (371 → 345)
- ✅ mol-plugin/behavior/dynamic/camera.ts: 5 errors fixed (Binding exports)
- ✅ mol-script/language/type.ts: 3 errors fixed (Type constants)
- ✅ mol-util/mask.ts: 1 error fixed (Mask interface)
- ✅ mol-plugin/behavior/dynamic/state.ts: 2 errors fixed (bindings & params)
- ✅ mol-state/transformer.ts: 1 error fixed (Transformer factory)
- ✅ mol-theme/color/uniform.ts: 2 errors fixed (Color & params)
- ✅ mol-theme/color/secondary-structure.ts: 2 errors fixed (ColorMap & params)
- ✅ Previous session: 10 errors fixed (canvas3d files)

**IMPORTANT DISCOVERY:** There are TWO types of errors to fix:
1. `missing-explicit-return-type` (126 remaining) - functions without return types
2. `missing-explicit-type` (361 remaining) - variables/constants without types

### Variable Type Error Patterns

**SAFE patterns for `missing-explicit-type`:**
```typescript
// ✅ Simple param definitions (no spread operators)
export const SimpleParams: PD.Params = {
  enabled: PD.Boolean(false),
  alpha: PD.Numeric(1, { min: 0, max: 1 }),
};

// ✅ Default values AFTER type is defined
export type SimpleProps = PD.Values<typeof SimpleParams>;
export const DefaultSimpleProps: SimpleProps = PD.getDefaultValues(SimpleParams);
```

**DANGEROUS patterns (cause TypeScript errors):**
```typescript
// ❌ Complex param definitions with PD.Group, PD.MappedStatic, etc.
export const ComplexParams: PD.Params = {
  variant: PD.MappedStatic('off', {
    on: PD.Group(SubParams),
    off: PD.Group({})
  })
};

// ❌ Param definitions with spread operators
export const ExtendedParams: PD.Params = {
  ...BaseParams,  // Spread causes type inference issues
  newProp: PD.Boolean(true)
};

// ❌ Using type before it's defined
export const DefaultProps: Props = PD.getDefaultValues(Params);
export type Props = PD.Values<typeof Params>;  // Type comes AFTER!

// ❌ Objects with typeof patterns (inference needed)
export const Params = { ...spread };
export type Params = typeof Params;  // Don't add explicit type here!
```

### Return Type Error Patterns

These patterns consistently introduce TypeScript errors when given explicit return types:

1. **Parameter definition functions** (const *Params = ...)
   - Functions returning `PD.Group(...)`, `PD.Optional(...)`, etc.
   - Arrow functions named `*Params`
   - Example: `CommonParams`, `DefaultParams`, etc. in hierarchy-preset.ts

2. **Factory functions with complex generic types**
   - `StateObject.factory<TypeInfo>()`
   - `StateTransformer.factory(...)`

### Safe to Fix
1. **Simple factory functions** - `Color()`, `Material()` → add matching return type
2. **Predicate functions** - `isXxx()`, `hasXxx()` → add `: boolean`
3. **Void functions** - `setXxx()`, `dispose()` → add `: void`
4. **String formatters** - `toString()`, `formatXxx()` → add `: string`

---

## 📊 Error Distribution

### Return Type Errors (126 total)
```
Top files with return-type errors:
32 src/mol-plugin-state/objects.ts
14 src/mol-state/state/selection.ts  
14 src/mol-script/language/symbol-table/core.ts
14 src/mol-plugin/context.ts
13 src/mol-plugin-state/builder/structure/representation-preset.ts
11 src/mol-script/language/symbol-table/structure-query.ts
10 src/mol-plugin/behavior/dynamic/representation.ts
10 src/mol-plugin-state/builder/structure/hierarchy-preset.ts
10 src/mol-gl/renderable/schema.ts
9 src/mol-plugin/state.ts
```

### Variable Type Errors (361 remaining)
```
Top files with variable-type errors:
13 src/mol-script/language/symbol-table/core.ts
11 src/mol-plugin/context.ts
11 src/mol-plugin-state/builder/structure/representation-preset.ts
10 src/mol-plugin/behavior/dynamic/representation.ts
10 src/mol-gl/renderable/schema.ts
9 src/mol-script/language/symbol-table/structure-query.ts
8 src/mol-plugin/behavior/dynamic/camera.ts
7 src/mol-plugin/state.ts
7 src/mol-plugin-state/actions/structure.ts
7 src/mol-model/structure/model/model.ts
```

Run to see distribution:
```bash
deno publish --dry-run 2>&1 | grep "missing-explicit-type" | grep "\-\->" | sed 's/.*src/src/' | cut -d':' -f1 | sort | uniq -c | sort -rn | head -10
```

---

## 🚀 Quick Commands

```bash
# Check TOTAL error count (should show 531)
deno publish --dry-run 2>&1 | tail -1

# Check return-type errors only
deno publish --dry-run 2>&1 | grep -c "error\[missing-explicit-return-type\]"

# Check variable-type errors only
deno publish --dry-run 2>&1 | grep -c "error\[missing-explicit-type\]"

# Check for TypeScript errors (MUST be 0)
deno publish --dry-run 2>&1 | grep "TS[0-9]" | wc -l

# List all error types
deno publish --dry-run 2>&1 | grep -oE "error\[[a-z-]+\]" | sort | uniq -c

# List return-type errors by file
deno publish --dry-run 2>&1 | grep "missing-explicit-return-type" -A 1 | grep "\-\->" | sed 's/.*src/src/' | cut -d':' -f1 | sort | uniq -c | sort -rn | head -10

# List variable-type errors by file
deno publish --dry-run 2>&1 | grep "missing-explicit-type" -A 1 | grep "\-\->" | sed 's/.*src/src/' | cut -d':' -f1 | sort | uniq -c | sort -rn | head -10

# Commit progress
git add -A && git commit -m "Fix N errors: description"
```

---

## 🎯 Strategy for Remaining Errors

### Current Status: Return Type Errors
**126 `missing-explicit-return-type` errors remain** - these are complex:

#### Dangerous Patterns (Skip These!)
- **Parameter definition functions** (60+ errors) - cause TypeScript errors when typed
  - Files: `hierarchy-preset.ts`, `representation-preset.ts`, theme files
  - Pattern: `const Params = (...)` returning `PD.Group(...)`, `PD.Optional(...)`, etc.
  
- **Factory functions with complex generics** (40+ errors)
  - `StateObject.factory()`, `StateTransformer.factory()` 
  - Files: `objects.ts` (32 errors), `transformer.ts`, `builder.ts`
  
- **Complex builder/selector methods** (20+ errors)
  - Query builders, state selectors, theme registries
  - Generic return types that are inferred

#### Safe Patterns (Look for These)
✅ Simple predicates returning `boolean`
✅ Void functions with no return value
✅ Simple getters returning known types
✅ String formatters returning `string`

### Next Session: Variable Type Errors
**371 `missing-explicit-type` errors** - variables/constants without explicit types
- These are DIFFERENT from return-type errors
- Will need separate strategy
- Run distribution command to see which files

---

## 💡 Pattern Recognition

### DANGEROUS (Skip These!)
```typescript
// ❌ Parameter functions - cause TS errors
export const CommonParams = (a: any, plugin: any) => ({
  modelProperties: PD.Optional(...)
})

// ❌ Complex factory functions  
export const Create = StateObject.factory<TypeInfo>();
```

### SAFE to Fix
```typescript
// ✅ Simple factory
export function Color(hex: number): Color {
  return hex as Color;
}

// ✅ Predicate
export function isAtomic(unit: Unit): boolean {
  return unit.kind === Kind.Atomic;
}

// ✅ Void function
export function dispose(): void {
  this.cleanup();
}
```

---

## 📝 File-Specific Notes

### mol-plugin-state/objects.ts (32 errors)
- Contains many `StateObject.factory()` calls
- Complex factory functions - SKIP

### mol-state/tree/transient.ts ✅ DONE
- Fixed: asTransient, setParams, setTags, setDependsOn, assignState, asImmutable

### mol-state/state.ts ✅ PARTIALLY DONE
- Fixed: State.create, ObjectEvent.isCell
- Remaining 8 errors are complex (factory functions, generics)

### mol-state/object.ts ✅ DONE
- Fixed: resolve, update, checkValid

### mol-plugin-state/builder/structure/hierarchy-preset.ts (10 errors)
- ALL are *Params arrow functions
- SKIP ENTIRE FILE - will cause TS errors

---

## 🔧 Surgical Fix Approach

Use `sed` for precise edits to avoid reformatting:

```bash
# Example: Add boolean return type
sed -i.bak 'LINE_NUMs/export function isXxx(/export function isXxx(: boolean/' FILE.ts

# Example: Add void return type  
sed -i.bak 'LINE_NUMs/export function dispose(/export function dispose(): void/' FILE.ts

# Test immediately
deno publish --dry-run 2>&1 | grep "TS[0-9]" | wc -l

# If errors, revert
git checkout FILE.ts
```

---

## 🚨 Emergency Procedures

```bash
# If TypeScript errors appear
git status  # Check what changed
git diff    # Review changes
git checkout FILE.ts  # Revert specific file
# OR
git reset --hard HEAD  # Nuclear option

# Clean up backup files
find . -name "*.bak" -type f -delete
```

---

## 📈 Progress Tracking

### Return Type Errors (`missing-explicit-return-type`)
```
Starting:  730 fixable errors
Fixed:     604 errors (83%)
Current:   126 errors (17%)
Target:    0 errors

Progress: Complete for now - remaining errors are dangerous patterns
```

### Variable Type Errors (`missing-explicit-type`)
```
Starting:  371 errors
Fixed:     26 errors (7%)
Current:   345 errors (93%)
Target:    0 errors

This Session:
- Fixed 26 errors (371 → 345)
- Zero TypeScript errors maintained
- Completed files:
  * mol-plugin/behavior/dynamic/camera.ts (5 errors)
  * mol-script/language/type.ts (3 errors)
  * mol-util/mask.ts (1 error)
  * mol-plugin/behavior/dynamic/state.ts (2 errors)
  * mol-state/transformer.ts (1 error)
  * mol-theme/color/uniform.ts (2 errors)
  * mol-theme/color/secondary-structure.ts (2 errors)
  * Previous: canvas3d files (10 errors)
```

### Total JSR Slow-Type Problems
```
Total:     505 problems
Breakdown: 126 return-type + 345 variable-type + 34 unfixable
Progress:  ~41% complete (630 fixed out of ~857 total fixable)
```

---

## 🎬 Next Session Strategy

### Continue Variable Type Errors (345 remaining) ⭐ RECOMMENDED
Continue with `missing-explicit-type` errors, but be VERY selective about patterns!

**DISCOVERED DANGEROUS PATTERNS (DO NOT FIX):**
1. **Params objects with `PD.Params` type annotation** - causes `TS2344` errors
   - Files: `mol-repr/volume/segment.ts`, `mol-util/clip.ts`, etc.
   - Issue: Generic `PD.Params` type breaks specific param type constraints
   - FIX: Skip these files entirely!

**Files to AVOID (known dangerous):**
- `mol-canvas3d/canvas3d.ts` - complex nested PD.Group
- `mol-canvas3d/helper/camera-helper.ts` - TS2345 error
- `mol-canvas3d/helper/xr-manager.ts` - missing InputBinding type
- `mol-canvas3d/helper/pointer-helper.ts` - uses spread operators
- `mol-canvas3d/helper/handle-helper.ts` - likely has spread operators
- `mol-repr/volume/*.ts` - all use typeof patterns
- `mol-plugin-state/builder/structure/*.ts` - param function patterns

**Strategy:**
1. **ONLY pick files where you understand the exact type needed**
2. Check return types BEFORE editing
3. Test immediately after each file
4. Skip and move on if TypeScript errors appear

**Commands:**
```bash
# See specific examples from a file
deno publish --dry-run 2>&1 | grep "missing-explicit-type" -A 3 | grep -A 3 "FILENAME"

# Quick test after edit
deno publish --dry-run 2>&1 | grep "TS[0-9]" | wc -l

# Count progress
deno publish --dry-run 2>&1 | grep -c "error\[missing-explicit-type\]"
```

### Critical Reminders
- **ALWAYS test:** `deno publish --dry-run 2>&1 | grep "TS[0-9]" | wc -l` (must be 0)
- **Revert on ANY TypeScript error:** `git checkout src/path/to/file.ts`
- **Commit after every 2-3 successful fixes**
- **Document dangerous patterns above and skip future similar files**
- **Better to skip 1000 files than break 1!**