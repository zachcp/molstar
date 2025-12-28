/**
 * Copyright (c) 2019-2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { createRenderable, type Renderable, type RenderableState } from '../renderable.ts';
import type { WebGLContext } from '../webgl/context.ts';
import { createGraphicsRenderItem, type Transparency } from '../webgl/render-item.ts';
import {
    AttributeSpec,
    BaseSchema,
    ElementsSpec,
    type GlobalDefines,
    GlobalDefineSchema,
    type GlobalDefineValues,
    GlobalTextureSchema,
    GlobalUniformSchema,
    InternalSchema,
    type InternalValues,
    SizeSchema,
    TextureSpec,
    UniformSpec,
    type Values,
    ValueSpec,
} from './schema.ts';
import { TextShaderCode } from '../shader-code.ts';
import { ValueCell } from '../../mol-util/index.ts';

const _TextSchema = {
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
export type TextSchema = typeof _TextSchema;
export const TextSchema: TextSchema = _TextSchema;
export type TextValues = Values<TextSchema>;

export function TextRenderable(
    ctx: WebGLContext,
    id: number,
    values: TextValues,
    state: RenderableState,
    materialId: number,
    transparency: Transparency,
    globals: GlobalDefines,
): Renderable<TextValues> {
    const schema = {
        ...GlobalUniformSchema,
        ...GlobalTextureSchema,
        ...GlobalDefineSchema,
        ...InternalSchema,
        ...TextSchema,
    };
    const renderValues: TextValues & InternalValues & GlobalDefineValues = {
        ...values,
        uObjectId: ValueCell.create(id),
        dLightCount: ValueCell.create(globals.dLightCount),
        dColorMarker: ValueCell.create(globals.dColorMarker),
    };
    const shaderCode = TextShaderCode;
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
