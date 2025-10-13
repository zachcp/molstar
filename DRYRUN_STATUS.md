# Deno Publish Dry-Run Status Report

**Date:** January 2025
**Current Error Count:** 2,540 errors (down from 2,608 initial, 2,547 after first fixes)
**Status:** 🟢 Phase 1 Complete - All import errors resolved!

## Overview

The Mol* library migration to JSR is in progress. **Phase 1 is complete** - all critical import path errors have been resolved! We've reduced errors from 2,608 to 2,540. The remaining 2,540 errors are primarily JSX/React type issues (939 errors) and other type strictness issues.

## Progress Summary

### ✅ Phase 1 Completed - Import Path Fixes (68 errors resolved)
1. **All Import Path Issues Resolved** ✅
   - Fixed `.ts` extension issues across 1,137+ TypeScript files
   - Converted bare imports to full path imports
   - Added `node:` prefix to built-in Node.js modules
   - Resolved directory/file name conflicts:
     - `src/mol-util/legend.ts` - fixed `color.ts` → `color/color.ts`
     - `src/mol-util/color/palette.ts` - fixed `'.'` → `'./index.ts'`
   - Fixed `.d.ts` import issues:
     - Renamed `src/mol-io/reader/gro/schema.d.ts` → `schema.ts`
     - Updated all imports to use proper `.ts` extension
   - Fixed type-only import() statements:
     - `src/mol-canvas3d/helper/interaction-events.ts` - added `.ts` extensions
     - `src/mol-model/structure/structure/unit/rings/compute.ts` - added `.ts` extensions
   - **Result: 0 TS2307 (module not found) errors remaining!**

2. **Lint Configuration**
   - Disabled problematic lint rules that were causing false positives
   - Configured deno.json with appropriate exclusions

3. **Type Definitions**
   - Added WebXR API type definitions (`src/types/webxr.d.ts`)
   - Referenced WebXR types in canvas3d files

4. **Scripts Created**
   - `fix-critical-imports.ts` - Handles critical import path errors
   - Various automated fix scripts in `scripts/` directory

### 🔄 Phase 2 - In Progress
- Addressing the 2,540 remaining TypeScript errors
- Primary focus: JSX/React type issues (939 errors - 37% of total)
- Secondary focus: Type strictness issues (~500 errors)
- **Key Finding:** Excluding files from publish doesn't prevent type-checking during dry-run

## Current Error Breakdown (2,540 Total)

### Top Error by Volume
**JSX/React Type Issues: 939 errors (37% of all errors)**
- `JSX element implicitly has type 'any'`: 939 occurrences
- `JSX tag requires 'react/jsx-runtime'`: 41 occurrences  
- `Cannot find namespace 'JSX'`: 28 occurrences
- Missing `props` property on components: ~400 occurrences
- Missing `state` property on components: ~50 occurrences

**Root Cause:** React type definitions not being properly recognized by Deno. The `deno.json` has `"jsxImportSource": "react"` but Deno may need additional configuration or the React types may not be compatible with JSR publishing.

**Impact:** These JSX errors account for over 1/3 of all remaining errors.

## Detailed Error Categories

### 1. React/JSX Issues (939+ errors) 🔴 CRITICAL
**Location:** Throughout `src/mol-plugin-ui/` and `src/extensions/`

**Problems:**
- JSX elements implicitly typed as `any` (939 occurrences)
- React component properties not recognized (`props`, `state`)
- JSX namespace not found (28 occurrences)
- react/jsx-runtime module path issues (41 occurrences)
- Component type incompatibilities with React 18 types

**Possible Solutions:**
- Add explicit React type references to files with JSX
- Create a custom `types/react.d.ts` file for JSR compatibility
- Configure Deno's JSX handling for React types
- Consider if JSR supports React components (may need alternative approach)
- As last resort: Exclude all UI components from JSR (but this defeats the purpose)

### 2. Override Modifier Errors (22 errors) 🟡 EASY FIX
**Type:** TS4114

**Problems:**
Methods overriding base class methods need `override` keyword

**Example Locations:**
- `src/extensions/mp4-export/index.ts`
- `src/mol-plugin-ui/manager/interactivity.tsx`
- `src/mol-plugin-ui/state.tsx`
- `src/mol-plugin/context.ts`

**Solution:** Add `override` keyword to 22 methods (can be done manually or with script)

### 3. Type Strictness Errors (~500 errors)

**Types:** TS2564, TS2729, TS18046, TS7006

