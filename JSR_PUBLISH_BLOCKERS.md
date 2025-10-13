# JSR Publication Blockers - Analysis & Action Plan

**Date:** December 2024  
**Command:** `deno publish --dry-run`  
**Status:** 54 blocking errors preventing JSR publication  
**Priority:** HIGH - These are the actual blockers, not dev dependency issues

---

## Executive Summary

Running `deno publish --dry-run` reveals **54 type errors** that must be fixed before the package can be published to JSR. These are significantly fewer than the 1,864+ errors from `deno check --all` because JSR only checks the published entry points and their dependencies.

**Error Breakdown:**
- TS2339: 16 errors (WebXR type definitions missing)
- TS2729: 15 errors (Property initialization order)
- TS2345: 8 errors (Argument type mismatches)
- TS2322: 3 errors (Type assignment issues)
- TS4115: 2 errors (Export modifiers)
- TS2786: 2 errors (Type compatibility)
- TS2693: 2 errors (Type used as value)
- Others: 6 errors (single occurrences each)

---

## Category 1: WebXR Type Definitions (16 errors) - HIGH PRIORITY

### Issue
WebXR API types are not available in Deno's type definitions. The `navigator.xr` property and XR session methods don't exist in the standard DOM types.

### Affected Files
- `src/mol-canvas3d/canvas3d.ts` (4 errors)
- `src/mol-canvas3d/helper/xr-manager.ts` (12 errors)

### Errors
1. **Property 'xr' does not exist on type 'Navigator'** (9 occurrences)
   ```typescript
   // Lines in xr-manager.ts: 264, 267, 268, 274, 276, 277, 278
   if (!navigator.xr) return false;
   navigator.xr.isSessionSupported('immersive-ar')
   navigator.xr.requestSession('immersive-vr')
   ```

2. **Property 'environmentBlendMode' does not exist on type 'XRSession'** (4 occurrences)
   ```typescript
   // Lines in canvas3d.ts: 759, 794, 804
   if (xrManager.session?.environmentBlendMode === "alpha-blend") {
   ```

3. **Property 'updateRenderState' does not exist on type 'XRSession'** (1 occurrence)
   ```typescript
   // Line in xr-manager.ts: 143
   xrSession.updateRenderState({ baseLayer: new XRWebGLLayer(xrSession, gl) });
   ```

4. **Property 'requestReferenceSpace' does not exist on type 'XRSession'** (1 occurrence)
   ```typescript
   // Line in xr-manager.ts: 238
   this.xrRefSpace = await this.xrSession.requestReferenceSpace('local');
   ```

5. **'XRRigidTransform' only refers to a type** (1 occurrence - TS2693)
   ```typescript
   // Line in xr-manager.ts: 33
   return new XRRigidTransform(Vec3.toObj(d.position), Quat.toObj(d.quaternion));
   ```

### Solution Options

#### Option A: Add WebXR Type Definitions (Recommended)
Add `@types/webxr` to dependencies:

```json
// deno.json
{
  "imports": {
    "@types/webxr": "npm:@types/webxr@^0.5.20"
  },
  "compilerOptions": {
    "types": ["@types/webxr"]
  }
}
```

#### Option B: Create Custom Type Declarations
Create `src/types/webxr.d.ts`:

```typescript
interface Navigator {
  xr?: XRSystem;
}

interface XRSystem {
  isSessionSupported(mode: XRSessionMode): Promise<boolean>;
  requestSession(mode: XRSessionMode, options?: XRSessionInit): Promise<XRSession>;
}

interface XRSession extends EventTarget {
  environmentBlendMode: XREnvironmentBlendMode;
  updateRenderState(state: XRRenderStateInit): void;
  requestReferenceSpace(type: XRReferenceSpaceType): Promise<XRReferenceSpace>;
}

type XREnvironmentBlendMode = "opaque" | "additive" | "alpha-blend";
type XRSessionMode = "inline" | "immersive-vr" | "immersive-ar";
// ... additional types
```

#### Option C: Use Type Assertions (Quick Fix)
```typescript
// Add type assertions where needed
(navigator as any).xr
(session as any).environmentBlendMode
```

**Recommended:** Option A - Add `@types/webxr` package

**Estimated Effort:** 30 minutes

---

## Category 2: Property Initialization Order (15 errors) - HIGH PRIORITY

### Issue
Properties are used in initializers before being declared, causing TS2729 errors. These were missed by the previous TS2564 fix script.

