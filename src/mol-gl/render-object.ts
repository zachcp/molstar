/**
 * Copyright (c) 2018-2023 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { Renderable, RenderableState } from './renderable.ts';
import { idFactory } from '../mol-util/id-factory.ts';
import { WebGLContext } from './webgl/context.ts';
import { DirectVolumeRenderable, DirectVolumeValues } from './renderable/direct-volume.ts';
import { MeshRenderable, MeshValues } from './renderable/mesh.ts';
import { PointsRenderable, PointsValues } from './renderable/points.ts';
import { LinesRenderable, LinesValues } from './renderable/lines.ts';
import { SpheresRenderable, SpheresValues } from './renderable/spheres.ts';
import { TextRenderable, TextValues } from './renderable/text.ts';
import { TextureMeshRenderable, TextureMeshValues } from './renderable/texture-mesh.ts';
import { ImageRenderable, ImageValues } from './renderable/image.ts';
import { CylindersRenderable, CylindersValues } from './renderable/cylinders.ts';
import { Transparency } from './webgl/render-item.ts';

const getNextId = idFactory(0, 0x7FFFFFFF);

export const getNextMaterialId = idFactory(0, 0x7FFFFFFF);

export interface GraphicsRenderObject<T extends RenderObjectType = RenderObjectType> {
    readonly id: number;
    readonly type: T;
    readonly values: RenderObjectValues<T>;
    readonly state: RenderableState;
    readonly materialId: number;
}

export type RenderObjectType =
    | 'mesh'
    | 'points'
    | 'spheres'
    | 'cylinders'
    | 'text'
    | 'lines'
    | 'direct-volume'
    | 'image'
    | 'texture-mesh';

export type RenderObjectValues<T extends RenderObjectType> = T extends 'mesh' ? MeshValues
    : T extends 'points' ? PointsValues
    : T extends 'spheres' ? SpheresValues
    : T extends 'cylinders' ? CylindersValues
    : T extends 'text' ? TextValues
    : T extends 'lines' ? LinesValues
    : T extends 'direct-volume' ? DirectVolumeValues
    : T extends 'image' ? ImageValues
    : T extends 'texture-mesh' ? TextureMeshValues
    : never;

//

export function createRenderObject<T extends RenderObjectType>(
    type: T,
    values: RenderObjectValues<T>,
    state: RenderableState,
    materialId: number,
): GraphicsRenderObject<T> {
    return { id: getNextId(), type, values, state, materialId } as GraphicsRenderObject<T>;
}

export function createRenderable<T extends RenderObjectType>(
    ctx: WebGLContext,
    o: GraphicsRenderObject<T>,
    transparency: Transparency,
): Renderable<any> {
    switch (o.type) {
        case 'mesh':
            return MeshRenderable(
                ctx,
                o.id,
                o.values as MeshValues,
                o.state,
                o.materialId,
                transparency,
            );
        case 'points':
            return PointsRenderable(
                ctx,
                o.id,
                o.values as PointsValues,
                o.state,
                o.materialId,
                transparency,
            );
        case 'spheres':
            return SpheresRenderable(
                ctx,
                o.id,
                o.values as SpheresValues,
                o.state,
                o.materialId,
                transparency,
            );
        case 'cylinders':
            return CylindersRenderable(
                ctx,
                o.id,
                o.values as CylindersValues,
                o.state,
                o.materialId,
                transparency,
            );
        case 'text':
            return TextRenderable(
                ctx,
                o.id,
                o.values as TextValues,
                o.state,
                o.materialId,
                transparency,
            );
        case 'lines':
            return LinesRenderable(
                ctx,
                o.id,
                o.values as LinesValues,
                o.state,
                o.materialId,
                transparency,
            );
        case 'direct-volume':
            return DirectVolumeRenderable(
                ctx,
                o.id,
                o.values as DirectVolumeValues,
                o.state,
                o.materialId,
                transparency,
            );
        case 'image':
            return ImageRenderable(
                ctx,
                o.id,
                o.values as ImageValues,
                o.state,
                o.materialId,
                transparency,
            );
        case 'texture-mesh':
            return TextureMeshRenderable(
                ctx,
                o.id,
                o.values as TextureMeshValues,
                o.state,
                o.materialId,
                transparency,
            );
    }
    throw new Error('unsupported type');
}
