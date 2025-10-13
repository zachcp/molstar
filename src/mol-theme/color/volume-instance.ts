/**
 * Copyright (c) 2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { Color } from '../../mol-util/color.ts';
import type { Location } from '../../mol-model/location.ts';
import type { ColorTheme, LocationColor } from '../color.ts';
import { ParamDefinition as PD } from '../../mol-util/param-definition.ts';
import type { ThemeDataContext } from '../../mol-theme/theme.ts';
import { getPaletteParams, getPalette } from '../../mol-util/color/palette.ts';
import type { TableLegend, ScaleLegend } from '../../mol-util/legend.ts';
import { ColorLists, getColorListFromName } from '../../mol-util/color/lists.ts';
import { ColorThemeCategory } from './categories.ts';
import { Volume } from '../../mol-model/volume/volume.ts';

const DefaultList = 'dark-2';
const DefaultColor = Color(0xCCCCCC);
const Description = 'Gives every volume instance a unique color based on the position (index) of the instance in the list of instances of the volume.';

export const VolumeInstanceColorThemeParams = {
    ...getPaletteParams({ type: 'colors', colorList: DefaultList }),
};
export type VolumeInstanceColorThemeParams = typeof VolumeInstanceColorThemeParams
export function getVolumeInstanceColorThemeParams(ctx: ThemeDataContext) {
    const params = PD.clone(VolumeInstanceColorThemeParams);
    if (ctx.volume) {
        if (ctx.volume.instances.length > ColorLists[DefaultList].list.length) {
            params.palette.defaultValue.name = 'colors';
            params.palette.defaultValue.params = {
                ...params.palette.defaultValue.params,
                list: { kind: 'interpolate', colors: getColorListFromName(DefaultList).list }
            };
        }
    }
    return params;
}

export function VolumeInstanceColorTheme(ctx: ThemeDataContext, props: PD.Values<VolumeInstanceColorThemeParams>): ColorTheme<VolumeInstanceColorThemeParams> {
    let color: LocationColor;
    let legend: ScaleLegend | TableLegend | undefined;

    if (ctx.volume) {
        const palette = getPalette(ctx.volume.instances.length, props);
        legend = palette.legend;

        const isLocation = Volume.Cell.isLocation;
        color = (location: Location): Color => {
            if (isLocation(location)) {
                return palette.color(location.instance);
            }
            return DefaultColor;
        };
    } else {
        color = () => DefaultColor;
    }

    return {
        factory: VolumeInstanceColorTheme,
        granularity: 'instance',
        color,
        props,
        description: Description,
        legend
    };
}

export const VolumeInstanceColorThemeProvider: ColorTheme.Provider<VolumeInstanceColorThemeParams, 'volume-instance'> = {
    name: 'volume-instance',
    label: 'Volume Instance',
    category: ColorThemeCategory.Misc,
    factory: VolumeInstanceColorTheme,
    getParams: getVolumeInstanceColorThemeParams,
    defaultValues: PD.getDefaultValues(VolumeInstanceColorThemeParams),
    isApplicable: (ctx: ThemeDataContext) => !!ctx.volume
};