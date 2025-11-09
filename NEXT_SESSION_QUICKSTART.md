# Next Session Quick-Start Guide

**Status:** 562 errors remaining
**Progress:** 23.0% complete (168 errors fixed)

---

## 🎯 Current State

- `missing-explicit-return-type`: ~585 errors
- `unsupported-super-class-expr`: 33 errors (unfixable)

**Recent Session:** Fixed 135 errors across 3 rounds (events/behaviors, component methods, manager methods)

---

## 🆕 BATCH FIX OPPORTUNITIES FOUND! 🎉

**New Discovery:** Found **43 high-confidence batch fixes** with similar patterns!

See `BATCH_FIX_OPPORTUNITIES.md` for detailed analysis.

### Quick Summary:
- ✅ **16 files** with `readonly events = { ... }` pattern
- ✅ **7 files** with `readonly behaviors = { ... }` pattern  
- ✅ **20+ files** with simple export function return types
- 🎯 **Total Impact:** ~43 errors (6.5% of remaining)
- ⏱️ **Time Estimate:** ~2 hours
- 🎯 **Goal:** Get below 650 errors (10% milestone!)

### Helper Script:
```bash
./scripts/batch-fix-helper.sh
```

---

## 📊 Top Error Directories

1. **src/mol-plugin-state** - 67 errors
2. **src/mol-state** - 63 errors
3. **src/mol-util** - 38 errors
4. **src/mol-canvas3d** - 33 errors
5. **src/mol-plugin** - 34 errors
6. **src/mol-script** - 27 errors
7. **src/mol-model** - 9 errors (cleaned up!)

---

## 🚀 Quick Start Commands

```bash
# Get fresh error count
deno publish --dry-run 2>&1 | tee /tmp/deno_errors.txt
python3 scripts/analyze-deno-errors.py

# Track progress
START_COUNT=664
# ... make fixes ...
END_COUNT=$(deno publish --dry-run 2>&1 | grep "error\[" | grep -v "unsupported-super-class-expr" | wc -l | tr -d ' ')
echo "Fixed: $((START_COUNT - END_COUNT)) errors ($START_COUNT → $END_COUNT)"

# Commit frequently
git add -A && git commit -m "Fix X errors: description"
```

---

## 💡 Common Patterns

### Export Functions (123 remaining) - EASIEST
```typescript
// ❌ Before
export function conformationHash(s: Structure) {
    return hashString(...);
}

// ✅ After
export function conformationHash(s: Structure): number {
    return hashString(...);
}
```

### Methods (101 remaining)
```typescript
// Boolean returns
areEqual(a, b): boolean { return a === b; }

// Getters
getStructure(): Structure { return this._getStructure(); }

// Void methods
dispose(): void { this.cleanup(); }
```

### Type Guards (use `is` predicates)
```typescript
export function isAtomic(u: Unit): u is Atomic {
    return u.kind === Kind.Atomic;
}
```

### Union Return Types
```typescript
export function getConformation(u: Unit): 
    | AtomicConformation 
    | CoarseSphereConformation 
    | CoarseGaussianConformation {
    return getModelConformationOfKind(u.kind, u.model);
}
```

---

## ⚠️ Critical Rules

### DO:
- Test immediately: `deno publish --dry-run 2>&1 | tail -30`
- Commit every 10-20 fixes
- Read the code to understand return types
- Use hover in VS Code to see inferred types

### DON'T:
- ❌ Add `: PD.Params` to `export const Params = { ... }` definitions
- ❌ Make batch changes without testing
- ❌ Guess return types - verify them!
- ❌ Keep code that introduces TypeScript errors

---

## 🎯 Recommended Targets This Session

### ⭐ Option A: BATCH FIX - Events/Behaviors (RECOMMENDED!)
**Impact:** 23 errors in ~1.5 hours  
**Difficulty:** MEDIUM  
**Files:** All have same pattern - add `Subject<T>` or `BehaviorSubject<T>` types

```bash
# See the detailed plan
cat BATCH_FIX_OPPORTUNITIES.md

# Use helper script
./scripts/batch-fix-helper.sh
```

**Phase 1 - Simple Events (4 files, 30 min):**
- src/mol-plugin/util/toast.ts:33 (1 property - EASIEST)
- src/mol-plugin-state/manager/animation.ts:26 (2 properties)
- src/mol-state/action/manager.ts:21 (2 properties)
- src/mol-plugin/util/substructure-parent-helper.ts:18

**Example Fix:**
```typescript
// BEFORE
readonly events = {
    changed: this.ev()
};

// AFTER (add type annotation)
readonly events: { changed: Subject<void> } = {
    changed: this.ev()
};
```

### Option B: mol-state (69 errors)
Clean, focused files with similar patterns
```bash
grep "src/mol-state" /tmp/deno_errors.txt | head -20
```

### Option C: mol-util (43 errors)
Utility functions - usually straightforward return types
```bash
grep "src/mol-util" /tmp/deno_errors.txt | head -20
```

### Option D: mol-canvas3d (33 errors)
Graphics-related, good for learning the codebase
```bash
grep "src/mol-canvas3d" /tmp/deno_errors.txt | head -20
```

---

## 📈 Progress Milestones

```
Starting point: 730 fixable errors
Current: 562 errors

- ✅ < 700 errors - ACHIEVED!
- ✅ < 650 errors (10%) - ACHIEVED!
- 🎯 < 500 errors (30%) - 62 more to go
- 🎯 < 500 errors (30%)
- 🎯 < 250 errors (65%)
- 🎯 < 100 errors (85%)
- 🏁 0 errors (100%)

Pace: ~56 errors/session = ~10 sessions remaining
```

---

## 🔧 If Something Goes Wrong

```bash
# See what changed
git diff

# Check new TypeScript errors (not just slow-type)
deno publish --dry-run 2>&1 | grep "TS[0-9]" | head -20

# Revert problematic file
git checkout path/to/file.ts

# Nuclear option
git reset --hard HEAD
```

---

## 🎬 Start Here

### RECOMMENDED: Start with Batch Fixes!

1. **Read the batch opportunities:**
   ```bash
   cat BATCH_FIX_OPPORTUNITIES.md
   ```

2. **Run the helper script:**
   ```bash
   ./scripts/batch-fix-helper.sh
   ```

3. **Start with Phase 1 (Simple Events):**
   - Pick `src/mol-plugin/util/toast.ts:33` (easiest)
   - Read the file to see the structure
   - Add type annotation: `readonly events: { changed: Subject<void> } = { ... }`
   - Test: `deno publish --dry-run 2>&1 | grep toast`
   - Commit if successful

4. **Continue with remaining Phase 1 files**
   - Fix 2-3 more simple events
   - Test after each
   - Commit every 2-3 fixes

5. **Move to Phase 2-3** if time permits

### ALTERNATIVE: Pick Individual Fixes

1. Run fresh error check
2. Pick ONE directory to focus on
3. Fix 20-30 errors (1-2 hour session)
4. Test and commit
5. Update this file with new count

---

**Target for next session:** Get below 500 errors (30% milestone!)

**Recent fixes (3 rounds):**
- ✅ Fixed 6 readonly events/behaviors type annotations
- ✅ Fixed 13 simple return types (boolean, void, Promise<void>, etc.)
- ✅ Fixed 10 builder/hierarchy methods (hasPreset, getPresets, etc.)
- ✅ Fixed 12 manager methods (getIndex, remove, add, etc.)

Good luck! 🚀