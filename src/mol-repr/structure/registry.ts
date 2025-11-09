/**
 * Copyright (c) 2018-2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import type { Structure } from '../../mol-model/structure.ts';
import { objectForEach } from '../../mol-util/object.ts';
import { type RepresentationProvider, RepresentationRegistry } from '../representation.ts';
import type { StructureRepresentationState } from './representation.ts';
import { BallAndStickRepresentationProvider } from './representation/ball-and-stick.ts';
import { CarbohydrateRepresentationProvider } from './representation/carbohydrate.ts';
import { CartoonRepresentationProvider } from './representation/cartoon.ts';
import { EllipsoidRepresentationProvider } from './representation/ellipsoid.ts';
import { GaussianSurfaceRepresentationProvider } from './representation/gaussian-surface.ts';
import { LabelRepresentationProvider } from './representation/label.ts';
import { MolecularSurfaceRepresentationProvider } from './representation/molecular-surface.ts';
import { OrientationRepresentationProvider } from './representation/orientation.ts';
import { PointRepresentationProvider } from './representation/point.ts';
import { PuttyRepresentationProvider } from './representation/putty.ts';
import { SpacefillRepresentationProvider } from './representation/spacefill.ts';
import { LineRepresentationProvider } from './representation/line.ts';
import { GaussianVolumeRepresentationProvider } from './representation/gaussian-volume.ts';
import { BackboneRepresentationProvider } from './representation/backbone.ts';
import { PlaneRepresentationProvider } from './representation/plane.ts';

export class StructureRepresentationRegistry extends RepresentationRegistry<Structure, StructureRepresentationState> {
    constructor() {
        super();
        objectForEach(StructureRepresentationRegistry.BuiltIn, (p, k) => {
            if (p.name !== k) {
                throw new Error(`Fix BuiltInStructureRepresentations to have matching names. ${p.name} ${k}`);
            }
            this.add(p as any);
        });
    }
}

export namespace StructureRepresentationRegistry {
    export const BuiltIn = {
        'cartoon': CartoonRepresentationProvider,
        'backbone': BackboneRepresentationProvider,
        'ball-and-stick': BallAndStickRepresentationProvider,
        'carbohydrate': CarbohydrateRepresentationProvider,
        'ellipsoid': EllipsoidRepresentationProvider,
        'gaussian-surface': GaussianSurfaceRepresentationProvider,
        'gaussian-volume': GaussianVolumeRepresentationProvider,
        'label': LabelRepresentationProvider,
        'line': LineRepresentationProvider,
        'molecular-surface': MolecularSurfaceRepresentationProvider,
        'orientation': OrientationRepresentationProvider,
        'plane': PlaneRepresentationProvider,
        'point': PointRepresentationProvider,
        'putty': PuttyRepresentationProvider,
        'spacefill': SpacefillRepresentationProvider,
    };

    type _BuiltIn = typeof BuiltIn;
    export type BuiltIn = keyof _BuiltIn;
    export type BuiltInParams<T extends BuiltIn> = Partial<RepresentationProvider.ParamValues<_BuiltIn[T]>>;
}
