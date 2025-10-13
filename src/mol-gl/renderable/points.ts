/**
 * Copyright (c) 2018-2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { type Renderable, type RenderableState, createRenderable } from '../renderable.ts';
import type { WebGLContext } from '../webgl/context.ts';
import { createGraphicsRenderItem, type Transparency } from '../webgl/render-item.ts';
import { GlobalUniformSchema, BaseSchema, AttributeSpec, DefineSpec, type Values, InternalSchema, SizeSchema, type InternalValues, GlobalTextureSchema, type GlobalDefineValues, type GlobalDefines, GlobalDefineSchema } from './schema.ts';
import { PointsShaderCode } from '../shader-code.ts';
import { ValueCell } from '../../mol-util.ts';

export const PointsSchema = {
    ...BaseSchema,
    ...SizeSchema,
    aGroup: AttributeSpec('float32', 1, 0),
    aPosition: AttributeSpec('float32', 3, 0),
    dPointSizeAttenuation: DefineSpec('boolean'),
    dPointStyle: DefineSpec('string', ['square', 'circle', 'fuzzy']),
};
export type PointsSchema = typeof PointsSchema
export type PointsValues = Values<PointsSchema>

export function PointsRenderable(ctx: WebGLContext, id: number, values: PointsValues, state: RenderableState, materialId: number, transparency: Transparency, globals: GlobalDefines): Renderable<PointsValues> {
    const schema = { ...GlobalUniformSchema, ...GlobalTextureSchema, ...GlobalDefineSchema, ...InternalSchema, ...PointsSchema };
    const renderValues: PointsValues & InternalValues & GlobalDefineValues = {
        ...values,
        uObjectId: ValueCell.create(id),
        dLightCount: ValueCell.create(globals.dLightCount),
        dColorMarker: ValueCell.create(globals.dColorMarker),
    };
    const shaderCode = PointsShaderCode;
    const renderItem = createGraphicsRenderItem(ctx, 'points', shaderCode, schema, renderValues, materialId, transparency);
    return createRenderable(renderItem, renderValues, state);
}