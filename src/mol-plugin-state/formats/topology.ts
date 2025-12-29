/**
 * Copyright (c) 2018-2022 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { StateTransforms } from '../transforms.ts';
import { DataFormatProvider } from './provider.ts';

export const TopologyFormatCategory = 'Topology';

const _PsfProvider = DataFormatProvider({
    label: 'PSF',
    description: 'PSF',
    category: TopologyFormatCategory,
    stringExtensions: ['psf'],
    parse: async (plugin, data) => {
        const format = plugin.state.data.build()
            .to(data)
            .apply(StateTransforms.Data.ParsePsf, {}, { state: { isGhost: true } });
        const topology = format.apply(StateTransforms.Model.TopologyFromPsf);

        await format.commit();

        return { format: format.selector, topology: topology.selector };
    },
});
export type PsfProvider = typeof _PsfProvider;
export const PsfProvider: PsfProvider = _PsfProvider;

const _PrmtopProvider = DataFormatProvider({
    label: 'PRMTOP',
    description: 'PRMTOP',
    category: TopologyFormatCategory,
    stringExtensions: ['prmtop', 'parm7'],
    parse: async (plugin, data) => {
        const format = plugin.state.data.build()
            .to(data)
            .apply(StateTransforms.Data.ParsePrmtop, {}, { state: { isGhost: true } });
        const topology = format.apply(StateTransforms.Model.TopologyFromPrmtop);

        await format.commit();

        return { format: format.selector, topology: topology.selector };
    },
});
export type PrmtopProvider = typeof _PrmtopProvider;
export const PrmtopProvider: PrmtopProvider = _PrmtopProvider;

const _TopProvider = DataFormatProvider({
    label: 'TOP',
    description: 'TOP',
    category: TopologyFormatCategory,
    stringExtensions: ['top'],
    parse: async (plugin, data) => {
        const format = plugin.state.data.build()
            .to(data)
            .apply(StateTransforms.Data.ParseTop, {}, { state: { isGhost: true } });
        const topology = format.apply(StateTransforms.Model.TopologyFromTop);

        await format.commit();

        return { format: format.selector, topology: topology.selector };
    },
});
export type TopProvider = typeof _TopProvider;
export const TopProvider: TopProvider = _TopProvider;

export type TopologyProvider = PsfProvider;

export const BuiltInTopologyFormats = [
    ['psf', PsfProvider] as const,
    ['prmtop', PrmtopProvider] as const,
    ['top', TopProvider] as const,
] as const;

export type BuiltInTopologyFormat = (typeof BuiltInTopologyFormats)[number][0];
