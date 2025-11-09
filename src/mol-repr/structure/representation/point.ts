/**
 * Copyright (c) 2020-2024 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import {
  ElementPointParams,
  ElementPointVisual,
  type StructureElementPointParams,
  StructureElementPointVisual,
} from "../visual/element-point.ts";
import { UnitsRepresentation } from "../units-representation.ts";
import { ParamDefinition as PD } from "../../../mol-util/param-definition.ts";
import {
  ComplexRepresentation,
  type StructureRepresentation,
  StructureRepresentationProvider,
  StructureRepresentationStateBuilder,
} from "../representation.ts";
import {
  Representation,
  type RepresentationParamsGetter,
  type RepresentationContext,
} from "../../../mol-repr/representation.ts";
import type { ThemeRegistryContext } from "../../../mol-theme/theme.ts";
import type { Structure } from "../../../mol-model/structure.ts";
import { BaseGeometry } from "../../../mol-geo/geometry/base.ts";

const PointVisuals = {
  "element-point": (
    ctx: RepresentationContext,
    getParams: RepresentationParamsGetter<Structure, ElementPointParams>,
  ): StructureRepresentation<ElementPointParams> =>
    UnitsRepresentation("Element points", ctx, getParams, ElementPointVisual),
  "structure-element-point": (
    ctx: RepresentationContext,
    getParams: RepresentationParamsGetter<
      Structure,
      StructureElementPointParams
    >,
  ): StructureRepresentation<StructureElementPointParams> =>
    ComplexRepresentation(
      "Structure element points",
      ctx,
      getParams,
      StructureElementPointVisual,
    ),
};

export const PointParams = {
  ...ElementPointParams,
  density: PD.Numeric(
    0.1,
    { min: 0, max: 1, step: 0.01 },
    BaseGeometry.ShadingCategory,
  ),
  visuals: PD.MultiSelect(["element-point"], PD.objectToOptions(PointVisuals)),
};
export type PointParams = typeof PointParams;
export function getPointParams(
  ctx: ThemeRegistryContext,
  structure: Structure,
): typeof PointParams {
  let params = PointParams;
  if (structure.unitSymmetryGroups.length > 5000) {
    params = PD.clone(params);
    params.visuals.defaultValue = ["structure-element-point"];
  }
  return params;
}

export type PointRepresentation = StructureRepresentation<PointParams>;
export function PointRepresentation(
  ctx: RepresentationContext,
  getParams: RepresentationParamsGetter<Structure, PointParams>,
): PointRepresentation {
  return Representation.createMulti(
    "Point",
    ctx,
    getParams,
    StructureRepresentationStateBuilder,
    PointVisuals as unknown as Representation.Def<Structure, PointParams>,
  );
}

export const PointRepresentationProvider = StructureRepresentationProvider({
  name: "point",
  label: "Point",
  description: "Displays elements (atoms, coarse spheres) as points.",
  factory: PointRepresentation,
  getParams: getPointParams,
  defaultValues: PD.getDefaultValues(PointParams),
  defaultColorTheme: { name: "element-symbol" },
  defaultSizeTheme: { name: "uniform" },
  isApplicable: (structure: Structure) => structure.elementCount > 0,
});