**Problems:**
- Properties not initialized in constructors (TS2564)
- Properties used before initialization (TS2729)
- Implicit `any` types on error objects and parameters (TS18046, TS7006)

**Example Locations:**
- `src/mol-repr/structure/visual/util/polymer/trace-iterator.ts`
- `src/mol-state/object.ts`
- `src/mol-state/tree/transient.ts`

**Solutions:**
- Add definite assignment assertions (!) or initialize properties
- Use proper error typing (e.g., `catch (e: unknown)`)
- Add type annotations to parameters

### 4. Normalize<> Type Issues (~300 errors)
**Type:** TS2345

**Problem:**
Properties that are optional in `Normalize<>` types but required in target types, particularly with `ColorData` and color-related parameters.

**Example:**
```typescript
Type 'Normalize<{ value: ColorData; ... }>' is not assignable to 
'Values<{ value: Color; ... }>'. Property 'value' is optional in 
Normalize<> but required in Values<>.
```

**Affected Files:**
- `src/mol-theme/color/*.ts`
- `src/mol-canvas3d/canvas3d.ts`

**Solutions:**
- Review Normalize type utility and ensure proper typing
- Add non-null assertions where appropriate
- Refactor color parameter handling

### 5. WebXR Type Errors (0 errors) ✅ RESOLVED
**Status:** ✅ Fully resolved

**Solution Applied:**
- Created `src/types/webxr.d.ts` with complete WebXR API types
- Added triple-slash reference in `src/mol-canvas3d/canvas3d.ts`
- All WebXR type errors resolved

### 6. Import Path Errors (0 errors) ✅ RESOLVED
**Status:** ✅ All import path errors resolved

**Files Fixed:**
- `src/mol-util/legend.ts` - color import
- `src/mol-util/color/palette.ts` - directory index import
- `src/mol-io/reader/gro/schema.d.ts` → renamed to `schema.ts`
- `src/mol-io/reader/gro/parser.ts` - schema import
- `src/mol-model-formats/structure/gro.ts` - schema import
- `src/mol-canvas3d/helper/interaction-events.ts` - type imports
- `src/mol-model/structure/structure/unit/rings/compute.ts` - type imports

### 7. ColorMap Type Mismatches (~50 errors)
**Problem:**
Generic `ColorMap<{ [k: string]: number }>` being passed where specific ColorMap types are expected.

**Example:**
```typescript
Type 'ColorMap<{ [k: string]: number }>' is not assignable to 
'ColorMap<{ H: number; D: number; ... }>'.
Missing properties: H, D, T, HE, and 115 more.
```

**Affected Files:**
- `src/mol-theme/color/element-symbol.ts`
- `src/mol-theme/color/molecule-type.ts`

### 8. Miscellaneous Type Errors (~700 errors)
Various other type incompatibilities and strict type checking issues throughout the codebase. Many of these may be related to the JSX issues and will be reduced once React types are properly configured.

## Recommended Next Steps

### ✅ Phase 1: Import Fixes (COMPLETED - Reduced to 2,540 errors)
1. ✅ **Fixed all critical import errors** (68 errors resolved)
   - ✅ Fixed `src/mol-util/color.ts` directory conflict
   - ✅ Fixed `src/mol-io/reader/gro/schema` by renaming `.d.ts` → `.ts`
   - ✅ Fixed `src/mol-model/structure/structure/unit/rings` type imports
   - ✅ All TS2307 (module not found) errors resolved

2. **Next: Add override modifiers** (22 errors - EASY)
   - Manually add `override` keyword to identified methods
   - Small, manageable number of fixes

### 🔄 Phase 2: JSX/React Resolution (Target: Reduce by ~1,000 errors) - IN PROGRESS
1. **CRITICAL: Resolve JSX/React type issues** (939+ errors - 37% of total)
   This is now the #1 priority as it represents over 1/3 of all errors.
   
   **Options to investigate:**
   - Configure Deno to properly recognize React types from npm imports
   - Create custom type definitions for JSR compatibility
   - Check if `@types/react` needs explicit triple-slash references
   - Review Deno's JSX documentation for React compatibility
   - Consider if the UI layer should be published separately

2. **Fix override modifiers** (22 errors - quick win)
   Add `override` keyword to identified methods

3. **Fix uninitialized properties** (~500 errors)
   ```typescript
   // Add definite assignment assertions
   private residueIndex!: ResidueIndex;
   // Or initialize in constructor
   private residueIndex: ResidueIndex = 0 as ResidueIndex;
   ```

