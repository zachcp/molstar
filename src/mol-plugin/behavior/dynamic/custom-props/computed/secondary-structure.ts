/**
 * Copyright (c) 2019 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { PluginBehavior } from '../../../behavior.ts';
import { ParamDefinition as PD } from '../../../../../mol-util/param-definition.ts';
import { SecondaryStructureProvider } from '../../../../../mol-model-props/computed/secondary-structure.ts';
import type { StateTransformer } from '../../../../../mol-state/transformer.ts';

type _SecondaryStructureParams = { autoAttach: boolean };
export const SecondaryStructure: StateTransformer<PluginBehavior.Category, PluginBehavior.Behavior, _SecondaryStructureParams> = PluginBehavior.create<_SecondaryStructureParams>({
    name: 'computed-secondary-structure-prop',
    category: 'custom-props',
    display: { name: 'Secondary Structure' },
    ctor: class extends PluginBehavior.Handler<{ autoAttach: boolean }> {
        private provider = SecondaryStructureProvider;

        override update(p: { autoAttach: boolean; showTooltip: boolean }) {
            const updated = this.params.autoAttach !== p.autoAttach;
            this.params.autoAttach = p.autoAttach;
            this.ctx.customStructureProperties.setDefaultAutoAttach(
                this.provider.descriptor.name,
                this.params.autoAttach,
            );
            return updated;
        }

        register(): void {
            this.ctx.customStructureProperties.register(this.provider, this.params.autoAttach);
        }

        unregister() {
            this.ctx.customStructureProperties.unregister(this.provider.descriptor.name);
        }
    },
    params: (): { autoAttach: PD.BooleanParam } => ({
        autoAttach: PD.Boolean(false),
    }),
});
