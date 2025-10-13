#!/usr/bin/env node
/**
 * Copyright (c) 2018 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import cluster from 'node:cluster';
import { runChild } from './preprocess/parallel.ts';

if (cluster.isPrimary) {
    require('./preprocess/master');
} else {
    runChild();
}

// example:
// node build\node_modules\servers\model\preprocess -i e:\test\Quick\1cbs_updated.cif -oc e:\test\mol-star\model\1cbs.cif -ob e:\test\mol-star\model\1cbs.bcif