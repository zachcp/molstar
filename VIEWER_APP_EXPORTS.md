# Viewer App Import Compatibility Guide

This document tracks which imports from `src/apps/viewer/app.ts` are available in the JSR package exports.

**Last Updated:** 2025-01-XX  
**Package Version:** 5.3.15+

---

## Export Status Summary

| Category | Total | Exported | Not Exported | % Complete |
|----------|-------|----------|--------------|------------|
| Extensions | 17 | 15 | 2 | 88% |
| Core Modules | 35 | 35 | 0 | 100% |
| **Overall** | **52** | **50** | **2** | **96%** |

---

## Extensions (17 total)

### ✅ Exported (15)

1. **ANVILMembraneOrientation**
   - Source: `extensions/anvil/behavior.ts`
   - Export: `export * from "./extensions/anvil/behavior.ts"`

2. **DnatcoNtCs** 
   - Source: `extensions/dnatco/index.ts`
   - Export: `export * from "./extensions/dnatco/index.ts"`
   - Note: Fixed in v5.3.15 (type errors resolved)

3. **G3DFormat, G3dProvider**
   - Source: `extensions/g3d/format.ts`
   - Export: `export * from "./extensions/g3d/format.ts"`

4. **GeometryExport**
   - Source: `extensions/geo-export/index.ts`
   - Export: `export * from "./extensions/geo-export/index.ts"`

5. **MAQualityAssessment, MAQualityAssessmentConfig, QualityAssessmentPLDDTPreset, QualityAssessmentQmeanPreset**
   - Source: `extensions/model-archive/quality-assessment/behavior.ts`
   - Export: `export * from "./extensions/model-archive/quality-assessment/behavior.ts"`

6. **QualityAssessment**
   - Source: `extensions/model-archive/quality-assessment/prop.ts`
   - Export: `export { QualityAssessment } from "./extensions/model-archive/quality-assessment/prop.ts"`
   - Note: Added in v5.3.15

7. **ModelExport**
   - Source: `extensions/model-export/index.ts`
   - Export: `export * from "./extensions/model-export/index.ts"`

8. **Mp4Export**
   - Source: `extensions/mp4-export/index.ts`
   - Export: `export * from "./extensions/mp4-export/index.ts"`

9. **PDBeStructureQualityReport**
   - Source: `extensions/pdbe/index.ts`
   - Export: `export * from "./extensions/pdbe/index.ts"`

10. **RCSBValidationReport**
    - Source: `extensions/rcsb/index.ts`
    - Export: `export * from "./extensions/rcsb/index.ts"`

11. **AssemblySymmetry, AssemblySymmetryConfig**
    - Source: `extensions/assembly-symmetry/index.ts`
    - Export: `export * from "./extensions/assembly-symmetry/index.ts"`

12. **SbNcbrPartialCharges, SbNcbrPartialChargesPreset, SbNcbrPartialChargesPropertyProvider, SbNcbrTunnels**
    - Source: `extensions/sb-ncbr/index.ts`
    - Export: `export * from "./extensions/sb-ncbr/index.ts"`

13. **wwPDBChemicalComponentDictionary**
    - Source: `extensions/wwpdb/ccd/behavior.ts`
    - Export: `export * from "./extensions/wwpdb/ccd/behavior.ts"`

14. **wwPDBStructConnExtensionFunctions**
    - Source: `extensions/wwpdb/struct-conn/index.ts`
    - Export: `export { wwPDBStructConnExtensionFunctions } from "./extensions/wwpdb/struct-conn/index.ts"`
    - Note: Added in v5.3.15

15. **ZenodoImport**
    - Source: `extensions/zenodo/index.ts`
    - Export: `export * from "./extensions/zenodo/index.ts"`

### ❌ Not Exported (2)

