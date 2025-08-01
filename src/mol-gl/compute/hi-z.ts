/**
 * Copyright (c) 2023 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { WebGLContext } from '../webgl/context.ts';
import { Vec2 } from '../../mol-math/linear-algebra/3d/vec2.ts';
import { ValueCell } from '../../mol-util/value-cell.ts';
import { ComputeRenderable, createComputeRenderable } from '../renderable.ts';
import { TextureSpec, UniformSpec, Values } from '../renderable/schema.ts';
import { ShaderCode } from '../shader-code.ts';
import { hiZ_frag } from '../shader/hi-z.frag.ts';
import { quad_vert } from '../shader/quad.vert.ts';
import { createComputeRenderItem } from '../webgl/render-item.ts';
import { Texture } from '../webgl/texture.ts';
import { QuadSchema, QuadValues } from './util.ts';

const HiZSchema = {
    ...QuadSchema,
    tPreviousLevel: TextureSpec('texture', 'alpha', 'float', 'nearest'),
    uInvSize: UniformSpec('v2'),
    uOffset: UniformSpec('v2'),
};
const HiZShaderCode = ShaderCode('hi-z', quad_vert, hiZ_frag);
export type HiZRenderable = ComputeRenderable<Values<typeof HiZSchema>>;

export function createHiZRenderable(ctx: WebGLContext, previousLevel: Texture): HiZRenderable {
    const values: Values<typeof HiZSchema> = {
        ...QuadValues,
        tPreviousLevel: ValueCell.create(previousLevel),
        uInvSize: ValueCell.create(Vec2()),
        uOffset: ValueCell.create(Vec2()),
    };

    const schema = { ...HiZSchema };
    const renderItem = createComputeRenderItem(ctx, 'triangles', HiZShaderCode, schema, values);

    return createComputeRenderable(renderItem, values);
}
