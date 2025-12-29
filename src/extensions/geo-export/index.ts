/**
 * Copyright (c) 2021 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Sukolsak Sakshuwong <sukolsak@stanford.edu>
 */

import { PluginBehavior } from '../../mol-plugin/behavior/behavior.ts';
import { StateTransformer } from '../../mol-state/transformer.ts';
import { GeometryExporterUI } from './ui.tsx';

export const GeometryExport: StateTransformer<PluginBehavior.Category, PluginBehavior.Behavior, {}> = PluginBehavior.create<{}>({
    name: 'extension-geo-export',
    category: 'misc',
    display: {
        name: 'Geometry Export',
    },
    ctor: class extends PluginBehavior.Handler<{}> {
        register(): void {
            this.ctx.customStructureControls.set('geo-export', GeometryExporterUI as any);
        }

        override update() {
            return false;
        }

        unregister() {
            this.ctx.customStructureControls.delete('geo-export');
        }
    },
    params: () => ({}),
});
