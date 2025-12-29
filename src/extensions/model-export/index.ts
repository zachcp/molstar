/**
 * Copyright (c) 2021 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import { PluginBehavior } from '../../mol-plugin/behavior/behavior.ts';
import { StateTransformer } from '../../mol-state/transformer.ts';
import { ModelExportUI } from './ui.tsx';

export const ModelExport: StateTransformer<PluginBehavior.Category, PluginBehavior.Behavior, {}> = PluginBehavior.create<{}>({
    name: 'extension-model-export',
    category: 'misc',
    display: {
        name: 'Model Export',
    },
    ctor: class extends PluginBehavior.Handler<{}> {
        register(): void {
            this.ctx.customStructureControls.set('model-export', ModelExportUI as any);
        }

        override update() {
            return false;
        }

        unregister() {
            this.ctx.customStructureControls.delete('model-export');
        }
    },
    params: () => ({}),
});
