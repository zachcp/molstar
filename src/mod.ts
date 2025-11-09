/**
 * Copyright (c) 2018-2024 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

// Polyfills for browser compatibility
import "./mol-util/polyfill.ts";

// Core modules
export * from "./mol-data/index.ts";
export * from "./mol-state/index.ts";
export * from "./mol-task/index.ts";
export * from "./mol-util/index.ts";

// IO modules
export { StringLike } from "./mol-io/common/string-like.ts";

// Model modules
export { Volume } from "./mol-model/volume.ts";
export type { SaccharideCompIdMapType } from "./mol-model/structure/structure/carbohydrates/constants.ts";

// Plugin modules
export * from "./mol-plugin/index.ts";
export * from "./mol-plugin-ui/index.ts";
export * from "./mol-plugin-state/index.ts";

// Canvas
export * from "./mol-canvas3d/index.ts";

// Debug utilities
export {
  consoleStats,
  isDebugMode,
  isProductionMode,
  isTimingMode,
  setDebugMode,
  setProductionMode,
  setTimingMode,
} from "./mol-util/debug.ts";

// Version
export { PLUGIN_VERSION as version } from "./mol-plugin/version.ts";

// Extensions - Type-clean viewer extensions (11/15)
// See EXTENSION_TYPE_FIXES.md for details on fixes applied
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

// Note: Some extensions cannot be exported:
// - backgrounds: imports image assets (JPG files) incompatible with Deno
// - dnatco: has type errors with symbol indexing (fixable)
// - mvs: has import errors and API mismatches (fixable)
// See EXTENSION_TYPE_FIXES.md for complete details and workarounds
