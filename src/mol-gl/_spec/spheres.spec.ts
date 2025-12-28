/**
 * Copyright (c) 2021-2023 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { createRenderObject } from '../render-object.ts';
import { Scene } from '../scene.ts';
import { getGLContext, tryGetGLContext } from './gl.ts';
import { setDebugMode } from '../../mol-util/debug.ts';
import { ColorNames } from '../../mol-util/color/names.ts';
import { ParamDefinition as PD } from '../../mol-util/param-definition.ts';
import { Spheres } from '../../mol-geo/geometry/spheres/spheres.ts';

export function createSpheres() {
    const spheres = Spheres.createEmpty();
    const props = PD.getDefaultValues(Spheres.Params);
    const values = Spheres.Utils.createValuesSimple(spheres, props, ColorNames.orange, 1);
    const state = Spheres.Utils.createRenderableState(props);
    return createRenderObject('spheres', values, state, -1);
}

describe('spheres', () => {
    const ctx = tryGetGLContext(32, 32, { fragDepth: true, textureFloat: true });

    (ctx ? it : it.skip)('basic', async () => {
        const ctx = getGLContext(32, 32);
        const scene = Scene.create(ctx);
        const spheres = createSpheres();
        scene.add(spheres);
        setDebugMode(true);
        expect(() => scene.commit()).not.toThrow();
        setDebugMode(false);
        ctx.destroy();
    });
});
