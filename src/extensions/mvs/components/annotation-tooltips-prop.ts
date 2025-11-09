/**
 * Copyright (c) 2023 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Adam Midlik <midlik@gmail.com>
 */

import type { CustomProperty } from '../../../mol-model-props/common/custom-property.ts';
import { CustomStructureProperty } from '../../../mol-model-props/common/custom-structure-property.ts';
import { CustomPropertyDescriptor } from '../../../mol-model/custom-property.ts';
import type { Loci } from '../../../mol-model/loci.ts';
import { type Structure, StructureElement } from '../../../mol-model/structure.ts';
import type { LociLabelProvider } from '../../../mol-plugin-state/manager/loci-label.ts';
import { ParamDefinition as PD } from '../../../mol-util/param-definition.ts';
import { filterDefined } from '../helpers/utils.ts';
import { MVSAnnotationsProvider } from './annotation-prop.ts';


/** Parameter definition for custom structure property "MVSAnnotationTooltips" */
export const MVSAnnotationTooltipsParams = {
    tooltips: PD.ObjectList(
        {
            annotationId: PD.Text('', { description: 'Reference to "MVS Annotation" custom model property' }),
            fieldName: PD.Text('tooltip', { description: 'Annotation field (column) from which to take color values' }),
        },
        obj => `${obj.annotationId}:${obj.fieldName}`
    ),
};
export type MVSAnnotationTooltipsParams = typeof MVSAnnotationTooltipsParams

/** Values of custom structure property "MVSAnnotationTooltips" (and for its params at the same type) */
export type MVSAnnotationTooltipsProps = PD.Values<MVSAnnotationTooltipsParams>


/** Provider for custom structure property "MVSAnnotationTooltips" */
export const MVSAnnotationTooltipsProvider: CustomStructureProperty.Provider<MVSAnnotationTooltipsParams, MVSAnnotationTooltipsProps> = CustomStructureProperty.createProvider({
    label: 'MVS Annotation Tooltips',
    descriptor: CustomPropertyDescriptor<any, any>({
        name: 'mvs-annotation-tooltips',
    }),
    type: 'local',
    defaultParams: MVSAnnotationTooltipsParams,
    getParams: (data: Structure) => MVSAnnotationTooltipsParams,
    isApplicable: (data: Structure) => data.root === data,
    obtain: async (ctx: CustomProperty.Context, data: Structure, props: Partial<MVSAnnotationTooltipsProps>) => {
        const fullProps = { ...PD.getDefaultValues(MVSAnnotationTooltipsParams), ...props };
        return { value: fullProps } satisfies CustomProperty.Data<MVSAnnotationTooltipsProps>;
    },
});


/** Label provider based on data from "MVS Annotation" custom model property */
export const MVSAnnotationTooltipsLabelProvider = {
    label: (loci: Loci): string | undefined => {
        switch (loci.kind) {
            case 'element-loci':
                if (!loci.structure.customPropertyDescriptors.hasReference(MVSAnnotationTooltipsProvider.descriptor)) return undefined;
                const location = StructureElement.Loci.getFirstLocation(loci);
                if (!location) return undefined;
                const tooltipProps = MVSAnnotationTooltipsProvider.get(location.structure).value;
                if (!tooltipProps || tooltipProps.tooltips.length === 0) return undefined;
                const annotations = MVSAnnotationsProvider.get(location.unit.model).value;
                const texts = tooltipProps.tooltips.map(p => annotations?.getAnnotation(p.annotationId)?.getValueForLocation(location, p.fieldName));
                return filterDefined(texts).join(' | ');
            default:
                return undefined;
        }
    }
} satisfies LociLabelProvider;
