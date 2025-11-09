/**
 * Copyright (c) 2021 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import type { ParamDefinition as PD } from '../../mol-util/param-definition.ts';
import type { Model } from '../../mol-model/structure.ts';
import { CustomPropertyDescriptor } from '../../mol-model/custom-property.ts';
import { CustomModelProperty } from '../common/custom-model-property.ts';
import { calcHelixOrientation, type HelixOrientation } from './helix-orientation/helix-orientation.ts';

export const HelixOrientationParams = {};
export type HelixOrientationParams = typeof HelixOrientationParams;
export type HelixOrientationProps = PD.Values<HelixOrientationParams>;

export type HelixOrientationValue = HelixOrientation;

export const HelixOrientationProvider: CustomModelProperty.Provider<HelixOrientationParams, HelixOrientationValue> =
    CustomModelProperty.createProvider({
        label: 'Helix Orientation',
        descriptor: CustomPropertyDescriptor({
            name: 'molstar_helix_orientation',
        }),
        type: 'dynamic',
        defaultParams: {},
        getParams: () => ({}),
        isApplicable: (data: Model) => true,
        obtain: async (ctx, data) => {
            return { value: calcHelixOrientation(data) };
        },
    });
