# Next Session Quick-Start Guide

**Status:** 126 errors remaining  
**Progress:** ~83% complete (604 errors fixed from 730)

---

## 🎯 Current State

- **137 errors** - all `missing-explicit-return-type`
- **0 TypeScript errors** - Good state!
- **33 unfixable** `unsupported-super-class-expr` errors

---

## ⚠️ CRITICAL LEARNINGS

### What Causes TypeScript Errors
**Session Progress:** Fixed 11 errors (137 → 126)
- mol-state/tree/transient.ts: 6 errors fixed
- mol-state/state.ts: 2 errors fixed
- mol-state/object.ts: 3 errors fixed

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

```
Top files with errors:
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

---

## 🚀 Quick Commands

```bash
# Check current state
deno publish --dry-run 2>&1 | grep -c "error\[missing-explicit-return-type\]"

# Check for TypeScript errors (MUST be 0)
deno publish --dry-run 2>&1 | grep "TS[0-9]" | wc -l

# List errors by file
deno publish --dry-run 2>&1 | grep "\-\->" | sed 's/.*src/src/' | cut -d':' -f1 | sort | uniq -c | sort -rn | head -10

# Commit progress
git add -A && git commit -m "Fix N errors: description"
```

---

## 🎯 Strategy for Remaining Errors

### Phase 1: Skip the Dangerous (60+ errors)
These files have parameter definition functions that cause TypeScript errors:
- `src/mol-plugin-state/builder/structure/hierarchy-preset.ts` - 10 errors (ALL are *Params functions)
- `src/mol-plugin-state/builder/structure/representation-preset.ts` - Has some *Params patterns
- Files with `Params` or parameter definitions

### Phase 2: Target Safe Files (40+ errors)
Focus on files without parameter patterns:
- `src/mol-plugin-state/objects.ts` - 32 errors (factory functions)
- `src/mol-state/state/selection.ts` - 14 errors
- `src/mol-plugin/context.ts` - 14 errors

### Phase 3: Individual Review (30+ errors)
Review remaining files one by one for safe fixes

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

```
Starting: 730 fixable errors
Fixed:    604 errors (83%)
Current:  126 errors
Target:   0 errors

Session Progress:
- Fixed 11 errors so far
- Zero TypeScript errors maintained
- Completed: transient.ts, most of object.ts
```

---

## 🎬 Next Steps

1. **Analyze mol-plugin-state/objects.ts**
   ```bash
   # Check what's at line 58, 277, 278, etc.
   sed -n '58p' src/mol-plugin-state/objects.ts
   ```

2. **Look for easy wins**
   - Simple getters/setters
   - Boolean predicates
   - Void functions

3. **Skip anything with:**
   - `Params` in the name
   - `PD.Group`, `PD.Optional`, etc.
   - Complex generics

4. **Test after EVERY change**
   ```bash
   deno publish --dry-run 2>&1 | grep "TS[0-9]" | wc -l
   ```

Remember: **It's better to skip errors than introduce TypeScript errors!**