/**
 * Copyright (c) 2020 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import type { Column } from '../../../mol-data/db.ts';
import type { CustomPropertyDescriptor } from '../../../mol-model/custom-property.ts';
import { FormatPropertyProvider } from '../common/property.ts';

export { AtomPartialCharge };

interface AtomPartialCharge {
    data: Column<number>
    type?: string
}

namespace AtomPartialCharge {
    export const Descriptor: CustomPropertyDescriptor = {
        name: 'atom_partial_charge',
    };

    export const Provider = FormatPropertyProvider.create<AtomPartialCharge>(Descriptor);
}