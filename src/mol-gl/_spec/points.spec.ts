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
import { Points } from '../../mol-geo/geometry/points/points.ts';

export function createPoints() {
    const points = Points.createEmpty();
    const props = PD.getDefaultValues(Points.Params);
    const values = Points.Utils.createValuesSimple(points, props, ColorNames.orange, 1);
    const state = Points.Utils.createRenderableState(props);
    return createRenderObject('points', values, state, -1);
}

describe('points', () => {
    const ctx = tryGetGLContext(32, 32);

    (ctx ? it : it.skip)('basic', async () => {
        const ctx = getGLContext(32, 32);
        const scene = Scene.create(ctx);
        const points = createPoints();
        scene.add(points);
        setDebugMode(true);
        expect(() => scene.commit()).not.toThrow();
        setDebugMode(false);
        ctx.destroy();
    });
});
