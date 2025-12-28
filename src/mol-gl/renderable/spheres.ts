/**
 * Copyright (c) 2019-2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { createRenderable, type Renderable, type RenderableState } from '../renderable.ts';
import type { WebGLContext } from '../webgl/context.ts';
import { createGraphicsRenderItem, type Transparency } from '../webgl/render-item.ts';
import {
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
    TextureSpec,
    UniformSpec,
    type Values,
    ValueSpec,
} from './schema.ts';
import { SpheresShaderCode } from '../shader-code.ts';
import { ValueCell } from '../../mol-util/index.ts';

export const SpheresSchema = {
    ...BaseSchema,
    ...SizeSchema,

    uTexDim: UniformSpec('v2'),
    tPositionGroup: TextureSpec('image-float32', 'rgba', 'float', 'nearest'),

    padding: ValueSpec('number'),
    uDoubleSided: UniformSpec('b', 'material'),
    dIgnoreLight: DefineSpec('boolean'),
    dCelShaded: DefineSpec('boolean'),
    dXrayShaded: DefineSpec('string', ['off', 'on', 'inverted']),
    dTransparentBackfaces: DefineSpec('string', ['off', 'on', 'opaque']),
    dSolidInterior: DefineSpec('boolean'),
    dClipPrimitive: DefineSpec('boolean'),
    dApproximate: DefineSpec('boolean'),
    uAlphaThickness: UniformSpec('f'),
    uBumpFrequency: UniformSpec('f', 'material'),
    uBumpAmplitude: UniformSpec('f', 'material'),
    uInteriorColor: UniformSpec('v4'),
    uInteriorSubstance: UniformSpec('v4'),

    lodLevels: ValueSpec('unknown'),
    centerBuffer: ValueSpec('float32'),
    groupBuffer: ValueSpec('float32'),
};
export type SpheresSchema = typeof SpheresSchema;
export type SpheresValues = Values<SpheresSchema>;

export function SpheresRenderable(
    ctx: WebGLContext,
    id: number,
    values: SpheresValues,
    state: RenderableState,
    materialId: number,
    transparency: Transparency,
    globals: GlobalDefines,
): Renderable<SpheresValues> {
    const schema = {
        ...GlobalUniformSchema,
        ...GlobalTextureSchema,
        ...GlobalDefineSchema,
        ...InternalSchema,
        ...SpheresSchema,
    };
    const renderValues: SpheresValues & InternalValues & GlobalDefineValues = {
        ...values,
        uObjectId: ValueCell.create(id),
        dLightCount: ValueCell.create(globals.dLightCount),
        dColorMarker: ValueCell.create(globals.dColorMarker),
    };
    const shaderCode = SpheresShaderCode;
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
