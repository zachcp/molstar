# Next Session Quick-Start Guide

**Status:** 764 errors remaining (730 fixable)
**Current State:** 316 return type errors + 414 parameter type errors + 34 unfixable

---

## 🎯 Reality Check

We currently have **764 Deno slow-type errors**:
- `missing-explicit-return-type`: **316 errors**
- `missing-explicit-type`: **414 errors** (parameter types)
- `unsupported-super-class-expr`: **34 errors** (unfixable by design)

**Fixable errors: 730**

---

## 📊 Current Error Breakdown

### By Type
- Missing return types: 316
- Missing parameter types: 414
- Unfixable super-class: 34

### By Directory
1. **mol-plugin-state: 155 errors**
2. **mol-plugin: 107 errors**
3. **mol-repr: 95 errors**
4. **mol-model: 77 errors**
5. **mol-state: 69 errors**
6. **mol-script: 68 errors**
7. **mol-theme: 48 errors**
8. **mol-util: 43 errors**

### By Pattern
- **export_const: 292 errors** (Params definitions, etc.)
- **export_function: 173 errors**
- **method: 160 errors**
- **other: 134 errors**
- **regular_function: 5 errors**

---

## 🚀 Start Here - Quick Commands

```bash
# Get fresh error report
deno publish --dry-run 2>&1 | tee /tmp/deno_errors.txt
python3 scripts/analyze-deno-errors.py

# Count fixable errors (exclude unfixable super-class-expr)
deno publish --dry-run 2>&1 | grep "error\[" | grep -v "unsupported-super-class-expr" | wc -l
# Should show: 730
```

---

## 🎯 Recommended Strategy

### Phase 1: Export Functions (173 errors)
Start with explicit function exports - they're usually straightforward.

```bash
# See export function errors
grep "export_function" /tmp/deno_error_analysis.txt | head -30

# Look for simple patterns
grep "src/mol-model-formats" /tmp/deno_error_analysis.txt
grep "src/mol-theme.*getParams" /tmp/deno_error_analysis.txt
```

**Common patterns:**
- `getParams()` functions → `typeof Params`
- Factory functions → specific return types
- Helper functions → infer from return statements

### Phase 2: Methods (160 errors)
Focus on class methods with clear return values.

```bash
# See method errors
grep "method" /tmp/deno_error_analysis.txt | head -30
```

**Common patterns:**
- Registry `get()` methods → `Type | undefined`
- Registry `has()` methods → `boolean`
- Builder methods → check what they actually return

### Phase 3: Export Consts (292 errors) - CAREFUL!
These are tricky - many need parameter types, not return types.

```bash
# See export const errors
grep "export_const" /tmp/deno_error_analysis.txt | head -30
```

**⚠️ WARNING:** 
- DON'T add `: PD.Params` to Params definitions (breaks inference)
- DON'T add types to complex object literals without testing
- DO test each change immediately

### Phase 4: Parameter Types (414 errors)
These require adding types to function parameters.

```bash
# Find parameter type errors
grep "missing-explicit-type" /tmp/deno_errors.txt | head -30
```

**Common patterns:**
- Arrow functions in objects need parameter types
- Callback functions need explicit types
- Generic function parameters need constraints

---

## 🔧 Common Fix Patterns

### Pattern 1: Export Functions with Simple Returns
```typescript
// BEFORE
export function getParams(ctx: Context, data: Data) {
    return PD.clone(Params);
}

// AFTER
export function getParams(ctx: Context, data: Data): typeof Params {
    return PD.clone(Params);
}
```

### Pattern 2: Registry Methods
```typescript
// BEFORE
get(name: string) {
    return this.map.get(name);
}

// AFTER
get(name: string): Type | undefined {
    return this.map.get(name);
}
```

### Pattern 3: Boolean Return Methods
```typescript
// BEFORE
has(key: string) {
    return this.map.has(key);
}

// AFTER
has(key: string): boolean {
    return this.map.has(key);
}
```

### Pattern 4: Parameter Types in Arrow Functions
```typescript
// BEFORE
const Visuals = {
    'name': (ctx, getParams) => Representation(...),
};

// AFTER
const Visuals = {
    'name': (ctx: Context, getParams: Getter): Representation => 
        Representation(...),
};
```

