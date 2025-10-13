# Next Session Quick-Start Guide

**Last Updated:** Session 7 In Progress  
**Status:** 984 errors remaining (18 fixed!) - Batch fixing works! 🎉

---

## 🎯 Current Status

**Errors:** 1,002 → 984 (18 fixed)  
**Strategy:** ✅ **Batch fixing with sed is working great!**

### Error Breakdown
- `missing-explicit-return-type`: 556 (down from 562)
- `missing-explicit-type`: 406 
- `unsupported-super-class-expr`: 34

### By Pattern (Easiest → Hardest)
1. **Getters: 79 remaining** (87 → 79, 8 fixed ✅) - **KEEP GOING HERE!**
2. Export const functions: 291
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
# 1. Identify file with multiple getter errors
python3 scripts/analyze-deno-errors.py | grep "GETTER" -A20

# 2. Read the file to understand return types
# Look for: property declarations, return statements, function signatures

# 3. Fix with sed (one-liner for each getter)
sed -i.bak 'LINE_NUMs/get name() {/get name(): ReturnType {/' FILE.ts
rm FILE.ts.bak

# 4. Verify
deno publish --dry-run 2>&1 | grep -c "error\["
```

### Example: Fixed 13 getters in structure.ts

```bash
# File: src/mol-model/structure/structure/structure.ts
sed -i.bak '125s/get customPropertyDescriptors() {/get customPropertyDescriptors(): CustomProperties {/' FILE
sed -i.bak2 '234s/get parent() {/get parent(): Structure | undefined {/' FILE
sed -i.bak3 '253s/get boundary() {/get boundary(): Boundary {/' FILE
# ... etc
rm FILE.bak*
```

**Result:** 13 getters fixed in ~5 minutes!

---

## 📋 Next Steps (Start Here!)

### Phase 1: Continue Fixing Getters (79 left)

**Target Files with Multiple Getters:**

1. **`src/mol-model/structure/structure/unit.ts`** - Check for getters
2. **`src/mol-model/structure/model/model.ts`** - Check for getters
3. **`src/mol-plugin-state/`** - Many files with getters

**Process:**
```bash
# Find files with getter errors
deno publish --dry-run 2>&1 | tee /tmp/deno_errors.txt
python3 scripts/analyze-deno-errors.py | grep -A50 "GETTER"

# Pick a file, read it to understand types
# Fix 5-10 getters with sed
# Verify: deno publish --dry-run 2>&1 | grep -c "error\["
```

### Phase 2: After Getters are Done

Move to **Regular Functions** (only 16!) - these are easy too:
- Usually return `void` or have obvious return types
- Same sed approach works

### Phase 3: Then Export Const Functions

The 291 `export const` functions need more analysis but follow same pattern.

---

## 🛠 Key Commands

```bash
# Get fresh error report
deno publish --dry-run 2>&1 | tee /tmp/deno_errors.txt
python3 scripts/analyze-deno-errors.py

# Count errors
grep -c "error\[" /tmp/deno_errors.txt

# Find getter errors
grep "get " /tmp/deno_errors.txt | head -20

# Quick verify a fix
deno check src/path/to/file.ts
```

---

## 💡 Type Inference Tips

### Common Getter Patterns

1. **Returns property:** `this._property` → Check property type
2. **Returns method call:** Check method return type
3. **Lazy init:** Look at initialization value
4. **With cast:** `as Type` → Use that Type
5. **Readonly wrapper:** `as Readonly<T>` → Use `Readonly<T>`

### Common Return Types

- `boolean` - for `hasX`, `isX`, `canX`
- `number` - for counts, indices
- `string` - for labels, names
- `CustomClassName` - for object getters
- `Type | undefined` - for optional properties
- `ReadonlyArray<T>` - for arrays
- `ReadonlySet<T>` - for sets
- `ReadonlyMap<K, V>` - for maps

---

## 📊 Progress Tracker

### Session 7 Fixes
- ✅ 3 getters in stereo.ts
- ✅ 1 getter in bounding-sphere-helper.ts  
- ✅ 1 getter in draw.ts
- ✅ 1 getter in illumination.ts
- ✅ 13 getters in structure.ts
- **Total: 18 fixes** 🎉

### Estimated Timeline
- **79 getters** × 2 min/each = ~160 min (~3 hours total)
- At current pace: ~30-40 getters per session
- **2-3 more sessions to finish getters!**

---

## ✅ Success Criteria for Next Session

**Goal:** Fix 30+ more getters (get down to ~950 errors)

**Steps:**
1. Run `python3 scripts/analyze-deno-errors.py` to find getter files
2. Pick files with 3+ getters (more efficient)
3. Use sed for batch fixes
4. Verify after every 5-10 fixes
5. Commit progress periodically

**You're doing great! The sed approach is the winner!** 🏆