/**
 * Copyright (c) 2018-2024 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 * @author Gianluca Tomasello <giagitom@gmail.com>
 */

import { type Structure, Unit } from "../../../mol-model/structure.ts";
import {
  Representation,
  type RepresentationContext,
  type RepresentationParamsGetter,
} from "../../../mol-repr/representation.ts";
import type { ThemeRegistryContext } from "../../../mol-theme/theme.ts";
import { ParamDefinition as PD } from "../../../mol-util/param-definition.ts";
import {
  type StructureRepresentation,
  StructureRepresentationProvider,
  StructureRepresentationStateBuilder,
} from "../representation.ts";
import { UnitsRepresentation } from "../units-representation.ts";
import {
  NucleotideBlockParams,
  NucleotideBlockVisual,
} from "../visual/nucleotide-block-mesh.ts";
import {
  NucleotideRingParams,
  NucleotideRingVisual,
} from "../visual/nucleotide-ring-mesh.ts";
import {
  NucleotideAtomicRingFillParams,
  NucleotideAtomicRingFillVisual,
} from "../visual/nucleotide-atomic-ring-fill.ts";
import {
  NucleotideAtomicBondParams,
  NucleotideAtomicBondVisual,
} from "../visual/nucleotide-atomic-bond.ts";
import {
  NucleotideAtomicElementParams,
  NucleotideAtomicElementVisual,
} from "../visual/nucleotide-atomic-element.ts";
import {
  PolymerDirectionParams,
  PolymerDirectionVisual,
} from "../visual/polymer-direction-wedge.ts";
import {
  PolymerGapParams,
  PolymerGapVisual,
} from "../visual/polymer-gap-cylinder.ts";
import {
  PolymerTraceParams,
  PolymerTraceVisual,
} from "../visual/polymer-trace-mesh.ts";
import { SecondaryStructureProvider } from "../../../mol-model-props/computed/secondary-structure.ts";
import type { CustomProperty } from "../../../mol-model-props/common/custom-property.ts";
import { HelixOrientationProvider } from "../../../mol-model-props/computed/helix-orientation.ts";
import { BaseGeometry } from "../../../mol-geo/geometry/base.ts";

const CartoonVisuals = {
  "polymer-trace": (
    ctx: RepresentationContext,
    getParams: RepresentationParamsGetter<Structure, PolymerTraceParams>,
  ): StructureRepresentation<PolymerTraceParams> =>
    UnitsRepresentation(
      "Polymer trace mesh",
      ctx,
      getParams,
      PolymerTraceVisual,
    ),
  "polymer-gap": (
    ctx: RepresentationContext,
    getParams: RepresentationParamsGetter<Structure, PolymerGapParams>,
  ): StructureRepresentation<PolymerGapParams> =>
    UnitsRepresentation(
      "Polymer gap cylinder",
      ctx,
      getParams,
      PolymerGapVisual,
    ),
  "nucleotide-block": (
    ctx: RepresentationContext,
    getParams: RepresentationParamsGetter<Structure, NucleotideBlockParams>,
  ): StructureRepresentation<NucleotideBlockParams> =>
    UnitsRepresentation(
      "Nucleotide block mesh",
      ctx,
      getParams,
      NucleotideBlockVisual,
    ),
  "nucleotide-ring": (
    ctx: RepresentationContext,
    getParams: RepresentationParamsGetter<Structure, NucleotideRingParams>,
  ): StructureRepresentation<NucleotideRingParams> =>
    UnitsRepresentation(
      "Nucleotide ring mesh",
      ctx,
      getParams,
      NucleotideRingVisual,
    ),
  "nucleotide-atomic-ring-fill": (
    ctx: RepresentationContext,
    getParams: RepresentationParamsGetter<
      Structure,
      NucleotideAtomicRingFillParams
    >,
  ): StructureRepresentation<NucleotideAtomicRingFillParams> =>
    UnitsRepresentation(
      "Nucleotide atomic ring fill",
      ctx,
      getParams,
      NucleotideAtomicRingFillVisual,
    ),
  "nucleotide-atomic-bond": (
    ctx: RepresentationContext,
    getParams: RepresentationParamsGetter<
      Structure,
      NucleotideAtomicBondParams
    >,
  ): StructureRepresentation<NucleotideAtomicBondParams> =>
    UnitsRepresentation(
      "Nucleotide atomic bond",
      ctx,
      getParams,
      NucleotideAtomicBondVisual,
    ),
  "nucleotide-atomic-element": (
    ctx: RepresentationContext,
    getParams: RepresentationParamsGetter<
      Structure,
      NucleotideAtomicElementParams
    >,
  ): StructureRepresentation<NucleotideAtomicElementParams> =>
    UnitsRepresentation(
      "Nucleotide atomic element",
      ctx,
      getParams,
      NucleotideAtomicElementVisual,
    ),
  "direction-wedge": (
    ctx: RepresentationContext,
    getParams: RepresentationParamsGetter<Structure, PolymerDirectionParams>,
  ): StructureRepresentation<PolymerDirectionParams> =>
    UnitsRepresentation(
      "Polymer direction wedge",
      ctx,
      getParams,
      PolymerDirectionVisual,
    ),
};

