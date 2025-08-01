/**
 * Copyright (c) 2018-2020 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import { Structure } from '../../mol-model/structure.ts';
import { StructureUnitTransforms } from '../../mol-model/structure/structure/util/unit-transforms.ts';
import { ParamDefinition as PD } from '../../mol-util/param-definition.ts';
import { Representation, RepresentationProps, RepresentationProvider } from '../representation.ts';

export interface StructureRepresentationState extends Representation.State {
    unitTransforms: StructureUnitTransforms | null;
    unitTransformsVersion: number;
}
export const StructureRepresentationStateBuilder: Representation.StateBuilder<
    StructureRepresentationState
> = {
    create: () => {
        return {
            ...Representation.createState(),
            unitTransforms: null,
            unitTransformsVersion: -1,
        };
    },
    update: (
        state: StructureRepresentationState,
        update: Partial<StructureRepresentationState>,
    ) => {
        Representation.updateState(state, update);
        if (update.unitTransforms !== undefined) state.unitTransforms = update.unitTransforms;
    },
};

export interface StructureRepresentation<P extends RepresentationProps = {}>
    extends Representation<Structure, P, StructureRepresentationState> {}

export type StructureRepresentationProvider<P extends PD.Params, Id extends string = string> =
    RepresentationProvider<Structure, P, StructureRepresentationState, Id>;
export function StructureRepresentationProvider<P extends PD.Params, Id extends string>(
    p: StructureRepresentationProvider<P, Id>,
): StructureRepresentationProvider<P, Id> {
    return p;
}
//
export { ComplexRepresentation } from './complex-representation.ts';
export { ComplexVisual } from './complex-visual.ts';
export { UnitsRepresentation } from './units-representation.ts';
export { UnitsVisual } from './units-visual.ts';