### Affected Files & Errors

1. **src/mol-canvas3d/helper/pick-helper.ts** (2 errors)
   ```typescript
   // Line 23 - webgl and pickPass used before initialization
   private buffers = new PickBuffers(this.webgl, this.pickPass);
   
   // Solution: Move to constructor or use lazy initialization
   ```

2. **src/mol-canvas3d/passes/dpoit.ts** (8 errors)
   ```typescript
   // Properties used in initializers before declaration
   private colorFramebuffers = [this.createFramebuffer(), this.createFramebuffer()];
   private depthTextures = [this.createTexture(), this.createTexture()];
   // etc.
   ```

3. **src/mol-state/tree/transient.ts** (4 errors)
   ```typescript
   // Property 'tree' used before initialization in constructor body
   dependencies = this.tree.dependencies as StateTree.MutableDependencies;
   ```

4. **src/mol-canvas3d/helper/pointer-helper.ts** (1 error - TS2565)
   ```typescript
   // Line 124 - Property 'shape' used before being assigned
   this.shape = getPointerMeshShape(this.getData(), this.props, this.shape);
   ```

### Solution Strategy

**Pattern 1: Move initialization to constructor**
```typescript
// Before
class Example {
  private buffers = new PickBuffers(this.webgl, this.pickPass);
  private webgl: WebGLContext;
  private pickPass: PickPass;
}

// After
class Example {
  private buffers: PickBuffers;
  private webgl: WebGLContext;
  private pickPass: PickPass;
  
  constructor() {
    // Initialize dependencies first
    this.webgl = ...;
    this.pickPass = ...;
    // Then initialize buffers
    this.buffers = new PickBuffers(this.webgl, this.pickPass);
  }
}
```

**Pattern 2: Lazy initialization with getter**
```typescript
// Before
private buffers = new PickBuffers(this.webgl, this.pickPass);

// After
private _buffers?: PickBuffers;
private get buffers() {
  if (!this._buffers) {
    this._buffers = new PickBuffers(this.webgl, this.pickPass);
  }
  return this._buffers;
}
```

**Pattern 3: Definite assignment with init method**
```typescript
private buffers!: PickBuffers;

constructor() {
  this.init();
}

private init() {
  this.buffers = new PickBuffers(this.webgl, this.pickPass);
}
```

**Recommended:** Pattern 1 for most cases, Pattern 2 for expensive operations

**Estimated Effort:** 1-2 hours

---

## Category 3: Argument Type Mismatches (8 errors) - MEDIUM PRIORITY

### Issue
TS2345: Arguments passed to functions don't match expected types.

### Known Errors

1. **src/mol-canvas3d/canvas3d.ts:780**
   ```typescript
   // Argument of type 'unknown' is not assignable to parameter of type 'string'
   xr.requestFailed.next(e);  // 'e' is caught error, needs type narrowing
   
   // Solution:
   xr.requestFailed.next(String(e));
   // or
   xr.requestFailed.next(e instanceof Error ? e.message : String(e));
   ```

2. **Other cases** - Need to review individually

### Solution Strategy
- Add explicit type casts or type guards
- Update function signatures if needed
- Ensure error handling converts unknown types properly

**Estimated Effort:** 1 hour

---

## Category 4: Type Assignment Issues (3 errors) - MEDIUM PRIORITY

### Issue
TS2322: Type is not assignable to expected type.

### Solution Strategy
- Review each case for proper type compatibility
- Add type assertions if safe
- Update type definitions if needed

**Estimated Effort:** 30 minutes

---

## Category 5: Export Modifier Issues (2 errors) - LOW PRIORITY

### Issue
TS4115: Export modifiers applied incorrectly.

### Solution Strategy
- Review export statements
- Remove or correct export modifiers

**Estimated Effort:** 15 minutes

---

## Category 6: Type Compatibility (2 errors) - LOW PRIORITY

### Issue
TS2786: Expression types are not compatible (likely ReactMarkdown or similar).

### Solution Strategy
- Update library versions
- Add type casts
- Wrap in compatibility layer

**Estimated Effort:** 30 minutes

---

## Category 7: Type Used as Value (2 errors) - MEDIUM PRIORITY

### Issue
TS2693: 'XRRigidTransform' only refers to a type, but is being used as a value.

### Root Cause
The XR types may not include the actual class constructors in some type definitions.

