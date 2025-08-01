/**
 * Copyright (c) 2019-2023 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { createRenderable, Renderable, RenderableState } from '../renderable.ts';
import { WebGLContext } from '../webgl/context.ts';
import { createGraphicsRenderItem, Transparency } from '../webgl/render-item.ts';
import {
    AttributeSpec,
    BaseSchema,
    ElementsSpec,
    GlobalTextureSchema,
    GlobalUniformSchema,
    InternalSchema,
    InternalValues,
    SizeSchema,
    TextureSpec,
    UniformSpec,
    Values,
    ValueSpec,
} from './schema.ts';
import { TextShaderCode } from '../shader-code.ts';
import { ValueCell } from '../../mol-util/index.ts';

export const TextSchema = {
    ...BaseSchema,
    ...SizeSchema,
    aGroup: AttributeSpec('float32', 1, 0),
    aPosition: AttributeSpec('float32', 3, 0),
    aMapping: AttributeSpec('float32', 2, 0),
    aDepth: AttributeSpec('float32', 1, 0),
    elements: ElementsSpec('uint32'),

    aTexCoord: AttributeSpec('float32', 2, 0),
    tFont: TextureSpec('image-uint8', 'alpha', 'ubyte', 'linear'),
    padding: ValueSpec('number'),

    uBorderWidth: UniformSpec('f', 'material'),
    uBorderColor: UniformSpec('v3', 'material'),
    uOffsetX: UniformSpec('f', 'material'),
    uOffsetY: UniformSpec('f', 'material'),
    uOffsetZ: UniformSpec('f', 'material'),
    uBackgroundColor: UniformSpec('v3', 'material'),
    uBackgroundOpacity: UniformSpec('f', 'material'),
};
export type TextSchema = typeof TextSchema;
export type TextValues = Values<TextSchema>;

export function TextRenderable(
    ctx: WebGLContext,
    id: number,
    values: TextValues,
    state: RenderableState,
    materialId: number,
    transparency: Transparency,
): Renderable<TextValues> {
    const schema = {
        ...GlobalUniformSchema,
        ...GlobalTextureSchema,
        ...InternalSchema,
        ...TextSchema,
    };
    const internalValues: InternalValues = {
        uObjectId: ValueCell.create(id),
    };
    const shaderCode = TextShaderCode;
    const renderItem = createGraphicsRenderItem(
        ctx,
        'triangles',
        shaderCode,
        schema,
        { ...values, ...internalValues },
        materialId,
        transparency,
    );
    return createRenderable(renderItem, values, state);
}
