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
import { DirectVolume } from '../../mol-geo/geometry/direct-volume/direct-volume.ts';

export function createDirectVolume() {
    const directVolume = DirectVolume.createEmpty();
    const props = PD.getDefaultValues(DirectVolume.Params);
    const values = DirectVolume.Utils.createValuesSimple(directVolume, props, ColorNames.orange, 1);
    const state = DirectVolume.Utils.createRenderableState(props);
    return createRenderObject('direct-volume', values, state, -1);
}

describe('direct-volume', () => {
    const ctx = tryGetGLContext(32, 32);

    (ctx ? it : it.skip)('basic', async () => {
        const ctx = getGLContext(32, 32);
        const scene = Scene.create(ctx);
        const directVolume = createDirectVolume();
        scene.add(directVolume);
        setDebugMode(true);
        expect(() => scene.commit()).not.toThrow();
        setDebugMode(false);
        ctx.destroy();
    });
});
