/**
 * Copyright (c) 2021 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Sukolsak Sakshuwong <sukolsak@stanford.edu>
 */

import { Box3D } from '../../mol-math/geometry.ts';
import { PluginComponent } from '../../mol-plugin-state/component.ts';
import type { PluginContext } from '../../mol-plugin/context.ts';
import { Task } from '../../mol-task/index.ts';
import { PluginStateObject } from '../../mol-plugin-state/objects.ts';
import { StateSelection } from '../../mol-state/index.ts';
import { ParamDefinition as PD } from '../../mol-util/param-definition.ts';
import { SetUtils } from '../../mol-util/set.ts';
import { GlbExporter } from './glb-exporter.ts';
import { ObjExporter } from './obj-exporter.ts';
import { StlExporter } from './stl-exporter.ts';
import { UsdzExporter } from './usdz-exporter.ts';

export const GeometryParams = {
    format: PD.Select('glb', [
        ['glb', 'glTF 2.0 Binary (.glb)'],
        ['stl', 'Stl (.stl)'],
        ['obj', 'Wavefront (.obj)'],
        ['usdz', 'Universal Scene Description (.usdz)'],
    ]),
};

export class GeometryControls extends PluginComponent {
    readonly behaviors = {
        params: this.ev.behavior<PD.Values<typeof GeometryParams>>(PD.getDefaultValues(GeometryParams)),
    };

    private getFilename() {
        const models = this.plugin.state.data.select(
            StateSelection.Generators.rootsOfType(PluginStateObject.Molecule.Model),
        ).map((s) => s.obj!.data);
        const uniqueIds = new Set<string>();
        models.forEach((m) => uniqueIds.add(m.entryId.toUpperCase()));
        const idString = SetUtils.toArray(uniqueIds).join('-');
        return `${idString || 'molstar-model'}`;
    }

    exportGeometry() {
        const task = Task.create('Export Geometry', async (ctx) => {
            try {
                const renderObjects = this.plugin.canvas3d?.getRenderObjects()!;
                const filename = this.getFilename();

                const boundingSphere = this.plugin.canvas3d?.boundingSphereVisible!;
                const boundingBox = Box3D.fromSphere3D(Box3D(), boundingSphere);
                let renderObjectExporter: GlbExporter | ObjExporter | StlExporter | UsdzExporter;
                switch (this.behaviors.params.value.format) {
                    case 'glb':
                        renderObjectExporter = new GlbExporter(boundingBox);
                        break;
                    case 'obj':
                        renderObjectExporter = new ObjExporter(filename, boundingBox);
                        break;
                    case 'stl':
                        renderObjectExporter = new StlExporter(boundingBox);
                        break;
                    case 'usdz':
                        renderObjectExporter = new UsdzExporter(boundingBox, boundingSphere.radius);
                        break;
                    default:
                        throw new Error('Unsupported format.');
                }

                for (let i = 0, il = renderObjects.length; i < il; ++i) {
                    await ctx.update({ message: `Exporting object ${i}/${il}` });
                    await renderObjectExporter.add(renderObjects[i], this.plugin.canvas3d?.webgl!, ctx);
                }

                const blob = await renderObjectExporter.getBlob(ctx);
                return {
                    blob,
                    filename: filename + '.' + renderObjectExporter.fileExtension,
                };
            } catch (e) {
                this.plugin.log.error('Error during geometry export');
                throw e;
            }
        });

        return this.plugin.runTask(task, { useOverlay: true });
    }

    constructor(private plugin: PluginContext) {
        super();
    }
}
