/**
 * Copyright (c) 2021 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { createRenderObject } from '../render-object.ts';
import { Scene } from '../scene.ts';
import { getGLContext, tryGetGLContext } from './gl.ts';
import { setDebugMode } from '../../mol-util/debug.ts';
import { ColorNames } from '../../mol-util/color/names.ts';
import { ParamDefinition as PD } from '../../mol-util/param-definition.ts';
import { TextureMesh } from '../../mol-geo/geometry/texture-mesh/texture-mesh.ts';

export function createTextureMesh() {
    const textureMesh = TextureMesh.createEmpty();
    const props = PD.getDefaultValues(TextureMesh.Params);
    const values = TextureMesh.Utils.createValuesSimple(textureMesh, props, ColorNames.orange, 1);
    const state = TextureMesh.Utils.createRenderableState(props);
    return createRenderObject('texture-mesh', values, state, -1);
}

describe('texture-mesh', () => {
    const ctx = tryGetGLContext(32, 32);

    (ctx ? it : it.skip)('basic', async () => {
        const ctx = getGLContext(32, 32);
        const scene = Scene.create(ctx);
        const textureMesh = createTextureMesh();
        scene.add(textureMesh);
        setDebugMode(true);
        expect(() => scene.commit()).not.toThrow();
        setDebugMode(false);
        ctx.destroy();
    });
});
