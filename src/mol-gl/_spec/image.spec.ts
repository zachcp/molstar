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
import { Image } from '../../mol-geo/geometry/image/image.ts';

export function createImage() {
    const image = Image.createEmpty();
    const props = PD.getDefaultValues(Image.Params);
    const values = Image.Utils.createValuesSimple(image, props, ColorNames.orange, 1);
    const state = Image.Utils.createRenderableState(props);
    return createRenderObject('image', values, state, -1);
}

describe('image', () => {
    const ctx = tryGetGLContext(32, 32);

    (ctx ? it : it.skip)('basic', async () => {
        const ctx = getGLContext(32, 32);
        const scene = Scene.create(ctx);
        const image = createImage();
        scene.add(image);
        setDebugMode(true);
        expect(() => scene.commit()).not.toThrow();
        setDebugMode(false);
        ctx.destroy();
    });
});
