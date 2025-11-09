/**
 * Copyright (c) 2018-2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import type { RenderableState, Renderable } from './renderable.ts';
import { idFactory } from '../mol-util/id-factory.ts';
import type { WebGLContext } from './webgl/context.ts';
import { type DirectVolumeValues, DirectVolumeRenderable } from './renderable/direct-volume.ts';
import { type MeshValues, MeshRenderable } from './renderable/mesh.ts';
import { type PointsValues, PointsRenderable } from './renderable/points.ts';
import { type LinesValues, LinesRenderable } from './renderable/lines.ts';
import { type SpheresValues, SpheresRenderable } from './renderable/spheres.ts';
import { type TextValues, TextRenderable } from './renderable/text.ts';
import { type TextureMeshValues, TextureMeshRenderable } from './renderable/texture-mesh.ts';
import { type ImageValues, ImageRenderable } from './renderable/image.ts';
import { CylindersRenderable, type CylindersValues } from './renderable/cylinders.ts';
import type { Transparency } from './webgl/render-item.ts';
import type { GlobalDefines } from './renderable/schema.ts';
import { assertUnreachable } from '../mol-util/type-helpers.ts';

const getNextId = idFactory(0, 0x7FFFFFFF);

export const getNextMaterialId = idFactory(0, 0x7FFFFFFF);

export interface GraphicsRenderObject<T extends RenderObjectType = RenderObjectType> {
    readonly id: number,
    readonly type: T,
    readonly values: RenderObjectValues<T>,
    readonly state: RenderableState,
    readonly materialId: number
}

export type RenderObjectType = 'mesh' | 'points' | 'spheres' | 'cylinders' | 'text' | 'lines' | 'direct-volume' | 'image' | 'texture-mesh'

export type RenderObjectValues<T extends RenderObjectType> =
    T extends 'mesh' ? MeshValues :
        T extends 'points' ? PointsValues :
            T extends 'spheres' ? SpheresValues :
                T extends 'cylinders' ? CylindersValues :
                    T extends 'text' ? TextValues :
                        T extends 'lines' ? LinesValues :
                            T extends 'direct-volume' ? DirectVolumeValues :
                                T extends 'image' ? ImageValues :
                                    T extends 'texture-mesh' ? TextureMeshValues : never

//

export function createRenderObject<T extends RenderObjectType>(type: T, values: RenderObjectValues<T>, state: RenderableState, materialId: number): GraphicsRenderObject<T> {
    return { id: getNextId(), type, values, state, materialId } as GraphicsRenderObject<T>;
}

export function createRenderable<T extends RenderObjectType>(ctx: WebGLContext, o: GraphicsRenderObject<T>, transparency: Transparency, globals: GlobalDefines): Renderable<any> {
    switch (o.type) {
        case 'mesh': return MeshRenderable(ctx, o.id, o.values as MeshValues, o.state, o.materialId, transparency, globals);
        case 'points': return PointsRenderable(ctx, o.id, o.values as PointsValues, o.state, o.materialId, transparency, globals);
        case 'spheres': return SpheresRenderable(ctx, o.id, o.values as SpheresValues, o.state, o.materialId, transparency, globals);
        case 'cylinders': return CylindersRenderable(ctx, o.id, o.values as CylindersValues, o.state, o.materialId, transparency, globals);
        case 'text': return TextRenderable(ctx, o.id, o.values as TextValues, o.state, o.materialId, transparency, globals);
        case 'lines': return LinesRenderable(ctx, o.id, o.values as LinesValues, o.state, o.materialId, transparency, globals);
        case 'direct-volume': return DirectVolumeRenderable(ctx, o.id, o.values as DirectVolumeValues, o.state, o.materialId, transparency, globals);
        case 'image': return ImageRenderable(ctx, o.id, o.values as ImageValues, o.state, o.materialId, transparency, globals);
        case 'texture-mesh': return TextureMeshRenderable(ctx, o.id, o.values as TextureMeshValues, o.state, o.materialId, transparency, globals);
    }
    assertUnreachable(o.type);
}
