import type { LociLabelProvider } from '../../../mol-plugin-state/manager/loci-label.ts';
import { PluginBehavior } from '../../../mol-plugin/behavior.ts';
import { ParamDefinition as PD } from '../../../mol-util/param-definition.ts';
import { SbNcbrPartialChargesColorThemeProvider } from './color.ts';
import { SbNcbrPartialChargesPropertyProvider } from './property.ts';
import { SbNcbrPartialChargesLociLabelProvider } from './labels.ts';
import { SbNcbrPartialChargesPreset } from './preset.ts';

export const SbNcbrPartialCharges = PluginBehavior.create<{ autoAttach: boolean; showToolTip: boolean }>({
    name: 'sb-ncbr-partial-charges',
    category: 'misc',
    display: {
        name: 'SB NCBR Partial Charges',
    },
    ctor: class extends PluginBehavior.Handler<{ autoAttach: boolean; showToolTip: boolean }> {
        private SbNcbrPartialChargesLociLabelProvider: LociLabelProvider = SbNcbrPartialChargesLociLabelProvider(
            this.ctx,
        );

        register(): void {
            this.ctx.customModelProperties.register(SbNcbrPartialChargesPropertyProvider, this.params.autoAttach);
            this.ctx.representation.structure.themes.colorThemeRegistry.add(SbNcbrPartialChargesColorThemeProvider);
            this.ctx.managers.lociLabels.addProvider(this.SbNcbrPartialChargesLociLabelProvider);
            this.ctx.builders.structure.representation.registerPreset(SbNcbrPartialChargesPreset);
        }

        unregister() {
            this.ctx.customModelProperties.unregister(SbNcbrPartialChargesPropertyProvider.descriptor.name);
            this.ctx.representation.structure.themes.colorThemeRegistry.remove(SbNcbrPartialChargesColorThemeProvider);
            this.ctx.managers.lociLabels.removeProvider(this.SbNcbrPartialChargesLociLabelProvider);
            this.ctx.builders.structure.representation.unregisterPreset(SbNcbrPartialChargesPreset);
        }
    },
    params: (): { autoAttach: PD.BooleanParam; showToolTip: PD.BooleanParam } => ({
        autoAttach: PD.Boolean(true),
        showToolTip: PD.Boolean(true),
    }),
});