4. **Address Normalize<> type issues** (~300 errors)
   - Review color parameter typing
   - Add non-null assertions where safe
   - Consider refactoring Normalize utility

5. **Fix ColorMap type issues** (~50 errors)
   - Use type assertions for generic ColorMaps
   - Add proper type constraints

### Phase 3: Remaining Type Issues (Target: Reduce to ~100 errors)
1. **Improve error handling** (~50 errors)
   ```typescript
   // Replace: catch (e)
   // With:    catch (e: unknown)
   if (e instanceof Error) {
     console.error(e.message);
   }
   ```

2. **Fix remaining type incompatibilities** (~700 errors)
   - Many should auto-resolve once JSX issues are fixed
   - May require architectural decisions for remaining issues
   - Some may need @ts-expect-error with comments
   - Consider if all are truly blocking for JSR

### Phase 4: Final Cleanup (Target: 0 errors or acceptable minimum)
1. **Review all @ts-expect-error comments**
2. **Test published package functionality**
3. **Document known limitations**

## Testing Strategy

1. **After each major fix batch:**
   ```bash
   deno publish --dry-run 2>&1 | grep "Found" | head -5
   ```

2. **Monitor error count trends:**
   - Target: < 1,000 errors (milestone)
   - Goal: 0 errors (publishable)

3. **Validate specific file types:**
   ```bash
   deno check src/mol-plugin-ui/index.ts
   deno check src/mol-canvas3d/index.ts
   ```

## Commands Reference

```bash
# Check error count
deno publish --dry-run 2>&1 | grep "ERROR" | wc -l

# Run dry-run with output
deno publish --dry-run

# Check specific file
deno check src/path/to/file.ts

# Lint
deno task lint

# Format
deno task fmt
```

## Notes

- The library has **1,137+ TypeScript files**, so systematic approaches are essential
- Many errors are repetitive patterns that can be fixed in batches
- Consider using TypeScript's `skipLibCheck` strategically (though JSR may not allow this)
- The codebase is complex with many interdependencies - careful testing needed

## Progress Summary

### Session 1 Results
- **Starting errors:** 2,608
- **After initial fixes:** 2,547 (-61)
- **After Phase 1 completion:** 2,540 (-68 total)
- **Import errors resolved:** 100% (0 TS2307 errors remaining)

### Key Achievements
1. ✅ Resolved all import path errors
2. ✅ Fixed directory/file naming conflicts
3. ✅ Resolved WebXR type definitions
4. ✅ Renamed `.d.ts` files to `.ts` for Deno compatibility
5. 📊 Identified JSX/React as the #1 blocker (939 errors)

## Action Plan for Next Session

1. **PRIORITY: Investigate JSX/React type resolution**
   - Research Deno's React/JSX support for JSR
   - Test if explicit type imports help
   - Consider creating custom React type definitions
   - May need to consult Deno/JSR documentation

2. **Quick win: Add override modifiers** (22 errors)
   - Manually add `override` keyword to identified methods

3. **Create property-initializer script** - Add `!` assertions (~500 errors)

4. **Address Normalize<> and ColorMap issues** (~350 errors)

5. **Measure progress** - Track error reduction after JSX resolution

## Conclusion

**Status:** 🟢 Phase 1 Complete | 🔄 Phase 2 In Progress

**Phase 1 Status:** ✅ COMPLETE - All 68 import path errors resolved (100%)

**Current Blockers:** 
1. JSX/React type issues (939 errors - 37% of total)
2. Type strictness issues (500 errors - 20% of total)
3. Various type incompatibilities (700 errors - 28% of total)

**Key Findings:** 
- Deno's publish dry-run type-checks ALL files, not just published ones
- JSX/React types are the single largest error category
- Most import issues were resolved by explicit `.ts` extensions and fixing directory conflicts

**Estimated Remaining Effort:** 
- ✅ Phase 1 (Import Fixes): COMPLETE - 3 hours actual
- Phase 2 (JSX Resolution + Override): 10-20 hours → ~1,500 errors
- Phase 3 (Type Strictness): 10-20 hours → ~500 errors  
- Phase 4 (Final Issues): 10-20 hours → ~100 errors
- Phase 5 (Final Cleanup): 5-10 hours → publishable

**Total Remaining:** 35-70 hours to reach publishable state

**Recommendation:** The JSX/React type issue is now the critical path. Resolving this single issue could eliminate ~1,000 errors (37% of total). This should be the immediate focus. If JSX cannot be resolved, consider publishing the library without UI components or as a separate package.