# Next Session Quick-Start Guide

**Last Updated:** Session 7 - COMPLETE ✅
**Status:** 912 errors remaining (72 fixed this session!) 🎉🎉🎉

---

## 🎯 Current Status

**Errors:** 984 → 912 (72 fixed!)
**Strategy:** ✅ **Batch fixing with sed is PERFECT!**

### Error Breakdown
- `missing-explicit-return-type`: ~906
- `missing-explicit-type`: ~406
- `unsupported-super-class-expr`: 34

### By Pattern (Remaining)
1. ✅ **Getters: 0 remaining** (70 → 0, **ALL FIXED!** 🏆)
2. **Regular functions: 16 remaining** - **NEXT TARGET!**
3. Static methods: 1
4. Methods: 242
5. Export const functions: 230
6. Export functions: 230+

---

## 🚀 **WINNING STRATEGY** - sed for Batch Fixes!

### What Worked Perfectly in Session 7

**Approach:** Fix getters in batches using `sed` for minimal changes
- ✅ No code reformatting (preserves original style)
- ✅ Fast and reliable (72 fixes in one session!)
- ✅ Easy to verify with `deno publish --dry-run`

### The Pattern That Works

```bash
# 1. Run analysis
python3 scripts/analyze-deno-errors.py

# 2. Read file to understand return types
# Look at: property declarations, return statements, function signatures

# 3. Fix with sed (one-liner for each getter/function)
sed -i '' 'LINE_NUMs/get name() {/get name(): ReturnType {/' FILE.ts

# 4. Verify
deno publish --dry-run 2>&1 | grep -c "error\["
```

---

## 📋 Next Steps (Start Here!)

### Phase 1: Fix Regular Functions (16 remaining) - **EASIEST!**

These are the simplest errors left. Most return `void` or have obvious types.

```bash
# See the 16 regular functions
python3 scripts/analyze-deno-errors.py 2>/dev/null | grep -A30 "REGULAR FUNCTION"

# Files with regular function errors:
# - mol-gl/webgl/context.ts (2 functions)
# - mol-model-props/computed/interactions/interactions.ts (1 function)
# - etc.
```

**Process:**
```bash
# Find files with regular function errors
deno publish --dry-run 2>&1 | tee /tmp/deno_errors.txt
python3 scripts/analyze-deno-errors.py

# Pick a file, read it to understand return type
# Most return void or have clear return statements
# Fix with sed
# Verify: deno publish --dry-run 2>&1 | grep -c "error\["
```

### Phase 2: Static Method (1 remaining)

Only 1 static method error - quick fix!

### Phase 3: Methods (242 remaining)

After functions, tackle methods using same sed approach.

### Phase 4: Export Functions

The export functions need more analysis but follow same pattern.

---

## 🛠 Key Commands

```bash
# Get fresh error report
deno publish --dry-run 2>&1 | tee /tmp/deno_errors.txt
python3 scripts/analyze-deno-errors.py

# Count errors
deno publish --dry-run 2>&1 | grep -c "error\["

# Find specific error pattern
python3 scripts/analyze-deno-errors.py 2>/dev/null | grep -A50 "REGULAR FUNCTION"
```

---

## 💡 Type Inference Tips (Proven Successful!)

### For Getters (ALL COMPLETE!)
1. **Returns property:** `this._property` → Check property type ✅
2. **Returns method call:** Check method return type ✅
3. **Lazy init:** Look at initialization value ✅
4. **With cast:** `as Type` → Use that Type ✅
5. **Readonly wrapper:** `as Readonly<T>` → Use `Readonly<T>` ✅
6. **One-liner return:** `{ return this.x; }` → Check `this.x` type ✅

### For Functions (Next Target)
1. **No return statement:** → `void`
2. **Returns literal:** → Infer from literal type
3. **Returns variable:** → Check variable type
4. **Returns expression:** → Check expression result type
5. **Multiple returns:** → Find common type or union

### Common Return Types We've Used
- `void` - for functions with no return
- `boolean` - for `hasX`, `isX`, `canX`
- `number` - for counts, indices
- `string` - for labels, names
- `CustomClassName` - for object getters/functions
- `Type | undefined` - for optional values
- `ReadonlyArray<T>` - for arrays
- `ReadonlyMap<K, V>` - for maps
- `StateTransform.Ref` - for refs
- `StateObjectCell` - for cells
- `ReturnType<typeof X['method']>` - for complex types