### Solution
```typescript
// Option 1: Cast to any
return new (XRRigidTransform as any)(Vec3.toObj(d.position), Quat.toObj(d.quaternion));

// Option 2: Use global reference
return new (globalThis as any).XRRigidTransform(...);

// Option 3: Check runtime availability
if (typeof XRRigidTransform !== 'undefined') {
  return new XRRigidTransform(...);
}
```

**Estimated Effort:** 15 minutes

---

## Category 8: Miscellaneous (6 errors) - LOW PRIORITY

### Errors
- TS7023 (1): Implicit 'any' return type
- TS2722 (1): Cannot invoke an object
- TS2532 (1): Object is possibly 'undefined'
- TS18048 (1): Possibly 'undefined'
- TS18046 (1): Possibly 'undefined'

### Solution Strategy
- Add explicit return types
- Add null checks or optional chaining
- Use type guards

**Estimated Effort:** 30 minutes

---

## Priority Action Plan

### Phase 1: WebXR Types (30 minutes) ✅ CRITICAL
1. Add `@types/webxr` to `deno.json`
2. Verify all WebXR errors are resolved
3. Test XR functionality still works

**Impact:** Resolves 16+ errors (30% of all blockers)

### Phase 2: Property Initialization (1-2 hours) ✅ CRITICAL
1. Fix `pick-helper.ts` - move buffers init to constructor
2. Fix `dpoit.ts` - refactor property initialization
3. Fix `transient.ts` - reorder property assignments
4. Fix `pointer-helper.ts` - handle shape initialization

**Impact:** Resolves 15 errors (28% of all blockers)

### Phase 3: Type Mismatches (2 hours) ⚠️ IMPORTANT
1. Fix argument type errors (8 errors)
2. Fix type assignment errors (3 errors)
3. Fix type-as-value errors (2 errors)

**Impact:** Resolves 13 errors (24% of all blockers)

### Phase 4: Cleanup (1 hour) ⚠️ NICE-TO-HAVE
1. Fix export modifiers (2 errors)
2. Fix type compatibility (2 errors)
3. Fix miscellaneous issues (6 errors)

**Impact:** Resolves 10 errors (18% of all blockers)

---

## Automation Opportunities

### Script 1: Fix TS2729 Property Order
Create `scripts/fix_ts2729.py` to:
- Detect property initializers that reference other properties
- Move initialization to constructor or lazy getters
- Add definite assignment assertions where appropriate

### Script 2: Add Type Casts
Create `scripts/add_type_guards.py` to:
- Find `unknown` to `string` conversions
- Add appropriate type guards or casts
- Handle error object conversions

---

## Testing Strategy

After each fix phase:
1. Run `deno publish --dry-run` to verify error count reduction
2. Run existing test suites (if available)
3. Manually test affected features (especially WebXR)
4. Check for no regression in functionality

---

## Success Criteria

- ✅ `deno publish --dry-run` exits with 0 errors
- ✅ All entry points type-check successfully
- ✅ No runtime functionality broken
- ✅ WebXR features still work (if hardware available)
- ✅ Rendering pipeline intact
- ✅ Plugin system functional

---

## Estimated Timeline

| Phase | Time | Cumulative |
|-------|------|------------|
| WebXR Types | 30 min | 0.5 hours |
| Property Init | 2 hours | 2.5 hours |
| Type Mismatches | 2 hours | 4.5 hours |
| Cleanup | 1 hour | 5.5 hours |
| Testing | 1 hour | 6.5 hours |
| **Total** | **6.5 hours** | - |

---

## Current Migration Status

```
Phase 1: Import Extensions       ✅ 100% Complete (2,540+ imports)
Phase 2: JSX/React Types          ✅ 100% Complete (937 errors fixed)
Phase 3: Override Modifiers       ✅ 100% Complete (261 errors fixed)
Phase 4: Property Initialization  ✅ 100% Complete (118 errors fixed)
Phase 5: JSR Publication Blockers 🔄  0% Complete (54 errors remaining)

Overall Progress: 98.0% (2,554 / 2,608 errors resolved)
JSR Ready: ❌ (54 blockers remaining)
```

---

## Next Steps

1. **START HERE:** Add WebXR type definitions
2. Fix property initialization order issues
3. Address type mismatches systematically
4. Final cleanup and verification
5. Publish to JSR! 🎉

---

*Generated by analysis of `deno publish --dry-run` output*  
*See: `publish_errors.txt` for full error details*