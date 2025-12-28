/**
 * Copyright (c) 2017-2024 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import type { Structure, StructureElement } from '../structure.ts';
import { StructureSelection } from './selection.ts';
import { QueryContext, type QueryContextOptions, type QueryFn } from './context.ts';

interface StructureQuery extends QueryFn<StructureSelection> {}
namespace StructureQuery {
    export function run(
        query: StructureQuery,
        structure: Structure,
        options?: QueryContextOptions,
    ): StructureSelection {
        return query(new QueryContext(structure, options));
    }

    export function loci(
        query: StructureQuery,
        structure: Structure,
        options?: QueryContextOptions,
    ): StructureElement.Loci {
        const sel = query(new QueryContext(structure, options));
        return StructureSelection.toLociWithSourceUnits(sel);
    }
}

export { StructureQuery };