---

## 📊 Session 7 Complete Summary

### Files Modified: 25 files
### Errors Fixed: 72 (984 → 912)
### Getters Fixed: 70 (100% complete!)

#### Batch 1: Core Structure (27 getters)
1. ✅ **unit.ts** - 17 getters (Atomic + Coarse classes)
2. ✅ **rings.ts** - 6 getters (UnitRings class)
3. ✅ **lookup3d.ts** - 1 getter + import fix
4. ✅ **state.ts** - 3 getters
   - Commit: `dbc685f`

#### Batch 2: Plugin State (12 getters)
5. ✅ **registry.ts** - 4 getters
6. ✅ **animation.ts** - 2 getters
7. ✅ **hierarchy.ts** - 4 getters
8. ✅ **focus.ts** - 2 getters
   - Commit: `aa489c0`

#### Batch 3: Selection & Display (31 getters)
9. ✅ **selection.ts** - 4 getters
10. ✅ **volume/hierarchy.ts** - 2 getters
11. ✅ **viewport-screenshot.ts** - 5 getters
12. ✅ **representation.ts** - 3 getters
13. ✅ **theme.ts** - 2 getters
14. ✅ **assets.ts** - 1 getter
15. ✅ **state.ts** - 3 more getters
16. ✅ **builder.ts** - 4 getters
17. ✅ **component.ts** - 1 getter
18. ✅ **snapshots.ts** - 1 getter
19. ✅ **structure/component.ts** - 1 getter
20. ✅ **context.ts** - 1 getter
21. ✅ **spine.ts** - 1 getter
22. ✅ **transient.ts** - 1 getter
23. ✅ **markdown-extensions.ts** - 1 getter
   - Commit: `5b49416`

### Overall Progress
- **Started:** 1,002 errors (Session 1)
- **Session 7 Start:** 984 errors
- **Session 7 End:** 912 errors
- **Total Fixed:** 90 errors across all sessions
- **Getters:** 70 → 0 (100% COMPLETE!) 🏆

---

## ✅ Success Criteria for Next Session

**Goal:** Fix all 16 regular functions + 1 static method (get down to ~895 errors)

**Steps:**
1. Run `python3 scripts/analyze-deno-errors.py` to find function errors
2. Read each file to understand return types (most are simple!)
3. Use sed for fixes (same strategy as getters)
4. Verify after every 5-10 fixes
5. Commit progress

**These should be FAST - most return `void`!** 🚀

---

## 🎯 Key Learnings from Session 7

1. ✅ **sed preserves formatting perfectly** - Better than edit_file tool
2. ✅ **Batch fixing is extremely efficient** - 72 fixes in one session!
3. ✅ **Type inference from properties is straightforward** - Just read the code
4. ✅ **Pattern consistency helps** - Same types repeat (Boundary, Lookup3D, etc.)
5. ✅ **Commit often** - Easy to track progress and revert if needed
6. ✅ **Generic types work perfectly** - `State`, `T`, etc. in type annotations
7. ✅ **Complex types can use `ReturnType<typeof X['method']>`**

---

## 🎉 Celebration!

**ALL 70 GETTERS ARE NOW FIXED!** This was the main blocker and we powered through them all using the sed strategy. The remaining errors are mostly simple function return types.

**Next session should be even faster** because:
- We've proven
 the sed approach works perfectly
- Regular functions are simpler than getters
- We understand the codebase type patterns
- Only 16 regular functions to fix!

**Keep using this strategy - it's a winner!** 🏆🚀

---

## 📈 Projected Timeline

- **Session 8:** Fix 16 regular functions + 1 static method (~1 hour) → ~895 errors
- **Session 9-10:** Start on methods (242) → ~650 errors  
- **Session 11-15:** Export functions (~460 total) → ~190 errors
- **Session 16-18:** Final cleanup → 0 errors! 🎯

**We're making excellent progress!** At this pace, we could finish in 10-15 more sessions.