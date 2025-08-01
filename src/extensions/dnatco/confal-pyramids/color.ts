/**
 * Copyright (c) 2018-2020 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Michal Malý <michal.maly@ibt.cas.cz>
 * @author Jiří Černý <jiri.cerny@ibt.cas.cz>
 */

import { ErrorColor, NtCColors } from '../color.ts';
import { ConfalPyramidsProvider } from './property.ts';
import { ConfalPyramidsTypes as CPT } from './types.ts';
import { Dnatco } from '../property.ts';
import { Location } from '../../../mol-model/location.ts';
import { CustomProperty } from '../../../mol-model-props/common/custom-property.ts';
import { ColorTheme } from '../../../mol-theme/color.ts';
import { ThemeDataContext } from '../../../mol-theme/theme.ts';
import { Color, ColorMap } from '../../../mol-util/color/index.ts';
import { getColorMapParams } from '../../../mol-util/color/params.ts';
import { ParamDefinition as PD } from '../../../mol-util/param-definition.ts';
import { TableLegend } from '../../../mol-util/legend.ts';
import { ObjectKeys } from '../../../mol-util/type-helpers.ts';
import { ColorThemeCategory } from '../../../mol-theme/color/categories.ts';

const Description = 'Assigns colors to confal pyramids';

const PyramidsColors = ColorMap({ ...NtCColors });
type PyramidsColors = typeof PyramidsColors;

export const ConfalPyramidsColorThemeParams = {
    colors: PD.MappedStatic('default', {
        'default': PD.EmptyGroup(),
        'custom': PD.Group(getColorMapParams(PyramidsColors)),
    }),
};
export type ConfalPyramidsColorThemeParams = typeof ConfalPyramidsColorThemeParams;

export function getConfalPyramidsColorThemeParams(ctx: ThemeDataContext) {
    return PD.clone(ConfalPyramidsColorThemeParams);
}

export function ConfalPyramidsColorTheme(
    ctx: ThemeDataContext,
    props: PD.Values<ConfalPyramidsColorThemeParams>,
): ColorTheme<ConfalPyramidsColorThemeParams> {
    const colorMap = props.colors.name === 'default' ? PyramidsColors : props.colors.params;

    function color(location: Location, isSecondary: boolean): Color {
        if (CPT.isLocation(location)) {
            const { step, isLower } = location.data;
            const key = step.NtC + `_${isLower ? 'Lwr' : 'Upr'}` as keyof PyramidsColors;
            return colorMap[key] ?? ErrorColor;
        }

        return ErrorColor;
    }

    return {
        factory: ConfalPyramidsColorTheme,
        granularity: 'group',
        color,
        props,
        description: Description,
        legend: TableLegend(
            ObjectKeys(colorMap).map((k) => [k.replace('_', ' '), colorMap[k]] as [string, Color])
                .concat([['Error', ErrorColor]]),
        ),
    };
}

export const ConfalPyramidsColorThemeProvider: ColorTheme.Provider<
    ConfalPyramidsColorThemeParams,
    'confal-pyramids'
> = {
    name: 'confal-pyramids',
    label: 'Confal Pyramids',
    category: ColorThemeCategory.Residue,
    factory: ConfalPyramidsColorTheme,
    getParams: getConfalPyramidsColorThemeParams,
    defaultValues: PD.getDefaultValues(ConfalPyramidsColorThemeParams),
    isApplicable: (ctx: ThemeDataContext) =>
        !!ctx.structure && ctx.structure.models.some((m) => Dnatco.isApplicable(m)),
    ensureCustomProperties: {
        attach: (ctx: CustomProperty.Context, data: ThemeDataContext) =>
            data.structure
                ? ConfalPyramidsProvider.attach(ctx, data.structure.models[0], void 0, true)
                : Promise.resolve(),
        detach: (data) =>
            data.structure && ConfalPyramidsProvider.ref(data.structure.models[0], false),
    },
};
