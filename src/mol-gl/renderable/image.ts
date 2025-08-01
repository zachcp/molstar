/**
 * Copyright (c) 2020-2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { Renderable, RenderableState, createRenderable } from '../renderable.ts';
import { WebGLContext } from '../webgl/context.ts';
import { createGraphicsRenderItem, Transparency } from '../webgl/render-item.ts';
import { AttributeSpec, Values, GlobalUniformSchema, InternalSchema, TextureSpec, ElementsSpec, DefineSpec, InternalValues, BaseSchema, UniformSpec, GlobalTextureSchema } from './schema.ts';
import { ImageShaderCode } from '../shader-code.ts';
import { ValueCell } from '../../mol-util/index.ts';
import { InterpolationTypeNames } from '../../mol-geo/geometry/image/image.ts';

export const ImageSchema = {
    ...BaseSchema,

    aGroup: AttributeSpec('float32', 1, 0),
    aPosition: AttributeSpec('float32', 3, 0),
    aUv: AttributeSpec('float32', 2, 0),
    elements: ElementsSpec('uint32'),

    uImageTexDim: UniformSpec('v2'),
    tImageTex: TextureSpec('image-uint8', 'rgba', 'ubyte', 'nearest'),
    tGroupTex: TextureSpec('image-uint8', 'rgba', 'ubyte', 'nearest'),
    tValueTex: TextureSpec('image-float32', 'alpha', 'float', 'linear'),

    uTrimType: UniformSpec('i'),
    uTrimCenter: UniformSpec('v3'),
    uTrimRotation: UniformSpec('q'),
    uTrimScale: UniformSpec('v3'),
    uTrimTransform: UniformSpec('m4'),

    uIsoLevel: UniformSpec('f'),

    dInterpolation: DefineSpec('string', InterpolationTypeNames),
};
export type ImageSchema = typeof ImageSchema
export type ImageValues = Values<ImageSchema>

export function ImageRenderable(ctx: WebGLContext, id: number, values: ImageValues, state: RenderableState, materialId: number, transparency: Transparency): Renderable<ImageValues> {
    const schema = { ...GlobalUniformSchema, ...GlobalTextureSchema, ...InternalSchema, ...ImageSchema };
    const internalValues: InternalValues = {
        uObjectId: ValueCell.create(id),
    };
    const shaderCode = ImageShaderCode;
    const renderItem = createGraphicsRenderItem(ctx, 'triangles', shaderCode, schema, { ...values, ...internalValues }, materialId, transparency);
    return createRenderable(renderItem, values, state);
}