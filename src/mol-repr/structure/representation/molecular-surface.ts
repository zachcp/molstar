/**
 * Copyright (c) 2018-2024 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import {
    MolecularSurfaceMeshParams,
    MolecularSurfaceMeshVisual,
    StructureMolecularSurfaceMeshVisual,
} from '../visual/molecular-surface-mesh.ts';
import { UnitsRepresentation } from '../units-representation.ts';
import { ParamDefinition as PD } from '../../../mol-util/param-definition.ts';
import {
    ComplexRepresentation,
    type StructureRepresentation,
    StructureRepresentationProvider,
    StructureRepresentationStateBuilder,
} from '../representation.ts';
import {
    Representation,
    type RepresentationContext,
    type RepresentationParamsGetter,
} from '../../../mol-repr/representation.ts';
import type { ThemeRegistryContext } from '../../../mol-theme/theme.ts';
import type { Structure } from '../../../mol-model/structure.ts';
import {
    MolecularSurfaceWireframeParams,
    MolecularSurfaceWireframeVisual,
} from '../visual/molecular-surface-wireframe.ts';
import { BaseGeometry } from '../../../mol-geo/geometry/base.ts';

const MolecularSurfaceVisuals = {
    'molecular-surface-mesh': (
        ctx: RepresentationContext,
        getParams: RepresentationParamsGetter<
            Structure,
            MolecularSurfaceMeshParams
        >,
    ): StructureRepresentation<MolecularSurfaceMeshParams> =>
        UnitsRepresentation(
            'Molecular surface mesh',
            ctx,
            getParams,
            MolecularSurfaceMeshVisual,
        ),
    'structure-molecular-surface-mesh': (
        ctx: RepresentationContext,
        getParams: RepresentationParamsGetter<
            Structure,
            MolecularSurfaceMeshParams
        >,
    ): StructureRepresentation<MolecularSurfaceMeshParams> =>
        ComplexRepresentation(
            'Structure Molecular surface mesh',
            ctx,
            getParams,
            StructureMolecularSurfaceMeshVisual,
        ),
    'molecular-surface-wireframe': (
        ctx: RepresentationContext,
        getParams: RepresentationParamsGetter<
            Structure,
            MolecularSurfaceWireframeParams
        >,
    ): StructureRepresentation<MolecularSurfaceWireframeParams> =>
        UnitsRepresentation(
            'Molecular surface wireframe',
            ctx,
            getParams,
            MolecularSurfaceWireframeVisual,
        ),
};

export const MolecularSurfaceParams = {
    ...MolecularSurfaceMeshParams,
    ...MolecularSurfaceWireframeParams,
    visuals: PD.MultiSelect(
        ['molecular-surface-mesh'],
        PD.objectToOptions(MolecularSurfaceVisuals),
    ),
    bumpFrequency: PD.Numeric(
        1,
        { min: 0, max: 10, step: 0.1 },
        BaseGeometry.ShadingCategory,
    ),
    density: PD.Numeric(
        0.5,
        { min: 0, max: 1, step: 0.01 },
        BaseGeometry.ShadingCategory,
    ),
};
export type MolecularSurfaceParams = typeof MolecularSurfaceParams;
export function getMolecularSurfaceParams(
    ctx: ThemeRegistryContext,
    structure: Structure,
): typeof MolecularSurfaceParams {
    return MolecularSurfaceParams;
}

export type MolecularSurfaceRepresentation = StructureRepresentation<MolecularSurfaceParams>;
export function MolecularSurfaceRepresentation(
    ctx: RepresentationContext,
    getParams: RepresentationParamsGetter<Structure, MolecularSurfaceParams>,
): MolecularSurfaceRepresentation {
    return Representation.createMulti(
        'Molecular Surface',
        ctx,
        getParams,
        StructureRepresentationStateBuilder,
        MolecularSurfaceVisuals as unknown as Representation.Def<
            Structure,
            MolecularSurfaceParams
        >,
    );
}

export const MolecularSurfaceRepresentationProvider = StructureRepresentationProvider({
    name: 'molecular-surface',
    label: 'Molecular Surface',
    description: 'Displays a molecular surface.',
    factory: MolecularSurfaceRepresentation,
    getParams: getMolecularSurfaceParams,
    defaultValues: PD.getDefaultValues(MolecularSurfaceParams),
    defaultColorTheme: { name: 'chain-id' },
    defaultSizeTheme: { name: 'physical' },
    isApplicable: (structure: Structure) => structure.elementCount > 0,
});
