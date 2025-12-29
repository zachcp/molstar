/**
 * Copyright (c) 2022 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { PluginBehavior } from '../../mol-plugin/behavior/behavior.ts';
import { StateTransformer } from '../../mol-state/transformer.ts';
import { ZenodoImportUI } from './ui.tsx';

export const ZenodoImport: StateTransformer<PluginBehavior.Category, PluginBehavior.Behavior, {}> = PluginBehavior.create<{}>({
    name: 'extension-zenodo-import',
    category: 'misc',
    display: {
        name: 'Zenodo Export',
    },
    ctor: class extends PluginBehavior.Handler<{}> {
        register(): void {
            this.ctx.customImportControls.set('zenodo-import', ZenodoImportUI as any);
        }

        override update(): boolean {
            return false;
        }

        unregister(): void {
            this.ctx.customImportControls.delete('zenodo-import');
        }
    },
    params: (): {} => ({}),
});
