# Next Session Quick-Start Guide

**Status:** 753 errors remaining (719 fixable)
**Current State:** 11 errors fixed from starting point of 730 fixable
**Progress:** 1.5% complete

---

## 🎯 Reality Check

We currently have **753 Deno slow-type errors**:
- `missing-explicit-return-type`: ~314 errors (down from 316)
- `missing-explicit-type`: ~414 errors (parameter types)
- `unsupported-super-class-expr`: **34 errors** (unfixable by design)

**Fixable errors: 719** (down from 730)

---

## 📊 What We've Fixed So Far (11 errors)

### Files Modified:
1. ✅ **src/mol-model-formats/structure/property/anisotropic.ts** (2 errors)
   - Added `Int32Array` return types to export functions

2. ✅ **src/mol-model-props/common/custom-model-property.ts** (1 error)
   - Added `CustomProperty.Provider<Model, any, any>` to `createSimple()`

3. ✅ **src/mol-model-props/common/custom-structure-property.ts** (1 error)
   - Added `CustomProperty.Provider<Structure, any, any>` to `createSimple()`

4. ✅ **src/mol-model-props/computed/interactions/common.ts** (1 error)
   - Added `ElementsIndex` return type to `createElementsIndex()`

5. ✅ **src/mol-model-props/computed/interactions/interactions.ts** (1 error)
   - Added `string` return type to `getLabel()`

6. ✅ **src/mol-model/custom-property.ts** (1 error)
   - Added `boolean` return type to `hasReference()`

7. ✅ **src/mol-model/structure/query/context.ts** (1 error)
   - Added `QueryContextBondInfo<Unit.Atomic>` to `pushCurrentBond()`

8. ✅ **src/mol-plugin-state/formats/registry.ts** (1 error)
   - Added `DataFormatProvider | undefined` to `auto()`

9. ✅ **src/mol-plugin-state/objects.ts** (2 errors)
   - Added return types to factory functions: `CreateRepresentation3D()` and `CreateBehavior()`
   - Pattern: `ReturnType<typeof Create<T>>`

---

## 📈 Top Files by Error Count (Updated)

1. **src/mol-plugin-state/objects.ts** - 32 errors remaining (was 34) ⭐
2. **src/mol-plugin/context.ts** - 29 errors
3. **src/mol-state/state/selection.ts** - 27 errors
4. **src/mol-script/language/symbol-table/structure-query.ts** - 25 errors
5. **src/mol-script/language/symbol-table/core.ts** - 21 errors
6. **src/mol-model/structure/structure/structure.ts** - 19 errors
7. **src/mol-plugin-state/builder/structure/representation-preset.ts** - 14 errors
8. **src/mol-model/structure/structure/unit.ts** - 14 errors
9. **src/mol-script/language/builder.ts** - 13 errors
10. **src/mol-plugin-state/manager/structure/component.ts** - 13 errors

---

## 🔍 Key Learnings

### ✅ Namespaces Work with JSR!
The issue isn't namespaces—it's **missing return types on functions inside namespaces**.

Example:
```typescript
export namespace PluginStateObject {
    // ❌ Missing return type
    export function CreateBehavior<T>(type: { name: string }) {
        return Create<T>({ ...type, typeClass: 'Behavior' });
    }
    
    // ✅ With return type
    export function CreateBehavior<T>(type: { name: string }): ReturnType<typeof Create<T>> {
        return Create<T>({ ...type, typeClass: 'Behavior' });
    }
}
```

### Common Return Type Patterns

1. **Type Guards** (use `is` predicates):
   ```typescript
   export function isType(o?: Any): o is StateObject<Type, TypeInfo> {
       return !!o && o.type.typeClass === 'Type';
   }
   ```

2. **Factory Functions** (use `ReturnType<typeof>`):
   ```typescript
   export function createThing<T>(config: Config): ReturnType<typeof Factory<T>> {
       return Factory<T>(config);
   }
   ```

3. **Simple Methods**:
   ```typescript
   has(key: string): boolean { return this.map.has(key); }
   get(key: string): Type | undefined { return this.map.get(key); }
   dispose(): void { this.cleanup(); }
   ```

4. **Builder/Selector Functions**:
   ```typescript
   export function filter(b: Selector, p: Predicate): Builder {
       return flatMap(b, n => p(n) ? [n] : []);
   }
   ```

