/**
 * Copyright (c) 2019-2024 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 * @author Ke Ma <mark.ma@rcsb.org>
 * @author Adam Midlik <midlik@gmail.com>
 */

import type { Camera } from "../../mol-canvas3d/camera.ts";
import type { GraphicsRenderObject } from "../../mol-gl/render-object.ts";
import type { Sphere3D } from "../../mol-math/geometry.ts";
import { BoundaryHelper } from "../../mol-math/geometry/boundary-helper.ts";
import { Mat3 } from "../../mol-math/linear-algebra.ts";
import type { Vec3 } from "../../mol-math/linear-algebra/3d/vec3.ts";
import type { PrincipalAxes } from "../../mol-math/linear-algebra/matrix/principal-axes.ts";
import { Loci } from "../../mol-model/loci.ts";
import { type Structure, StructureElement } from "../../mol-model/structure.ts";
import type { PluginContext } from "../../mol-plugin/context.ts";
import type { PluginState } from "../../mol-plugin/state.ts";
import { PluginStateObject } from "../objects.ts";
import { pcaFocus } from "./focus-camera/focus-first-residue.ts";
import { getFocusSnapshot } from "./focus-camera/focus-object.ts";
import {
  changeCameraRotation,
  structureLayingTransform,
} from "./focus-camera/orient-axes.ts";

// TODO: make this customizable somewhere?
const DefaultCameraFocusOptions = {
  minRadius: 5,
  extraRadius: 4,
  durationMs: 250,
};

export type CameraFocusOptions = typeof DefaultCameraFocusOptions;

export class CameraManager {
  private boundaryHelper = new BoundaryHelper("98");

  private transformedLoci(loci: Loci) {
    if (StructureElement.Loci.is(loci)) {
      // use decorated (including 3d transforms) parent structure
      const parent = this.plugin.helpers.substructureParent.get(loci.structure)
        ?.obj?.data;
      if (parent) loci = StructureElement.Loci.remap(loci, parent);
    }
    return loci;
  }

  focusRenderObjects(
    objects?: ReadonlyArray<GraphicsRenderObject>,
    options?: Partial<CameraFocusOptions>,
  ) {
    if (!objects) return;
    const spheres: Sphere3D[] = [];

    for (const o of objects) {
      const s = o.values.boundingSphere.ref.value;
      if (s.radius === 0) continue;
      spheres.push(s);
    }

    this.focusSpheres(spheres, (s) => s, options);
  }

  focusLoci(loci: Loci | Loci[], options?: Partial<CameraFocusOptions>) {
    // TODO: allow computation of principal axes here?
    // perhaps have an optimized function, that does exact axes small Loci and approximate/sampled from big ones?

    let sphere: Sphere3D | undefined;

    if (Array.isArray(loci) && loci.length > 1) {
      const spheres = [];
      for (const l of loci) {
        const s = Loci.getBoundingSphere(this.transformedLoci(l));
        if (s) spheres.push(s);
      }

      if (spheres.length === 0) return;

      this.boundaryHelper.reset();
      for (const s of spheres) {
        this.boundaryHelper.includeSphere(s);
      }
      this.boundaryHelper.finishedIncludeStep();
      for (const s of spheres) {
        this.boundaryHelper.radiusSphere(s);
      }
      sphere = this.boundaryHelper.getSphere();
    } else if (Array.isArray(loci)) {
      if (loci.length === 0) return;
      sphere = Loci.getBoundingSphere(this.transformedLoci(loci[0]));
    } else {
      sphere = Loci.getBoundingSphere(this.transformedLoci(loci));
    }

    if (sphere) {
      this.focusSphere(sphere, options);
    }
  }

