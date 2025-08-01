/**
 * Copyright (c) 2019-2024 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { ElementSymbol } from '../../mol-model/structure/model/types.ts';
import { Color } from '../../mol-util/color/index.ts';
import { StructureElement, Unit, Bond } from '../../mol-model/structure.ts';
import { Location } from '../../mol-model/location.ts';
import type { ColorTheme } from '../color.ts';
import { ParamDefinition as PD } from '../../mol-util/param-definition.ts';
import { ThemeDataContext } from '../theme.ts';
import { ChainIdColorTheme, ChainIdColorThemeParams } from './chain-id.ts';
import { UniformColorTheme, UniformColorThemeParams } from './uniform.ts';
import { assertUnreachable } from '../../mol-util/type-helpers.ts';
import { EntityIdColorTheme, EntityIdColorThemeParams } from './entity-id.ts';
import { MoleculeTypeColorTheme, MoleculeTypeColorThemeParams } from './molecule-type.ts';
import { EntitySourceColorTheme, EntitySourceColorThemeParams } from './entity-source.ts';
import { ModelIndexColorTheme, ModelIndexColorThemeParams } from './model-index.ts';
import { StructureIndexColorTheme, StructureIndexColorThemeParams } from './structure-index.ts';
import { ColorThemeCategory } from './categories.ts';
import { TrajectoryIndexColorTheme, TrajectoryIndexColorThemeParams } from './trajectory-index.ts';

const DefaultIllustrativeColor = Color(0xEEEEEE);
const Description = `Assigns an illustrative color that gives every chain a color based on the chosen style but with lighter carbons (inspired by David Goodsell's Molecule of the Month style).`;

export const IllustrativeColorThemeParams = {
    style: PD.MappedStatic('entity-id', {
        uniform: PD.Group(UniformColorThemeParams),
        'chain-id': PD.Group(ChainIdColorThemeParams),
        'entity-id': PD.Group(EntityIdColorThemeParams),
        'entity-source': PD.Group(EntitySourceColorThemeParams),
        'molecule-type': PD.Group(MoleculeTypeColorThemeParams),
        'model-index': PD.Group(ModelIndexColorThemeParams),
        'structure-index': PD.Group(StructureIndexColorThemeParams),
        'trajectory-index': PD.Group(TrajectoryIndexColorThemeParams),
    }),
    carbonLightness: PD.Numeric(0.8, { min: -6, max: 6, step: 0.1 })
};
export type IllustrativeColorThemeParams = typeof IllustrativeColorThemeParams
export function getIllustrativeColorThemeParams(ctx: ThemeDataContext) {
    const params = PD.clone(IllustrativeColorThemeParams);
    return params;
}

type IllustrativeColorThemeProps = PD.Values<IllustrativeColorThemeParams>

function getStyleTheme(ctx: ThemeDataContext, props: IllustrativeColorThemeProps['style']) {
    switch (props.name) {
        case 'uniform': return UniformColorTheme(ctx, props.params);
        case 'chain-id': return ChainIdColorTheme(ctx, props.params);
        case 'entity-id': return EntityIdColorTheme(ctx, props.params);
        case 'entity-source': return EntitySourceColorTheme(ctx, props.params);
        case 'molecule-type': return MoleculeTypeColorTheme(ctx, props.params);
        case 'model-index': return ModelIndexColorTheme(ctx, props.params);
        case 'structure-index': return StructureIndexColorTheme(ctx, props.params);
        case 'trajectory-index': return TrajectoryIndexColorTheme(ctx, props.params);
        default: assertUnreachable(props);
    }
}

export function IllustrativeColorTheme(ctx: ThemeDataContext, props: PD.Values<IllustrativeColorThemeParams>): ColorTheme<IllustrativeColorThemeParams> {
    const { color: styleColor, legend, contextHash } = getStyleTheme(ctx, props.style);

    function illustrativeColor(location: Location, typeSymbol: ElementSymbol) {
        const baseColor = styleColor(location, false);
        return typeSymbol === 'C' ? Color.lighten(baseColor, props.carbonLightness) : baseColor;
    }

    function color(location: Location): Color {
        if (StructureElement.Location.is(location) && Unit.isAtomic(location.unit)) {
            const typeSymbol = location.unit.model.atomicHierarchy.atoms.type_symbol.value(location.element);
            return illustrativeColor(location, typeSymbol);
        } else if (Bond.isLocation(location) && Unit.isAtomic(location.aUnit)) {
            const elementIndex = location.aUnit.elements[location.aIndex];
            const typeSymbol = location.aUnit.model.atomicHierarchy.atoms.type_symbol.value(elementIndex);
            return illustrativeColor(location, typeSymbol);
        }
        return DefaultIllustrativeColor;
    }

    return {
        factory: IllustrativeColorTheme,
        granularity: 'group',
        preferSmoothing: true,
        color,
        props,
        contextHash,
        description: Description,
        legend
    };
}

export const IllustrativeColorThemeProvider: ColorTheme.Provider<IllustrativeColorThemeParams, 'illustrative'> = {
    name: 'illustrative',
    label: 'Illustrative',
    category: ColorThemeCategory.Misc,
    factory: IllustrativeColorTheme,
    getParams: getIllustrativeColorThemeParams,
    defaultValues: PD.getDefaultValues(IllustrativeColorThemeParams),
    isApplicable: (ctx: ThemeDataContext) => !!ctx.structure
};