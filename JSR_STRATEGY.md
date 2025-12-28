# JSR Slow-Type Fixing Strategy

**Goal:** Remove the need for `--allow-slow-types` flag  
**Current:** 1,141 slow-type issues  
**Target:** 0 slow-type issues

---

## Understanding Slow Types

JSR requires "fast types" for:
1. Automatic documentation generation
2. `.d.ts` file generation for Node.js
3. Fast type-checking for package consumers

### What Causes Slow Types?

1. **Complex Superclass Expressions**
   ```typescript
   // ❌ Slow: JSR can't infer the type
   class Foo extends PluginStateObject.Create<Data>({ name: 'Foo' }) {}
   
   // ✅ Fast: Explicit intermediate type
   const FooBase = PluginStateObject.Create<Data>({ name: 'Foo' });
   class Foo extends FooBase {}
   ```

2. **Computed Property Names Without Types**
   ```typescript
   // ❌ Slow: JSR can't infer property type
   const obj = {
       [computedKey]: value
   };
   
   // ✅ Fast: Explicit type annotation
   const obj: { [key: string]: ValueType } = {
       [computedKey]: value
   };
   ```

3. **Complex Generic Inference Chains**
   ```typescript
   // ❌ Slow: Multiple levels of inference
   const result = complex().chain().transform();
   
   // ✅ Fast: Break into steps with types
   const step1: Step1Type = complex();
   const step2: Step2Type = step1.chain();
   const result: ResultType = step2.transform();
   ```

---

## Fixing Strategy

### Phase 1: Analyze (30 min)
```bash
# Generate complete slow-type report
deno publish --dry-run --allow-dirty --no-check 2>&1 | \
  grep -A 5 "slow-type" > slow-types-report.txt

# Count by category
grep "slow-type-" slow-types-report.txt | sort | uniq -c | sort -rn
```

### Phase 2: Extract Superclass Expressions (6-8 hours)

**Common Pattern in Molstar:**
```typescript
// Find these patterns:
grep -r "extends.*Create<" src/

// Fix each one:
// Before:
export class VolumeStreaming 
    extends PluginStateObject.Create<VolumeServerInfo.Data>({ 
        name: 'Volume Streaming', 
        typeClass: 'Object' 
    }) {}

// After:  
const VolumeStreamingBase = PluginStateObject.Create<VolumeServerInfo.Data>({ 
    name: 'Volume Streaming', 
    typeClass: 'Object' 
});
export class VolumeStreaming extends VolumeStreamingBase {}
```

**Automation Script:**
```python
# scripts/fix-superclass-expressions.py
import re
import sys

pattern = r'class (\w+)\s+extends\s+(\w+\.Create<[^>]+>)\(([^)]+)\)\s*\{\}'

def fix_superclass(content):
    def replacer(match):
        class_name = match.group(1)
        create_expr = match.group(2)
        args = match.group(3)
        
        base_name = f"{class_name}Base"
        return f'''const {base_name} = {create_expr}({args});
export class {class_name} extends {base_name} {{}}'''
    
    return re.sub(pattern, replacer, content, flags=re.MULTILINE | re.DOTALL)
```

### Phase 3: Add Type Annotations (2-4 hours)

**Find computed properties:**
```bash
grep -r "\[.*\]:" src/ | grep -v ".spec.ts"
```

**Add explicit types:**
```typescript
// Before:
const config = {
    [key]: value
};

// After:
const config: Record<string, ValueType> = {
    [key]: value
};
```

### Phase 4: Simplify Generic Chains (2-4 hours)

**Find complex chains:**
```bash
# Look for multiple chained method calls with generics
grep -r "\..*<.*>\..*<.*>" src/
```

**Add intermediate types:**
```typescript
// Before:
return getData<T>().transform<U>().process<V>();

// After:
const data: Data<T> = getData<T>();
const transformed: Transformed<U> = data.transform<U>();
return transformed.process<V>();
```

---

## Estimated Breakdown

| Category | Count | Est. Time | Priority |
|----------|-------|-----------|----------|
| Superclass expressions | ~100 | 6-8h | High |
| Computed properties | ~50 | 2-4h | Medium |
| Generic chains | ~30 | 2-4h | Medium |
| Other patterns | ~961 | 8-12h | Low |

**Total Estimated Effort:** 18-28 hours

---

## Verification Process

After each batch of fixes:

```bash
# 1. Check slow-type count decreased
deno publish --dry-run --allow-dirty --no-check 2>&1 | \
  grep "Found.*problems" 

# 2. Verify no new TS errors
deno check --all src/mod.ts

# 3. Commit progress
git add -A
git commit -m "Fix slow types: [category] (X → Y remaining)"
```

---

## Success Criteria

✅ `deno publish --dry-run --allow-dirty --no-check` succeeds with **0 slow-type problems**  
✅ `deno check --all src/mod.ts` has **0 critical errors**  
✅ Final publish command: `deno publish` (no flags needed)

---

## Quick Reference

### Most Common Slow-Type Errors

1. `slow-type-unsupported-super-class-expr` - Extract superclass to variable
2. `slow-type-computed-property` - Add explicit type annotation
3. `slow-type-complex-inference` - Break into intermediate steps
4. `slow-type-circular-reference` - Add explicit return types

### Files to Prioritize

Based on typical Molstar patterns:
- `src/mol-plugin/behavior/**/*.ts` - Many Create() patterns
- `src/mol-model/**/*.ts` - Complex type hierarchies
- `src/mol-repr/**/*.ts` - Generic chains

---

## Next Session Checklist

- [ ] Generate full slow-type report
- [ ] Count issues by category
- [ ] Start with superclass expressions (highest ROI)
- [ ] Fix in batches of 20-30
- [ ] Test and commit after each batch
- [ ] Track progress: X of 1,141 fixed
