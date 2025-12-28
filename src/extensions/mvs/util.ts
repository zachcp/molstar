/**
 * Copyright (c) 2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import { OrderedSet } from '../../mol-data/int.ts';
import { Loci } from '../../mol-model/loci.ts';
import { ShapeGroup } from '../../mol-model/shape.ts';
import { PluginContext } from '../../mol-plugin/context.ts';
import { StateObjectSelector, StateTree } from '../../mol-state/index.ts';
import type { MVSPrimitiveShapeSourceData } from './components/primitives.ts';
import type { Snapshot } from './mvs-data.ts';
import type { MVSNode } from './tree/mvs/mvs-tree.ts';


/**
 * Queries all MolViewSpec references in the current state of the plugin.
 */
export function queryMVSRef(plugin: PluginContext, ref: string) {
    return plugin.state.data.selectQ(q => q.root.subtree().withTag(`mvs-ref:${ref}`));
}

/**
 * Creates a mapping of all MolViewSpec references in the current state of the plugin.
 */
export function createMVSRefMap(plugin: PluginContext) {
    const tree = plugin.state.data.tree;
    const mapping = new Map<string, StateObjectSelector[]>();
    StateTree.doPreOrder(tree, tree.root, { mapping, plugin }, (n, _, s) => {
        if (!n.tags) return;
        for (const tag of n.tags) {
            if (!tag.startsWith('mvs-ref:')) continue;
            const mvsRef = tag.substring(8);
            const selector = new StateObjectSelector(n.ref, s.plugin.state.data);
            if (s.mapping.has(mvsRef)) s.mapping.get(mvsRef)!.push(selector);
            else s.mapping.set(mvsRef, [selector]);
        }
    });

    return mapping;
}

export function tryGetPrimitivesFromLoci(loci: Loci | undefined): MVSNode<'primitive'>[] | undefined {
    if (!ShapeGroup.isLoci(loci)) return undefined;

    const srcData = loci.shape.sourceData as MVSPrimitiveShapeSourceData;
    if (srcData?.kind !== 'mvs-primitives') return undefined;

    const nodes: MVSNode<'primitive'>[] = [];
    for (const group of loci.groups) {
        OrderedSet.forEach(group.ids, id => {
            const node = srcData.groupToNode.get(id);
            if (node) nodes.push(node);
        });
    }
    return nodes.length > 0 ? nodes : undefined;
}

// Retrieves the MVS snapshot associated with the current snapshot of the plugin
// This will only work if the current state was created from an MVS snapshot
export function getCurrentMVSSnapshot(plugin: PluginContext): Snapshot | undefined {
    return plugin.managers.snapshot.current?._transientData?.sourceMvsSnapshot;
}