export const CartoonParams = {
  ...PolymerTraceParams,
  ...PolymerGapParams,
  ...NucleotideBlockParams,
  ...NucleotideRingParams,
  ...NucleotideAtomicBondParams,
  ...NucleotideAtomicElementParams,
  ...NucleotideAtomicRingFillParams,
  ...PolymerDirectionParams,
  sizeFactor: PD.Numeric(0.2, { min: 0, max: 10, step: 0.01 }),
  visuals: PD.MultiSelect(
    [
      "polymer-trace",
      "polymer-gap",
      "nucleotide-ring",
      "nucleotide-atomic-ring-fill",
      "nucleotide-atomic-bond",
      "nucleotide-atomic-element",
    ],
    PD.objectToOptions(CartoonVisuals),
  ),
  bumpFrequency: PD.Numeric(
    2,
    { min: 0, max: 10, step: 0.1 },
    BaseGeometry.ShadingCategory,
  ),
  density: PD.Numeric(
    0.1,
    { min: 0, max: 1, step: 0.01 },
    BaseGeometry.ShadingCategory,
  ),
  colorMode: PD.Select(
    "default",
    PD.arrayToOptions(["default", "interpolate"] as const),
    { ...BaseGeometry.ShadingCategory, isHidden: true },
  ),
};

export type CartoonParams = typeof CartoonParams;
export function getCartoonParams(
  ctx: ThemeRegistryContext,
  structure: Structure,
): typeof CartoonParams {
  const params = PD.clone(CartoonParams);
  let hasNucleotides = false;
  let hasGaps = false;
  structure.units.forEach((u) => {
    if (!hasNucleotides && Unit.isAtomic(u) && u.nucleotideElements.length)
      hasNucleotides = true;
    if (!hasGaps && u.gapElements.length) hasGaps = true;
  });
  params.visuals.defaultValue = ["polymer-trace"];
  if (hasNucleotides) params.visuals.defaultValue.push("nucleotide-ring");
  if (hasGaps) params.visuals.defaultValue.push("polymer-gap");
  return params;
}

export type CartoonRepresentation = StructureRepresentation<CartoonParams>;
export function CartoonRepresentation(
  ctx: RepresentationContext,
  getParams: RepresentationParamsGetter<Structure, CartoonParams>,
): CartoonRepresentation {
  return Representation.createMulti(
    "Cartoon",
    ctx,
    getParams,
    StructureRepresentationStateBuilder,
    CartoonVisuals as unknown as Representation.Def<Structure, CartoonParams>,
  );
}

export const CartoonRepresentationProvider = StructureRepresentationProvider({
  name: "cartoon",
  label: "Cartoon",
  description:
    "Displays ribbons, planks, tubes smoothly following the trace atoms of polymers.",
  factory: CartoonRepresentation,
  getParams: getCartoonParams,
  defaultValues: PD.getDefaultValues(CartoonParams),
  defaultColorTheme: { name: "chain-id" },
  defaultSizeTheme: { name: "uniform" },
  isApplicable: (structure: Structure) => structure.polymerResidueCount > 0,
  ensureCustomProperties: {
    attach: async (ctx: CustomProperty.Context, structure: Structure) => {
      await SecondaryStructureProvider.attach(ctx, structure, void 0, true);
      for (const m of structure.models) {
        await HelixOrientationProvider.attach(ctx, m, void 0, true);
      }
    },
    detach: (data) => {
      SecondaryStructureProvider.ref(data, false);
      for (const m of data.models) {
        HelixOrientationProvider.ref(m, false);
      }
    },
  },
});
