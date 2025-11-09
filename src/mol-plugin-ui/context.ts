/**
 * Copyright (c) 2021 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import { PluginContext } from '../mol-plugin/context.ts';
import type { PluginUISpec } from './spec.ts';
import type { StateTransformParameters } from './state/common.tsx';

export class PluginUIContext extends PluginContext {
    readonly customParamEditors = new Map<
        string,
        StateTransformParameters.Class
    >();
    readonly customUIState: Record<string, any> = {};

    private initCustomParamEditors() {
        if (!this.spec.customParamEditors) return;

        for (const [t, e] of this.spec.customParamEditors) {
            this.customParamEditors.set(t.id, e);
        }
    }

    override dispose(options?: { doNotForceWebGLContextLoss?: boolean }) {
        super.dispose(options);
        this.layout.dispose();
    }

    constructor(public override spec: PluginUISpec) {
        super(spec);

        this.initCustomParamEditors();
    }
}
