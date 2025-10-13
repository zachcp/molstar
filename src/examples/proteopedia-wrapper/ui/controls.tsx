/**
 * Copyright (c) 2019 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import * as ReactDOM from 'react-dom';
import type { PluginUIContext } from '../../../mol-plugin-ui/context.ts';
import { PluginContextContainer } from '../../../mol-plugin-ui/plugin.ts';
import { TransformUpdaterControl } from '../../../mol-plugin-ui/state/update-transform.ts';
import { StateElements } from '../helpers.ts';

export function volumeStreamingControls(plugin: PluginUIContext, parent: Element) {
    ReactDOM.render(<PluginContextContainer plugin={plugin}>
        <TransformUpdaterControl nodeRef={StateElements.VolumeStreaming} />
    </PluginContextContainer>, parent);
}