/**
 * Copyright (c) 2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { Vec4 } from "../../mol-math/linear-algebra/3d/vec4.ts";
import { Color } from "../../mol-util/color/color.ts";
import { Material } from "../../mol-util/material.ts";
import { ParamDefinition as PD } from "../../mol-util/param-definition.ts";

interface InteriorParams {
  color: Color,
  colorStrength: number,
  substance: Material,
  substanceStrength: number,
}

export function getInteriorParam(): PD.Group<PD.Normalize<InteriorParams>> {
  return PD.Group({
    color: PD.Color(Color.fromRgb(76, 76, 76)),
    colorStrength: PD.Numeric(1, { min: 0, max: 1, step: 0.01 }),
    substance: Material.getParam(),
    substanceStrength: PD.Numeric(1, { min: 0, max: 1, step: 0.01 }),
  });
}
export type InteriorProp = ReturnType<typeof getInteriorParam>["defaultValue"];

export function areInteriorPropsEquals(
  a: InteriorProp,
  b: InteriorProp,
): boolean {
  return (
    a.color === b.color &&
    a.colorStrength === b.colorStrength &&
    Material.areEqual(a.substance, b.substance) &&
    a.substanceStrength === b.substanceStrength
  );
}

export function getInteriorColor(props: InteriorProp, out: Vec4): Vec4 {
  Color.toArrayNormalized(props.color, out, 0);
  out[3] = props.colorStrength;
  return out;
}

export function getInteriorSubstance(props: InteriorProp, out: Vec4): Vec4 {
  Material.toArrayNormalized(props.substance, out, 0);
  out[3] = props.substanceStrength;
  return out;
}
