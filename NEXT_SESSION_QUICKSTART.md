# Next Session Quick-Start Guide

**Status:** 531 total errors remaining  
**Breakdown:**
- 126 `missing-explicit-return-type` (functions) - 83% complete (604/730 fixed)
- 371 `missing-explicit-type` (variables/constants) - **NOT YET ADDRESSED**
- 34 `unsupported-super-class-expr` (unfixable class inheritance)

---

## 🎯 Current State

**Return Type Errors:** 126 `missing-explicit-return-type`  
**Variable Type Errors:** 371 `missing-explicit-type` (NEW - not yet addressed)  
**Unfixable:** 34 `unsupported-super-class-expr`  
**TypeScript Errors:** 0 ✅

**Total JSR Problems:** 531

---

## ⚠️ CRITICAL LEARNINGS

**This Session Progress:** Fixed 11 `missing-explicit-return-type` errors (137 → 126)
- ✅ mol-state/tree/transient.ts: 6 errors fixed
- ✅ mol-state/state.ts: 2 errors fixed  
- ✅ mol-state/object.ts: 3 errors fixed

**IMPORTANT DISCOVERY:** There are TWO types of errors to fix:
1. `missing-explicit-return-type` (126 remaining) - functions without return types
2. `missing-explicit-type` (371 remaining) - variables/constants without types

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

### Variable Type Errors (371 total) - **TO BE ADDRESSED IN NEXT SESSION**
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

This Session:
- Fixed 11 errors (137 → 126)
- Zero TypeScript errors maintained
- Completed: transient.ts, object.ts, state.ts
```

### Variable Type Errors (`missing-explicit-type`)
```
Current:   371 errors
Fixed:     0 errors (0%)
Status:    NOT YET ADDRESSED

Next session should focus on these!
```

### Total JSR Slow-Type Problems
```
Total:     531 problems
Breakdown: 126 return-type + 371 variable-type + 34 unfixable
Progress:  ~27% complete (604 fixed out of ~800 total fixable)
```

---

## 🎬 Next Session Strategy

### Option 1: Finish Return Type Errors (126 remaining)
Continue working on `missing-explicit-return-type` errors, but be aware:
- Most remaining are COMPLEX (factories, builders, parameter functions)
- High risk of introducing TypeScript errors
- May need to accept some as unfixable

**Commands:**
```bash
# See return-type error distribution
deno publish --dry-run 2>&1 | grep "missing-explicit-return-type" -A 1 | grep "\-\->" | sed 's/.*src/src/' | cut -d':' -f1 | sort | uniq -c | sort -rn | head -10
```

### Option 2: Start on Variable Type Errors (371 NEW errors) ⭐ RECOMMENDED
Focus on the 371 `missing-explicit-type` errors - variables/constants without types:
- These are DIFFERENT from return-type errors
- Likely easier to fix (add `: Type` to variable declarations)
- Fresh set of problems to tackle

**Commands:**
```bash
# See variable-type error distribution
deno publish --dry-run 2>&1 | grep "missing-explicit-type" -A 1 | grep "\-\->" | sed 's/.*src/src/' | cut -d':' -f1 | sort | uniq -c | sort -rn | head -10

# See specific examples
deno publish --dry-run 2>&1 | grep "missing-explicit-type" -A 3 | head -40
```

### Critical Reminder
- **Always test after every change:** `deno publish --dry-run 2>&1 | grep "TS[0-9]" | wc -l` (must be 0)
- **Skip dangerous patterns** (parameter definitions, complex factories)
- **Commit frequently** with descriptive messages
- **It's better to skip than break!**