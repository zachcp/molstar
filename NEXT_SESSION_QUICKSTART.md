# Next Session Quick-Start Guide

**Last Updated:** Session 7 - In Progress  
**Status:** 955 errors remaining (29 fixed this session!) 🎉

---

## 🎯 Current Status

**Errors:** 984 → 955 (29 fixed)  
**Strategy:** ✅ **Batch fixing with sed is working great!**

### Error Breakdown
- `missing-explicit-return-type`: ~949
- `missing-explicit-type`: ~406 
- `unsupported-super-class-expr`: 34

### By Pattern (Easiest → Hardest)
1. **Getters: 43 remaining** (70 → 43, **27 fixed!** ✅) - **KEEP GOING!**
2. Export const functions: 230
3. Regular functions: 16  
4. Static methods: 1
5. Methods: 242
6. Export functions: 230

---

## 🚀 **WINNING STRATEGY** - Use sed for Batch Fixes!

### What Worked in Session 7

**Approach:** Fix getters in batches using `sed` for minimal changes
- ✅ No code reformatting (preserves original style)
- ✅ Fast and reliable
- ✅ Easy to verify with `deno publish --dry-run`

### The Pattern That Works

```bash
# 1. Run analysis
python3 scripts/analyze-deno-errors.py

# 2. Read file to understand return types
# Look for: property declarations, return statements, function signatures

# 3. Fix with sed (one-liner for each getter)
sed -i '' 'LINE_NUMs/get name() {/get name(): ReturnType {/' FILE.ts

# 4. Verify
deno publish --dry-run 2>&1 | grep -c "error\["
```

### Session 7 Fixes (29 total)

**File: src/mol-model/structure/structure/unit.ts (17 fixes)**
```bash
# Atomic class getters
sed -i '' '225s/get transientCache() {/get transientCache(): Map<any, any> {/' unit.ts
sed -i '' '278s/get boundary() {/get boundary(): Boundary {/' unit.ts
sed -i '' '287s/get lookup3d() {/get lookup3d(): Lookup3D<StructureElement.UnitIndex> {/' unit.ts
sed -i '' '294s/get principalAxes() {/get principalAxes(): PrincipalAxes {/' unit.ts
sed -i '' '300s/get bonds() {/get bonds(): IntraUnitBonds {/' unit.ts
sed -i '' '315s/get rings() {/get rings(): UnitRings {/' unit.ts
sed -i '' '321s/get resonance() {/get resonance(): UnitResonance {/' unit.ts
sed -i '' '327s/get polymerElements() {/get polymerElements(): SortedArray<ElementIndex> {/' unit.ts
sed -i '' '333s/get gapElements() {/get gapElements(): SortedArray<ElementIndex> {/' unit.ts
sed -i '' '339s/get nucleotideElements() {/get nucleotideElements(): SortedArray<ElementIndex> {/' unit.ts
sed -i '' '345s/get proteinElements() {/get proteinElements(): SortedArray<ElementIndex> {/' unit.ts

# Coarse class getters
sed -i '' '415s/get transientCache() {/get transientCache(): Map<any, any> {/' unit.ts
sed -i '' '457s/get boundary() {/get boundary(): Boundary {/' unit.ts
sed -i '' '467s/get lookup3d() {/get lookup3d(): Lookup3D<StructureElement.UnitIndex> {/' unit.ts
sed -i '' '475s/get principalAxes() {/get principalAxes(): PrincipalAxes {/' unit.ts
sed -i '' '481s/get polymerElements() {/get polymerElements(): SortedArray<ElementIndex> {/' unit.ts
sed -i '' '487s/get gapElements() {/get gapElements(): SortedArray<ElementIndex> {/' unit.ts
```

**File: src/mol-model/structure/structure/unit/rings.ts (6 fixes)**
```bash
sed -i '' '40s/get byFingerprint() {/get byFingerprint(): ReadonlyMap<UnitRing.Fingerprint, ReadonlyArray<UnitRings.Index>> {/' rings.ts
sed -i '' '47s/get elementRingIndices() {/get elementRingIndices(): ReadonlyMap<StructureElement.UnitIndex, UnitRings.Index[]> {/' rings.ts
sed -i '' '51s/get elementAromaticRingIndices() {/get elementAromaticRingIndices(): ReadonlyMap<StructureElement.UnitIndex, UnitRings.Index[]> {/' rings.ts
sed -i '' '56s/get ringComponentIndex() {/get ringComponentIndex(): ReadonlyArray<UnitRings.ComponentIndex> {/' rings.ts
sed -i '' '60s/get ringComponents() {/get ringComponents(): ReadonlyArray<ReadonlyArray<UnitRings.Index>> {/' rings.ts
sed -i '' '64s/get aromaticRings() {/get aromaticRings(): ReadonlyArray<UnitRings.Index> {/' rings.ts
```

