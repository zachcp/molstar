/**
 * Copyright (c) 2019-2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { Renderable, RenderableState, createRenderable } from '../renderable.ts';
import { WebGLContext } from '../webgl/context.ts';
import { createGraphicsRenderItem, Transparency } from '../webgl/render-item.ts';
import { GlobalUniformSchema, BaseSchema, DefineSpec, Values, InternalSchema, InternalValues, UniformSpec, TextureSpec, GlobalTextureSchema, ValueSpec, GlobalDefineValues, GlobalDefines, GlobalDefineSchema } from './schema.ts';
import { MeshShaderCode } from '../shader-code.ts';
import { ValueCell } from '../../mol-util/index.ts';

export const TextureMeshSchema = {
    ...BaseSchema,
    uGeoTexDim: UniformSpec('v2', 'buffered'),
    tPosition: TextureSpec('texture', 'rgb', 'float', 'nearest'),
    tGroup: TextureSpec('texture', 'alpha', 'float', 'nearest'),
    tNormal: TextureSpec('texture', 'rgb', 'float', 'nearest'),
    dVaryingGroup: DefineSpec('boolean'),
    dFlatShaded: DefineSpec('boolean'),
    uDoubleSided: UniformSpec('b', 'material'),
    dFlipSided: DefineSpec('boolean'),
    dIgnoreLight: DefineSpec('boolean'),
    dCelShaded: DefineSpec('boolean'),
    dXrayShaded: DefineSpec('string', ['off', 'on', 'inverted']),
    dTransparentBackfaces: DefineSpec('string', ['off', 'on', 'opaque']),
    uBumpFrequency: UniformSpec('f', 'material'),
    uBumpAmplitude: UniformSpec('f', 'material'),
    uInteriorColor: UniformSpec('v4'),
    uInteriorSubstance: UniformSpec('v4'),
    meta: ValueSpec('unknown')
};
export type TextureMeshSchema = typeof TextureMeshSchema
export type TextureMeshValues = Values<TextureMeshSchema>

export function TextureMeshRenderable(ctx: WebGLContext, id: number, values: TextureMeshValues, state: RenderableState, materialId: number, transparency: Transparency, globals: GlobalDefines): Renderable<TextureMeshValues> {
    const schema = { ...GlobalUniformSchema, ...GlobalTextureSchema, ...GlobalDefineSchema, ...InternalSchema, ...TextureMeshSchema };
    const renderValues: TextureMeshValues & InternalValues & GlobalDefineValues = {
        ...values,
        uObjectId: ValueCell.create(id),
        dLightCount: ValueCell.create(globals.dLightCount),
        dColorMarker: ValueCell.create(globals.dColorMarker),
    };
    const shaderCode = MeshShaderCode;
    const renderItem = createGraphicsRenderItem(ctx, 'triangles', shaderCode, schema, renderValues, materialId, transparency);

    return createRenderable(renderItem, renderValues, state);
}