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
    type GlobalDefines,
    GlobalDefineSchema,
    type GlobalDefineValues,
    GlobalTextureSchema,
    GlobalUniformSchema,
    InternalSchema,
    type InternalValues,
    SizeSchema,
    type Values,
} from './schema.ts';
import { PointsShaderCode } from '../shader-code.ts';
import { ValueCell } from '../../mol-util/index.ts';

const _PointsSchema = {
    ...BaseSchema,
    ...SizeSchema,
    aGroup: AttributeSpec('float32', 1, 0),
    aPosition: AttributeSpec('float32', 3, 0),
    dPointSizeAttenuation: DefineSpec('boolean'),
    dPointStyle: DefineSpec('string', ['square', 'circle', 'fuzzy']),
} as const;
export type PointsSchema = typeof _PointsSchema;
export const PointsSchema: PointsSchema = _PointsSchema;
export type PointsValues = Values<PointsSchema>;

export function PointsRenderable(
    ctx: WebGLContext,
    id: number,
    values: PointsValues,
    state: RenderableState,
    materialId: number,
    transparency: Transparency,
    globals: GlobalDefines,
): Renderable<PointsValues> {
    const schema = {
        ...GlobalUniformSchema,
        ...GlobalTextureSchema,
        ...GlobalDefineSchema,
        ...InternalSchema,
        ...PointsSchema,
    };
    const renderValues: PointsValues & InternalValues & GlobalDefineValues = {
        ...values,
        uObjectId: ValueCell.create(id),
        dLightCount: ValueCell.create(globals.dLightCount),
        dColorMarker: ValueCell.create(globals.dColorMarker),
    };
    const shaderCode = PointsShaderCode;
    const renderItem = createGraphicsRenderItem(
        ctx,
        'points',
        shaderCode,
        schema,
        renderValues,
        materialId,
        transparency,
    );
    return createRenderable(renderItem, renderValues, state);
}
