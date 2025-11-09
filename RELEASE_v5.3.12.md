# Release Notes - Version 5.3.12

**Release Date:** 2025-01-XX

## Summary

This release adds exports for commonly-used utility types and functions that were previously not accessible from the JSR package, specifically `Color`, `Asset`, and background-related utilities.

## New Exports

### Color Utilities

The following color-related exports are now available from the main package:

- `Color` - Type and constructor for color values (represented as integers)
- `ColorMap` - Maps values to colors
- `ColorTable` - Table-based color storage
- `ColorScale` - Color scaling utilities

**Example:**
```typescript
import { Color } from "jsr:@zachcp/molstar@5.3.12";

const white = Color(0xFFFFFF);
const red = Color(0xFF0000);
```

### Asset Management

Asset-related utilities are now exported:

- `Asset` - Type for URL or file-based assets
- `Asset.Url` - Constructor for URL-based assets
- `Asset.File` - Constructor for file-based assets
- `Asset.isUrl()` - Type guard for URL assets
- `Asset.isFile()` - Type guard for file assets
- `AssetManager` - Manager for loading and handling assets

**Example:**
```typescript
import { Asset } from "jsr:@zachcp/molstar@5.3.12";

const urlAsset = Asset.Url("https://example.com/structure.cif");
```

### Background Utilities

Background rendering utilities are now exported from `mol-canvas3d`:

- `BackgroundPass` - Class for rendering background effects
- `BackgroundParams` - Parameter definitions for background configuration
- `BackgroundProps` - Type for background properties

**Example:**
```typescript
import { BackgroundParams, PluginConfig, Color } from "jsr:@zachcp/molstar@5.3.12";

plugin.config.set(PluginConfig.Background.Styles, [
  [{
    variant: {
      name: 'radialGradient',
      params: {
        centerColor: Color(0xFFFFFF),
        edgeColor: Color(0x808080),
        ratio: 0.2,
        coverage: 'viewport',
      },
    },
  }, 'Custom Gradient'],
]);
```

## Changes

### Modified Files

1. **src/mol-util/index.ts**
   - Added `export * from "./color/index.ts"` to export color utilities
   - Added `export * from "./assets.ts"` to export asset management

2. **src/mol-canvas3d/index.ts**
   - Added `export * from "./passes/background.ts"` to export background utilities

3. **deno.json**
   - Bumped version from 5.3.11 to 5.3.12

### New Documentation

- **EXPORTED_UTILITIES.md** - Comprehensive guide to the newly exported utilities, including:
  - Usage examples for Color, Asset, and Background utilities
  - Migration guide from internal imports to package exports
  - Important notes about the Backgrounds extension and workarounds

## Breaking Changes

None. This is a backwards-compatible release that adds new exports.

## Important Notes

### Backgrounds Extension Still Not Exported

The `Backgrounds` extension from `extensions/backgrounds` remains **NOT** exported because it imports JPG image assets directly as TypeScript modules, which are incompatible with Deno/JSR module resolution.

**Workaround:** Use `BackgroundPass` and `BackgroundParams` (now exported) with your own image URLs, or configure backgrounds programmatically using `PluginConfig.Background.Styles`.

See [EXPORTED_UTILITIES.md](./EXPORTED_UTILITIES.md) for detailed examples.

## Installation

```bash
deno add jsr:@zachcp/molstar@5.3.12
```

Or in your import map:
```json
{
  "imports": {
    "molstar": "jsr:@zachcp/molstar@5.3.12"
  }
}
```

## Publishing

To publish this version:

```bash
cd molstar
deno publish --allow-slow-types
```

Note: The `--allow-slow-types` flag is still required due to the existing 536 slow-type issues in the codebase (documented in previous releases).

## Migration from 5.3.11

If you were importing these utilities from internal paths (which wouldn't work with JSR), update your imports:

**Before:**
```typescript
// These won't work with JSR package
import { Color } from "../../mol-util/color/color.ts";
import { Asset } from "../../mol-util/assets.ts";
```

**After:**
```typescript
import { Color, Asset } from "jsr:@zachcp/molstar@5.3.12";
```

## Related Documentation

- [EXPORTED_UTILITIES.md](./EXPORTED_UTILITIES.md) - Complete guide to exported utilities
- [EXTENSION_TYPE_FIXES.md](./EXTENSION_TYPE_FIXES.md) - Extension type checking fixes
- [RELEASE_v5.3.10.md](./RELEASE_v5.3.10.md) - Previous release notes

## Issues Resolved

This release resolves import errors for users trying to use `Color`, `Asset`, and background-related utilities from the JSR package. Previously, these were only accessible via internal path imports, which don't work with JSR's module resolution.

Error messages like the following are now resolved:
```
SyntaxError: The requested module 'jsr:@zachcp/molstar@5.3.11' does not 
provide an export named 'Color'
```

## Contributors

- Zachary Powers (@zachcp)

---

For questions or issues, please visit the [Mol* GitHub repository](https://github.com/molstar/molstar) or the JSR package page at [@zachcp/molstar](https://jsr.io/@zachcp/molstar).