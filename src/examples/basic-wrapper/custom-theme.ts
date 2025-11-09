import { isPositionLocation } from '../../mol-geo/util/location-iterator.ts';
import { Vec3 } from '../../mol-math/linear-algebra.ts';
import { ColorTheme } from '../../mol-theme/color.ts';
import { ColorThemeCategory } from '../../mol-theme/color/categories.ts';
import type { ThemeDataContext } from '../../mol-theme/theme.ts';
import type { Color } from '../../mol-util/color/index.ts';
import { ColorNames } from '../../mol-util/color/names.ts';
import type { ParamDefinition as PD } from '../../mol-util/param-definition.ts';

export function CustomColorTheme(
    ctx: ThemeDataContext,
    props: PD.Values<{}>
): ColorTheme<{}> {
    const { radius, center } = ctx.structure?.boundary.sphere!;
    const radiusSq = Math.max(radius * radius, 0.001);
    const scale = ColorTheme.PaletteScale;

    return {
        factory: CustomColorTheme,
        granularity: 'vertex',
        color: location => {
            if (!isPositionLocation(location)) return ColorNames.black;
            const dist = Vec3.squaredDistance(location.position, center);
            const t = Math.min(dist / radiusSq, 1);
            return ((t * scale) | 0) as Color;
        },
        palette: {
            filter: 'nearest',
            colors: [
                ColorNames.red,
                ColorNames.pink,
                ColorNames.violet,
                ColorNames.orange,
                ColorNames.yellow,
                ColorNames.green,
                ColorNames.blue
            ]
        },
        props: props,
        description: '',
    };
}

export const CustomColorThemeProvider: ColorTheme.Provider<{}, 'basic-wrapper-custom-color-theme'> = {
    name: 'basic-wrapper-custom-color-theme',
    label: 'Custom Color Theme',
    category: ColorThemeCategory.Misc,
    factory: CustomColorTheme,
    getParams: () => ({}),
    defaultValues: { },
    isApplicable: (ctx: ThemeDataContext) => true,
};
