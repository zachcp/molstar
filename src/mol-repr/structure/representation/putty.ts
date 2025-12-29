/**
 * Copyright (c) 2019-2024 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { PolymerTubeParams, PolymerTubeVisual } from '../visual/polymer-tube-mesh.ts';
import { PolymerGapParams, PolymerGapVisual } from '../visual/polymer-gap-cylinder.ts';
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
import { type Structure, Unit } from '../../../mol-model/structure.ts';
import type { ThemeRegistryContext } from '../../../mol-theme/theme.ts';
import { BaseGeometry } from '../../../mol-geo/geometry/base.ts';

const PuttyVisuals = {
    'polymer-tube': (
        ctx: RepresentationContext,
        getParams: RepresentationParamsGetter<Structure, PolymerTubeParams>,
    ): StructureRepresentation<PolymerTubeParams> =>
        UnitsRepresentation('Polymer tube mesh', ctx, getParams, PolymerTubeVisual),
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

export const PuttyParams = {
    ...PolymerTubeParams,
    ...PolymerGapParams,
    sizeFactor: PD.Numeric(0.2, { min: 0, max: 10, step: 0.01 }),
    visuals: PD.MultiSelect(
        ['polymer-tube', 'polymer-gap'],
        PD.objectToOptions(PuttyVisuals),
    ),
    bumpFrequency: PD.Numeric(
        2,
        { min: 0, max: 10, step: 0.1 },
        BaseGeometry.ShadingCategory,
    ),
    density: PD.Numeric(
        0.1,
        { min: 0, max: 1, step: 0.01 },
        BaseGeometry.ShadingCategory,
    ),
} as const;
export type PuttyParams = typeof PuttyParams;
export function getPuttyParams(
    ctx: ThemeRegistryContext,
    structure: Structure,
): typeof PuttyParams {
    const params = PD.clone(PuttyParams);
    let hasNucleotides = false;
    let hasGaps = false;
    structure.units.forEach((u) => {
        if (!hasNucleotides && Unit.isAtomic(u) && u.nucleotideElements.length) {
            hasNucleotides = true;
        }
        if (!hasGaps && u.gapElements.length) hasGaps = true;
    });
    params.visuals.defaultValue = ['polymer-tube'];
    if (hasGaps) params.visuals.defaultValue.push('polymer-gap');
    return params;
}

export type PuttyRepresentation = StructureRepresentation<PuttyParams>;
export function PuttyRepresentation(
    ctx: RepresentationContext,
    getParams: RepresentationParamsGetter<Structure, PuttyParams>,
): PuttyRepresentation {
    return Representation.createMulti(
        'Putty',
        ctx,
        getParams,
        StructureRepresentationStateBuilder,
        PuttyVisuals as unknown as Representation.Def<Structure, PuttyParams>,
    );
}

export const PuttyRepresentationProvider = StructureRepresentationProvider({
    name: 'putty',
    label: 'Putty',
    description: 'Displays a tube smoothly following the trace atoms of polymers.',
    factory: PuttyRepresentation,
    getParams: getPuttyParams,
    defaultValues: PD.getDefaultValues(PuttyParams),
    defaultColorTheme: { name: 'chain-id' },
    defaultSizeTheme: { name: 'uncertainty' },
    isApplicable: (structure: Structure) => structure.polymerResidueCount > 0,
});
