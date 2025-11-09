# Summary of Changes - Version 5.3.12

## Problem Solved

Users were getting import errors when trying to use `Color`, `Asset`, and `Background` utilities from the JSR package:

```
SyntaxError: The requested module 'jsr:@zachcp/molstar@5.3.11' does not 
provide an export named 'Color'
```

## Solution Implemented

### 1. Added Color Exports (mol-util/index.ts)
- Added `export * from "./color/index.ts"`
- Now exports: `Color`, `ColorMap`, `ColorTable`, `ColorScale`

### 2. Added Asset Exports (mol-util/index.ts)
- Added `export * from "./assets.ts"`
- Now exports: `Asset`, `AssetManager`, and all Asset namespace utilities

### 3. Added Background Exports (mol-canvas3d/index.ts)
- Added `export * from "./passes/background.ts"`
- Now exports: `BackgroundPass`, `BackgroundParams`, `BackgroundProps`

### 4. Created Documentation
- **EXPORTED_UTILITIES.md** - Comprehensive guide with examples
- **RELEASE_v5.3.12.md** - Complete release notes

## Files Modified

1. `src/mol-util/index.ts` - Added color and asset exports
2. `src/mol-canvas3d/index.ts` - Added background utilities export
3. `deno.json` - Bumped version to 5.3.12

## Usage Examples

### Color
```typescript
import { Color } from "jsr:@zachcp/molstar@5.3.12";
const white = Color(0xFFFFFF);
```

### Asset
```typescript
import { Asset } from "jsr:@zachcp/molstar@5.3.12";
const asset = Asset.Url("https://example.com/structure.cif");
```

### Background
```typescript
import { BackgroundParams, Color } from "jsr:@zachcp/molstar@5.3.12";
// Use BackgroundParams with PluginConfig to configure backgrounds
```

## Important Note: Backgrounds Extension

The `Backgrounds` extension itself is still NOT exported because it imports JPG image files as TypeScript modules, which are incompatible with Deno/JSR.

**Workaround:** Use `BackgroundParams` and configure backgrounds programmatically with your own image URLs (see EXPORTED_UTILITIES.md for examples).

## Publishing

```bash
deno publish --allow-slow-types
```

## Status

✅ Type checking passes: `deno check src/mod.ts`
✅ All new exports available from main package
✅ Documentation complete
⏳ Ready to publish to JSR

## Next Steps for User

1. Update your imports to use v5.3.12
2. Replace `Backgrounds` extension with `BackgroundParams` configuration
3. Use `Color`, `Asset` directly from package imports

See EXPORTED_UTILITIES.md for complete migration guide.