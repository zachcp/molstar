/**
 * Copyright (c) 2018-2022 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { Box3D, DensityData, DensityTextureData } from '../geometry.ts';
import { PositionData } from './common.ts';
import { WebGLContext } from '../../mol-gl/webgl/context.ts';
import { Texture } from '../../mol-gl/webgl/texture.ts';
import { GaussianDensityTexture2d, GaussianDensityTexture3d } from './gaussian-density/gpu.ts';
import { Task } from '../../mol-task/task.ts';
import { GaussianDensityCPU } from './gaussian-density/cpu.ts';

export const DefaultGaussianDensityProps = {
    resolution: 1,
    radiusOffset: 0,
    smoothness: 1.5,
};
export type GaussianDensityProps = typeof DefaultGaussianDensityProps

export type GaussianDensityData = {
    radiusFactor: number
} & DensityData

export type GaussianDensityTextureData = {
    radiusFactor: number
    resolution: number
    maxRadius: number
} & DensityTextureData

export function computeGaussianDensity(position: PositionData, box: Box3D, radius: (index: number) => number, props: GaussianDensityProps) {
    return Task.create('Gaussian Density', async ctx => {
        return await GaussianDensityCPU(ctx, position, box, radius, props);
    });
}

export function computeGaussianDensityTexture(position: PositionData, box: Box3D, radius: (index: number) => number, props: GaussianDensityProps, webgl: WebGLContext, texture?: Texture) {
    return _computeGaussianDensityTexture(webgl.isWebGL2 ? '3d' : '2d', position, box, radius, props, webgl, texture);
}

export function computeGaussianDensityTexture2d(position: PositionData, box: Box3D, radius: (index: number) => number, props: GaussianDensityProps, webgl: WebGLContext, texture?: Texture) {
    return _computeGaussianDensityTexture('2d', position, box, radius, props, webgl, texture);
}

export function computeGaussianDensityTexture3d(position: PositionData, box: Box3D, radius: (index: number) => number, props: GaussianDensityProps, webgl: WebGLContext, texture?: Texture) {
    return _computeGaussianDensityTexture('2d', position, box, radius, props, webgl, texture);
}

function _computeGaussianDensityTexture(type: '2d' | '3d', position: PositionData, box: Box3D, radius: (index: number) => number, props: GaussianDensityProps, webgl: WebGLContext, texture?: Texture) {
    return Task.create('Gaussian Density', async ctx => {
        return type === '2d' ?
            GaussianDensityTexture2d(webgl, position, box, radius, false, props, texture) :
            GaussianDensityTexture3d(webgl, position, box, radius, props, texture);
    });
}