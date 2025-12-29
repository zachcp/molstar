/**
 * Copyright (c) 2024 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Dušan Veľký <dvelky@mail.muni.cz>
 */

import { PluginStateObject } from '../../../mol-plugin-state/objects.ts';
import { StateTransformer } from '../../../mol-state/index.ts';
import { type Tunnel, TunnelShapeParams, TunnelsStateObject, TunnelStateObject } from './data-model.ts';
import { ParamDefinition as PD } from '../../../mol-util/param-definition.ts';
import { Mesh } from '../../../mol-geo/geometry/mesh/mesh.ts';
import { Task } from '../../../mol-task/index.ts';
import { createSpheresShape, createTunnelShape } from './algorithm.ts';

const Transform: StateTransformer.Builder.Root = StateTransformer.builderFactory('sb-ncbr-tunnels');

type TunnelsFromRawDataTransformer = StateTransformer<PluginStateObject.Root, TunnelsStateObject, { data: Tunnel[] }>;
type SelectTunnelTransformer = StateTransformer<TunnelsStateObject, TunnelStateObject, { index: number }>;
type TunnelFromRawDataTransformer = StateTransformer<PluginStateObject.Root, TunnelStateObject, { data: Tunnel }>;
type TunnelShapeProviderTransformer = StateTransformer<TunnelStateObject, PluginStateObject.Shape.Provider, PD.Values<typeof TunnelShapeParams>>;

export const TunnelsFromRawData: TunnelsFromRawDataTransformer = Transform({
    name: 'sb-ncbr-tunnels-from-data',
    display: { name: 'Tunnels' },
    from: PluginStateObject.Root,
    to: TunnelsStateObject,
    params: {
        data: PD.Value<Tunnel[]>([]),
    },
})({
    apply({ params }): TunnelsStateObject {
        return new TunnelsStateObject({ tunnels: params.data });
    },
});

export const SelectTunnel: SelectTunnelTransformer = Transform({
    name: 'sb-ncbr-tunnel-from-tunnels',
    display: { name: 'Tunnel Selection' },
    from: TunnelsStateObject,
    to: TunnelStateObject,
    params: (a): { index: PD.Numeric } => {
        return {
            index: PD.Numeric(0, { min: 0, max: a!.data.tunnels.length - 1, step: 1 }),
        };
    },
})({
    apply({ a, params }): TunnelStateObject {
        return new TunnelStateObject({ tunnel: a.data.tunnels[params.index] });
    },
});

export const TunnelFromRawData: TunnelFromRawDataTransformer = Transform({
    name: 'sb-ncbr-tunnel-from-data',
    display: { name: 'Tunnel Entry' },
    from: PluginStateObject.Root,
    to: TunnelStateObject,
    params: {
        data: PD.Value<Tunnel>(undefined as any, { isHidden: true }),
    },
})({
    apply({ params }): TunnelStateObject {
        return new TunnelStateObject({ tunnel: params.data });
    },
});

const _TunnelShapeProvider: TunnelShapeProviderTransformer = Transform({
    name: 'sb-ncbr-tunnel-shape-provider',
    display: { name: 'Tunnel' },
    from: TunnelStateObject,
    to: PluginStateObject.Shape.Provider,
    params: (_a): typeof TunnelShapeParams => {
        return TunnelShapeParams;
    },
})({
    apply({ a, params }): Task<PluginStateObject.Shape.Provider> {
        return Task.create('Tunnel Shape Representation', async (ctx): Promise<PluginStateObject.Shape.Provider> => {
            return new PluginStateObject.Shape.Provider({
                label: 'Surface',
                data: { params, data: a.data },
                params: Mesh.Params,
                geometryUtils: Mesh.Utils,
                getShape: (_, data, __, mesh) => {
                    if (data.params.visual.name === 'mesh' && !data.params.showRadii) {
                        return createTunnelShape({
                            tunnel: data.data.tunnel,
                            color: data.params.colorTheme,
                            resolution: data.params.visual.params.resolution,
                            sampleRate: data.params.samplingRate,
                            webgl: data.params.webgl,
                            prev: mesh,
                        });
                    }
                    return createSpheresShape({
                        tunnel: data.data.tunnel,
                        color: data.params.colorTheme,
                        resolution: data.params.visual.params.resolution,
                        sampleRate: data.params.samplingRate,
                        showRadii: data.params.showRadii,
                        prev: mesh,
                    });
                },
            }, {
                label: a.data.tunnel.props.label ?? 'Tunnel',
                description: a.data.tunnel.props.description ??
                        (a.data.tunnel.props.type && a.data.tunnel.props.id)
                    ? `${a.data.tunnel.props.type} ${a.data.tunnel.props.id}`
                    : '',
            });
        });
    },
});
export const TunnelShapeProvider: typeof _TunnelShapeProvider = _TunnelShapeProvider;
