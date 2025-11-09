# Exported Utilities from @zachcp/molstar

This document describes commonly-used utilities that are now exported from the main `@zachcp/molstar` package.

## Version 5.3.11+ Exports

Starting with version 5.3.11, the following utilities are exported directly from the package:

### Color Utilities

```typescript
import { Color, ColorMap, ColorTable, ColorScale } from "jsr:@zachcp/molstar@5.3.11";
```

**Exported from:** `mol-util/color/index.ts`

- `Color` - Type and constructor for color values (represented as integers)
- `ColorMap` - Maps values to colors
- `ColorTable` - Table-based color storage
- `ColorScale` - Color scaling utilities

**Example usage:**
```typescript
import { Color } from "jsr:@zachcp/molstar@5.3.11";

const white = Color(0xFFFFFF);
const red = Color(0xFF0000);
```

### Asset Management

```typescript
import { Asset, AssetManager } from "jsr:@zachcp/molstar@5.3.11";
```

**Exported from:** `mol-util/assets.ts`

The `Asset` type represents downloadable resources (URLs or files):

```typescript
// Create a URL asset
const urlAsset = Asset.Url("https://example.com/structure.cif");

// Create a file asset
const fileAsset = Asset.File(fileObject);

// Check asset type
if (Asset.isUrl(myAsset)) {
  console.log(myAsset.url);
}
```

**Asset namespace includes:**
- `Asset.Url` - Constructor for URL-based assets
- `Asset.File` - Constructor for file-based assets
- `Asset.isUrl()` - Type guard for URL assets
- `Asset.isFile()` - Type guard for file assets
- `Asset.Wrapper<T>` - Wrapper interface for loaded asset data

**AssetManager** provides methods to:
- Load assets asynchronously
- Manage asset lifecycle
- Resolve URLs to data

### Background Utilities

```typescript
import { BackgroundPass, BackgroundParams } from "jsr:@zachcp/molstar@5.3.11";
```

**Exported from:** `mol-canvas3d/passes/background.ts`

- `BackgroundPass` - Class for rendering background effects
- `BackgroundParams` - Parameter definitions for background configuration
- `BackgroundProps` - Type for background properties

**Background variants supported:**
- `off` - No background
- `skybox` - Cubic skybox with 6 face images
- `image` - Single image background
- `horizontalGradient` - Horizontal gradient
- `radialGradient` - Radial gradient from center

## Important Notes

### Backgrounds Extension NOT Exported

The `Backgrounds` extension from `extensions/backgrounds` is **NOT** exported in the JSR package because:

1. It imports JPG image assets directly as TypeScript modules
2. These asset imports are incompatible with Deno/JSR module resolution
3. The extension includes bundled images (cells.jpg, nebula skybox faces)

**Workaround:** If you need the Backgrounds extension functionality:

1. Use `BackgroundPass` and `BackgroundParams` directly (now exported)
2. Provide your own image URLs instead of bundled images
3. Configure backgrounds programmatically using `PluginConfig.Background.Styles`

**Example alternative:**
```typescript
import { PluginConfig, Color, BackgroundParams } from "jsr:@zachcp/molstar@5.3.11";

// Configure a radial gradient background programmatically
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

### Other Utility Exports

All utilities previously exported from core modules remain available:

```typescript
// From mol-util
export { BitFlags, Mask, StringBuilder, UUID };
export { defaults, extend, assign, merge, shallowClone };
export { deepEqual, shallowEqual, arrayEqual };
export { formatTime, formatProgress, formatBytes };

// From mol-data
export * from "mol-data/index.ts";

// From mol-task
export * from "mol-task/index.ts";

// From mol-plugin
export * from "mol-plugin/index.ts";

// From mol-plugin-ui
export * from "mol-plugin-ui/index.ts";

// From mol-canvas3d
export * from "mol-canvas3d/index.ts";
```

## Migration Guide

If your code previously imported these utilities from internal paths:

### Before (won't work with JSR package):
```typescript
import { Color } from "../../mol-util/color/color.ts";
import { Asset } from "../../mol-util/assets.ts";
import { Backgrounds } from "../../extensions/backgrounds.ts";
```

### After (works with JSR package):
```typescript
import { 
  Color, 
  Asset,
  BackgroundParams,
  PluginConfig 
} from "jsr:@zachcp/molstar@5.3.11";

// Note: Use BackgroundParams instead of Backgrounds extension
// Configure backgrounds programmatically as shown above
```

## See Also

- [EXTENSION_TYPE_FIXES.md](./EXTENSION_TYPE_FIXES.md) - Details on extension type checking fixes
- [README.md](./README.md) - Main package documentation
- [Mol* Documentation](https://molstar.org/docs/) - Official Mol* viewer documentation