/**
 * Copyright (c) 2020 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import { PluginBehavior } from '../../mol-plugin/behavior/behavior.ts';
import { StateTransformer } from '../../mol-state/transformer.ts';
import { Mp4EncoderUI } from './ui.tsx';

export const Mp4Export: StateTransformer<PluginBehavior.Category, PluginBehavior.Behavior, {}> = PluginBehavior.create<{}>({
    name: 'extension-mp4-export',
    category: 'misc',
    display: {
        name: 'MP4 Animation Export',
    },
    ctor: class extends PluginBehavior.Handler<{}> {
        register(): void {
            this.ctx.customStructureControls.set('mp4-export', Mp4EncoderUI as any);
        }

        override update() {
            return false;
        }

        unregister() {
            this.ctx.customStructureControls.delete('mp4-export');
        }
    },
    params: () => ({}),
});
