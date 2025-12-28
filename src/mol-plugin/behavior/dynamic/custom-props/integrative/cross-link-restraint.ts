/**
 * Copyright (c) 2020 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { PluginBehavior } from '../../../behavior.ts';
import { ModelCrossLinkRestraint } from '../../../../../mol-model-props/integrative/cross-link-restraint/format.ts';
import type { Model } from '../../../../../mol-model/structure.ts';
import { MmcifFormat } from '../../../../../mol-model-formats/structure/mmcif.ts';
import { CrossLinkRestraintRepresentationProvider } from '../../../../../mol-model-props/integrative/cross-link-restraint/representation.ts';
import { CrossLinkColorThemeProvider } from '../../../../../mol-model-props/integrative/cross-link-restraint/color.ts';
import type { CrossLinkRestraint as _CrossLinkRestraint } from '../../../../../mol-model-props/integrative/cross-link-restraint/property.ts';

export const CrossLinkRestraint = PluginBehavior.create<{}>({
    name: 'integrative-cross-link-restraint',
    category: 'custom-props',
    display: { name: 'Cross Link Restraint' },
    ctor: class extends PluginBehavior.Handler<{}> {
        private provider = ModelCrossLinkRestraint.Provider;

        register(): void {
            this.provider.formatRegistry.add('mmCIF', crossLinkRestraintFromMmcif);

            this.ctx.representation.structure.themes.colorThemeRegistry.add(CrossLinkColorThemeProvider);
            this.ctx.representation.structure.registry.add(CrossLinkRestraintRepresentationProvider);
        }

        unregister() {
            this.provider.formatRegistry.remove('mmCIF');

            this.ctx.representation.structure.themes.colorThemeRegistry.remove(CrossLinkColorThemeProvider);
            this.ctx.representation.structure.registry.remove(CrossLinkRestraintRepresentationProvider);
        }
    },
});

function crossLinkRestraintFromMmcif(model: Model) {
    if (!MmcifFormat.is(model.sourceData)) return;
    const { ihm_cross_link_restraint } = model.sourceData.data.db;
    if (ihm_cross_link_restraint._rowCount === 0) return;
    return ModelCrossLinkRestraint.fromTable(ihm_cross_link_restraint, model);
}
