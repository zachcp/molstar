/**
 * Copyright (c) 2018-2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

export * from './behavior/behavior.ts';

import * as StaticState from './behavior/static/state.ts';
import * as StaticRepresentation from './behavior/static/representation.ts';
import * as StaticCamera from './behavior/static/camera.ts';
import * as StaticMisc from './behavior/static/misc.ts';

import * as DynamicRepresentation from './behavior/dynamic/representation.ts';
import * as DynamicCamera from './behavior/dynamic/camera.ts';
import * as DynamicState from './behavior/dynamic/state.ts';
import * as DynamicCustomProps from './behavior/dynamic/custom-props.ts';

export const BuiltInPluginBehaviors = {
    State: StaticState,
    Representation: StaticRepresentation,
    Camera: StaticCamera,
    Misc: StaticMisc,
};

export const PluginBehaviors = {
    Representation: DynamicRepresentation,
    Camera: DynamicCamera,
    State: DynamicState,
    CustomProps: DynamicCustomProps,
};