---

## 🚀 Recommended Strategy Going Forward

### Phase 1: Continue Export Functions (~171 remaining)
Focus on explicit function exports with clear return types.

**Good candidates:**
- Simple utility functions returning primitives
- Factory functions with clear patterns
- Type guard functions

### Phase 2: Method Return Types (~158 remaining)
Focus on class methods, especially:
- Registry `has()` → `boolean`
- Registry `get()` → `Type | undefined`
- Dispose methods → `void`

### Phase 3: Parameter Types (~414 remaining) - HARDER
These require adding types to function parameters:
- Arrow functions in object literals
- Callback function parameters
- Generic function constraints

### Phase 4: Export Consts (~290 remaining) - VERY CAREFUL!
**⚠️ WARNING:** Many are `Params` definitions that break if you add types wrong.
- Test each one immediately
- DON'T add `: PD.Params` to Params definitions
- These often need parameter types, not return types

---

## 🛠 Available Tools

### 1. Manual Fixing (Most Reliable) ✅
What we've been doing. Works well for batching similar patterns.

### 2. VS Code Quick Fix (Recommended to Try)
**Setup:**
```bash
code /Users/zcpowers/Documents/Projects/molstar
```

**Enable Inlay Hints:**
- Settings (Cmd+,) → Search "inlay hints"
- Enable "TypeScript › Inlay Hints: Function Like Return Types"

**Quick Fix Workflow:**
1. Put cursor on function name
2. Press **`Cmd+.`** (or Ctrl+.)
3. Select "Infer function return type"
4. VS Code adds it automatically!

**Alternative - Hover to See Type:**
1. Hover over function name
2. See inferred type in tooltip
3. Manually add `: <type>` after closing parenthesis

### 3. Custom TypeScript Script (Experimental)
We created `scripts/add-return-types.ts` but it's limited:
- Only catches some patterns
- Needs more work to be comprehensive
- Better for learning than production use

### 4. ESLint (Doesn't Work for Deno)
We tried but hit issues:
- Deno projects don't use tsconfig.json
- ESLint v9 config is complex
- Deno's slow-type checks are unique, not standard TS errors

---

## 📝 Session Template

```bash
# Start of session
deno publish --dry-run 2>&1 | tee /tmp/deno_errors.txt
python3 scripts/analyze-deno-errors.py
START_COUNT=$(deno publish --dry-run 2>&1 | grep "error\[" | grep -v "unsupported-super-class-expr" | wc -l)
echo "Starting with: $START_COUNT fixable errors"

# Current starting point: 719 fixable errors

# Pick a target directory or pattern
grep "src/TARGET_DIR" /tmp/deno_errors.txt | head -20

# Make fixes...
# Test each fix immediately!

# End of session
END_COUNT=$(deno publish --dry-run 2>&1 | grep "error\[" | grep -v "unsupported-super-class-expr" | wc -l)
FIXED=$((START_COUNT - END_COUNT))
echo "Fixed: $FIXED errors ($START_COUNT → $END_COUNT)"

# Commit
git add -A
git commit -m "Fix X errors in Y ($START_COUNT → $END_COUNT)"
```

---

## ⚡ Quick Win Opportunities

### Pattern 1: All `dispose()` methods
Many classes have `dispose(): void` methods. These are easy to batch.

```bash
# Find them
grep -n "dispose()" src/**/*.ts | grep -v ": void"

# Add `: void` to each
```

### Pattern 2: Boolean-returning methods
`has()`, `is*()`, `can*()` methods typically return `boolean`.

### Pattern 3: Registry `get()` methods
Almost always `Type | undefined` pattern.

### Pattern 4: Simple utility functions
Functions with clear, single-line returns:
```typescript
export function sum(a: number, b: number) { return a + b; }
// Obviously returns: number
```

---

## 🎯 Realistic Goals

### Short Session (1-2 hours):
- **Target:** Fix 20-30 errors
- **Focus:** Single file or single pattern
- **Example:** All export functions in `mol-state/state/selection.ts`

### Medium Session (2-4 hours):
- **Target:** Fix 50-75 errors  
- **Focus:** Multiple files with same pattern
- **Example:** All `has()` and `get()` methods across project

### Long Session (4+ hours):
- **Target:** Fix 100+ errors
- **Focus:** Complete a category (all export functions, all methods, etc.)
- **Risk:** Mental fatigue leads to mistakes

