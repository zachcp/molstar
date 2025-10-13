# Next Session Quick-Start Guide

**Status:** 783 errors remaining (219 fixed total, 22% complete!)
**Last Session:** 15 fixes (798 → 783)

---

## 🎯 Quick Start

```bash
# Get fresh error report
deno publish --dry-run 2>&1 | tee /tmp/deno_errors.txt
python3 scripts/analyze-deno-errors.py

# Count fixable errors (exclude 34 unfixable super-class-expr)
deno publish --dry-run 2>&1 | grep "error\[" | grep -v "unsupported-super-class-expr" | wc -l
```

---

## 📊 Current Error Breakdown

### By Type
- `missing-explicit-return-type`: 337
- `missing-explicit-type`: 414
- `unsupported-super-class-expr`: 34 (unfixable)

### By Pattern
1. ✅ **Getters: 0** (100% done!)
2. **Regular functions: 5** (69% done)
3. ✅ **Static methods: 0** (100% done!)
4. **Methods: 170** (30% done)
5. **Export functions: 179** (22% done)
6. **Export consts: 292** (0% - skipping Params definitions)
7. **Other: 137**

### By Directory
1. **mol-plugin-state: 169** ⬅️ TARGET
2. **mol-plugin: 107**
3. **mol-repr: 95** (down from 182!)
4. **mol-model: 77**
5. **mol-state: 69**
6. **mol-script: 68**

---

## 🎯 Recommended Strategy for Next Session

### Phase 1: Target mol-plugin-state (169 errors)
Focus on the highest-error directory:

```bash
# See what's in mol-plugin-state
grep "src/mol-plugin-state" /tmp/deno_error_analysis.txt | head -50

# Look for patterns
grep "src/mol-plugin-state.*builder" /tmp/deno_error_analysis.txt
grep "src/mol-plugin-state.*manager" /tmp/deno_error_analysis.txt
```

### Phase 2: Methods & Export Functions
Focus on these categories (170 + 179 = 349 errors):
- Class methods in builder/manager files
- Export functions with clear return patterns

### Phase 3: Skip Complex Patterns
**DO NOT FIX:**
- `export const SomeParams = { ... }` (292 errors)
- `readonly events = { ... }` (16 occurrences)
- `readonly behaviors = { ... }` (7 occurrences)

These break type inference or are too complex. Save for later.

---

## 🔧 Common Fix Patterns

### Pattern 1: getParams Functions
```typescript
// BEFORE
export function getParams(ctx: ThemeRegistryContext, data: Data) {
    return PD.clone(Params);
}

// AFTER
export function getParams(ctx: ThemeRegistryContext, data: Data): typeof Params {
    return PD.clone(Params);
}
```

### Pattern 2: Visual/Factory Functions
```typescript
// BEFORE
export function createVisual(materialId: number, data: Data,
 props: Props) {
    return Visual(...);
}

// AFTER
export function createVisual(materialId: number, data: Data, props: Props): Visual<Props> {
    return Visual(...);
}
```

### Pattern 3: Arrow Functions in Object Literals
```typescript
// BEFORE
const Visuals = {
    'name': (ctx, getParams) => Representation(...),
};

// AFTER
const Visuals = {
    'name': (ctx: Context, getParams: Getter<Data, Params>): Representation<Params> => 
        Representation(...),
};
```

### Pattern 4: Helper Functions with DataLoci
```typescript
// BEFORE
function MyLoci(helper: Helper, groupId: number, instanceId: number) {
    return DataLoci('tag', helper, [{ groupId, instanceId }], ...);
}

// AFTER
function MyLoci(helper: Helper, groupId: number, instanceId: number): DataLoci<Helper, { groupId: number, instanceId: number }> {
    return DataLoci('tag', helper, [{ groupId, instanceId }], ...);
}
```

### Pattern 5: Methods Returning Simple Types
```typescript
// BEFORE
class Foo {
    get() { return this._value; }
    has(x) { return this._map.has(x); }
    count() { return this._list.length; }
}

// AFTER
class Foo {
    get(): ValueType | undefined { return this._value; }
    has(x: string): boolean { return this._map.has(x); }
    count(): number { return this._list.length; }
}
```

---

## 🛠 Fixing Workflow

