/**
 * Copyright (c) 2018 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * Taken/adapted from DensityServer (https://github.com/dsehnal/DensityServer)
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import type * as DataFormat from '../../common/data-format.ts';
import type * as Coords from '../algebra/coordinate.ts';
import type * as Box from '../algebra/box.ts';
import type { Writer } from '../../../../mol-io/writer/writer.ts';
import type { SpacegroupCell } from '../../../../mol-math/geometry.ts';
import type { FileHandle } from '../../../../mol-io/common/file-handle.ts';
import type { TypedArrayValueArray } from '../../../../mol-io/common/typed-array.ts';

// DATA

export interface Sampling {
    index: number;
    rate: number;
    byteOffset: number;
    dataDomain: Coords.GridDomain<'Data'>;
    blockDomain: Coords.GridDomain<'Block'>;
}

export interface DataContext {
    file: FileHandle;
    header: DataFormat.Header;
    spacegroup: SpacegroupCell;
    dataBox: Box.Fractional;
    sampling: Sampling[];
}

export interface BlockData {
    sampleCount: number[];
    values: TypedArrayValueArray;
}

// QUERY

export type QueryOutputStream = Writer & { end: () => void };

export namespace QueryParamsBox {
    export type Cartesian = { kind: 'Cartesian'; a: Coords.Cartesian; b: Coords.Cartesian };
    export type Fractional = { kind: 'Fractional'; a: Coords.Fractional; b: Coords.Fractional };
    export type Cell = { kind: 'Cell' };
}
export type QueryParamsBox = QueryParamsBox.Cartesian | QueryParamsBox.Fractional | QueryParamsBox.Cell;

export interface QueryParams {
    sourceFilename: string;
    sourceId: string;
    asBinary: boolean;
    box: QueryParamsBox;
    detail: number;
    forcedSamplingLevel?: number;
}

export type QueryBlock = { coord: Coords.Grid<'Block'>; offsets: Coords.Fractional[] };

export interface QuerySamplingInfo {
    sampling: Sampling;
    fractionalBox: Box.Fractional;
    gridDomain: Coords.GridDomain<'Query'>;
    blocks: QueryBlock[];
}

export type QueryContext = QueryContext.Error | QueryContext.Empty | QueryContext.Data;

export namespace QueryContext {
    type Base = { guid: string; params: QueryParams };
    export type Error = { kind: 'Error'; message: string } & Base;
    export type Empty = { kind: 'Empty'; data: DataContext } & Base;
    export type Data = {
        kind: 'Data';
        data: DataContext;
        samplingInfo: QuerySamplingInfo;
        values: TypedArrayValueArray[];
    } & Base;
}
