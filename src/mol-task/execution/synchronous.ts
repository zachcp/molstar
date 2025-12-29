/**
 * Copyright (c) 2017 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import type { RuntimeContext } from './runtime-context.ts';

export class SynchronousRuntimeContext implements RuntimeContext {
    shouldUpdate = false;
    isSynchronous = true;
    update(progress: string | Partial<RuntimeContext.ProgressUpdate>, dontNotify?: boolean): Promise<void> | void {}
}

export const SyncRuntimeContext: SynchronousRuntimeContext = new SynchronousRuntimeContext();
