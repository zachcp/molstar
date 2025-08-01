/**
 * Copyright (c) 2018-2020 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { Color, ColorScale } from '../../../mol-util/color/index.ts';
import { Location } from '../../../mol-model/location.ts';
import { ParamDefinition as PD } from '../../../mol-util/param-definition.ts';
import { ThemeDataContext } from '../../../mol-theme/theme.ts';
import { ColorTheme, LocationColor } from '../../../mol-theme/color.ts';
import { CustomProperty } from '../../common/custom-property.ts';
import { CrossLinkRestraintProvider, CrossLinkRestraint } from './property.ts';
import { ColorThemeCategory } from '../../../mol-theme/color/categories.ts';

const DefaultColor = Color(0xCCCCCC);
const Description = 'Colors cross-links by the deviation of the observed distance versus the modeled distance (e.g. modeled / `ihm_cross_link_restraint.distance_threshold`).';

export const CrossLinkColorThemeParams = {
    domain: PD.Interval([0.5, 1.5], { step: 0.01 }),
    list: PD.ColorList('red-grey', { presetKind: 'scale' }),
};
export type CrossLinkColorThemeParams = typeof CrossLinkColorThemeParams
export function getCrossLinkColorThemeParams(ctx: ThemeDataContext) {
    return CrossLinkColorThemeParams; // TODO return copy
}

export function CrossLinkColorTheme(ctx: ThemeDataContext, props: PD.Values<CrossLinkColorThemeParams>): ColorTheme<CrossLinkColorThemeParams> {
    let color: LocationColor;
    let scale: ColorScale | undefined = undefined;

    const crossLinkRestraints = ctx.structure && CrossLinkRestraintProvider.get(ctx.structure).value;

    if (crossLinkRestraints) {
        scale = ColorScale.create({
            domain: props.domain,
            listOrName: props.list.colors
        });
        const scaleColor = scale.color;

        color = (location: Location): Color => {
            if (CrossLinkRestraint.isLocation(location)) {
                const pair = crossLinkRestraints.pairs[location.element];
                if (pair) {
                    return scaleColor(CrossLinkRestraint.distance(pair) / pair.distanceThreshold);
                }
            }
            return DefaultColor;
        };
    } else {
        color = () => DefaultColor;
    }

    return {
        factory: CrossLinkColorTheme,
        granularity: 'group',
        color,
        props,
        description: Description,
        legend: scale ? scale.legend : undefined
    };
}

export const CrossLinkColorThemeProvider: ColorTheme.Provider<CrossLinkColorThemeParams, 'cross-link'> = {
    name: 'cross-link',
    label: 'Cross Link',
    category: ColorThemeCategory.Misc,
    factory: CrossLinkColorTheme,
    getParams: getCrossLinkColorThemeParams,
    defaultValues: PD.getDefaultValues(CrossLinkColorThemeParams),
    isApplicable: (ctx: ThemeDataContext) => !!ctx.structure && CrossLinkRestraint.isApplicable(ctx.structure),
    ensureCustomProperties: {
        attach: (ctx: CustomProperty.Context, data: ThemeDataContext) => data.structure ? CrossLinkRestraintProvider.attach(ctx, data.structure, void 0, true) : Promise.resolve(),
        detach: (data) => data.structure && CrossLinkRestraintProvider.ref(data.structure, false)
    }
};