/**
 * Copyright (c) 2019 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import type { AttachModelProperties } from '../property-provider.ts';
import { wwPDB_chemCompAtom, wwPDB_chemCompBond } from './providers/wwpdb.ts';

export const attachModelProperties: AttachModelProperties = (args) => {
    // return a list of promises that start attaching the props in parallel
    // (if there are downloads etc.)
    return [
        wwPDB_chemCompBond(args),
        wwPDB_chemCompAtom(args),
    ];
};
