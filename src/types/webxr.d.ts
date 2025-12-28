/**
 * Copyright (c) 2024 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * WebXR API type definitions for JSR compatibility
 * Based on https://www.w3.org/TR/webxr/
 */

// Navigator augmentation
interface Navigator {
    xr?: XRSystem;
}

// XR System
interface XRSystem extends EventTarget {
    isSessionSupported(mode: XRSessionMode): Promise<boolean>;
    requestSession(
        mode: XRSessionMode,
        options?: XRSessionInit,
    ): Promise<XRSession>;
}

interface XRSessionInit {
    requiredFeatures?: string[];
    optionalFeatures?: string[];
}

type XRSessionMode = 'inline' | 'immersive-vr' | 'immersive-ar';
type XREnvironmentBlendMode = 'opaque' | 'additive' | 'alpha-blend';
type XRReferenceSpaceType =
    | 'viewer'
    | 'local'
    | 'local-floor'
    | 'bounded-floor'
    | 'unbounded';

// XR Types
declare interface XRSession extends EventTarget {
    requestAnimationFrame(callback: XRFrameRequestCallback): number;
    cancelAnimationFrame(handle: number): void;
    end(): Promise<void>;
    renderState: XRRenderState;
    inputSources: XRInputSourceArray;
    environmentBlendMode: XREnvironmentBlendMode;
    updateRenderState(state: XRRenderStateInit): void;
    requestReferenceSpace(type: XRReferenceSpaceType): Promise<XRReferenceSpace>;
}

interface XRRenderStateInit {
    baseLayer?: XRWebGLLayer;
    depthNear?: number;
    depthFar?: number;
    inlineVerticalFieldOfView?: number;
}

declare interface XRFrame {
    session: XRSession;
    getViewerPose(referenceSpace: XRReferenceSpace): XRViewerPose | null;
    getPose(space: XRSpace, baseSpace: XRSpace): XRPose | null;
}

declare interface XRViewerPose extends XRPose {
    views: ReadonlyArray<XRView>;
}

declare interface XRPose {
    transform: XRRigidTransform;
    emulatedPosition: boolean;
}

declare interface XRView {
    eye: XREye;
    projectionMatrix: Float32Array;
    transform: XRRigidTransform;
}

declare interface XRRigidTransform {
    position: DOMPointReadOnly;
    orientation: DOMPointReadOnly;
    matrix: Float32Array;
    inverse: XRRigidTransform;
}

declare const XRRigidTransform: {
    prototype: XRRigidTransform;
    new (position?: DOMPointInit, orientation?: DOMPointInit): XRRigidTransform;
};

declare interface XRRenderState {
    depthNear: number;
    depthFar: number;
    inlineVerticalFieldOfView?: number;
    baseLayer?: XRWebGLLayer;
}

declare interface XRWebGLLayer {
    framebuffer: WebGLFramebuffer | null;
    framebufferWidth: number;
    framebufferHeight: number;
    getViewport(view: XRView): XRViewport | null;
}

declare const XRWebGLLayer: {
    prototype: XRWebGLLayer;
    new (
        session: XRSession,
        context: WebGLRenderingContext | WebGL2RenderingContext,
        options?: XRWebGLLayerInit,
    ): XRWebGLLayer;
};

interface XRWebGLLayerInit {
    antialias?: boolean;
    depth?: boolean;
    stencil?: boolean;
    alpha?: boolean;
    framebufferScaleFactor?: number;
}

declare interface XRViewport {
    x: number;
    y: number;
    width: number;
    height: number;
}

declare interface XRSpace extends EventTarget {}

declare interface XRReferenceSpace extends XRSpace {
    getOffsetReferenceSpace(originOffset: XRRigidTransform): XRReferenceSpace;
}

declare interface XRInputSourceArray extends Iterable<XRInputSource> {
    length: number;
    [index: number]: XRInputSource;
}

declare interface XRInputSource {
    handedness: XRHandedness;
    targetRayMode: XRTargetRayMode;
    targetRaySpace: XRSpace;
    gripSpace?: XRSpace;
    gamepad?: Gamepad;
    profiles: ReadonlyArray<string>;
}

// Type aliases
declare type XRFrameRequestCallback = (
    time: DOMHighResTimeStamp,
    frame: XRFrame,
) => void;
declare type XREye = 'left' | 'right' | 'none';
declare type XRHandedness = 'left' | 'right' | 'none';
declare type XRTargetRayMode = 'gaze' | 'tracked-pointer' | 'screen';

// WebGL Extensions
declare interface WebGLRenderingContext {
    makeXRCompatible?(): Promise<void>;
}

declare interface WebGL2RenderingContext {
    makeXRCompatible?(): Promise<void>;
}
