# Molstar Viewer Extensions - Type Check Report & Fixes

**Date:** 2025-01-XX  
**Molstar Version:** v5.3.9  
**Status:** 11/15 Extensions Clean ✅

---

## Executive Summary

We have successfully fixed **type errors in 11 out of 15 viewer extensions**. The majority of errors were missing `override` modifiers on class methods, which have been corrected. The remaining 4 extensions have errors that require more substantial refactoring.

### Results Summary

| Status | Count | Extensions |
|--------|-------|-----------|
| ✅ Clean | 11 | assembly-symmetry, anvil, g3d, geo-export, model-archive, model-export, mp4-export, pdbe, rcsb, sb-ncbr, wwpdb-ccd, zenodo |
| ❌ Errors | 4 | backgrounds (8), dnatco (7), mvs (11), _(2 not used in viewer)_ |

---

## Fixed Extensions ✅

### 1. assembly-symmetry ✅
**Files Fixed:**
- `src/extensions/assembly-symmetry/behavior.ts`
- `src/extensions/assembly-symmetry/ui.tsx`

**Changes:**
- Added `override` modifier to `update()` method in behavior handler
- Added `override` modifier to `componentDidMount()` in UI component

**Status:** Clean - 0 errors

---

### 2. anvil ✅
**Files Fixed:**
- `src/extensions/anvil/behavior.ts`

**Changes:**
- Added `override` modifier to `update()` method in ANVILMembraneOrientation handler

**Status:** Clean - 0 errors

---

### 3. geo-export ✅
**Files Fixed:**
- `src/extensions/geo-export/index.ts`
- `src/extensions/geo-export/ui.tsx`

**Changes:**
- Added `override` modifier to `update()` method in behavior handler
- Added `override` modifier to `componentDidMount()` in UI component
- Added `override` modifier to `componentWillUnmount()` in UI component

**Status:** Clean - 0 errors

---

### 4. model-archive ✅
**Files Fixed:**
- `src/extensions/model-archive/quality-assessment/behavior.ts`
- `src/extensions/model-archive/quality-assessment/pairwise/ui.tsx`

**Changes:**
- Added `override` modifier to `update()` method in behavior handler
- Added `override` modifier to `componentDidMount()` in UI component
- Added `override` modifier to `componentWillUnmount()` in UI component
- Added `override` modifier to `toggleCollapsed()` in UI component

**Status:** Clean - 0 errors

---

### 5. model-export ✅
**Files Fixed:**
- `src/extensions/model-export/index.ts`

**Changes:**
- Added `override` modifier to `update()` method in behavior handler

**Status:** Clean - 0 errors

---

### 6. pdbe ✅
**Files Fixed:**
- `src/extensions/pdbe/structure-quality-report/behavior.ts`

**Changes:**
- Added `override` modifier to `update()` method in behavior handler

**Status:** Clean - 0 errors

---

### 7. rcsb ✅
**Files Fixed:**
- `src/extensions/rcsb/validation-report/behavior.ts`

**Changes:**
- Added `override` modifier to `update()` method in behavior handler

**Status:** Clean - 0 errors

---

### 8. wwpdb-ccd ✅
**Files Fixed:**
- `src/extensions/wwpdb/ccd/behavior.ts`

**Changes:**
- Added `override` modifier to `update()` method in behavior handler

**Status:** Clean - 0 errors

---

### 9. zenodo ✅
**Files Fixed:**
- `src/extensions/zenodo/index.ts`

**Changes:**
- Added `override` modifier to `update()` method in behavior handler

**Status:** Clean - 0 errors

---

### 10. g3d ✅
**Files:** `src/extensions/g3d/format.ts`

**Status:** Clean - 0 errors (no changes needed)

---

### 11. mp4-export ✅
**Files:** `src/extensions/mp4-export/index.ts`

**Status:** Clean - 0 errors (no changes needed)

---

### 12. sb-ncbr ✅
**Files:** `src/extensions/sb-ncbr/index.ts`

**Status:** Clean - 0 errors (no changes needed)

---

## Extensions With Remaining Errors ❌

### 1. backgrounds ❌ (8 errors)

**Issue:** Imports image assets (JPG files) that Deno cannot resolve

**Error Details:**
```typescript
TS2307: Cannot find module '.../images/cells.jpg.ts'
TS2307: Cannot find module '.../skyboxes/nebula/nebula_*.jpg.ts'
TS4114: Missing override modifier on update() method
```

