# Merge Conflict Analysis

**Generated:** `git diff 2025-jsr..upstream/master`

**Total Conflicts:** 28

## Summary by Category

- **Canvas3D**: 5 file(s)
- **Configuration**: 2 file(s)
- **MVS Extension**: 12 file(s)
- **Math/Linear Algebra**: 2 file(s)
- **Model/Structure**: 1 file(s)
- **Plugin**: 3 file(s)
- **State Management**: 1 file(s)
- **Utilities**: 1 file(s)
- **WebGL/Graphics**: 1 file(s)

## ⚠️ Deleted Files (Need Decision)

- `package-lock.json` - **Deleted in yours, modified in upstream**
  - ✅ **Recommendation:** Keep deleted (JSR doesn't need package.json)
- `package.json` - **Deleted in yours, modified in upstream**
  - ✅ **Recommendation:** Keep deleted (JSR doesn't need package.json)

## Canvas3D (5 files)

### `src/mol-canvas3d/camera.ts`

- **Conflicts:** 3
- **Lines (ours/theirs):** 22 / 22
- **File size:** 637 lines

**Strategy:** Mixed changes. Careful line-by-line review needed.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
    readonly forceFull: boolean;
    readonly scale: number;
    readonly minTargetDistance: number;

    readonly disabled: boolean;
=======
  readonly forceFull: boolean;
... (truncated)
```

</details>

### `src/mol-canvas3d/camera/stereo.ts`

- **Conflicts:** 5
- **Lines (ours/theirs):** 72 / 73
- **File size:** 298 lines

**Strategy:** Mixed changes. Careful line-by-line review needed.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
import { Ray3D } from '../../mol-math/geometry/primitives/ray3d';
import { Mat4, Vec3 } from '../../mol-math/linear-algebra';
import { ParamDefinition as PD } from '../../mol-util/param-definition';
import { Camera, ICamera } from '../camera';
import { cameraUnproject, Viewport } from './util';
=======
import { Mat4 } from "../../mol-math/linear-algebra.ts";
... (truncated)
```

</details>

### `src/mol-canvas3d/canvas3d.ts`

- **Conflicts:** 5
- **Lines (ours/theirs):** 223 / 28
- **File size:** 2126 lines

**Strategy:** Likely mostly upstream changes. Carefully merge both.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
export type Canvas3DAttribs = typeof DefaultCanvas3DAttribs
export type PartialCanvas3DAttribs = {
    [K in keyof Canvas3DAttribs]?: Canvas3DAttribs[K] extends { name: string, params: any } ? Canvas3DAttribs[K] : Partial<Canvas3DAttribs[K]>
}
=======
export type Canvas3DAttribs = typeof DefaultCanvas3DAttribs;
>>>>>>> 2025-jsr
```

</details>

### `src/mol-canvas3d/helper/xr-manager.ts`

- **Conflicts:** 1
- **Lines (ours/theirs):** 19 / 19
- **File size:** 375 lines

**Strategy:** Mixed changes. Careful line-by-line review needed.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { WebGLContext } from '../../mol-gl/webgl/context';
import { Vec3 } from '../../mol-math/linear-algebra/3d/vec3';
import { Quat } from '../../mol-math/linear-algebra/3d/quat';
import { Mat4 } from '../../mol-math/linear-algebra/3d/mat4';
import { Camera, ICamera } from '../camera';
import { PointerHelper } from './pointer-helper';
... (truncated)
```

</details>

### `src/mol-canvas3d/passes/image.ts`

- **Conflicts:** 2
- **Lines (ours/theirs):** 13 / 21
- **File size:** 245 lines

**Strategy:** Mixed changes. Careful line-by-line review needed.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
    constructor(private webgl: WebGLContext, assetManager: AssetManager, private renderer: Renderer, private scene: Scene, private camera: Camera, helper: Helper, props: Partial<ImageProps>) {
        this.props = { ...PD.getDefaultValues(ImageParams), ...props };

        this.drawPass = new DrawPass(webgl, assetManager, 128, 128, scene.transparency);
        this.illuminationPass = new IlluminationPass(webgl, this.drawPass);
        this.multiSamplePass = new MultiSamplePass(webgl, this.drawPass);
        this.multiSampleHelper = new MultiSampleHelper(this.multiSamplePass);
... (truncated)
```

</details>

## MVS Extension (12 files)

### `src/apps/mvs-stories/elements/snapshot-markdown.tsx`

- **Conflicts:** 1
- **Lines (ours/theirs):** 4 / 4
- **File size:** 159 lines

**Strategy:** Mixed changes. Careful line-by-line review needed.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
import { PluginStateSnapshotManager } from '../../../mol-plugin-state/manager/snapshots';
import { PluginReactContext } from '../../../mol-plugin-ui/base';
import { CSSProperties, useEffect, useState } from 'react';
import { Markdown } from '../../../mol-plugin-ui/controls/markdown';
=======
import type { PluginStateSnapshotManager } from '../../../mol-plugin-state/manager/snapshots.ts';
import { PluginReactContext } from '../../../mol-plugin-ui/base.tsx';
... (truncated)
```

</details>

### `src/extensions/mvs/behavior.ts`

- **Conflicts:** 1
- **Lines (ours/theirs):** 24 / 24
- **File size:** 271 lines

**Strategy:** Mixed changes. Careful line-by-line review needed.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
import { CustomModelProperty } from '../../mol-model-props/common/custom-model-property';
import { CustomStructureProperty } from '../../mol-model-props/common/custom-structure-property';
import { DataFormatProvider } from '../../mol-plugin-state/formats/provider';
import { PluginDragAndDropHandler } from '../../mol-plugin-state/manager/drag-and-drop';
import { LociLabelProvider } from '../../mol-plugin-state/manager/loci-label';
import { PluginBehavior } from '../../mol-plugin/behavior/behavior';
import { PluginContext } from '../../mol-plugin/context';
... (truncated)
```

</details>

### `src/extensions/mvs/components/annotation-prop.ts`

- **Conflicts:** 1
- **Lines (ours/theirs):** 20 / 20
- **File size:** 494 lines

**Strategy:** Mixed changes. Careful line-by-line review needed.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
import { Column } from '../../../mol-data/db';
import { CIF, CifBlock, CifCategory, CifFile } from '../../../mol-io/reader/cif';
import { toTable } from '../../../mol-io/reader/cif/schema';
import { MmcifFormat } from '../../../mol-model-formats/structure/mmcif';
import { CustomModelProperty } from '../../../mol-model-props/common/custom-model-property';
import { CustomProperty } from '../../../mol-model-props/common/custom-property';
import { CustomPropertyDescriptor } from '../../../mol-model/custom-property';
... (truncated)
```

</details>

### `src/extensions/mvs/components/primitives.ts`

- **Conflicts:** 1
- **Lines (ours/theirs):** 41 / 39
- **File size:** 1315 lines

**Strategy:** Mixed changes. Careful line-by-line review needed.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
import { BaseGeometry } from '../../../mol-geo/geometry/base';
import { Lines } from '../../../mol-geo/geometry/lines/lines';
import { LinesBuilder } from '../../../mol-geo/geometry/lines/lines-builder';
import { addFixedCountDashedCylinder, addSimpleCylinder, BasicCylinderProps } from '../../../mol-geo/geometry/mesh/builder/cylinder';
import { addEllipsoid } from '../../../mol-geo/geometry/mesh/builder/ellipsoid';
import { Mesh } from '../../../mol-geo/geometry/mesh/mesh';
import { MeshBuilder } from '../../../mol-geo/geometry/mesh/mesh-builder';
... (truncated)
```

</details>

### `src/extensions/mvs/helpers/indexing.ts`

- **Conflicts:** 1
- **Lines (ours/theirs):** 6 / 5
- **File size:** 262 lines

**Strategy:** Mixed changes. Careful line-by-line review needed.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
import { Column } from '../../../mol-data/db';
import { SortedArray } from '../../../mol-data/int';
import { ChainIndex, ElementIndex, Model, ResidueIndex } from '../../../mol-model/structure';
import { CoarseElements } from '../../../mol-model/structure/model/properties/coarse';
import { filterInPlace, range, sortIfNeeded } from '../../../mol-util/array';
import { Mapping, MultiMap, NumberMap } from './utils';
=======
... (truncated)
```

</details>

### `src/extensions/mvs/helpers/label-text.ts`

- **Conflicts:** 1
- **Lines (ours/theirs):** 11 / 10
- **File size:** 140 lines

**Strategy:** Mixed changes. Careful line-by-line review needed.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
import { Sphere3D } from '../../../mol-math/geometry';
import { BoundaryHelper } from '../../../mol-math/geometry/boundary-helper';
import { Vec3 } from '../../../mol-math/linear-algebra';
import { ElementIndex, Model, Structure, StructureElement, StructureProperties, Unit } from '../../../mol-model/structure';
import { getPhysicalRadius } from '../../../mol-theme/size/physical';
import { arrayExtend } from '../../../mol-util/array';
import { ElementRanges } from './element-ranges';
... (truncated)
```

</details>

### `src/extensions/mvs/helpers/selections.ts`

- **Conflicts:** 1
- **Lines (ours/theirs):** 10 / 8
- **File size:** 501 lines

**Strategy:** Mixed changes. Careful line-by-line review needed.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
import { Column } from '../../../mol-data/db';
import { SortedArray } from '../../../mol-data/int';
import { ChainIndex, ElementIndex, Model, ResidueIndex, StructureElement } from '../../../mol-model/structure';
import { CoarseElements } from '../../../mol-model/structure/model/properties/coarse';
import { Expression } from '../../../mol-script/language/expression';
import { arrayExtend, filterInPlace, range, sortIfNeeded } from '../../../mol-util/array';
import { ElementRanges } from './element-ranges';
... (truncated)
```

</details>

### `src/extensions/mvs/helpers/utils.ts`

- **Conflicts:** 1
- **Lines (ours/theirs):** 4 / 5
- **File size:** 160 lines

**Strategy:** Mixed changes. Careful line-by-line review needed.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
import { hashString } from '../../../mol-data/util';
import { StateObject } from '../../../mol-state';
import { Color } from '../../../mol-util/color';
import { decodeColor as _decodeColor } from '../../../mol-util/color/utils';
=======
import { hashString } from '../../../mol-data/util.ts';
import type { StateObject } from '../../../mol-state/index.ts';
... (truncated)
```

</details>

### `src/extensions/mvs/load.ts`

- **Conflicts:** 1
- **Lines (ours/theirs):** 33 / 32
- **File size:** 527 lines

**Strategy:** Mixed changes. Careful line-by-line review needed.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
import { PluginStateSnapshotManager } from '../../mol-plugin-state/manager/snapshots';
import { PluginStateObject } from '../../mol-plugin-state/objects';
import { Download, ParseCcp4, ParseCif, ParseDx, ParsePrmtop, ParsePsf, ParseTop } from '../../mol-plugin-state/transforms/data';
import { CoordinatesFromDcd, CoordinatesFromLammpstraj, CoordinatesFromNctraj, CoordinatesFromTrr, CoordinatesFromXtc, CustomModelProperties, CustomStructureProperties, ModelFromTrajectory, StructureComponent, StructureFromModel, TopologyFromPrmtop, TopologyFromPsf, TopologyFromTop, TrajectoryFromGRO, TrajectoryFromLammpsTrajData, TrajectoryFromMmCif, TrajectoryFromMOL, TrajectoryFromMOL2, TrajectoryFromPDB, TrajectoryFromSDF, TrajectoryFromXYZ } from '../../mol-plugin-state/transforms/model';
import { StructureRepresentation3D, VolumeRepresentation3D } from '../../mol-plugin-state/transforms/representation';
import { VolumeFromCcp4, VolumeFromDensityServerCif, VolumeFromDx } from '../../mol-plugin-state/transforms/volume';
import { PluginCommands } from '../../mol-plugin/commands';
... (truncated)
```

</details>

### `src/extensions/mvs/tree/mvs/mvs-builder.ts`

- **Conflicts:** 1
- **Lines (ours/theirs):** 6 / 5
- **File size:** 543 lines

**Strategy:** Mixed changes. Careful line-by-line review needed.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
import { deepClone, pickObjectKeys } from '../../../../mol-util/object';
import { GlobalMetadata, MVSData_State, Snapshot, SnapshotMetadata } from '../../mvs-data';
import { MVSAnimationNodeParams, MVSAnimationSubtree } from '../animation/animation-tree';
import { CustomProps } from '../generic/tree-schema';
import { MVSKind, MVSNode, MVSNodeParams, MVSSubtree } from './mvs-tree';
import { ColorT, PrimitivePositionT } from './param-types';
=======
... (truncated)
```

</details>

### `src/extensions/mvs/tree/mvs/mvs-tree.ts`

- **Conflicts:** 1
- **Lines (ours/theirs):** 6 / 6
- **File size:** 415 lines

**Strategy:** Mixed changes. Careful line-by-line review needed.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
import { bool, dict, float, int, list, literal, nullable, OptionalField, RequiredField, str, tuple, union } from '../generic/field-schema';
import { SimpleParamsSchema } from '../generic/params-schema';
import { NodeFor, ParamsOfKind, SubtreeOfKind, TreeFor, TreeSchema, TreeSchemaWithAllRequired } from '../generic/tree-schema';
import { MVSPrimitiveParams } from './mvs-tree-primitives';
import { MVSClipParams, MVSRepresentationParams, MVSVolumeRepresentationParams } from './mvs-tree-representations';
import { ColorT, ComponentExpressionT, ComponentSelectorT, LabelAttachments, Matrix, Palette, ParseFormatT, SchemaFormatT, SchemaT, StrList, StructureTypeT, Vector3 } from './param-types';
=======
... (truncated)
```

</details>

### `src/extensions/mvs/tree/mvs/param-types.ts`

- **Conflicts:** 1
- **Lines (ours/theirs):** 2 / 2
- **File size:** 390 lines

**Strategy:** Mixed changes. Careful line-by-line review needed.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
import { ColorNames } from '../../../../mol-util/color/names';
import { ValueFor, bool, dict, float, int, list, literal, nullable, object, partial, str, tuple, union } from '../generic/field-schema';
=======
import { ColorName, HexColor } from '../../helpers/utils.ts';
import { type ValueFor, bool, dict, float, int, list, literal, nullable, object, partial, str, tuple, union } from '../generic/field-schema.ts';
>>>>>>> 2025-jsr
```

</details>

## Math/Linear Algebra (2 files)

### `src/mol-math/linear-algebra/3d/vec2.ts`

- **Conflicts:** 1
- **Lines (ours/theirs):** 14 / 6
- **File size:** 218 lines

**Strategy:** Mixed changes. Careful line-by-line review needed.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
    export function fromObj(v: { x: number, y: number }): Vec2 {
        return create(v.x, v.y);
    }

    export function toObj(v: Vec2) {
        return { x: v[0], y: v[1] };
    }
... (truncated)
```

</details>

### `src/mol-math/linear-algebra/3d/vec3.ts`

- **Conflicts:** 1
- **Lines (ours/theirs):** 21 / 1
- **File size:** 718 lines

**Strategy:** Likely mostly upstream changes. Carefully merge both.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
        // Regular case (`b` not parallel to `a`)
        normalize(out, cross(out, cross(out, a, b), a));
        if (!Vec3.isZero(out)) return out;

        // `b` was parallel to `a`, try orthogonalize(a, X)
        out[0] = 1; out[1] = 0; out[2] = 0;
        normalize(out, cross(out, cross(out, a, out), a));
... (truncated)
```

</details>

## Model/Structure (1 files)

### `src/mol-model-formats/structure/basic/atomic.ts`

- **Conflicts:** 1
- **Lines (ours/theirs):** 18 / 17
- **File size:** 228 lines

**Strategy:** Mixed changes. Careful line-by-line review needed.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
import { Column, Table } from '../../../mol-data/db';
import { Interval, Segmentation } from '../../../mol-data/int';
import { toDatabase } from '../../../mol-io/reader/cif/schema';
import { SymmetryOperator } from '../../../mol-math/geometry';
import { Mat4, Vec3 } from '../../../mol-math/linear-algebra';
import { ChainIndex, ElementIndex } from '../../../mol-model/structure';
import { AtomSiteOperatorMappingSchema } from '../../../mol-model/structure/export/categories/atom_site_operator_mapping';
... (truncated)
```

</details>

## Plugin (3 files)

### `src/mol-plugin-ui/viewport.tsx`

- **Conflicts:** 1
- **Lines (ours/theirs):** 10 / 10
- **File size:** 217 lines

**Strategy:** Mixed changes. Careful line-by-line review needed.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
import { PluginCommands } from '../mol-plugin/commands';
import { PluginConfig } from '../mol-plugin/config';
import { ParamDefinition as PD } from '../mol-util/param-definition';
import { PluginUIComponent } from './base';
import { Button, ControlGroup, IconButton } from './controls/common';
import { AspectRatioSvg, AutorenewSvg, BuildOutlinedSvg, CameraOutlinedSvg, CloseSvg, FullscreenSvg, HeadsetVRSvg, TuneSvg } from './controls/icons';
import { ToggleSelectionModeButton } from './structure/selection';
... (truncated)
```

</details>

### `src/mol-plugin/context.ts`

- **Conflicts:** 1
- **Lines (ours/theirs):** 169 / 8
- **File size:** 949 lines

**Strategy:** Likely mostly upstream changes. Carefully merge both.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
    dataTransaction(f: (ctx: RuntimeContext) => Promise<void> | void, options?: { canUndo?: string | boolean, rethrowErrors?: boolean }) {
        return this.runTask(this.state.data.transaction(f, options));
    }

    clear(resetViewportSettings = false) {
        if (resetViewportSettings) this.canvas3d?.setProps(DefaultCanvas3DParams);
        return PluginCommands.State.RemoveObject(this, { state: this.state.data, ref: StateTransform.RootRef });
... (truncated)
```

</details>

### `src/mol-plugin/state.ts`

- **Conflicts:** 2
- **Lines (ours/theirs):** 127 / 21
- **File size:** 635 lines

**Strategy:** Likely mostly upstream changes. Carefully merge both.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
    async setSnapshot(snapshot: PluginState.Snapshot) {
        await this.animation.stop();

        // this needs to go 1st since these changes are already baked into the behavior and data state
        if (snapshot.structureComponentManager?.options) this.plugin.managers.structure.component._setSnapshotState(snapshot.structureComponentManager?.options);
        if (snapshot.behaviour) await this.plugin.runTask(this.behaviors.setSnapshot(snapshot.behaviour));
        if (snapshot.data) await this.plugin.runTask(this.data.setSnapshot(snapshot.data));
... (truncated)
```

</details>

## State Management (1 files)

### `src/mol-state/state.ts`

- **Conflicts:** 2
- **Lines (ours/theirs):** 172 / 18
- **File size:** 1547 lines

**Strategy:** Likely mostly upstream changes. Carefully merge both.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
    readonly globalContext: unknown = void 0;
    readonly events = {
        cell: {
            stateUpdated: this.ev<State.ObjectEvent & { cell: StateObjectCell }>(),
            created: this.ev<State.ObjectEvent & { cell: StateObjectCell }>(),
            removed: this.ev<State.ObjectEvent & { parent: StateTransform.Ref }>(),
        },
... (truncated)
```

</details>

## Utilities (1 files)

### `src/mol-util/input/input-observer.ts`

- **Conflicts:** 4
- **Lines (ours/theirs):** 1002 / 62
- **File size:** 2535 lines

**Strategy:** Likely mostly upstream changes. Carefully merge both.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
    buttons: ButtonsType
    button: ButtonsType.Flag
    modifiers: ModifiersKeys
}

export type DragInput = {
    x: number,
... (truncated)
```

</details>

## WebGL/Graphics (1 files)

### `src/mol-gl/webgl/context.ts`

- **Conflicts:** 2
- **Lines (ours/theirs):** 130 / 12
- **File size:** 819 lines

**Strategy:** Likely mostly upstream changes. Carefully merge both.

<details>
<summary>First conflict preview</summary>

```
<<<<<<< HEAD
function getDrawingBufferSize(gl: GLRenderingContext, xrLayer?: XRWebGLLayer, xrInteractionMode?: XRInteractionMode) {
    let width = xrLayer?.framebufferWidth ?? gl.drawingBufferWidth;
    if (xrInteractionMode === 'screen-space') {
        // workaround so XR with a single view behaves simlar to two views
        width *= 2;
    }
    const height = xrLayer?.framebufferHeight ?? gl.drawingBufferHeight;
... (truncated)
```

</details>

## Resolution Steps

1. **Handle deleted files first:**
   ```bash
   git rm package-lock.json package.json  # We use deno.json instead
   ```

2. **Resolve conflicts by category:**
   - Start with smallest files
   - Use LLM assistance for complex merges
   - Test after each category

3. **For each file:**
   ```bash
   # View conflict
   git diff --ours <file>
   git diff --theirs <file>
   
   # Edit to resolve
   # Then mark as resolved:
   git add <file>
   ```

4. **Test frequently:**
   ```bash
   deno check src/mod.ts
   deno publish --dry-run 2>&1 | tail -5
   ```

5. **Commit when all resolved:**
   ```bash
   git commit -m 'Merge JSR changes onto v5.3.0'
   ```
