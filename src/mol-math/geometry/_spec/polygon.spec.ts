/**
 * Copyright (c) 2023 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { Vec2 } from '../../linear-algebra.ts';
import { pointInPolygon } from '../polygon.ts';

describe('pointInPolygon', () => {
    it('basic', () => {
        const polygon = [
            -1,
            -1,
            1,
            -1,
            1,
            1,
            -1,
            1,
        ];
        expect(pointInPolygon(Vec2.create(0, 0), polygon, 4)).toBe(true);
        expect(pointInPolygon(Vec2.create(2, 2), polygon, 4)).toBe(false);
    });
});
