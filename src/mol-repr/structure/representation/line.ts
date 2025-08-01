/**
 * Copyright (c) 2020-2024 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { IntraUnitBondLineVisual, IntraUnitBondLineParams, StructureIntraUnitBondLineParams, StructureIntraUnitBondLineVisual } from '../visual/bond-intra-unit-line.ts';
import { InterUnitBondLineVisual, InterUnitBondLineParams } from '../visual/bond-inter-unit-line.ts';
import { ParamDefinition as PD } from '../../../mol-util/param-definition.ts';
import { UnitsRepresentation } from '../units-representation.ts';
import { ComplexRepresentation } from '../complex-representation.ts';
import { StructureRepresentation, StructureRepresentationProvider, StructureRepresentationStateBuilder } from '../representation.ts';
import { Representation, RepresentationParamsGetter, RepresentationContext } from '../../representation.ts';
import { ThemeRegistryContext } from '../../../mol-theme/theme.ts';
import { Structure } from '../../../mol-model/structure.ts';
import { getUnitKindsParam } from '../params.ts';
import { ElementPointParams, ElementPointVisual, StructureElementPointParams, StructureElementPointVisual } from '../visual/element-point.ts';
import { ElementCrossParams, ElementCrossVisual, StructureElementCrossParams, StructureElementCrossVisual } from '../visual/element-cross.ts';
import { Points } from '../../../mol-geo/geometry/points/points.ts';
import { BaseGeometry } from '../../../mol-geo/geometry/base.ts';

const LineVisuals = {
    'intra-bond': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, IntraUnitBondLineParams>) => UnitsRepresentation('Intra-unit bond line', ctx, getParams, IntraUnitBondLineVisual),
    'inter-bond': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, InterUnitBondLineParams>) => ComplexRepresentation('Inter-unit bond line', ctx, getParams, InterUnitBondLineVisual),
    'element-point': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, ElementPointParams>) => UnitsRepresentation('Points', ctx, getParams, ElementPointVisual),
    'element-cross': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, ElementCrossParams>) => UnitsRepresentation('Crosses', ctx, getParams, ElementCrossVisual),
    'structure-intra-bond': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, StructureIntraUnitBondLineParams>) => ComplexRepresentation('Structure intra-unit bond line', ctx, getParams, StructureIntraUnitBondLineVisual),
    'structure-element-point': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, StructureElementPointParams>) => ComplexRepresentation('Structure element points', ctx, getParams, StructureElementPointVisual),
    'structure-element-cross': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, StructureElementCrossParams>) => ComplexRepresentation('Structure element crosses', ctx, getParams, StructureElementCrossVisual),
};

export const LineParams = {
    ...IntraUnitBondLineParams,
    ...InterUnitBondLineParams,
    ...ElementPointParams,
    ...ElementCrossParams,
    pointStyle: PD.Select('circle', PD.objectToOptions(Points.StyleTypes)),
    multipleBonds: PD.Select('offset', PD.arrayToOptions(['off', 'symmetric', 'offset'] as const)),
    includeParent: PD.Boolean(false),
    sizeFactor: PD.Numeric(2, { min: 0.01, max: 10, step: 0.01 }),
    unitKinds: getUnitKindsParam(['atomic']),
    visuals: PD.MultiSelect(['intra-bond', 'inter-bond', 'element-point', 'element-cross'], PD.objectToOptions(LineVisuals)),
    density: PD.Numeric(0.1, { min: 0, max: 1, step: 0.01 }, BaseGeometry.ShadingCategory),
};
export type LineParams = typeof LineParams
export function getLineParams(ctx: ThemeRegistryContext, structure: Structure) {
    let params = LineParams;
    const size = Structure.getSize(structure);
    if (size >= Structure.Size.Huge) {
        params = PD.clone(params);
        params.visuals.defaultValue = ['intra-bond', 'element-point', 'element-cross'];
    } else if (structure.unitSymmetryGroups.length > 5000) {
        params = PD.clone(params);
        params.visuals.defaultValue = ['structure-intra-bond', 'structure-element-point', 'structure-element-cross'];
    }
    return params;
}

export type LineRepresentation = StructureRepresentation<LineParams>
export function LineRepresentation(ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, LineParams>): LineRepresentation {
    return Representation.createMulti('Line', ctx, getParams, StructureRepresentationStateBuilder, LineVisuals as unknown as Representation.Def<Structure, LineParams>);
}

export const LineRepresentationProvider = StructureRepresentationProvider({
    name: 'line',
    label: 'Line',
    description: 'Displays bonds as lines and atoms as points or croses.',
    factory: LineRepresentation,
    getParams: getLineParams,
    defaultValues: PD.getDefaultValues(LineParams),
    defaultColorTheme: { name: 'element-symbol' },
    defaultSizeTheme: { name: 'uniform' },
    isApplicable: (structure: Structure) => structure.elementCount > 0,
    getData: (structure: Structure, props: PD.Values<LineParams>) => {
        return props.includeParent ? structure.asParent() : structure;
    },
    mustRecreate: (oldProps: PD.Values<LineParams>, newProps: PD.Values<LineParams>) => {
        return oldProps.includeParent !== newProps.includeParent;
    }
});