**File: src/mol-model/structure/structure/util/lookup3d.ts (1 fix)**
```bash
# Added import: import type { Boundary } from '../../../../mol-math/geometry/boundary.ts';
sed -i '' '274s/get boundary() {/get boundary(): Boundary {/' lookup3d.ts
```

**File: src/mol-state/state.ts (3 fixes)**
```bash
sed -i '' '63s/get transforms() {/get transforms(): StateTree.Transforms {/' state.ts
sed -i '' '64s/get current() {/get current(): StateTransform.Ref {/' state.ts
sed -i '' '65s/get root() {/get root(): StateObjectCell {/' state.ts
```

---

## 📋 Next Steps (Start Here!)

### Phase 1: Finish Remaining Getters (43 left)

**Remaining getters are in these files:**
```bash
python3 scripts/analyze-deno-errors.py 2>/dev/null | grep -A50 "^GETTER"
```

Look for files with multiple getters for efficiency.

**Process:**
```bash
# Find files with getter errors
deno publish --dry-run 2>&1 | tee /tmp/deno_errors.txt
python3 scripts/analyze-deno-errors.py

# Pick a file, read it to understand types
# Fix 3-5 getters with sed
# Verify: deno publish --dry-run 2>&1 | grep -c "error\["
```

### Phase 2: After Getters are Done

Move to **Regular Functions** (only 16!) - these are easy too:
- Usually return `void` or have obvious return types
- Same sed approach works

### Phase 3: Then Export Const Functions

The 230 `export const` functions need more analysis but follow same pattern.

---

## 🛠 Key Commands

```bash
# Get fresh error report
deno publish --dry-run 2>&1 | tee /tmp/deno_errors.txt
python3 scripts/analyze-deno-errors.py

# Count errors
deno publish --dry-run 2>&1 | grep -c "error\["

# Find getter errors
python3 scripts/analyze-deno-errors.py 2>/dev/null | grep -A50 "GETTER"
```

---

## 💡 Type Inference Tips

### Common Getter Patterns

1. **Returns property:** `this._property` → Check property type
2. **Returns method call:** Check method return type
3. **Lazy init:** Look at initialization value
4. **With cast:** `as Type` → Use that Type
5. **Readonly wrapper:** `as Readonly<T>` → Use `Readonly<T>`
6. **One-liner return:** `{ return this.x; }` → Check `this.x` type

### Common Return Types

- `boolean` - for `hasX`, `isX`, `canX`
- `number` - for counts, indices
- `string` - for labels, names
- `CustomClassName` - for object getters
- `Type | undefined` - for optional properties
- `ReadonlyArray<T>` - for arrays
- `ReadonlySet<T>` - for sets
- `ReadonlyMap<K, V>` - for maps
- `StateTransform.Ref` - for refs
- `StateObjectCell` - for cells

---

## 📊 Progress Tracker

### Session 7 Summary
**Files Modified:** 4
**Errors Fixed:** 29 (984 → 955)

1. ✅ **unit.ts** - 17 getters (Atomic + Coarse classes)
2. ✅ **rings.ts** - 6 getters (UnitRings class)
3. ✅ **lookup3d.ts** - 1 getter + import fix
4. ✅ **state.ts** - 3 getters

**Commit:** `dbc685f` - "fix: add explicit return types to 29 getters"

### Overall Progress
- **Started:** 1,002 errors (Session 1)
- **Session 7 Start:** 984 errors  
- **Current:** 955 errors
- **Fixed Total:** 47 errors
- **Getters:** 70 → 43 (27 fixed!)

### Estimated Timeline
- **43 getters remaining** × 2 min/each = ~86 min (~1.5 hours)
- **At current pace:** Could finish all getters in 1-2 more sessions!
- **Then:** 16 regular functions (easy!)
- **Then:** Export functions and methods

---

## ✅ Success Criteria for Next Session

**Goal:** Fix remaining 43 getters (get down to ~912 errors or less)

**Steps:**
1. Run `python3 scripts/analyze-deno-errors.py` to find getter files
2. Pick files with 2+ getters (more efficient)
3. Use sed for batch fixes
4. Verify after every 5-10 fixes
5. Commit progress periodically

**You're doing amazing! The sed approach is perfect!** 🏆

---

## 🎯 Key Learnings

1. **sed preserves formatting** - Better than edit_file tool
2. **Batch fixing is fast** - 17 getters in ~10 minutes
3. **Type inference is straightforward** - Look at property types
4. **Pattern consistency** - Same types repeat (Boundary, Lookup3D, etc.)
5. **Commit often** - Makes it easy to track progress

Keep using this strategy! 🚀