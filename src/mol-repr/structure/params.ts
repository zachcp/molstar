/**
 * Copyright (c) 2018-2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import { DirectVolume } from '../../mol-geo/geometry/direct-volume/direct-volume.ts';
import { Lines } from '../../mol-geo/geometry/lines/lines.ts';
import { Mesh } from '../../mol-geo/geometry/mesh/mesh.ts';
import { Points } from '../../mol-geo/geometry/points/points.ts';
import { Spheres } from '../../mol-geo/geometry/spheres/spheres.ts';
import { Cylinders } from '../../mol-geo/geometry/cylinders/cylinders.ts';
import { Text } from '../../mol-geo/geometry/text/text.ts';
import { TextureMesh } from '../../mol-geo/geometry/texture-mesh/texture-mesh.ts';
import { Image } from '../../mol-geo/geometry/image/image.ts';
import { ParamDefinition as PD } from '../../mol-util/param-definition.ts';
import { UnitKind, UnitKindOptions } from './visual/util/common.ts';

export function getUnitKindsParam(defaultValue: UnitKind[]) {
    return PD.MultiSelect<UnitKind>(defaultValue, UnitKindOptions, { description: 'For which kinds of units/chains to show the representation visuals.' });
}

export const StructureParams = {
    unitKinds: getUnitKindsParam(['atomic', 'spheres']),
    includeParent: PD.Boolean(false, { isHidden: true }),
};
export type StructureParams = typeof StructureParams

export const StructureMeshParams = { ...Mesh.Params };
export type StructureMeshParams = typeof StructureMeshParams

export const StructureSpheresParams = { ...Spheres.Params };
export type StructureSpheresParams = typeof StructureSpheresParams

export const StructureCylindersParams = { ...Cylinders.Params };
export type StructureCylindersParams = typeof StructureCylindersParams

export const StructurePointsParams = { ...Points.Params };
export type StructurePointsParams = typeof StructurePointsParams

export const StructureLinesParams = { ...Lines.Params };
export type StructureLinesParams = typeof StructureLinesParams

export const StructureTextParams = { ...Text.Params };
export type StructureTextParams = typeof StructureTextParams

export const StructureDirectVolumeParams = { ...DirectVolume.Params };
export type StructureDirectVolumeParams = typeof StructureDirectVolumeParams

export const StructureTextureMeshParams = { ...TextureMesh.Params };
export type StructureTextureMeshParams = typeof StructureTextureMeshParams

export const StructureImageParams = { ...Image.Params };
export type StructureImageParams = typeof StructureImageParams