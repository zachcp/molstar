/**
 * Copyright (c) 2021 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Sukolsak Sakshuwong <sukolsak@stanford.edu>
 */

import type { GraphicsRenderObject } from '../../mol-gl/render-object.ts';
import type { WebGLContext } from '../../mol-gl/webgl/context.ts';
import type { RuntimeContext } from '../../mol-task/index.ts';

export type RenderObjectExportData = {
    [k: string]: string | Uint8Array | ArrayBuffer | undefined
}

export interface RenderObjectExporter<D extends RenderObjectExportData> {
    readonly fileExtension: string
    add(renderObject: GraphicsRenderObject, webgl: WebGLContext, ctx: RuntimeContext): Promise<void> | undefined
    getData(ctx: RuntimeContext): Promise<D>
    getBlob(ctx: RuntimeContext): Promise<Blob>
}