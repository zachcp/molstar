/**
 * Copyright (c) 2020-2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { createRenderable, type Renderable, type RenderableState } from '../renderable.ts';
import type { WebGLContext } from '../webgl/context.ts';
import { createGraphicsRenderItem, type Transparency } from '../webgl/render-item.ts';
import {
    AttributeSpec,
    BaseSchema,
    DefineSpec,
    ElementsSpec,
    type GlobalDefines,
    GlobalDefineSchema,
    type GlobalDefineValues,
    GlobalTextureSchema,
    GlobalUniformSchema,
    InternalSchema,
    type InternalValues,
    TextureSpec,
    UniformSpec,
    type Values,
} from './schema.ts';
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
export type ImageSchema = typeof ImageSchema;
export type ImageValues = Values<ImageSchema>;

export function ImageRenderable(
    ctx: WebGLContext,
    id: number,
    values: ImageValues,
    state: RenderableState,
    materialId: number,
    transparency: Transparency,
    globals: GlobalDefines,
): Renderable<ImageValues> {
    const schema = {
        ...GlobalUniformSchema,
        ...GlobalTextureSchema,
        ...GlobalDefineSchema,
        ...InternalSchema,
        ...ImageSchema,
    };
    const renderValues: ImageValues & InternalValues & GlobalDefineValues = {
        ...values,
        uObjectId: ValueCell.create(id),
        dLightCount: ValueCell.create(globals.dLightCount),
        dColorMarker: ValueCell.create(globals.dColorMarker),
    };
    const shaderCode = ImageShaderCode;
    const renderItem = createGraphicsRenderItem(
        ctx,
        'triangles',
        shaderCode,
        schema,
        renderValues,
        materialId,
        transparency,
    );
    return createRenderable(renderItem, renderValues, state);
}