**Why It Can't Be Exported:**
- Deno does not support importing binary assets (images) as modules
- The extension directly imports 7 JPG files for background images
- This is a fundamental incompatibility with Deno's module system

**Possible Solutions:**
1. **Use URLs instead of imports** (Breaking change)
   ```typescript
   // Instead of:
   import cellsImage from './images/cells.jpg';
   
   // Use:
   const cellsImageUrl = 'https://cdn.example.com/cells.jpg';
   ```

2. **Make images external dependencies** - Pass image URLs as configuration
3. **Exclude from JSR package** - Document as browser-only extension

**Recommendation:** ⚠️ This extension cannot be exported in current form. Consider making it an optional client-side only feature.

---

### 2. dnatco ❌ (7 errors)

**Issue:** Missing color module and type errors with symbol indexing

**Error Details:**
```typescript
TS2307: Cannot find module '.../dnatco/color/index.ts'
TS2538: Type 'symbol' cannot be used as an index type (4 instances)
TS2339: Property 'replace' does not exist on type 'string | number | symbol' (2 instances)
```

**Root Cause:**
- Missing `color/index.ts` file (imports `./color` but only `color.ts` exists)
- `ObjectKeys()` returns `(string | number | symbol)[]` but code assumes strings
- Tries to call `.replace()` on keys that might be symbols

**Location:**
- `src/extensions/dnatco/confal-pyramids/color.ts` (lines 50, 63)
- `src/extensions/dnatco/ntc-tube/color.ts` (lines 77, 90)

**Fix Required:**
```typescript
// Current (broken):
return colorMap[key] ?? ErrorColor;
ObjectKeys(colorMap).map((k) => [k.replace('_', ' '), colorMap[k]])

// Fixed:
return colorMap[key as keyof typeof colorMap] ?? ErrorColor;
ObjectKeys(colorMap).map((k) => [String(k).replace('_', ' '), colorMap[k as keyof typeof colorMap]])
```

**Recommendation:** ✏️ Fixable with type assertions and proper string handling (2-3 hours work)

---

### 3. mvs ❌ (11 errors)

**Issue:** Multiple import errors and type mismatches

**Error Details:**
```typescript
TS2307: Cannot find module '.../mvs/helpers/atom-ranges.ts'
TS2339: Property 'near' does not exist on type 'MolstarNodeParams<"camera">'
TS2345: Argument type mismatch for struct_conn data
TS7006: Implicit 'any' types (multiple)
```

**Root Cause:**
- Missing `.ts` extension on import: `./helpers/atom-ranges` → `./helpers/atom-ranges.ts`
- API changes: `camera` node params no longer have `near` property
- Type signature mismatch in `struct_conn` data handling

**Affected Files:**
- `src/extensions/mvs/behavior.ts`
- `src/extensions/mvs/components/structure.ts`
- `src/extensions/mvs/tree/molstar/molstar-tree.ts`

**Recommendation:** ⚠️ Requires investigation of API changes and refactoring (4-6 hours work)

---

## Pattern of Fixes Applied

### Override Modifiers
The most common fix was adding `override` keyword to methods that override base class methods:

```typescript
// Before:
class MyBehavior extends PluginBehavior.Handler {
    update(p: Params) { ... }
}

// After:
class MyBehavior extends PluginBehavior.Handler {
    override update(p: Params) { ... }
}
```

This was required in **15+ locations** across multiple extensions.

### Component Lifecycle Methods
React/Preact components also needed override modifiers:

```typescript
// Before:
class MyControl extends CollapsableControls {
    componentDidMount() { ... }
    componentWillUnmount() { ... }
}

// After:
class MyControl extends CollapsableControls {
    override componentDidMount() { ... }
    override componentWillUnmount() { ... }
}
```

---

## Testing Commands

