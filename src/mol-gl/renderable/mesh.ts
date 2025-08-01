/**
 * Copyright (c) 2018-2023 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { createRenderable, Renderable, RenderableState } from '../renderable.ts';
import { WebGLContext } from '../webgl/context.ts';
import { createGraphicsRenderItem, Transparency } from '../webgl/render-item.ts';
import {
    AttributeSpec,
    BaseSchema,
    DefineSpec,
    ElementsSpec,
    GlobalTextureSchema,
    GlobalUniformSchema,
    InternalSchema,
    InternalValues,
    UniformSpec,
    Values,
    ValueSpec,
} from './schema.ts';
import { MeshShaderCode } from '../shader-code.ts';
import { ValueCell } from '../../mol-util/index.ts';

export const MeshSchema = {
    ...BaseSchema,
    aGroup: AttributeSpec('float32', 1, 0),
    aPosition: AttributeSpec('float32', 3, 0),
    aNormal: AttributeSpec('float32', 3, 0),
    elements: ElementsSpec('uint32'),
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
    meta: ValueSpec('unknown'),
} as const;
export type MeshSchema = typeof MeshSchema;
export type MeshValues = Values<MeshSchema>;

export function MeshRenderable(
    ctx: WebGLContext,
    id: number,
    values: MeshValues,
    state: RenderableState,
    materialId: number,
    transparency: Transparency,
): Renderable<MeshValues> {
    const schema = {
        ...GlobalUniformSchema,
        ...GlobalTextureSchema,
        ...InternalSchema,
        ...MeshSchema,
    };
    const internalValues: InternalValues = {
        uObjectId: ValueCell.create(id),
    };
    const shaderCode = MeshShaderCode;
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
