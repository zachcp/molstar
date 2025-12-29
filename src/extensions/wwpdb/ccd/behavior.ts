/**
 * Copyright (c) 2023 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Sebastian Bittrich <sebastian.bittrich@rcsb.org>
 */

import { PluginBehavior } from '../../../mol-plugin/behavior/behavior.ts';
import { ChemicalComponentPreset, ChemicalCompontentTrajectoryHierarchyPreset } from './representation.ts';
import type { StateTransformer } from '../../../mol-state/index.ts';

export const wwPDBChemicalComponentDictionary: StateTransformer<PluginBehavior.Category, PluginBehavior.Behavior, {}> = PluginBehavior.create<{}>({
    name: 'wwpdb-chemical-component-dictionary',
    category: 'representation',
    display: {
        name: 'wwPDB Chemical Compontent Dictionary',
        description: 'Custom representation for data loaded from the CCD.',
    },
    ctor: class extends PluginBehavior.Handler<{}> {
        register(): void {
            this.ctx.builders.structure.hierarchy.registerPreset(ChemicalCompontentTrajectoryHierarchyPreset);
            this.ctx.builders.structure.representation.registerPreset(ChemicalComponentPreset);
        }

        override update(): boolean {
            return false;
        }

        unregister(): void {
            this.ctx.builders.structure.hierarchy.unregisterPreset(ChemicalCompontentTrajectoryHierarchyPreset);
            this.ctx.builders.structure.representation.unregisterPreset(ChemicalComponentPreset);
        }
    },
    params: (): {} => ({}),
});
