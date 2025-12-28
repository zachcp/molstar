# JSR Slow-Types Elimination Progress

## Current Status (as of latest commit)

**Total slow-types remaining: 1,103**
- 609 missing-explicit-return-type errors
- 494 missing-explicit-type errors

## Completed Work

### 1. Superclass Expression Fixes (38 errors eliminated)
✅ Fixed all `unsupported-super-class-expr` errors by extracting complex superclass expressions into const variables.

**Files fixed:**
- `src/mol-plugin-state/objects.ts` (33 fixes)
- `src/mol-plugin/behavior/behavior.ts` (3 fixes)
- `src/mol-plugin/behavior/dynamic/volume-streaming/*.ts` (2 fixes)
- `src/extensions/sb-ncbr/tunnels/data-model.ts` (2 fixes)
- `src/extensions/mvs/components/formats.ts` (1 fix)
- `src/extensions/g3d/format.ts` (1 fix)

### 2. Explicit Type Annotations (38 type annotations added)
✅ Added explicit `ReturnType<typeof ...>` annotations to all superclass base constants.

**Pattern applied:**
```typescript
// Before:
const FooBase = Create<Data>({ name: 'Foo', typeClass: 'Data' });

// After:
const FooBase: ReturnType<typeof Create<Data>> = Create<Data>({ name: 'Foo', typeClass: 'Data' });
```

## Remaining Work

### Missing Explicit Return Types (609 errors)

**Common patterns identified:**
1. **Getter methods** - Need return type annotations:
   ```typescript
   // Fix: get foo() { return this.bar; }
   // To:  get foo(): TypeOfBar { return this.bar; }
   ```

2. **Factory functions** - Need return type annotations:
   ```typescript
   // Fix: export function createFoo(x: X) { return new Foo(x); }
   // To:  export function createFoo(x: X): Foo { return new Foo(x); }
   ```

3. **Async functions** - Need Promise return types:
   ```typescript
   // Fix: export async function loadData() { ... }
   // To:  export async function loadData(): Promise<void> { ... }
   ```

4. **Methods in classes** - Need return type annotations:
   ```typescript
   // Fix: update() { this.state.update(); }
   // To:  update(): void { this.state.update(); }
   ```

**Files with highest error counts:**
- `src/mol-canvas3d/camera.ts` - Multiple getter/method errors
- `src/mol-data/db/column.ts` - Factory function errors
- `src/mol-data/db/table.ts` - Utility function errors
- Various extension files

### Missing Explicit Types (494 errors)

Need to analyze these separately - typically variable/property declarations missing type annotations.

## Strategy for Completion

### Approach 1: Manual Batching (Recommended for Quality)
1. Fix one file at a time, starting with files with most errors
2. Test after each file to ensure no regressions
3. Commit in batches of 10-20 fixes

**Estimated effort:** 18-28 hours (609 + 494 fixes, ~1-2 min per fix)

### Approach 2: Automated Script
Create Python script to parse error output and generate patches:
- Extract file paths, line numbers, function names
- Infer return types from function bodies
- Generate edit commands

**Risk:** May introduce incorrect types requiring manual review

## Next Steps

1. Generate detailed breakdown of remaining 494 `missing-explicit-type` errors
2. Choose batching strategy (manual vs. automated)
3. Begin systematic fixes file-by-file
4. Target: Achieve clean `deno publish` with zero slow-types

## Success Criteria

✅ `deno publish --dry-run` passes without `--allow-slow-types` flag  
✅ `deno publish --dry-run` passes without `--no-check` flag  
✅ Zero slow-type errors reported  
✅ All TypeScript compilation succeeds
