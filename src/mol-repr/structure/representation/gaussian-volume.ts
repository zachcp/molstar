/**
 * Copyright (c) 2018-2022 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { ParamDefinition as PD } from '../../../mol-util/param-definition.ts';
import {
    GaussianDensityVolumeParams,
    GaussianDensityVolumeVisual,
    type UnitsGaussianDensityVolumeParams,
    UnitsGaussianDensityVolumeVisual,
} from '../visual/gaussian-density-volume.ts';
import {
    ComplexRepresentation,
    type StructureRepresentation,
    StructureRepresentationProvider,
    StructureRepresentationStateBuilder,
    UnitsRepresentation,
} from '../representation.ts';
import {
    Representation,
    type RepresentationContext,
    type RepresentationParamsGetter,
} from '../../../mol-repr/representation.ts';
import type { ThemeRegistryContext } from '../../../mol-theme/theme.ts';
import type { Structure } from '../../../mol-model/structure.ts';

const GaussianVolumeVisuals = {
    'gaussian-volume': (
        ctx: RepresentationContext,
        getParams: RepresentationParamsGetter<
            Structure,
            GaussianDensityVolumeParams
        >,
    ): StructureRepresentation<GaussianDensityVolumeParams> =>
        ComplexRepresentation(
            'Gaussian volume',
            ctx,
            getParams,
            GaussianDensityVolumeVisual,
        ),
    'units-gaussian-volume': (
        ctx: RepresentationContext,
        getParams: RepresentationParamsGetter<
            Structure,
            UnitsGaussianDensityVolumeParams
        >,
    ): StructureRepresentation<UnitsGaussianDensityVolumeParams> =>
        UnitsRepresentation(
            'Units-Gaussian volume',
            ctx,
            getParams,
            UnitsGaussianDensityVolumeVisual,
        ),
};

export const GaussianVolumeParams = {
    ...GaussianDensityVolumeParams,
    jumpLength: PD.Numeric(4, { min: 0, max: 20, step: 0.1 }),
    visuals: PD.MultiSelect(
        ['gaussian-volume'],
        PD.objectToOptions(GaussianVolumeVisuals),
    ),
} as const;
export type GaussianVolumeParams = typeof GaussianVolumeParams;
export function getGaussianVolumeParams(
    ctx: ThemeRegistryContext,
    structure: Structure,
): typeof GaussianVolumeParams {
    return GaussianVolumeParams;
}

export type GaussianVolumeRepresentation = StructureRepresentation<GaussianVolumeParams>;
export function GaussianVolumeRepresentation(
    ctx: RepresentationContext,
    getParams: RepresentationParamsGetter<Structure, GaussianVolumeParams>,
): GaussianVolumeRepresentation {
    return Representation.createMulti(
        'Gaussian Volume',
        ctx,
        getParams,
        StructureRepresentationStateBuilder,
        GaussianVolumeVisuals as unknown as Representation.Def<
            Structure,
            GaussianVolumeParams
        >,
    );
}

export const GaussianVolumeRepresentationProvider = StructureRepresentationProvider({
    name: 'gaussian-volume',
    label: 'Gaussian Volume',
    description: 'Displays a gaussian molecular density using direct volume rendering.',
    factory: GaussianVolumeRepresentation,
    getParams: getGaussianVolumeParams,
    defaultValues: PD.getDefaultValues(GaussianVolumeParams),
    defaultColorTheme: { name: 'chain-id' },
    defaultSizeTheme: { name: 'physical' },
    isApplicable: (structure: Structure) => structure.elementCount > 0,
});
