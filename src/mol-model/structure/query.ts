/**
 * Copyright (c) 2017 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import { StructureSelection } from './query/selection.ts';
import { StructureQuery } from './query/query.ts';
export * from './query/context.ts';
import * as generators from './query/queries/generators.ts';
import * as modifiers from './query/queries/modifiers.ts';
import * as filters from './query/queries/filters.ts';
import * as combinators from './query/queries/combinators.ts';
import * as internal from './query/queries/internal.ts';
import * as atomset from './query/queries/atom-set.ts';
import { Predicates as pred } from './query/predicates.ts';

export const Queries = {
    generators,
    filters,
    modifiers,
    combinators,
    pred,
    internal,
    atomset
};

export { StructureSelection, StructureQuery };