### For Single Files (5-10 errors)
```bash
# 1. Look at errors in file
grep "path/to/file.ts" /tmp/deno_errors.txt

# 2. Read the file
cat src/path/to/file.ts | head -100

# 3. Use perl for surgical edits
perl -i.bak -pe 's/(function name.*params)\)/$1): ReturnType/' src/path/to/file.ts
rm src/path/to/file.ts.bak

# 4. Test
deno publish --dry-run 2>&1 | grep "file.ts"
```

### For Batch Fixes (10+ similar errors)
```bash
# 1. Find pattern
grep "pattern" /tmp/deno_error_analysis.txt

# 2. Fix all instances with perl/sed
for file in file1.ts file2.ts file3.ts; do
    perl -i.bak -pe 's/PATTERN/FIX/' src/$file
    rm src/$file.bak
done

# 3. Test all
deno publish --dry-run 2>&1 | grep -E "file1|file2|file3"
```

### Commit Frequently
```bash
# Every 10-15 fixes
git add -A
git commit -m "Add return types to X functions (N errors: A → B)"
```

---

## 🚫 Known Issues

### Don't Fix These (Yet)
1. **Export const Params definitions**
   - Using `: PD.Params` breaks type inference
   - Skip all 292 of these for now

2. **Generic functions with complex inference**
   - Example: `function unaryOp<T>()` where return type must preserve generics
   - Skip if adding a type breaks downstream code

3. **readonly events/behaviors objects**
   - Need complex RxEvent types
   - Save for later

### Signs You Broke Something
```bash
# After your change, if you see NEW errors like:
# - "Type 'X' is not assignable to type 'Y'"
# - "Property 'Z' does not exist"
# Then revert your change - the type was too specific/generic
git checkout path/to/file.ts
```

---

## 💡 Tools & Commands

### Find Errors by Pattern
```bash
# Methods without return types
grep "method" /tmp/deno_error_analysis.txt

# Export functions
grep "export_function" /tmp/deno_error_analysis.txt

# In specific directory
grep "src/mol-plugin-state" /tmp/deno_error_analysis.txt
```

### Quick Type Lookup
```bash
# Find where a type is defined
grep -r "^export type TypeName" src/

# Find function signature
grep -A 3 "export function name" src/path/file.ts

# See what a function returns
grep -A 10 "function name" src/path/file.ts | grep "return"
```

### Test Your Changes
```bash
# Quick check specific file
deno publish --dry-run 2>&1 | grep "your-file.ts" | grep "error\["

# Count before/after
deno publish --dry-run 2>&1 | grep -c "error\["
```

---

## 🎉 Success Milestones

### Completed ✅
- [x] All 70 getters (Session 7)
- [x] All static methods (Session 8)
- [x] All 15 structure representation files (Session 10)
- [x] All volume representation functions (Session 11)

### In Progress 🔄
- [ ] mol-plugin-state directory (169 errors)
- [ ] Methods (170 remaining, 30% done)
- [ ] Export functions (179 remaining, 22% done)

### Future Goals 🎯
- [ ] Get below 500 errors (currently 783)
- [ ] Get below 100 errors
- [ ] Handle export const patterns (292 errors)
- [ ] Reach 0 fixable errors!

---

## 📈 Progress Tracking

```
Session 7:  912 → All getters fixed
Session 8:  908 → Functions + static methods
Session 9:  872 → Major function progress
Session 10: 798 → 74 representation files (BEST!)
Session 11: 783 → 15 volume/helper functions
Session 12: ??? → Target: 40-50 more fixes
```

**Average:** ~44 fixes per session
**Estimated remaining:** 15-18 sessions to <100 errors

---

## 🚀 Start Here!

```bash
# 1. Get fresh error report
deno publish --dry-run 2>&1 | tee /tmp/deno_errors.txt
python3 scripts/analyze-deno-errors.py

# 2. Target mol-plugin-state
grep "src/mol-plugin-state" /tmp/deno_error_analysis.txt | head -30

# 3. Pick a file with 5-10 errors
# 4. Read the file, understand the patterns
# 5. Fix with perl/sed
# 6. Test, commit every 10-15 fixes
# 7. Keep going!
```

**Remember:** Skip export const Params! Focus on methods and functions!