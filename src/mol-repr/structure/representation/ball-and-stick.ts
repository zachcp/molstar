/**
 * Copyright (c) 2018-2024 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import {
    IntraUnitBondCylinderParams,
    IntraUnitBondCylinderVisual,
    type StructureIntraUnitBondCylinderParams,
    StructureIntraUnitBondCylinderVisual,
} from '../visual/bond-intra-unit-cylinder.ts';
import { InterUnitBondCylinderParams, InterUnitBondCylinderVisual } from '../visual/bond-inter-unit-cylinder.ts';
import { ElementSphereParams, ElementSphereVisual, StructureElementSphereVisual } from '../visual/element-sphere.ts';
import { ParamDefinition as PD } from '../../../mol-util/param-definition.ts';
import { UnitsRepresentation } from '../units-representation.ts';
import { ComplexRepresentation } from '../complex-representation.ts';
import {
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
import { Structure } from '../../../mol-model/structure.ts';
import { getUnitKindsParam } from '../params.ts';
import { BaseGeometry } from '../../../mol-geo/geometry/base.ts';

const BallAndStickVisuals = {
    'element-sphere': (
        ctx: RepresentationContext,
        getParams: RepresentationParamsGetter<Structure, ElementSphereParams>,
    ): StructureRepresentation<ElementSphereParams> =>
        UnitsRepresentation('Element sphere', ctx, getParams, ElementSphereVisual),
    'intra-bond': (
        ctx: RepresentationContext,
        getParams: RepresentationParamsGetter<
            Structure,
            IntraUnitBondCylinderParams
        >,
    ): StructureRepresentation<IntraUnitBondCylinderParams> =>
        UnitsRepresentation(
            'Intra-unit bond cylinder',
            ctx,
            getParams,
            IntraUnitBondCylinderVisual,
        ),
    'inter-bond': (
        ctx: RepresentationContext,
        getParams: RepresentationParamsGetter<
            Structure,
            InterUnitBondCylinderParams
        >,
    ): StructureRepresentation<InterUnitBondCylinderParams> =>
        ComplexRepresentation(
            'Inter-unit bond cylinder',
            ctx,
            getParams,
            InterUnitBondCylinderVisual,
        ),
    'structure-element-sphere': (
        ctx: RepresentationContext,
        getParams: RepresentationParamsGetter<Structure, ElementSphereParams>,
    ): StructureRepresentation<ElementSphereParams> =>
        ComplexRepresentation(
            'Structure element sphere',
            ctx,
            getParams,
            StructureElementSphereVisual,
        ),
    'structure-intra-bond': (
        ctx: RepresentationContext,
        getParams: RepresentationParamsGetter<
            Structure,
            StructureIntraUnitBondCylinderParams
        >,
    ): StructureRepresentation<StructureIntraUnitBondCylinderParams> =>
        ComplexRepresentation(
            'Structure intra-unit bond cylinder',
            ctx,
            getParams,
            StructureIntraUnitBondCylinderVisual,
        ),
};

export const BallAndStickParams = {
    ...ElementSphereParams,
    traceOnly: PD.Boolean(false, { isHidden: true }), // not useful here
    ...IntraUnitBondCylinderParams,
    ...InterUnitBondCylinderParams,
    includeParent: PD.Boolean(false),
    unitKinds: getUnitKindsParam(['atomic']),
    sizeFactor: PD.Numeric(0.15, { min: 0.01, max: 10, step: 0.01 }),
    sizeAspectRatio: PD.Numeric(2 / 3, { min: 0.01, max: 3, step: 0.01 }),
    visuals: PD.MultiSelect(
        ['element-sphere', 'intra-bond', 'inter-bond'],
        PD.objectToOptions(BallAndStickVisuals),
    ),
    bumpFrequency: PD.Numeric(
        0,
        { min: 0, max: 10, step: 0.1 },
        BaseGeometry.ShadingCategory,
    ),
    density: PD.Numeric(
        0.1,
        { min: 0, max: 1, step: 0.01 },
        BaseGeometry.ShadingCategory,
    ),
};
export type BallAndStickParams = typeof BallAndStickParams;
export function getBallAndStickParams(
    ctx: ThemeRegistryContext,
    structure: Structure,
): typeof BallAndStickParams {
    let params = BallAndStickParams;
    const size = Structure.getSize(structure);
    if (size >= Structure.Size.Huge) {
        params = PD.clone(params);
        params.visuals.defaultValue = ['element-sphere', 'intra-bond'];
    } else if (structure.unitSymmetryGroups.length > 5000) {
        params = PD.clone(params);
        params.visuals.defaultValue = [
            'structure-element-sphere',
            'structure-intra-bond',
        ];
    }
    return params;
}

export type BallAndStickRepresentation = StructureRepresentation<BallAndStickParams>;
export function BallAndStickRepresentation(
    ctx: RepresentationContext,
    getParams: RepresentationParamsGetter<Structure, BallAndStickParams>,
): BallAndStickRepresentation {
    return Representation.createMulti(
        'Ball & Stick',
        ctx,
        getParams,
        StructureRepresentationStateBuilder,
        BallAndStickVisuals as unknown as Representation.Def<
            Structure,
            BallAndStickParams
        >,
    );
}

export const BallAndStickRepresentationProvider = StructureRepresentationProvider({
    name: 'ball-and-stick',
    label: 'Ball & Stick',
    description: 'Displays atoms as spheres and bonds as cylinders.',
    factory: BallAndStickRepresentation,
    getParams: getBallAndStickParams,
    defaultValues: PD.getDefaultValues(BallAndStickParams),
    defaultColorTheme: { name: 'element-symbol' },
    defaultSizeTheme: { name: 'physical' },
    isApplicable: (structure: Structure) => structure.elementCount > 0,
    getData: (structure: Structure, props: PD.Values<BallAndStickParams>) => {
        return props.includeParent ? structure.asParent() : structure;
    },
    mustRecreate: (
        oldProps: PD.Values<BallAndStickParams>,
        newProps: PD.Values<BallAndStickParams>,
    ) => {
        return oldProps.includeParent !== newProps.includeParent;
    },
});