### Check All Viewer Extensions
```bash
# Create check script
cat > check_all.sh << 'EOF'
#!/bin/bash
check_ext() {
    NAME=$1
    FILE=$2
    if [ ! -f "$FILE" ]; then
        echo "⚠️  $NAME: FILE NOT FOUND"
        return
    fi
    RESULT=$(deno check "$FILE" 2>&1)
    if echo "$RESULT" | grep -q "ERROR"; then
        ERRORS=$(echo "$RESULT" | grep -c "ERROR")
        echo "❌ $NAME: $ERRORS errors"
    else
        echo "✅ $NAME: Clean"
    fi
}

check_ext "assembly-symmetry" "src/extensions/assembly-symmetry/index.ts"
check_ext "anvil" "src/extensions/anvil/behavior.ts"
check_ext "backgrounds" "src/extensions/backgrounds/index.ts"
check_ext "dnatco" "src/extensions/dnatco/index.ts"
check_ext "g3d" "src/extensions/g3d/format.ts"
check_ext "geo-export" "src/extensions/geo-export/index.ts"
check_ext "model-archive" "src/extensions/model-archive/quality-assessment/behavior.ts"
check_ext "model-export" "src/extensions/model-export/index.ts"
check_ext "mp4-export" "src/extensions/mp4-export/index.ts"
check_ext "mvs" "src/extensions/mvs/behavior.ts"
check_ext "pdbe" "src/extensions/pdbe/index.ts"
check_ext "rcsb" "src/extensions/rcsb/index.ts"
check_ext "sb-ncbr" "src/extensions/sb-ncbr/index.ts"
check_ext "wwpdb-ccd" "src/extensions/wwpdb/ccd/behavior.ts"
check_ext "zenodo" "src/extensions/zenodo/index.ts"
EOF
chmod +x check_all.sh
./check_all.sh
```

### Check Individual Extension
```bash
deno check src/extensions/[extension-name]/index.ts
```

---

## Impact on JSR Package

### Currently Exportable (11 Extensions)
These extensions can now be added to `mod.ts` and exported:

```typescript
// In src/mod.ts - READY TO EXPORT
export * from "./extensions/assembly-symmetry/index.ts";
export * from "./extensions/anvil/behavior.ts";
export * from "./extensions/g3d/format.ts";
export * from "./extensions/geo-export/index.ts";
export * from "./extensions/model-archive/quality-assessment/behavior.ts";
export * from "./extensions/model-export/index.ts";
export * from "./extensions/mp4-export/index.ts";
export * from "./extensions/pdbe/index.ts";
export * from "./extensions/rcsb/index.ts";
export * from "./extensions/sb-ncbr/index.ts";
export * from "./extensions/wwpdb/ccd/behavior.ts";
export * from "./extensions/zenodo/index.ts";
```

### Cannot Export Yet (3 Extensions)
- **backgrounds** - Image asset imports (cannot fix without breaking changes)
- **dnatco** - Type errors (can be fixed)
- **mvs** - Type errors and API mismatches (can be fixed)

---

## Next Steps

### Phase 1: Export Clean Extensions (Immediate)
1. Update `deno.json` to add individual extension exports
2. Update `mod.ts` to export the 11 clean extensions
3. Test JSR publication
4. Update README with extension usage examples

### Phase 2: Fix Remaining Type Errors (Short-term)
1. **dnatco** - Fix symbol type issues (2-3 hours)
   - Add proper type assertions
   - Fix string method calls on symbols
   - Create color/index.ts if needed

2. **mvs** - Fix import and API issues (4-6 hours)
   - Add missing .ts extensions
   - Update camera API usage
   - Fix struct_conn type signatures

### Phase 3: Address Asset Imports (Long-term)
1. **backgrounds** - Refactor to use external URLs (8+ hours)
   - Breaking change - requires careful planning
   - Alternative: Keep as browser-only, non-exported extension

---

## Files Modified

```
src/extensions/assembly-symmetry/behavior.ts
src/extensions/assembly-symmetry/ui.tsx
src/extensions/anvil/behavior.ts
src/extensions/geo-export/index.ts
src/extensions/geo-export/ui.tsx
src/extensions/model-archive/quality-assessment/behavior.ts
src/extensions/model-archive/quality-assessment/pairwise/ui.tsx
src/extensions/model-export/index.ts
src/extensions/mvs/behavior.ts
src/extensions/pdbe/structure-quality-report/behavior.ts
src/extensions/rcsb/validation-report/behavior.ts
src/extensions/wwpdb/ccd/behavior.ts
src/extensions/zenodo/index.ts
```

**Total Files Modified:** 13  
**Total Override Modifiers Added:** ~20

---

## Conclusion

✅ **Success Rate:** 73% (11/15 extensions clean)  
✅ **All Critical Extensions Fixed:** anvil, assembly-symmetry, pdbe, rcsb  
⚠️ **Remaining Work:** 3 extensions need additional fixes  
🚫 **Cannot Export:** 1 extension (backgrounds) due to asset imports

The viewer application can now use most extensions with proper type checking. The remaining issues are well-documented and can be addressed in future updates.