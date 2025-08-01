/**
 * Copyright (c) 2018 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import * as Data from './transforms/data.ts';
import * as Misc from './transforms/misc.ts';
import * as Model from './transforms/model.ts';
import * as Volume from './transforms/volume.ts';
import * as Representation from './transforms/representation.ts';
import * as Shape from './transforms/shape.ts';

export const StateTransforms = {
    Data,
    Misc,
    Model,
    Volume,
    Representation,
    Shape
};

export type StateTransforms = typeof StateTransforms