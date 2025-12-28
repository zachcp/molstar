# Upstream Sync Blockers

## Current Status (2025-12-28)

**2025-jsr branch**: Synced to v5.3.20 (0 TypeScript errors ✅)
**Remaining commits behind**: 89 commits

---

## Version Health Test Results

| Version | TS Errors | Status | Notes |
|---------|-----------|--------|-------|
| v5.3.20 | 0 | ✅ SYNCED | Last clean version |
| v5.4.0  | 110 | ❌ BLOCKED | WebXR/Buffer type issues |
| v5.4.1  | 110 | ❌ BLOCKED | Same issues as v5.4.0 |
| v5.4.2  | 110 | ❌ BLOCKED | Same issues as v5.4.0 |
| v5.5.0  | 132 | ❌ BLOCKED | WebXR/Buffer + 22 additional errors |

---

## Detailed Error Analysis

### v5.4.0 - v5.4.2 Blockers (110 errors)

**Error Types:**
- **TS2304**: Cannot find name 'XRWebGLLayer', 'XRSession', 'XRViewerPose', 'XRView', 'XRRigidTransform', 'XRPose'
- **TS2580**: Cannot find name 'Buffer'
- **TS2339**: Property 'makeXRCompatible' does not exist on type 'GLRenderingContext'

**Root Cause:**
- Missing WebXR type definitions (not available in Deno's DOM types)
- Missing Node.js Buffer type (Deno doesn't include Node builtins by default)

**Affected Files:**
- WebXR-related code in canvas3d/helper/xr-manager.ts
- Buffer usage in various I/O modules

**Potential Fixes:**
1. Add WebXR type definitions to src/types/webxr.d.ts
2. Import Buffer from "node:buffer" or use Uint8Array
3. Use Deno's polyfills for Node.js types

**Why Not Fixed:**
- These are upstream architectural issues
- Requires significant changes to WebXR implementation
- Not our responsibility to fix upstream code
- Would need to be maintained across all future syncs

---

## v5.5.0 Additional Blockers (+22 errors)

In addition to the 110 errors from v5.4.x, v5.5.0 introduces 22 more errors:
- More strict mode violations
- Additional type mismatches
- Property initialization issues

---

## Sync Strategy

### Current Approach: Stay on v5.3.20

✅ **Advantages:**
- Zero TypeScript errors
- Fully JSR compatible
- Stable and publishable
- Known good state

⚠️ **Disadvantages:**
- Missing 89 commits of features/fixes from v5.4.0+
- Not at latest upstream version

### When to Resume Syncing

Resume syncing when upstream releases a version with:
- < 10 TypeScript errors (preferably 0)
- WebXR types properly defined
- Buffer usage fixed or made optional

**Monitoring:**
```bash
# Check weekly
bash scripts/check-sync-status.sh

# Test new releases
bash scripts/check-upstream-health.sh v5.5.1
bash scripts/check-upstream-health.sh v5.6.0
```

---

## Recommendations

### Short Term (Current)
✅ **Stay on v5.3.20** - It's clean and working

### Medium Term (1-3 months)
- Monitor upstream releases weekly
- Test each new version for TypeScript health
- Sync immediately when a clean version appears

### Long Term (3-6 months)
If upstream doesn't fix these issues:
- Consider contributing fixes to upstream
- Or maintain our own patches for WebXR/Buffer types
- Document as "known JSR compatibility limitations"

---

## Testing Log

### 2025-12-28: Initial Catch-Up
- Started: 131 commits behind
- Synced to: v5.3.20 (236 commits merged)
- Result: 89 commits behind, 0 TS errors ✅

### 2025-12-28: Attempted v5.4.2 Sync
- Merged v5.4.2
- Fixed builder.ts type imports
- Applied JSR compatibility fixes
- Result: 110 TS errors (WebXR/Buffer) ❌
- Decision: Abandoned sync, staying on v5.3.20

---

**Last Updated:** 2025-12-28
**Next Check:** 2026-01-04 (weekly)
