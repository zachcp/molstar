/**
 * Copyright (c) 2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import { Mesh } from '../../mol-geo/geometry/mesh/mesh.ts';
import { InteractionsParams } from '../../mol-model-props/computed/interactions.ts';
import { Structure } from '../../mol-model/structure.ts';
import { PluginStateObject as SO } from '../../mol-plugin-state/objects.ts';
import { StateTransformer } from '../../mol-state/index.ts';
import { Task } from '../../mol-task/index.ts';
import { ParamDefinition as PD } from '../../mol-util/param-definition.ts';
import { computeContacts } from './compute.ts';
import { getCustomInteractionData } from './custom.ts';
import { InteractionElementSchema, StructureInteractions } from './model.ts';
import { buildInteractionsShape, InteractionVisualParams } from './visuals.ts';

const Factory = StateTransformer.builderFactory('interactions-extension');

export class InteractionData extends SO.Create<{ interactions: StructureInteractions }>({ name: 'Interactions', typeClass: 'Data' }) { }

export const ComputeContacts = Factory({
    name: 'compute-contacts',
    display: 'Compute Contacts',
    from: SO.Molecule.Structure.Selections,
    to: InteractionData,
    params: {
        interactions: PD.Group(InteractionsParams),
    },
})({
    apply({ params, a }) {
        return Task.create('Compute Contacts', async ctx => {
            const interactions = await computeContacts(ctx, a.data, { interactions: params.interactions });
            return new InteractionData({ interactions }, { label: 'Interactions' });
        });
    }
});

export const CustomInteractions = Factory({
    name: 'custom-interactions',
    display: 'Custom Interactions',
    from: SO.Root,
    to: InteractionData,
    params: {
        interactions: PD.Value<InteractionElementSchema[]>([], { isHidden: true }),
    },
})({
    apply({ params, dependencies }) {
        return Task.create('Custom Interactions', async ctx => {
            const structures: { [ref: string]: Structure } = {};
            for (const [k, v] of Object.entries(dependencies ?? {})) {
                structures[k] = v.data as Structure;
            }
            const interactions = getCustomInteractionData(params.interactions, structures);
            return new InteractionData({ interactions }, { label: 'Custom Interactions' });
        });
    }
});

export const InteractionsShape = Factory({
    name: 'interactions-shape',
    display: { name: 'Interactions Shape' },
    from: InteractionData,
    to: SO.Shape.Provider,
    params: InteractionVisualParams
})({
    canAutoUpdate: () => true,
    apply({ a, params }) {
        return new SO.Shape.Provider({
            label: 'Interactions Shape Provider',
            data: { interactions: a.data.interactions, params },
            params: PD.withDefaults(Mesh.Params, { }),
            getShape: (_, data: { interactions: StructureInteractions, params: InteractionVisualParams }, __, prev: any) => buildInteractionsShape(data.interactions, data.params, prev?.geometry),
            geometryUtils: Mesh.Utils,
        }, { label: 'Interactions Shape Provider' });
    }
});
