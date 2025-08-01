/**
 * Copyright (c) 2018-2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { RepresentationRegistry, Representation, RepresentationProvider } from '../representation.ts';
import { Volume } from '../../mol-model/volume.ts';
import { IsosurfaceRepresentationProvider } from './isosurface.ts';
import { objectForEach } from '../../mol-util/object.ts';
import { SliceRepresentationProvider } from './slice.ts';
import { DirectVolumeRepresentationProvider } from './direct-volume.ts';
import { SegmentRepresentationProvider } from './segment.ts';
import { DotRepresentationProvider } from './dot.ts';

export class VolumeRepresentationRegistry extends RepresentationRegistry<Volume, Representation.State> {
    constructor() {
        super();
        objectForEach(VolumeRepresentationRegistry.BuiltIn, (p, k) => {
            if (p.name !== k) throw new Error(`Fix BuiltInVolumeRepresentations to have matching names. ${p.name} ${k}`);
            this.add(p as any);
        });
    }
}

export namespace VolumeRepresentationRegistry {
    export const BuiltIn = {
        'direct-volume': DirectVolumeRepresentationProvider,
        'dot': DotRepresentationProvider,
        'isosurface': IsosurfaceRepresentationProvider,
        'segment': SegmentRepresentationProvider,
        'slice': SliceRepresentationProvider,
    };

    type _BuiltIn = typeof BuiltIn
    export type BuiltIn = keyof _BuiltIn
    export type BuiltInParams<T extends BuiltIn> = Partial<RepresentationProvider.ParamValues<_BuiltIn[T]>>
}