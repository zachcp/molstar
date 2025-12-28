/**
 * Copyright (c) 2017 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { Database } from './db/database.ts';
import { Table } from './db/table.ts';
import { Column } from './db/column.ts';
import * as ColumnHelpers from './db/column-helpers.ts';

export type DatabaseCollection<T extends Database.Schema> = { [name: string]: Database<T> };

export { Column, ColumnHelpers, Database, Table };
