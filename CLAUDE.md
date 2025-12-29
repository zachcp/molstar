# Mol* JSR Migration Guide

**Last Updated:** 2025-12-29  
**Current Status:** v5.5.0 synced, JSR publish ready with `--allow-slow-types`  
**Branch:** `2025-jsr`

---

## Quick Status

| Metric | Current State |
|--------|---------------|
| **Version** | v5.5.0 (latest upstream) |
| **TypeScript Errors** | 0 - All fixed |
| **Slow-Type Issues** | ~240 (require `--allow-slow-types`) |
| **Publish Command** | `deno publish --allow-dirty --allow-slow-types` |

---

## JSR Publishing

### Current Publish Command
```bash
# Dry run
deno publish --dry-run --allow-dirty --allow-slow-types

# Production publish  
deno publish --allow-dirty --allow-slow-types
```

### Why These Flags?
- `--allow-slow-types`: Bypasses ~240 slow-type warnings (complex patterns that can't be easily typed)
- `--allow-dirty`: Allows publishing with uncommitted changes

### Fixed Issues
- ✅ All TypeScript type errors resolved
- ✅ Color theme type errors (6 fixed) 
- ✅ Extension function return types (5 added)
- ✅ Quality assessment type issues (2 fixed)
- ✅ Circular type reference in volume-streaming behavior.ts fixed
- ✅ 100+ `as const` additions to Params objects
- ✅ Explicit return types added to many functions

### Remaining Work
~240 JSR slow-type issues remain. These are complex patterns that cannot be easily fixed:

| Area | Count | Pattern |
|------|-------|---------|
| mol-repr/ | ~94 | RepresentationProvider function returns |
| mol-plugin-state/builder,actions | ~27 | StateAction.build(), PluginStateTransform.BuiltIn() |
| extensions/mvs/ | ~31 | Tree schema definitions |
| mol-gl/renderable/ | ~19 | Schema helper functions |
| mol-canvas3d/ | ~15 | PD.* param spreads |
| mol-geo/ | ~11 | BaseGeometry.Params spreads |
| Other | ~43 | Various complex patterns |

### Why These Can't Be Fixed

JSR requires **explicit type annotations** on all public API symbols. The remaining issues share a common pattern: **builder/factory functions that return complex inferred types**.

**Example - RepresentationProvider pattern:**
```typescript
// This is how mol-repr works:
export const CartoonRepresentationProvider = StructureRepresentationProvider({
  name: 'cartoon',
  factory: CartoonVisualFactory,
  params: CartoonParams,
  // ... more config
});

// JSR wants this, but the return type is ~50 lines of nested generics:
export const CartoonRepresentationProvider: StructureRepresentationProvider<
  StructureRepresentation<StructureParams & CartoonParams>,
  StructureRepresentationState,
  // ... many more type parameters
> = StructureRepresentationProvider({...});
```

**Why we can't just add types:**
1. **Type complexity**: Return types are deeply nested generics (PD.Group, PD.Mapped, etc.)
2. **Type inference chains**: Adding explicit types breaks downstream `typeof` usage
3. **Spread patterns**: `{ ...BaseParams, ...SpecificParams }` creates union types that can't be explicitly written
4. **Builder chains**: `StateAction.build({...}).apply({...})` creates intermediate types

**Options for zero slow-types:**
1. **Pre-build .d.ts files** - Generate declarations with tsc, publish those
2. **Multi-package split** - Separate clean core from complex extensions
3. **Major refactor** - Rewrite builder patterns (high risk, 100+ files)
4. **Accept --allow-slow-types** - Pragmatic choice, types still work for users 

### Safe Fix Patterns
1. **Simple return types**: `: boolean`, `: string`, `: number`, `: void`, `: Promise<void>`
2. **typeof pattern** for complex objects:
   ```typescript
   const _Params = {...} as const;
   export type Params = typeof _Params;
   export const Params: Params = _Params;
   ```
3. **Arrow function return types**: `params: (): { foo: PD.Type } => ({...})`

### Patterns to AVOID (break type inference)
1. `Record<string, Field>` on schema objects - breaks downstream `typeof` inference
2. `PD.Base<T>` when actual type is `PD.Conditioned/Converted`
3. Schema files where other types use `typeof SchemaName`
4. Files with `StateAction.build(...)` chains - require `--allow-slow-types`
5. MVS tree files (`mvs-tree-*.ts`, `animation-tree.ts`) - complex schema inference

### Fixing Slow-Types Workflow

**Step 1: Get current errors and identify files**
```bash
# Save full output
deno task publish 2>&1 > /tmp/slow-types-full.txt

# Count errors
grep -c "error\[missing-explicit" /tmp/slow-types-full.txt

# List files by error count
grep "molstar/src" /tmp/slow-types-full.txt | sed 's/.*molstar\//src\//' | \
  cut -d':' -f1 | sort | uniq -c | sort -rn | head -30
```

**Step 2: Get exact lines for a specific file**
```bash
grep "path/to/file.ts" /tmp/slow-types-full.txt
```

**Step 3: Fix with targeted subagent prompts**

Use this template for subagent tasks:
```
Fix JSR slow-type errors in /path/to/file.ts

Lines to fix: 42, 65, 88, 112

These are likely:
- Line 42: readonly property needs type annotation
- Line 65: function needs return type (e.g., `: boolean`)
- Line 88: const declaration needs typeof pattern
- Line 112: async function needs `: Promise<void>`

Verify with `deno check --all src/mod.ts` - must have 0 errors.
```

**Step 4: Verify and commit**
```bash
# Check for TypeScript errors (must be 0)
deno check --all src/mod.ts 2>&1 | grep -c "TS[0-9]"

# Check slow-type count
deno task publish 2>&1 | grep -c "error\[missing-explicit"

# Commit
git add -A && git commit -m "fix: slow-type fixes (X -> Y)"
```

### Files That Cannot Be Fixed (require --allow-slow-types)
- `src/extensions/mvs/tree/mvs/*.ts` - MVS schema definitions
- `src/extensions/mvs/tree/animation/*.ts` - Animation schema
- `src/mol-plugin-state/actions/structure.ts` - StateAction.build chains
- `src/mol-gl/renderable/schema.ts` - Complex spec helper functions
- Any file with `PluginStateTransform.BuiltIn({...})({...})` patterns

---

## JSR Requirements

### 1. Explicit File Extensions
All imports must include `.ts` or `.tsx`:
```typescript
// ❌ Wrong
import { foo } from './module'

// ✅ Correct  
import { foo } from './module.ts'
```

### 2. No Node.js Built-ins
Replace Node.js APIs:
```typescript
// ❌ Wrong
import { Buffer } from 'node:buffer'

// ✅ Correct
const encoder = new TextEncoder()
```

### 3. Export All Types
Types used in public APIs must be explicitly exported.

### 4. Fast Type Inference
Complex type expressions must be extractable for JSR's documentation.

---

## Current Issues to Fix

### 1. Slow-Type Problems (1,141 issues)

**Main Categories:**
- Complex superclass expressions that can't be inferred
- Computed property names without explicit types
- Complex generic type inference chains

**Example Issue:**
```typescript
// ❌ Slow-type issue
extends PluginStateObject.Create<Data>({ name: 'Foo' }) {}

// ✅ Fixed
const FooBase = PluginStateObject.Create<Data>({ name: 'Foo' });
class Foo extends FooBase {}
```

**Fix Strategy:**
1. Run: `deno publish --dry-run --allow-dirty 2>&1 | grep "slow-type" > slow-types.txt`
2. Extract superclass expressions into variables
3. Add explicit type annotations to computed properties
4. Break complex type chains into intermediate types

### 2. TS4114 Override Warnings (53 in TSX files)

These are in React components and can't be fixed due to Deno TSX parser bugs:
- `src/mol-plugin-ui/controls/parameters.tsx`
- `src/mol-plugin-ui/structure/superposition.tsx`  
- `src/mol-plugin-ui/viewport.tsx`

**Workaround:** These warnings are acceptable since the code is valid.

---

## Automated Fix Scripts

Located in `scripts/`:

| Script | Purpose |
|--------|---------|
| `add-ts-extensions.py` | Add `.ts` extensions to imports |
| `fix-tsx-imports.py` | Fix React component imports (`.ts` → `.tsx`) |
| `fix-directory-imports.py` | Add `/index.ts` to directory imports |
| `add-overrides.py` | Add override keywords (use cautiously in TSX) |

---

## Syncing with Upstream

### Process
```bash
# 1. Create sync branch
git checkout -b sync-to-vX.X.X 2025-jsr

# 2. Merge upstream tag
git merge vX.X.X --no-edit

# 3. Resolve conflicts (usually accept theirs)
git checkout --theirs <conflicted-files>
git add <resolved-files>

# 4. Apply JSR fixes
python3 scripts/add-ts-extensions.py
python3 scripts/fix-tsx-imports.py
python3 scripts/fix-directory-imports.py

# 5. Fix any new critical errors
deno check --all src/mod.ts

# 6. Test publish
deno publish --dry-run --allow-dirty

# 7. Merge back to 2025-jsr
git checkout 2025-jsr
git merge sync-to-vX.X.X
git push origin 2025-jsr
```

### Common Merge Issues
- **WebXR APIs**: Need ambient declarations for setImmediate/clearImmediate
- **Node.js APIs**: Replace with Deno equivalents
- **Property initialization**: Add definite assignment assertions (`!`)

---

## Key Fixes Applied

### 1. WebXR Support
Added ambient declarations in `canvas3d.ts`:
```typescript
declare const setImmediate: ((handler: (...args: any[]) => void, ...args: any[]) => number) | undefined;
declare const clearImmediate: ((handle: number) => void) | undefined;
```

### 2. Node.js Buffer Replacement
Replaced `Buffer.from()` with TextEncoder in `uuid.ts`:
```typescript
const encoder = new TextEncoder();
const bytes = encoder.encode(string);
```

### 3. XRManager API Updates
Updated from `setAttribs/attribs` to `setProps/props + attribs` pattern.

### 4. Property Initialization
Fixed initialization order in `context.ts`:
```typescript
readonly config!: PluginConfigManager;

constructor(public spec: PluginSpec) {
    this.config = new PluginConfigManager(spec.config);
}
```

---

## Next Steps to Remove Flags

### Priority 1: Fix Slow-Type Issues
Target: Reduce 1,141 → 0

**Approach:**
1. Extract ~100 superclass expressions into variables
2. Add explicit types to computed properties
3. Simplify complex generic chains

**Estimated effort:** 10-20 hours of focused work

### Priority 2: Monitor Deno Updates  
The TS4114 in TSX files is a Deno parser bug. Track:
- https://github.com/denoland/deno/issues

---

## Testing Commands

```bash
# Type check
deno check --all src/mod.ts

# Count errors
deno check --all src/mod.ts 2>&1 | grep "TS[0-9]" | wc -l

# List error types
deno check --all src/mod.ts 2>&1 | grep -oE "TS[0-9]+" | sort | uniq -c | sort -rn

# Check slow types
deno publish --dry-run --allow-dirty --no-check 2>&1 | grep "slow-type" | wc -l

# Full publish test
deno publish --dry-run --allow-dirty --allow-slow-types --no-check
```

---

## Repository Structure

```
molstar/
├── src/                      # Source code (JSR compatible)
├── scripts/                  # Automation scripts
├── deno.json                 # JSR configuration
├── CLAUDE.md                 # This file
├── JSR_STRATEGY.md          # Detailed fix strategy
└── CHANGELOG.md              # Version history
```

---

## References

- **JSR Docs**: https://jsr.io/docs
- **Slow Types Guide**: https://jsr.io/go/slow-type
- **Upstream**: https://github.com/molstar/molstar
- **This Fork**: https://github.com/zachcp/molstar

---

## Version History

- **v5.5.0** (2025-12-28): Synced to latest upstream, 0 critical errors
- **v5.4.2** (2025-12-28): Fixed WebXR and Node.js API issues  
- **v5.3.20** (2025-12-27): Initial JSR-compatible release
