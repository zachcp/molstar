/**
 * Copyright (c) 2020-2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import type { Scene } from "../../mol-gl/scene.ts";
import type { WebGLContext } from "../../mol-gl/webgl/context.ts";
import { ParamDefinition as PD } from "../../mol-util/param-definition.ts";
import {
  BoundingSphereHelper,
  DebugHelperParams,
} from "./bounding-sphere-helper.ts";
import { CameraHelper, CameraHelperParams } from "./camera-helper.ts";
import { HandleHelper, HandleHelperParams } from "./handle-helper.ts";
import { PointerHelper, PointerHelperParams } from "./pointer-helper.ts";

export const HelperParams: PD.Params = {
  debug: PD.Group(DebugHelperParams),
  camera: PD.Group({
    helper: PD.Group(CameraHelperParams),
  }),
  handle: PD.Group(HandleHelperParams),
  pointer: PD.Group(PointerHelperParams),
};
export const DefaultHelperProps: HelperProps =
  PD.getDefaultValues(HelperParams);
export type HelperProps = PD.Values<typeof HelperParams>;

export class Helper {
  readonly debug: BoundingSphereHelper;
  readonly camera: CameraHelper;
  readonly handle: HandleHelper;
  readonly pointer: PointerHelper;

  constructor(
    webgl: WebGLContext,
    scene: Scene,
    props: Partial<HelperProps> = {},
  ) {
    const p = { ...DefaultHelperProps, ...props };

    this.debug = new BoundingSphereHelper(webgl, scene, p.debug);
    this.camera = new CameraHelper(webgl, p.camera.helper);
    this.handle = new HandleHelper(webgl, p.handle);
    this.pointer = new PointerHelper(webgl, p.pointer);
  }
}
