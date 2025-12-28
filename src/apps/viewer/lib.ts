/**
 * Copyright (c) 2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import * as Structure from '../../mol-model/structure.ts';
import { DataLoci, EveryLoci, Loci } from '../../mol-model/loci.ts';
import { Volume } from '../../mol-model/volume.ts';
import { Shape, ShapeGroup } from '../../mol-model/shape.ts';
import * as LinearAlgebra3D from '../../mol-math/linear-algebra/3d.ts';
import { PluginContext } from '../../mol-plugin/context.ts';
import { PluginConfig } from '../../mol-plugin/config.ts';
import { PluginBehavior } from '../../mol-plugin/behavior.ts';
import { DefaultPluginSpec, PluginSpec } from '../../mol-plugin/spec.ts';
import { DefaultPluginUISpec } from '../../mol-plugin-ui/spec.ts';
import { PluginStateObject, PluginStateTransform } from '../../mol-plugin-state/objects.ts';
import { StateTransforms } from '../../mol-plugin-state/transforms.ts';
import { StateActions } from '../../mol-plugin-state/actions.ts';
import { PluginExtensions } from './extensions.ts';

export const lib = {
    structure: {
        ...Structure,
    },
    volume: {
        Volume,
    },
    shape: {
        Shape,
        ShapeGroup,
    },
    loci: {
        Loci,
        DataLoci,
        EveryLoci,
    },
    math: {
        LinearAlgebra: {
            ...LinearAlgebra3D,
        }
    },
    plugin: {
        PluginContext,
        PluginConfig,
        PluginBehavior,
        PluginSpec,
        PluginStateObject,
        PluginStateTransform,
        StateTransforms,
        StateActions,
        DefaultPluginSpec,
        DefaultPluginUISpec,
    },
    extensions: {
        ...PluginExtensions
    }
};