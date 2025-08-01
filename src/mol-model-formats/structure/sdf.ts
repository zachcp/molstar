/**
 * Copyright (c) 2021 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import { SdfFileCompound } from '../../mol-io/reader/sdf/parser.ts';
import { Trajectory } from '../../mol-model/structure.ts';
import { Task } from '../../mol-task/index.ts';
import { ModelFormat } from '../format.ts';
import { getMolModels } from './mol.ts';

export { SdfFormat };

type SdfFormat = ModelFormat<SdfFileCompound>;

namespace SdfFormat {
    export function is(x?: ModelFormat): x is SdfFormat {
        return x?.kind === 'sdf';
    }

    export function create(mol: SdfFileCompound): SdfFormat {
        return { kind: 'sdf', name: mol.molFile.title, data: mol };
    }
}

export function trajectoryFromSdf(mol: SdfFileCompound): Task<Trajectory> {
    return Task.create('Parse SDF', (ctx) => getMolModels(mol.molFile, SdfFormat.create(mol), ctx));
}
