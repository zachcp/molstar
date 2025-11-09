/**
 * Copyright (c) 2019-2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import type { PdbFile } from './schema.ts';
import { Task } from '../../../mol-task/index.ts';
import { ReaderResult } from '../result.ts';
import { Tokenizer } from '../common/text/tokenizer.ts';
import type { StringLike } from '../../common/string-like.ts';

export function parsePDB(data: StringLike, id?: string, isPdbqt = false): Task<ReaderResult<PdbFile>> {
    return Task.create('Parse PDB', async (ctx) =>
        ReaderResult.success({
            lines: await Tokenizer.readAllLinesAsync(data, ctx),
            id,
            isPdbqt,
        }));
}