### Pattern 5: Builder Methods - CHECK WHAT THEY RETURN!
```typescript
// DON'T assume they return void!
// Check what .commit() actually returns

// WRONG
async createModel(...): Promise<void> {
    return model.commit({ revertOnError: true });
}

// RIGHT - check the actual return type of commit()
async createModel(...): Promise<StateObjectSelector<SO.Molecule.Model>> {
    return model.commit({ revertOnError: true });
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

# 3. Make targeted edits
# Use your editor or perl for specific changes

# 4. Test immediately
deno publish --dry-run 2>&1 | grep "file.ts"

# 5. If you introduced errors, revert
git checkout src/path/to/file.ts
```

### For Batch Fixes (Similar Patterns)
```bash
# 1. Find all occurrences of pattern
grep "pattern" /tmp/deno_error_analysis.txt

# 2. Pick 3-5 files to test
# Fix manually first to verify pattern

# 3. Test the sample
deno publish --dry-run 2>&1 | grep -E "file1|file2|file3"

# 4. If successful, apply to remaining files
# If not, revert and re-evaluate

# 5. Commit frequently
git add -A
git commit -m "Add return types to X (N errors fixed)"
```

---

## ⚠️ Critical Rules

### DO:
1. ✅ Test IMMEDIATELY after each change
2. ✅ Check actual return types (don't guess)
3. ✅ Commit every 10-15 fixes
4. ✅ Revert if you introduce errors
5. ✅ Use grep to find similar patterns

### DON'T:
1. ❌ Add `: PD.Params` to export const definitions
2. ❌ Assume builder methods return `void`
3. ❌ Make batch changes without testing samples
4. ❌ Keep code that introduces new errors
5. ❌ Skip verification steps

---

## 🎯 Target for Next Session

**Realistic Goal:** Fix 50-100 errors
- Focus on export functions (173 available)
- Or methods with clear return types (160 available)
- Avoid export const until patterns are clearer

**Stretch Goal:** Fix 150+ errors
- Tackle parameter types (414 available)
- Need to understand callback signatures

---

## 📝 Session Template

```bash
# Start of session
deno publish --dry-run 2>&1 | tee /tmp/deno_errors.txt
python3 scripts/analyze-deno-errors.py
START_COUNT=$(deno publish --dry-run 2>&1 | grep "error\[" | grep -v "unsupported-super-class-expr" | wc -l)
echo "Starting with: $START_COUNT errors"

# Pick a target directory or pattern
grep "src/TARGET_DIR" /tmp/deno_error_analysis.txt | head -20

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

## 🔍 Debugging When Things Go Wrong

### If error count increases:
```bash
# See what you changed
git diff

# Check new errors
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

# Verify your fix is actually there
git diff path/to/file.ts
```

---

## 📚 Useful Commands

### Find specific error patterns
```bash
# All export function errors
grep "export_function" /tmp/deno_error_analysis.txt

# All method errors in specific directory
grep "src/mol-plugin-state.*method" /tmp/deno_error_analysis.txt

# Parameter type errors
grep "missing-explicit-type" /tmp/deno_errors.txt | head -20
```

### Check specific files
```bash
# See all errors in a file
grep "path/to/file.ts" /tmp/deno_errors.txt

# Count errors in directory
grep "src/mol-plugin-state" /tmp/deno_errors.txt | wc -l
```

### Quick type lookup
```bash
# Find where a type is defined
grep -r "^export type TypeName" src/

# Find function signature
grep -A 5 "export function name" src/path/file.ts
```

---

## 💡 Tips for Success

1. **Start small** - Fix 5-10 similar errors first
2. **Test constantly** - Every single change
3. **Understand patterns** - Don't blindly apply fixes
4. **Read the code** - Know what functions actually return
5. **Commit frequently** - Safety net for reverts
6. **Take breaks** - Type errors are mentally taxing
7. **Track progress** - Celebrate small wins

---

## 📈 Progress Tracking

```
Starting point: 764 errors (730 fixable)
Target: < 600 errors after next session
Long-term: < 100 errors

Remember: Slow and steady wins the race!
Test every change, revert mistakes, commit often.
```

---

**Good luck! Start with export functions, test everything, and commit often!** 🚀