/**
 * Copyright (c) 2019-2022 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

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
import { LabelTextParams, LabelTextVisual } from '../visual/label-text.ts';
import { MarkerAction } from '../../../mol-util/marker-action.ts';

const LabelVisuals = {
    'label-text': (
        ctx: RepresentationContext,
        getParams: RepresentationParamsGetter<Structure, LabelTextParams>,
    ): StructureRepresentation<LabelTextParams> => ComplexRepresentation('Label text', ctx, getParams, LabelTextVisual),
};

export const LabelParams = {
    ...LabelTextParams,
    visuals: PD.MultiSelect(['label-text'], PD.objectToOptions(LabelVisuals)),
} as const;
export type LabelParams = typeof LabelParams;
export function getLabelParams(
    ctx: ThemeRegistryContext,
    structure: Structure,
): typeof LabelParams {
    return LabelParams;
}

export type LabelRepresentation = StructureRepresentation<LabelParams>;
export function LabelRepresentation(
    ctx: RepresentationContext,
    getParams: RepresentationParamsGetter<Structure, LabelParams>,
): LabelRepresentation {
    const repr = Representation.createMulti(
        'Label',
        ctx,
        getParams,
        StructureRepresentationStateBuilder,
        LabelVisuals as unknown as Representation.Def<Structure, LabelParams>,
    );
    repr.setState({ pickable: false, markerActions: MarkerAction.None });
    return repr;
}

export const LabelRepresentationProvider = StructureRepresentationProvider({
    name: 'label',
    label: 'Label',
    description: 'Displays labels.',
    factory: LabelRepresentation,
    getParams: getLabelParams,
    defaultValues: PD.getDefaultValues(LabelParams),
    defaultColorTheme: { name: 'uniform' },
    defaultSizeTheme: { name: 'physical' },
    isApplicable: (structure: Structure) => structure.elementCount > 0,
});
