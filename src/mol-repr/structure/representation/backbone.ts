/**
 * Copyright (c) 2018-2024 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { PolymerBackboneCylinderParams, PolymerBackboneCylinderVisual } from '../visual/polymer-backbone-cylinder.ts';
import { ParamDefinition as PD } from '../../../mol-util/param-definition.ts';
import { UnitsRepresentation } from '../units-representation.ts';
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
import type { Structure } from '../../../mol-model/structure.ts';
import { PolymerBackboneSphereParams, PolymerBackboneSphereVisual } from '../visual/polymer-backbone-sphere.ts';
import { PolymerGapParams, PolymerGapVisual } from '../visual/polymer-gap-cylinder.ts';
import { BaseGeometry } from '../../../mol-geo/geometry/base.ts';

const BackboneVisuals = {
    'polymer-backbone-cylinder': (
        ctx: RepresentationContext,
        getParams: RepresentationParamsGetter<
            Structure,
            PolymerBackboneCylinderParams
        >,
    ): StructureRepresentation<PolymerBackboneCylinderParams> =>
        UnitsRepresentation(
            'Polymer backbone cylinder',
            ctx,
            getParams,
            PolymerBackboneCylinderVisual,
        ),
    'polymer-backbone-sphere': (
        ctx: RepresentationContext,
        getParams: RepresentationParamsGetter<
            Structure,
            PolymerBackboneSphereParams
        >,
    ): StructureRepresentation<PolymerBackboneSphereParams> =>
        UnitsRepresentation(
            'Polymer backbone sphere',
            ctx,
            getParams,
            PolymerBackboneSphereVisual,
        ),
    'polymer-gap': (
        ctx: RepresentationContext,
        getParams: RepresentationParamsGetter<Structure, PolymerGapParams>,
    ): StructureRepresentation<PolymerGapParams> =>
        UnitsRepresentation(
            'Polymer gap cylinder',
            ctx,
            getParams,
            PolymerGapVisual,
        ),
};

export const BackboneParams: Record<string, any> = {
    ...PolymerBackboneSphereParams,
    ...PolymerBackboneCylinderParams,
    ...PolymerGapParams,
    sizeAspectRatio: PD.Numeric(1, { min: 0.1, max: 3, step: 0.1 }),
    visuals: PD.MultiSelect(
        ['polymer-backbone-cylinder', 'polymer-backbone-sphere', 'polymer-gap'],
        PD.objectToOptions(BackboneVisuals),
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
    colorMode: PD.Select(
        'default',
        PD.arrayToOptions(['default', 'interpolate'] as const),
        { ...BaseGeometry.ShadingCategory, isHidden: true },
    ),
};
export type BackboneParams = typeof BackboneParams;
export function getBackboneParams(
    ctx: ThemeRegistryContext,
    structure: Structure,
): typeof BackboneParams {
    const params = PD.clone(BackboneParams);
    let hasGaps = false;
    structure.units.forEach((u) => {
        if (!hasGaps && u.gapElements.length) hasGaps = true;
    });
    params.visuals.defaultValue = [
        'polymer-backbone-cylinder',
        'polymer-backbone-sphere',
    ];
    if (hasGaps) params.visuals.defaultValue.push('polymer-gap');
    return params;
}

export type BackboneRepresentation = StructureRepresentation<BackboneParams>;
export function BackboneRepresentation(
    ctx: RepresentationContext,
    getParams: RepresentationParamsGetter<Structure, BackboneParams>,
): BackboneRepresentation {
    return Representation.createMulti(
        'Backbone',
        ctx,
        getParams,
        StructureRepresentationStateBuilder,
        BackboneVisuals as unknown as Representation.Def<Structure, BackboneParams>,
    );
}

export const BackboneRepresentationProvider: any = StructureRepresentationProvider({
    name: 'backbone',
    label: 'Backbone',
    description: 'Displays polymer backbone with cylinders and spheres.',
    factory: BackboneRepresentation,
    getParams: getBackboneParams,
    defaultValues: PD.getDefaultValues(BackboneParams),
    defaultColorTheme: { name: 'chain-id' },
    defaultSizeTheme: { name: 'uniform' },
    isApplicable: (structure: Structure) => structure.polymerResidueCount > 0,
});
