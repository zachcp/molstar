/**
 * Copyright (c) 2018-2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
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
    SizeSchema,
    UniformSpec,
    type Values,
} from './schema.ts';
import { ValueCell } from '../../mol-util/index.ts';
import { LinesShaderCode } from '../shader-code.ts';

const _LinesSchema = {
    ...BaseSchema,
    ...SizeSchema,
    aGroup: AttributeSpec('float32', 1, 0),
    aMapping: AttributeSpec('float32', 2, 0),
    aStart: AttributeSpec('float32', 3, 0),
    aEnd: AttributeSpec('float32', 3, 0),
    elements: ElementsSpec('uint32'),
    dLineSizeAttenuation: DefineSpec('boolean'),
    uDoubleSided: UniformSpec('b', 'material'),
    dFlipSided: DefineSpec('boolean'),
};
export type LinesSchema = typeof _LinesSchema;
export const LinesSchema: LinesSchema = _LinesSchema;
export type LinesValues = Values<LinesSchema>;

export function LinesRenderable(
    ctx: WebGLContext,
    id: number,
    values: LinesValues,
    state: RenderableState,
    materialId: number,
    transparency: Transparency,
    globals: GlobalDefines,
): Renderable<LinesValues> {
    const schema = {
        ...GlobalUniformSchema,
        ...GlobalTextureSchema,
        ...GlobalDefineSchema,
        ...InternalSchema,
        ...LinesSchema,
    };
    const renderValues: LinesValues & InternalValues & GlobalDefineValues = {
        ...values,
        uObjectId: ValueCell.create(id),
        dLightCount: ValueCell.create(globals.dLightCount),
        dColorMarker: ValueCell.create(globals.dColorMarker),
    };
    const shaderCode = LinesShaderCode;
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
