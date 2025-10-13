/**
 * Copyright (c) 2019-2022 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { ParamDefinition as PD } from '../../../mol-util/param-definition.ts';
import { type UnitsVisual, UnitsLinesVisual, UnitsLinesParams } from '../units-visual.ts';
import { MolecularSurfaceCalculationParams } from '../../../mol-math/geometry/molecular-surface.ts';
import type { VisualContext } from '../../visual.ts';
import type { Unit, Structure } from '../../../mol-model/structure.ts';
import type { Theme } from '../../../mol-theme/theme.ts';
import { Lines } from '../../../mol-geo/geometry/lines/lines.ts';
import { computeUnitMolecularSurface, type MolecularSurfaceProps } from './util/molecular-surface.ts';
import { computeMarchingCubesLines } from '../../../mol-geo/util/marching-cubes/algorithm.ts';
import { ElementIterator, getElementLoci, eachElement } from './util/element.ts';
import type { VisualUpdateState } from '../../util.ts';
import { CommonSurfaceParams } from './util/common.ts';
import { Sphere3D } from '../../../mol-math/geometry.ts';

export const MolecularSurfaceWireframeParams = {
    ...UnitsLinesParams,
    ...MolecularSurfaceCalculationParams,
    ...CommonSurfaceParams,
    sizeFactor: PD.Numeric(1.5, { min: 0, max: 10, step: 0.1 }),
};
export type MolecularSurfaceWireframeParams = typeof MolecularSurfaceWireframeParams

//

async function createMolecularSurfaceWireframe(ctx: VisualContext, unit: Unit, structure: Structure, theme: Theme, props: MolecularSurfaceProps, lines?: Lines): Promise<Lines> {
    const { transform, field, idField, maxRadius } = await computeUnitMolecularSurface(structure, unit, theme.size, props).runInContext(ctx.runtime);
    const params = {
        isoLevel: props.probeRadius,
        scalarField: field,
        idField
    };
    const wireframe = await computeMarchingCubesLines(params, lines).runAsChild(ctx.runtime);

    Lines.transform(wireframe, transform);

    const sphere = Sphere3D.expand(Sphere3D(), unit.boundary.sphere, maxRadius);
    wireframe.setBoundingSphere(sphere);

    return wireframe;
}

export function MolecularSurfaceWireframeVisual(materialId: number): UnitsVisual<MolecularSurfaceWireframeParams> {
    return UnitsLinesVisual<MolecularSurfaceWireframeParams>({
        defaultProps: PD.getDefaultValues(MolecularSurfaceWireframeParams),
        createGeometry: createMolecularSurfaceWireframe,
        createLocationIterator: ElementIterator.fromGroup,
        getLoci: getElementLoci,
        eachLocation: eachElement,
        setUpdateState: (state: VisualUpdateState, newProps: PD.Values<MolecularSurfaceWireframeParams>, currentProps: PD.Values<MolecularSurfaceWireframeParams>) => {
            if (newProps.resolution !== currentProps.resolution) state.createGeometry = true;
            if (newProps.probeRadius !== currentProps.probeRadius) state.createGeometry = true;
            if (newProps.probePositions !== currentProps.probePositions) state.createGeometry = true;
            if (newProps.ignoreHydrogens !== currentProps.ignoreHydrogens) state.createGeometry = true;
            if (newProps.ignoreHydrogensVariant !== currentProps.ignoreHydrogensVariant) state.createGeometry = true;
            if (newProps.includeParent !== currentProps.includeParent) state.createGeometry = true;
        }
    }, materialId);
}