1. **Backgrounds**
   - Source: `extensions/backgrounds.ts`
   - Status: ❌ **Cannot be exported**
   - Reason: Imports JPG image assets as TypeScript modules (incompatible with Deno/JSR)
   - Workaround: Use `BackgroundParams` and configure programmatically
   ```typescript
   import { BackgroundParams, Color, PluginConfig } from "jsr:@zachcp/molstar";
   
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

2. **MolViewSpec (MVS Extension)**
   - Imports: `MolViewSpec, loadMVSData, loadMVSX, loadMVS, MolstarLoadingExtension, MVSData`
   - Source: `extensions/mvs/*`
   - Status: ❌ **Not yet exported**
   - Reason: Type errors and API mismatches (fixable)
   - Note: Planned for future release

---

## Core Modules (35 total)

### ✅ All Exported (35/35)

#### mol-model (2)
- `SaccharideCompIdMapType` - Type export
- `Volume` - Volume data model

#### mol-plugin-state (13)
- `DownloadStructure, PdbDownloadProvider` - Structure download actions
- `DownloadDensity` - Density download action
- `PresetTrajectoryHierarchy` - Type for trajectory hierarchy
- `PresetStructureRepresentations, StructureRepresentationPresetProvider` - Representation presets
- `BuiltInCoordinatesFormat` - Type for coordinate formats
- `DataFormatProvider` - Type for data format providers
- `BuiltInTopologyFormat` - Type for topology formats
- `BuiltInTrajectoryFormat` - Type for trajectory formats
- `BuildInVolumeFormat` - Type for volume formats
- `createVolumeRepresentationParams` - Helper function
- `PluginStateObject` - State object types
- `StateTransforms` - State transformations
- `TrajectoryFromModelAndCoordinates` - Transform for trajectories
- `OpenFiles` - File opening action

#### mol-plugin-ui (5)
- `PluginUIContext` - UI context type
- `createPluginUI` - Main UI creation function
- `renderReact18` - React 18 renderer
- `DefaultPluginUISpec` - Default UI specification
- `PluginUISpec` - UI specification type

#### mol-plugin (6)
- `PluginCommands` - Plugin command system
- `PluginConfig, PluginConfigItem` - Configuration system
- `PluginLayoutControlsDisplay` - Layout control types
- `PluginSpec` - Plugin specification
- `PluginState` - Plugin state management

#### mol-state (2)
- `StateObjectRef` - State object reference
- `StateObjectSelector` - Type for state object selectors

#### mol-task (1)
- `Task` - Task execution system

#### mol-util (4)
- `Asset` - Asset type and utilities
- `Color` - Color type and utilities
- `ObjectKeys` - Type-safe object key iteration
- Polyfill - Browser compatibility (auto-loaded)

#### mol-io (1)
- `StringLike` - String-like interface for various string types

#### Debug & Version (2)
- `version` - Plugin version (PLUGIN_VERSION)
- Debug utilities: `consoleStats, isDebugMode, isProductionMode, isTimingMode, setDebugMode, setProductionMode, setTimingMode`

---

## Migration Examples

### Before (Internal Imports)
```typescript
// These internal imports won't work with JSR package
import { Color } from '../../mol-util/color/index.ts';
import { Asset } from '../../mol-util/assets.ts';
import { Backgrounds } from '../../extensions/backgrounds.ts';
import { DnatcoNtCs } from '../../extensions/dnatco.ts';
```

### After (JSR Package Imports)
```typescript
// All available from main package export
import { 
  Color,
  Asset,
  DnatcoNtCs,
  // Note: Backgrounds not available, use BackgroundParams instead
  BackgroundParams,
  PluginConfig,
  createPluginUI,
  DefaultPluginUISpec,
} from "jsr:@zachcp/molstar@5.3.15";
```

---

## Complete Viewer App Import List

Here's the complete import block that works with the JSR package:

```typescript
import {
  // Extensions (15 exported)
  ANVILMembraneOrientation,
  // Backgrounds, // ❌ Not available - use BackgroundParams instead
  DnatcoNtCs,
  G3DFormat,
  G3dProvider,
  GeometryExport,
  MAQualityAssessment,
  MAQualityAssessmentConfig,
  QualityAssessmentPLDDTPreset,
  QualityAssessmentQmeanPreset,
  QualityAssessment,
  ModelExport,
  Mp4Export,
  // MolViewSpec, // ❌ Not available yet
  // loadMVSData, loadMVSX, loadMVS, MVSData, // ❌ MVS not available yet
  PDBeStructureQualityReport,
  RCSBValidationReport,
  AssemblySymmetry,
  AssemblySymmetryConfig,
  SbNcbrPartialCharges,
  SbNcbrPartialChargesPreset,
  SbNcbrPartialChargesPropertyProvider,
  SbNcbrTunnels,
  wwPDBChemicalComponentDictionary,
  wwPDBStructConnExtensionFunctions,
  ZenodoImport,
  
  // Core modules
  Volume,
  DownloadStructure,
  PdbDownloadProvider,
  DownloadDensity,
  PresetStructureRepresentations,
  StructureRepresentationPresetProvider,
  createVolumeRepresentationParams,
  PluginStateObject,
  StateTransforms,
  TrajectoryFromModelAndCoordinates,
  PluginUIContext,
  createPluginUI,
  renderReact18,
  DefaultPluginUISpec,
  PluginCommands,
  PluginConfig,
  PluginSpec,
  StateObjectRef,
  Task,
  Asset,
  Color,
  ObjectKeys,
  OpenFiles,
  StringLike,
  version,
  
  // Types
  SaccharideCompIdMapType,
  PluginUISpec,
  PluginConfigItem,
  PluginLayoutControlsDisplay,
  PluginState,
  StateObjectSelector,
  PresetTrajectoryHierarchy,
  BuiltInCoordinatesFormat,
  DataFormatProvider,
  BuiltInTopologyFormat,
  BuiltInTrajectoryFormat,
  BuildInVolumeFormat,
  
  // Background utilities (alternative to Backgrounds extension)
  BackgroundParams,
  BackgroundPass,
} from "jsr:@zachcp/molstar@5.3.15";

// Polyfill is auto-loaded, or import explicitly:
import "jsr:@zachcp/molstar@5.3.15/polyfill";
```

---

## Related Documentation

- [EXPORTED_UTILITIES.md](./EXPORTED_UTILITIES.md) - Guide for Color, Asset, and Background utilities
- [EXTENSION_TYPE_FIXES.md](./EXTENSION_TYPE_FIXES.md) - Details on extension type checking fixes
- [RELEASE_v5.3.15.md](./RELEASE_v5.3.15.md) - Release notes for v5.3.15

---

## Future Work

### Planned Exports
- **MVS Extension** - Fix type errors and export (MolViewSpec, loadMVS, MVSData, etc.)

### Cannot Export
- **Backgrounds Extension** - Asset import incompatibility (use BackgroundParams workaround)