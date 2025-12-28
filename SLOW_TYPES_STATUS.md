# Slow Types Fix Progress for JSR Publishing

## Current Status (2025-12-28)

**Branch**: `2025-jsr`  
**Total Slow Types Remaining**: 839 errors  
**deno task publish**: ✅ Type checking passes, ⚠️ 839 slow-type warnings

## Completed Work

### ✅ Phase 1: Math Utilities (166 functions fixed)
- **vec3.ts**: 32 functions - explicit return types added
- **mat4.ts**: 34 functions - explicit return types added
- **quat.ts**: 28 functions - explicit return types added
- **mat3.ts**: 24 functions - explicit return types added
- **vec4.ts**: 25 functions - explicit return types added
- **vec2.ts**: 23 functions - explicit return types added

### ✅ Phase 2: TypeScript Override Modifiers (53 fixes)
- **parameters.tsx**: 46 methods fixed
- **superposition.tsx**: 4 methods fixed
- **viewport.tsx**: 3 methods fixed

All methods in React components that override base class methods now have the `override` keyword.

## Remaining Work

### Slow-Type Error Categories

Based on the output from `deno task publish 2>&1`, the 839 remaining errors fall into these categories:

1. **Missing explicit return types on functions** (~600-700 errors)
   - Most common issue
   - Pattern: `export function functionName(...) {` needs `: ReturnType`
   - Async functions need `: Promise<ReturnType>`

2. **Missing explicit types on exported variables** (~100-150 errors)
   - Pattern: `export const varName = ...` needs `: Type`

3. **Missing explicit types on class properties** (~50-100 errors)
   - Pattern: class properties need explicit type annotations

## Key Files with High Error Counts

Based on the error output, focus on these high-impact areas:

### Data Structures (`mol-data/`)
- `src/mol-data/int/sorted-ranges.ts` - ~20+ functions
- `src/mol-data/int/tuple.ts` - ~10+ functions
- `src/mol-data/util/grouping.ts` - ~5+ functions

### Geometry Primitives (`mol-math/geometry/primitives/`)
- `src/mol-math/geometry/primitives/box3d.ts` - ~15+ functions
- `src/mol-math/geometry/primitives/sphere3d.ts` - ~20+ functions

### Geometry (`mol-geo/`)
- `src/mol-geo/geometry/mesh/mesh.ts` - ~10+ functions
- `src/mol-geo/geometry/texture-mesh/texture-mesh.ts` - ~5+ functions
- `src/mol-geo/geometry/interior.ts` - ~2+ functions

### Extensions
- `src/extensions/mvs/` - ~20+ functions across multiple files
- `src/extensions/model-archive/` - ~5+ functions
- `src/extensions/pdbe/` - ~5+ functions
- `src/extensions/anvil/behavior.ts` - ~2+ functions

## Common Patterns to Fix

### Pattern 1: Simple Return Type
```typescript
// BEFORE
export function count(ranges: SortedRanges) {
    return ranges.length;
}

// AFTER
export function count(ranges: SortedRanges): number {
    return ranges.length;
}
```

### Pattern 2: Generic Return Type
```typescript
// BEFORE
export function create<T>(value: T) {
    return { value };
}

// AFTER  
export function create<T>(value: T): { value: T } {
    return { value };
}
```

### Pattern 3: Async Function
```typescript
// BEFORE
export async function loadData(url: string) {
    const response = await fetch(url);
    return response.json();
}

// AFTER
export async function loadData(url: string): Promise<any> {
    const response = await fetch(url);
    return response.json();
}
```

### Pattern 4: Void Return
```typescript
// BEFORE
export function attachFromCifOrApi(model: Model) {
    model.someProperty = someValue;
}

// AFTER
export async function attachFromCifOrApi(model: Model): Promise<void> {
    model.someProperty = someValue;
}
```

### Pattern 5: Constructor/Factory Functions
```typescript
// BEFORE
function Box3D() {
    return { min: [0,0,0], max: [0,0,0] };
}

// AFTER
function Box3D(): Box3D {
    return { min: [0,0,0], max: [0,0,0] };
}
```

## Automation Strategy

To fix the remaining 839 errors efficiently:

1. **Extract all errors to file**:
   ```bash
   cd /Users/zcpowers/Documents/Projects/molstar
   deno task publish 2>&1 > /tmp/slow_types_full.txt
   ```

2. **Parse errors by file and line number**

3. **Use automated script to add return types** where TypeScript can infer them:
   - Read each function
   - Use TypeScript compiler API to infer return type
   - Add explicit annotation

4. **Manual review** for complex cases

## Testing Commands

```bash
# Check slow types count
deno task publish 2>&1 | tail -20

# Publish with slow types (current workaround)
deno publish --dry-run --allow-slow-types --no-check

# Full check
deno task check
```

## Git Status

Last commit: `740082a6e` - "fix: add override modifiers to React component methods (53 fixes)"

All changes have been pushed to remote `2025-jsr` branch.

## Next Steps for New Session

1. Start with high-impact files (data structures and geometry primitives)
2. Use batch fixes for similar patterns
3. Commit in logical groups (e.g., "fix: add return types to mol-data/int/*.ts")
4. Re-run `deno task publish` frequently to track progress
5. Target milestone: Get under 500 errors, then 200, then 0

## Notes

- The TypeScript compiler already knows the return types (code compiles)
- This is purely about making types explicit for JSR/Deno's static analysis
- Most fixes are mechanical - add `: Type` annotations
- Focus on public API functions first (exported functions)
