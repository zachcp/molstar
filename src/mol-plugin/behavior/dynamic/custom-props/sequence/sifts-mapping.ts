/**
 * Copyright (c) 2021 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import { OrderedSet } from '../../../../../mol-data/int.ts';
import { SIFTSMapping as BestDatabaseSequenceMappingProp } from '../../../../../mol-model-props/sequence/sifts-mapping.ts';
import { SIFTSMappingColorThemeProvider } from '../../../../../mol-model-props/sequence/themes/sifts-mapping.ts';
import type { Loci } from '../../../../../mol-model/loci.ts';
import { StructureElement } from '../../../../../mol-model/structure.ts';
import { ParamDefinition as PD } from '../../../../../mol-util/param-definition.ts';
import { PluginBehavior } from '../../../behavior.ts';

export const SIFTSMapping = PluginBehavior.create<{ autoAttach: boolean, showTooltip: boolean }>({
    name: 'sifts-mapping-prop',
    category: 'custom-props',
    display: { name: 'SIFTS Mapping' },
    ctor: class extends PluginBehavior.Handler<{ autoAttach: boolean, showTooltip: boolean }> {
        private provider = BestDatabaseSequenceMappingProp.Provider;

        private labelProvider = {
            label: (loci: Loci): string | undefined => {
                if (!this.params.showTooltip) return;
                return bestDatabaseSequenceMappingLabel(loci);
            }
        };

        override update(p: { autoAttach: boolean, showTooltip: boolean }) {            const updated = (
                this.params.autoAttach !== p.autoAttach ||
                this.params.showTooltip !== p.showTooltip
            );
            this.params.autoAttach = p.autoAttach;
            this.params.showTooltip = p.showTooltip;
            this.ctx.customStructureProperties.setDefaultAutoAttach(this.provider.descriptor.name, this.params.autoAttach);
            return updated;
        }

        register(): void {
            this.ctx.customModelProperties.register(this.provider, this.params.autoAttach);
            this.ctx.representation.structure.themes.colorThemeRegistry.add(SIFTSMappingColorThemeProvider);
            this.ctx.managers.lociLabels.addProvider(this.labelProvider);
        }

        unregister() {
            this.ctx.customModelProperties.unregister(this.provider.descriptor.name);
            this.ctx.representation.structure.themes.colorThemeRegistry.remove(SIFTSMappingColorThemeProvider);
            this.ctx.managers.lociLabels.removeProvider(this.labelProvider);
        }
    },
    params: () => ({
        autoAttach: PD.Boolean(true),
        showTooltip: PD.Boolean(true)
    })
});

//

function bestDatabaseSequenceMappingLabel(loci: Loci): string | undefined {
    if (loci.kind === 'element-loci') {
        if (loci.elements.length === 0) return;

        const e = loci.elements[0];
        const u = e.unit;
        const se = StructureElement.Location.create(loci.structure, u, u.elements[OrderedSet.getAt(e.indices, 0)]);
        return BestDatabaseSequenceMappingProp.getLabel(se);
    }
}