/**
 * Copyright (c) 2020 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import type { Mat4, Tensor } from '../../../../mol-math/linear-algebra.ts';
import { FormatPropertyProvider } from '../../../../mol-model-formats/structure/common/property.ts';
import { CustomPropertyDescriptor } from '../../../custom-property.ts';
import type { CifExportContext } from '../../structure.ts';
import type { Model } from '../model.ts';
import { Column, Table } from '../../../../mol-data/db.ts';
import { CifWriter } from '../../../../mol-io/writer/cif.ts';
import { MmcifFormat } from '../../../../mol-model-formats/structure/mmcif.ts';
import { toTable } from '../../../../mol-io/reader/cif/schema.ts';

export namespace GlobalModelTransformInfo {
    const CategoryName = 'molstar_global_model_transform_info' as const;
    export const Schema = {
        [CategoryName]: {
            matrix: Column.Schema.Matrix(4, 4, Column.Schema.float)
        }
    };
    export type Schema = typeof Schema

    export const Descriptor = CustomPropertyDescriptor({
        name: CategoryName,
        cifExport: {
            categories: [{
                name: CategoryName,
                instance(ctx: CifExportContext) {
                    const mat = get(ctx.firstModel);
                    if (!mat) return CifWriter.Category.Empty;
                    const table = Table.ofRows(Schema.molstar_global_model_transform_info, [{ matrix: mat as unknown as Tensor.Data }]);
                    return CifWriter.Category.ofTable(table);
                }
            }],
            prefix: 'molstar'
        }
    });

    export const Provider = FormatPropertyProvider.create<Mat4>(Descriptor);

    export function attach(model: Model, matrix: Mat4) {
        if (!model.customProperties.has(Descriptor)) {
            model.customProperties.add(Descriptor);
        }
        Provider.set(model, matrix);
    }

    export function get(model: Model): Mat4 | undefined {
        return Provider.get(model);
    }

    export function fromMmCif(model: Model) {
        if (!MmcifFormat.is(model.sourceData)) return;

        const cat = model.sourceData.data.frame.categories[CategoryName];
        if (!cat) return;
        const table = toTable(Schema[CategoryName], cat);
        if (table._rowCount === 0) return;
        return table.matrix.value(0) as unknown as Mat4;
    }

    export function hasData(model: Model) {
        if (!MmcifFormat.is(model.sourceData)) return false;
        const cat = model.sourceData.data.frame.categories[CategoryName];
        return !!cat && cat.rowCount > 0;
    }

    export function writeMmCif(encoder: CifWriter.Encoder, matrix: Mat4) {
        encoder.writeCategory({
            name: CategoryName,
            instance() {
                const table = Table.ofRows(Schema.molstar_global_model_transform_info, [{ matrix: matrix as unknown as Tensor.Data }]);
                return CifWriter.Category.ofTable(table);
            }
        });
    }
}