---

## ⚠️ Critical Rules (Never Break These)

### DO:
1. ✅ Test IMMEDIATELY after each change
2. ✅ Check actual return types (don't guess)
3. ✅ Commit every 10-20 fixes
4. ✅ Revert if you introduce errors
5. ✅ Use grep to find similar patterns
6. ✅ Read the code to understand what it returns

### DON'T:
1. ❌ Add `: PD.Params` to export const Params definitions
2. ❌ Assume builder methods return `void` (they often don't!)
3. ❌ Make batch changes without testing samples first
4. ❌ Keep code that introduces new TypeScript errors
5. ❌ Skip verification steps
6. ❌ Work when tired (type errors are mentally taxing)

---

## 🔧 Debugging When Things Go Wrong

### If error count increases:
```bash
# See what you changed
git diff

# Check new TypeScript errors (not just slow-type)
deno publish --dry-run 2>&1 | grep "TS[0-9]" | head -20

# Revert the problematic file
git checkout path/to/file.ts

# Or revert everything
git reset --hard HEAD
```

### If error count doesn't decrease:
```bash
# Clear any caches
rm /tmp/deno_errors.txt

# Run fresh
deno publish --dry-run 2>&1 | tee /tmp/deno_errors.txt
python3 scripts/analyze-deno-errors.py

# Verify your fix is actually there
git diff path/to/file.ts

# Check if you fixed the right thing
grep "path/to/file.ts" /tmp/deno_errors.txt
```

---

## 📚 Useful Commands Reference

### Count errors:
```bash
# Total errors
deno publish --dry-run 2>&1 | grep "Found" | tail -1

# Fixable errors only
deno publish --dry-run 2>&1 | grep "error\[" | grep -v "unsupported-super-class-expr" | wc -l
```

### Find specific patterns:
```bash
# All errors in a specific file
grep "path/to/file.ts" /tmp/deno_errors.txt

# All errors in a directory
grep "src/mol-plugin-state" /tmp/deno_errors.txt | wc -l

# Files with most errors
grep -oE "src/[^:]+\.ts" /tmp/deno_errors.txt | sort | uniq -c | sort -rn | head -20
```

### Quick type lookup:
```bash
# Find where a type is defined
grep -r "^export type TypeName" src/

# Find function signature
grep -A 5 "export function name" src/path/file.ts
```

---

## 💡 Pro Tips for Success

1. **Start with confidence** - Pick files you understand
2. **Test constantly** - After every 1-2 changes
3. **Use VS Code** - Hover to see inferred types
4. **Take breaks** - Type errors cause mental fatigue
5. **Celebrate wins** - Every error fixed is progress!
6. **Keep notes** - Document patterns you discover
7. **Don't rush** - Quality > speed
8. **Ask for help** - If stuck, move to easier targets

---

## 📈 Progress Tracking

```
Starting point: 730 fixable errors
Current: 719 fixable errors (11 fixed, 1.5%)

Milestone targets:
- 🎯 < 650 errors (10% complete) 
- 🎯 < 500 errors (30% complete)
- 🎯 < 250 errors (65% complete)
- 🎯 < 100 errors (85% complete)
- 🎯 < 50 errors (93% complete)
- 🏁 0 errors (100% complete!)

At current pace: ~60 errors per 1% = ~43,000 errors worth of work
This is a marathon, not a sprint!
```

---

## 🎬 Start Here Next Session

**Recommended approach:**

1. **Run fresh error check:**
   ```bash
   deno publish --dry-run 2>&1 | tee /tmp/deno_errors.txt
   python3 scripts/analyze-deno-errors.py
   ```

2. **Pick your target:**
   - **Easy:** Simple export functions with obvious return types
   - **Medium:** Methods in classes (has, get, dispose)
   - **Hard:** Complex factory functions or parameter types

3. **Try VS Code Quick Fix** on one file:
   - Open `src/mol-plugin-state/objects.ts`
   - Use Cmd+. on function names
   - See if Quick Fix works well

4. **If Quick Fix works:** Blast through files!
5. **If Quick Fix doesn't work:** Continue manual batching

---

**Good luck! You're making great progress. Slow and steady wins the race!** 🚀

Remember: Test every change, revert mistakes, commit often.