/**
 * Copyright (c) 2019-2022 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import type { Unit, Structure } from '../../../../mol-model/structure.ts';
import { Task, type RuntimeContext } from '../../../../mol-task/index.ts';
import { getUnitConformationAndRadius, type CommonSurfaceProps, ensureReasonableResolution, getStructureConformationAndRadius } from './common.ts';
import type { PositionData, DensityData, Box3D } from '../../../../mol-math/geometry.ts';
import { type MolecularSurfaceCalculationProps, calcMolecularSurface } from '../../../../mol-math/geometry/molecular-surface.ts';
import { OrderedSet } from '../../../../mol-data/int.ts';
import type { Boundary } from '../../../../mol-math/geometry/boundary.ts';
import type { SizeTheme } from '../../../../mol-theme/size.ts';

export type MolecularSurfaceProps = MolecularSurfaceCalculationProps & CommonSurfaceProps

function getUnitPositionDataAndMaxRadius(structure: Structure, unit: Unit, sizeTheme: SizeTheme<any>, props: MolecularSurfaceProps) {
    const { probeRadius } = props;
    const { position, boundary, radius } = getUnitConformationAndRadius(structure, unit, sizeTheme, props);
    const { indices } = position;
    const n = OrderedSet.size(indices);
    const radii = new Float32Array(OrderedSet.end(indices));

    let maxRadius = 0;
    for (let i = 0; i < n; ++i) {
        const j = OrderedSet.getAt(indices, i);
        const r = radius(j);
        if (maxRadius < r) maxRadius = r;
        radii[j] = r + probeRadius;
    }

    return { position: { ...position, radius: radii }, boundary, maxRadius };
}

export function computeUnitMolecularSurface(structure: Structure, unit: Unit, sizeTheme: SizeTheme<any>, props: MolecularSurfaceProps) {
    const { position, boundary, maxRadius } = getUnitPositionDataAndMaxRadius(structure, unit, sizeTheme, props);
    const p = ensureReasonableResolution(boundary.box, props);
    return Task.create('Molecular Surface', async ctx => {
        return await MolecularSurface(ctx, position, boundary, maxRadius, boundary.box, p);
    });
}

//

function getStructurePositionDataAndMaxRadius(structure: Structure, sizeTheme: SizeTheme<any>, props: MolecularSurfaceProps) {
    const { probeRadius } = props;
    const { position, boundary, radius } = getStructureConformationAndRadius(structure, sizeTheme, props);
    const { indices } = position;
    const n = OrderedSet.size(indices);
    const radii = new Float32Array(OrderedSet.end(indices));

    let maxRadius = 0;
    for (let i = 0; i < n; ++i) {
        const j = OrderedSet.getAt(indices, i);
        const r = radius(j);
        if (maxRadius < r) maxRadius = r;
        radii[j] = r + probeRadius;
    }

    return { position: { ...position, radius: radii }, boundary, maxRadius };
}

export function computeStructureMolecularSurface(structure: Structure, sizeTheme: SizeTheme<any>, props: MolecularSurfaceProps) {
    const { position, boundary, maxRadius } = getStructurePositionDataAndMaxRadius(structure, sizeTheme, props);
    const p = ensureReasonableResolution(boundary.box, props);
    return Task.create('Molecular Surface', async ctx => {
        return await MolecularSurface(ctx, position, boundary, maxRadius, boundary.box, p);
    });
}

//

async function MolecularSurface(ctx: RuntimeContext, position: Required<PositionData>, boundary: Boundary, maxRadius: number, box: Box3D | null, props: MolecularSurfaceCalculationProps): Promise<DensityData> {
    return calcMolecularSurface(ctx, position, boundary, maxRadius, box, props);
}