  focusSpheres<T>(
    xs: ReadonlyArray<T>,
    sphere: (t: T) => Sphere3D | undefined,
    options?: Partial<CameraFocusOptions> & {
      principalAxes?: PrincipalAxes;
      positionToFlip?: Vec3;
    },
  ): void {
    const spheres = [];

    for (const x of xs) {
      const s = sphere(x);
      if (s) spheres.push(s);
    }

    if (spheres.length === 0) return;
    if (spheres.length === 1) return this.focusSphere(spheres[0], options);

    this.boundaryHelper.reset();
    for (const s of spheres) {
      this.boundaryHelper.includeSphere(s);
    }
    this.boundaryHelper.finishedIncludeStep();
    for (const s of spheres) {
      this.boundaryHelper.radiusSphere(s);
    }
    this.focusSphere(this.boundaryHelper.getSphere(), options);
  }

  focusSphere(
    sphere: Sphere3D,
    options?: Partial<CameraFocusOptions> & {
      principalAxes?: PrincipalAxes;
      positionToFlip?: Vec3;
    },
  ) {
    const { canvas3d } = this.plugin;
    if (!canvas3d) return;

    const { extraRadius, minRadius, durationMs } = {
      ...DefaultCameraFocusOptions,
      ...options,
    };
    const radius = Math.max(sphere.radius + extraRadius, minRadius);

    if (options?.principalAxes) {
      const snapshot = pcaFocus(
        this.plugin,
        radius,
        options as { principalAxes: PrincipalAxes; positionToFlip?: Vec3 },
      );
      this.plugin.canvas3d?.requestCameraReset({ durationMs, snapshot });
    } else {
      const snapshot = canvas3d.camera.getFocus(sphere.center, radius);
      canvas3d.requestCameraReset({ durationMs, snapshot });
    }
  }

  /** Focus on a set of plugin state object cells (if `options.targets` is non-empty) or on the whole scene (if `options.targets` is empty). */
  focusObject(
    options: PluginState.SnapshotFocusInfo & {
      minRadius?: number;
      durationMs?: number;
    },
  ) {
    if (!this.plugin.canvas3d) return;
    const snapshot = getFocusSnapshot(this.plugin, {
      ...options,
      targets: options.targets?.map((t) => ({
        ...t,
        extraRadius: t.extraRadius ?? DefaultCameraFocusOptions.extraRadius,
      })),
      minRadius: options.minRadius ?? DefaultCameraFocusOptions.minRadius,
    });
    this.plugin.canvas3d.requestCameraReset({
      snapshot,
      durationMs: options.durationMs ?? DefaultCameraFocusOptions.durationMs,
    });
  }

  /** Align PCA axes of `structures` (default: all loaded structures) to the screen axes. */
  orientAxes(structures?: Structure[], durationMs?: number) {
    if (!this.plugin.canvas3d) return;
    if (!structures) {
      const structCells = this.plugin.state.data.selectQ((q) =>
        q.ofType(PluginStateObject.Molecule.Structure),
      );
      const rootStructCells = structCells.filter(
        (cell) =>
          cell.obj &&
          !cell.transform.transformer.definition.isDecorator &&
          !cell.obj.data.parent,
      );
      structures = rootStructCells
        .map((cell) => cell.obj?.data)
        .filter((struct) => !!struct) as Structure[];
    }
    const { rotation } = structureLayingTransform(structures);
    const newSnapshot = changeCameraRotation(
      this.plugin.canvas3d.camera.getSnapshot(),
      rotation,
    );
    this.setSnapshot(newSnapshot, durationMs);
  }

  /** Align Cartesian axes to the screen axes (X right, Y up). */
  resetAxes(durationMs?: number) {
    if (!this.plugin.canvas3d) return;
    const newSnapshot = changeCameraRotation(
      this.plugin.canvas3d.camera.getSnapshot(),
      Mat3.Identity,
    );
    this.setSnapshot(newSnapshot, durationMs);
  }

  setSnapshot(snapshot: Partial<Camera.Snapshot>, durationMs?: number) {
    // TODO: setState and requestCameraReset are very similar now: unify them?
    this.plugin.canvas3d?.requestCameraReset({ snapshot, durationMs });
  }

  reset(snapshot?: Partial<Camera.Snapshot>, durationMs?: number) {
    this.plugin.canvas3d?.requestCameraReset({ snapshot, durationMs });
  }

  constructor(readonly plugin: PluginContext) {}
}
