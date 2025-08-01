/**
 * Copyright (c) 2018 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import { Task } from '../task.ts';
import { RuntimeContext } from '../execution/runtime-context.ts';

export type MultistepFn<P, T> =
    (params: P, step: (s: number) => Promise<void> | void, ctx: RuntimeContext) => Promise<T>

function MultistepTask<P, T>(name: string, steps: string[], f: MultistepFn<P, T>, onAbort?: () => void) {
    return (params: P) => Task.create(name, async ctx => f(params, n => ctx.update({ message: `${steps[n]}`, current: n + 1, max: steps.length }), ctx), onAbort);
}

export { MultistepTask };