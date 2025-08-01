/**
 * Copyright (c) 2018-2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { SizeType, LocationSize } from '../mol-geo/geometry/size-data.ts';
import { UniformSizeThemeProvider } from './size/uniform.ts';
import { ParamDefinition as PD } from '../mol-util/param-definition.ts';
import { ThemeDataContext, ThemeRegistry, ThemeProvider } from './theme.ts';
import { PhysicalSizeThemeProvider } from './size/physical.ts';
import { deepEqual } from '../mol-util/index.ts';
import { ShapeGroupSizeThemeProvider } from './size/shape-group.ts';
import { UncertaintySizeThemeProvider } from './size/uncertainty.ts';
import { VolumeValueSizeThemeProvider } from './size/volume-value.ts';

export { SizeTheme };
interface SizeTheme<P extends PD.Params> {
    readonly factory: SizeTheme.Factory<P>
    readonly granularity: SizeType
    readonly size: LocationSize
    readonly props: Readonly<PD.Values<P>>
    readonly contextHash?: number
    readonly description?: string
}
namespace SizeTheme {
    export type Props = { [k: string]: any }
    export type Factory<P extends PD.Params> = (ctx: ThemeDataContext, props: PD.Values<P>) => SizeTheme<P>
    export const EmptyFactory = () => Empty;
    export const Empty: SizeTheme<{}> = { factory: EmptyFactory, granularity: 'uniform', size: () => 1, props: {} };

    export function areEqual(themeA: SizeTheme<any>, themeB: SizeTheme<any>) {
        return themeA.contextHash === themeB.contextHash && themeA.factory === themeB.factory && deepEqual(themeA.props, themeB.props);
    }

    export interface Provider<P extends PD.Params = any, Id extends string = string> extends ThemeProvider<SizeTheme<P>, P, Id> { }
    export const EmptyProvider: Provider<{}> = { name: '', label: '', category: '', factory: EmptyFactory, getParams: () => ({}), defaultValues: {}, isApplicable: () => true };

    export type Registry = ThemeRegistry<SizeTheme<any>>
    export function createRegistry() {
        return new ThemeRegistry(BuiltIn as { [k: string]: Provider<any> }, EmptyProvider);
    }

    export const BuiltIn = {
        'physical': PhysicalSizeThemeProvider,
        'shape-group': ShapeGroupSizeThemeProvider,
        'uncertainty': UncertaintySizeThemeProvider,
        'uniform': UniformSizeThemeProvider,
        'volume-value': VolumeValueSizeThemeProvider,
    };
    type _BuiltIn = typeof BuiltIn
    export type BuiltIn = keyof _BuiltIn
    export type ParamValues<C extends SizeTheme.Provider<any>> = C extends SizeTheme.Provider<infer P> ? PD.Values<P> : never
    export type BuiltInParams<T extends BuiltIn> = Partial<ParamValues<_BuiltIn[T]>>
}