/**
 * Copyright (c) 2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

/// <reference types="../../types/webxr.d.ts" />

import { BehaviorSubject, Subject, type Subscription } from "rxjs";
import type { WebGLContext } from "../../mol-gl/webgl/context.ts";
import { Vec3 } from "../../mol-math/linear-algebra/3d/vec3.ts";
import { Quat } from "../../mol-math/linear-algebra/3d/quat.ts";
import { Mat4 } from "../../mol-math/linear-algebra/3d/mat4.ts";
import type { Camera, ICamera } from "../camera.ts";
import type { PointerHelper } from "./pointer-helper.ts";
import { Vec2 } from "../../mol-math/linear-algebra/3d/vec2.ts";
import {
  ButtonsType,
  type InputObserver,
  type TrackedPointerInput,
} from "../../mol-util/input/input-observer.ts";
import { Plane3D } from "../../mol-math/geometry/primitives/plane3d.ts";
import { Vec4 } from "../../mol-math/linear-algebra/3d/vec4.ts";
import type { StereoCamera } from "../camera/stereo.ts";
import { Ray3D } from "../../mol-math/geometry/primitives/ray3d.ts";
import type { Scene } from "../../mol-gl/scene.ts";
import { Sphere3D } from "../../mol-math/geometry.ts";
import type { Canvas3dInteractionHelper } from "./interaction-events.ts";
import { ParamDefinition as PD } from "../../mol-util/param-definition.ts";
import { cameraProject } from "../camera/util.ts";
import { Binding } from "../../mol-util/binding.ts";

const B = ButtonsType;
const Trigger = Binding.Trigger;
const Key = Binding.TriggerKey;

function getRigidTransformFromMat4(m: Mat4): XRRigidTransform {
  const d = Mat4.getDecomposition(m);
  return new XRRigidTransform(Vec3.toObj(d.position), Quat.toObj(d.quaternion));
}

function getRayFromPose(pose: XRPose, view?: Mat4): Ray3D {
  const origin = Vec3.fromObj(pose.transform.position);
  const t = Mat4.fromArray(Mat4(), pose.transform.matrix, 0);
  const td = Mat4.getDecomposition(t);
  const m = Mat4.fromQuat(Mat4(), td.quaternion);
  const direction = Vec3.transformMat4(Vec3(), Vec3.negUnitZ, m);
  const ray = Ray3D.create(origin, direction);
  if (view) Ray3D.transform(ray, ray, Mat4.invert(Mat4(), view));
  return ray;
}

type InputInfo = {
  targetRayPose: XRPose;
};

const _DefaultXRManagerBindings = {
  exit: Binding([Key("GamepadB")]),
  togglePassthrough: Binding([Key("GamepadA")]),
  gestureScale: Binding([Trigger(B.Flag.Trigger)]),
} as const;
type _DefaultXRManagerBindingsType = typeof _DefaultXRManagerBindings;
const __DefaultXRManagerBindings: _DefaultXRManagerBindingsType = _DefaultXRManagerBindings;
export type DefaultXRManagerBindings = _DefaultXRManagerBindingsType;
export const DefaultXRManagerBindings: DefaultXRManagerBindings = __DefaultXRManagerBindings;
const _DefaultXRManagerAttribs = {
  bindings: DefaultXRManagerBindings,
} as const;
type _DefaultXRManagerAttribsType = typeof _DefaultXRManagerAttribs;
const __DefaultXRManagerAttribs: _DefaultXRManagerAttribsType = _DefaultXRManagerAttribs;
export type DefaultXRManagerAttribs = _DefaultXRManagerAttribsType;
export const DefaultXRManagerAttribs: DefaultXRManagerAttribs = __DefaultXRManagerAttribs;
export type XRManagerAttribs = _DefaultXRManagerAttribsType;

const _XRManagerParams = {
  minTargetDistance: PD.Numeric(0.4, { min: 0.001, max: 1, step: 0.001 }),
  disablePostprocessing: PD.Boolean(true),
  resolutionScale: PD.Numeric(1, { min: 0.1, max: 2, step: 0.1 }),
  sceneRadiusInMeters: PD.Numeric(
    0.25,
    { min: 0.01, max: 2, step: 0.01 },
    {
      description:
        "The radius of the scene bounding sphere in meters, used to set the initial camera scale.",
    },
  ),
} as const;
type _XRManagerParamsType = typeof _XRManagerParams;
const __XRManagerParams: _XRManagerParamsType = _XRManagerParams;
export type XRManagerParams = _XRManagerParamsType;
export const XRManagerParams: XRManagerParams = __XRManagerParams;
export type XRManagerProps = PD.Values<XRManagerParams>;

export class XRManager {
  private hoverSub: Subscription;
  private keyUpSub: Subscription;
  private gestureSub: Subscription;
  private sessionChangedSub: Subscription;

  readonly togglePassthrough = new Subject<void>();
  readonly sessionChanged = new Subject<void>();
  readonly isSupported = new BehaviorSubject(false);

  private xrSession: XRSession | undefined = undefined;
  get session() {
    return this.xrSession;
  }

  private xrRefSpace: XRReferenceSpace | undefined = undefined;

  private scaleFactor = 1;
  private prevScale = 0;
  private prevInput: { left?: InputInfo; right?: InputInfo } = {};
  private hit: Vec3 | undefined = undefined;

  readonly props: XRManagerProps;
  readonly attribs: XRManagerAttribs;

  setProps(props: Partial<XRManagerProps>) {
    Object.assign(this.props, props);
  }

  setAttribs(attribs: Partial<XRManagerAttribs>) {
    Object.assign(this.attribs, attribs);
  }

  private intersect(
    camera: ICamera,
    view: Mat4,
    plane: Plane3D,
    targetRayPose: XRPose,
  ): { point: Vec3; screen: Vec2 } | undefined {
    const point = Vec3();
    const ray = getRayFromPose(targetRayPose, view);
    if (Plane3D.intersectRay3D(point, plane, ray)) {
      const { height } = camera.viewport;
      const v = cameraProject(
        Vec4(),
        point,
        camera.viewport,
        camera.projectionView,
      );
      const screen = Vec2.create(Math.floor(v[0]), height - Math.floor(v[1]));
      return { point, screen };
    }
  }

  setScaleFactor(factor: number) {
    this.scaleFactor = factor;
  }

  resetScale() {
    this.scaleFactor = 1;
    this.prevScale = 0;
  }

  update(xrFrame?: XRFrame): boolean {
    const {
      xrSession,
      xrRefSpace,
      input,
      camera,
      stereoCamera,
      pointerHelper,
    } = this;
    if (!xrFrame || !xrSession || !xrRefSpace) return false;

    camera.scale = camera.scale * this.scaleFactor;
    this.prevScale = camera.scale;
    const camDirUnscaled = Vec3.sub(Vec3(), camera.position, camera.target);
    Vec3.scaleAndAdd(
      camera.position,
      camera.position,
      camDirUnscaled,
      1 - this.scaleFactor,
    );
    this.scaleFactor = 1;

    const xform = getRigidTransformFromMat4(camera.view);
    const xrOffsetRefSpace = xrRefSpace.getOffsetReferenceSpace(xform);
    const xrPose = xrFrame.getViewerPose(xrOffsetRefSpace);
    if (!xrPose) return false;

    const xrHeadPose = xrFrame.getViewerPose(xrRefSpace);
    if (xrHeadPose) {
      const hq = Quat.fromObj(xrHeadPose.transform.orientation);
      Mat4.fromQuat(camera.headRotation, hq);
    }

    const { depthFar, depthNear, baseLayer } = xrSession.renderState;
    if (!baseLayer) return false;

    if (depthFar !== camera.far || depthNear !== camera.near) {
      xrSession.updateRenderState({
        depthNear: camera.near,
        depthFar: camera.far,
      });
    }

    stereoCamera.update({ pose: xrPose, layer: baseLayer });
    const camLeft = stereoCamera.left;

    const cameraTarget = Vec3.scale(
      Vec3(),
      camLeft.state.target,
      camLeft.scale,
    );
    const cameraPosition = Mat4.getTranslation(
      Vec3(),
      Mat4.invert(Mat4(), camLeft.view),
    );
    const cameraDirection = Vec3.sub(Vec3(), cameraPosition, cameraTarget);
    const cameraPlane = Plane3D.fromNormalAndCoplanarPoint(
      Plane3D(),
      cameraDirection,
      cameraTarget,
    );

    //

    const pointers: Ray3D[] = [];
    const points: Vec3[] = [];

    const trackedPointers: TrackedPointerInput[] = [];

    if (xrSession.inputSources) {
      for (const inputSource of xrSession.inputSources) {
        if (inputSource.targetRayMode !== "tracked-pointer") continue;

        const { handedness, targetRaySpace, gamepad } = inputSource;
        if (!handedness) continue;

        const targetRayPose = xrFrame.getPose(targetRaySpace!, xrRefSpace);
        if (!targetRayPose) continue;

        const ray = getRayFromPose(targetRayPose, camera.view);
        pointers.push(ray);

        const sceneBoundingSphere = Sphere3D.scaleNX(
          Sphere3D(),
          this.scene.boundingSphereVisible,
          camLeft.scale,
        );

        const si = Vec3();
        if (Ray3D.intersectSphere3D(si, ray, sceneBoundingSphere)) {
          points.push(si);
        }

        let buttons = ButtonsType.create(ButtonsType.Flag.None);
        if (gamepad?.buttons[0]?.pressed) buttons |= ButtonsType.Flag.Primary;
        if (gamepad?.buttons[1]?.pressed) buttons |= ButtonsType.Flag.Secondary;
        if (gamepad?.buttons[3]?.pressed) buttons |= ButtonsType.Flag.Auxilary;
        if (gamepad?.buttons[4]?.pressed) buttons |= ButtonsType.Flag.Forth;
        if (gamepad?.buttons[5]?.pressed) buttons |= ButtonsType.Flag.Five;

        const prevInput =
          handedness === "left" ? this.prevInput.left : this.prevInput.right;

        const intersection = this.intersect(
          camLeft,
          camera.view,
          cameraPlane,
          targetRayPose,
        );
        const prevIntersection = prevInput
          ? this.intersect(
              camLeft,
              camera.view,
              cameraPlane,
              prevInput.targetRayPose,
            )
          : undefined;

        const [x, y] = intersection?.screen ?? [0, 0];
        const [prevX, prevY] = prevIntersection?.screen ?? [x, y];

        const dd = Vec2.set(Vec2(), x - prevX, y - prevY);
        Vec2.setMagnitude(dd, dd, Math.min(100, Vec2.magnitude(dd)));
        const [dx, dy] = Vec2.round(dd, dd);

        trackedPointers.push({
          handedness,
          buttons,
          x,
          y,
          dx,
          dy,
          ray,
          axes: gamepad?.axes,
        });

        if (handedness === "left") {
          this.prevInput.left = { targetRayPose };
        } else {
          this.prevInput.right = { targetRayPose };
        }
      }
    } else {
      this.prevInput.left = undefined;
      this.prevInput.right = undefined;
    }

    input.updateTrackedPointers(trackedPointers);
    pointerHelper.ensureEnabled();
    pointerHelper.update(pointers, points, this.hit);

    return true;
  }

  private async setSession(xrSession: XRSession | undefined) {
    if (this.xrSession === xrSession) return;

    await this.webgl.xr.set(xrSession, {
      resolutionScale: this.props.resolutionScale,
    });

    this.xrSession = this.webgl.xr.session;
    this.prevInput = {};
    this.hit = undefined;

    if (this.xrSession) {
      this.xrRefSpace = await this.xrSession.requestReferenceSpace("local");
      this.pointerHelper.setProps({ enabled: "on" });
      let scale = this.prevScale;
      if (scale === 0) {
        const { radius } = this.scene.boundingSphereVisible;
        scale = radius ? (1 / radius) * this.props.sceneRadiusInMeters : 0.01;
      }
      this.camera.forceFull = true;
      this.camera.scale = scale;
      this.camera.minTargetDistance = this.props.minTargetDistance;
      this.prevScale = scale;
    } else {
      this.xrRefSpace = undefined;
      Mat4.setZero(this.camera.headRotation);
      this.pointerHelper.setProps({ enabled: "off" });
      this.camera.forceFull = false;
      this.camera.scale = 1;
      this.camera.minTargetDistance = 0;
    }
  }

  async end() {
    await this.webgl.xr.end();
  }

  private checkSupported = async () => {
    if (!navigator.xr) return false;

    const [arSupported, vrSupported] = await Promise.all([
      navigator.xr.isSessionSupported("immersive-ar"),
      navigator.xr.isSessionSupported("immersive-vr"),
    ]);
    this.isSupported.next(arSupported || vrSupported);
  };

  async request() {
    if (!navigator.xr) return;

    const session = (await navigator.xr.isSessionSupported("immersive-ar"))
      ? await navigator.xr.requestSession("immersive-ar")
      : await navigator.xr.requestSession("immersive-vr");

    await this.setSession(session);
  }

  dispose() {
    this.hoverSub.unsubscribe();
    this.keyUpSub.unsubscribe();
    this.gestureSub.unsubscribe();
    this.sessionChangedSub.unsubscribe();

    this.togglePassthrough.complete();
    this.sessionChanged.complete();
    this.isSupported.complete();

    navigator.xr?.removeEventListener("devicechange", this.checkSupported);
  }

  constructor(
    private webgl: WebGLContext,
    private input: InputObserver,
    private scene: Scene,
    private camera: Camera,
    private stereoCamera: StereoCamera,
    private pointerHelper: PointerHelper,
    private interactionHelper: Canvas3dInteractionHelper,
    props: Partial<XRManagerProps> = {},
    attribs: Partial<XRManagerAttribs> = {},
  ) {
    this.props = { ...PD.getDefaultValues(XRManagerParams), ...props };
    this.attribs = { ...DefaultXRManagerAttribs, ...attribs };

    this.hoverSub = this.interactionHelper.events.hover.subscribe(
      ({ position }) => {
        this.hit = position;
      },
    );

    this.sessionChangedSub = webgl.xr.changed.subscribe(async () => {
      await this.setSession(webgl.xr.session);
      this.sessionChanged.next();
    });

    this.checkSupported();
    navigator.xr?.addEventListener("devicechange", this.checkSupported);

    this.keyUpSub = input.keyUp.subscribe(({ code, modifiers, key }) => {
      const b = this.attribs.bindings;

      if (Binding.matchKey(b.exit, code, modifiers, key)) {
        this.end();
      }

      if (Binding.matchKey(b.togglePassthrough, code, modifiers, key)) {
        this.togglePassthrough.next();
      }
    });

    this.gestureSub = input.gesture.subscribe(
      ({ scale, button, modifiers }) => {
        const b = this.attribs.bindings;
        if (Binding.match(b.gestureScale, button, modifiers)) {
          this.setScaleFactor(scale);
        }
      },
    );
  }
}
