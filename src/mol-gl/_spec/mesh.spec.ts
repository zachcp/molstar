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
import { Mesh } from '../../mol-geo/geometry/mesh/mesh.ts';

export function createMesh() {
    const mesh = Mesh.createEmpty();
    const props = PD.getDefaultValues(Mesh.Params);
    const values = Mesh.Utils.createValuesSimple(mesh, props, ColorNames.orange, 1);
    const state = Mesh.Utils.createRenderableState(props);
    return createRenderObject('mesh', values, state, -1);
}

describe('mesh', () => {
    const ctx = tryGetGLContext(32, 32);

    (ctx ? it : it.skip)('basic', async () => {
        const ctx = getGLContext(32, 32);
        const scene = Scene.create(ctx);
        const mesh = createMesh();
        scene.add(mesh);
        setDebugMode(true);
        expect(() => scene.commit()).not.toThrow();
        setDebugMode(false);
        ctx.destroy();
    });
});
