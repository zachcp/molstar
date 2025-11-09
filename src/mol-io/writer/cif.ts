/**
 * Copyright (c) 2017 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { TextEncoder } from "./cif/encoder/text.ts";
import {
  BinaryEncoder,
  type BinaryEncodingProvider,
} from "./cif/encoder/binary.ts";
import * as _Encoder from "./cif/encoder.ts";
import { ArrayEncoder, ArrayEncoding } from "../common/binary-cif.ts";
import type { CifFrame } from "../reader/cif.ts";

export namespace CifWriter {
  export import Encoder = _Encoder.Encoder;
  export import Category = _Encoder.Category;
  export import Field = _Encoder.Field;
  export type Encoding = typeof ArrayEncoding;

  export interface EncoderParams {
    binary?: boolean;
    encoderName?: string;
    binaryEncodingPovider?: BinaryEncodingProvider;
    binaryAutoClassifyEncoding?: boolean;
  }

  export function createEncoder(params?: EncoderParams): Encoder {
    const { binary = false, encoderName = "mol*" } = params || {};
    return binary
      ? new BinaryEncoder(
          encoderName,
          params ? params.binaryEncodingPovider : void 0,
          params ? !!params.binaryAutoClassifyEncoding : false,
        )
      : new TextEncoder();
  }

  export function fields<K = number, D = any, N extends string = string>() {
    return Field.build<K, D, N>();
  }

  export const Encodings = {
    deltaRLE: ArrayEncoding.by(ArrayEncoding.delta)
      .and(ArrayEncoding.runLength)
      .and(ArrayEncoding.integerPacking),
    fixedPoint2: ArrayEncoding.by(ArrayEncoding.fixedPoint(100))
      .and(ArrayEncoding.delta)
      .and(ArrayEncoding.integerPacking),
    fixedPoint3: ArrayEncoding.by(ArrayEncoding.fixedPoint(1000))
      .and(ArrayEncoding.delta)
      .and(ArrayEncoding.integerPacking),
  };

  export function categoryInstance<Key, Data>(
    fields: Field<Key, Data>[],
    source: Category.DataSource,
  ): Category.Instance {
    return { fields, source: [source] };
  }

  export function createEncodingProviderFromCifFrame(
    frame: CifFrame,
  ): BinaryEncodingProvider {
    return {
      get(c, f) {
        const cat = frame.categories[c];
        if (!cat) return void 0;
        const ff = cat.getField(f);
        return ff && ff.binaryEncoding
          ? ArrayEncoder.fromEncoding(ff.binaryEncoding)
          : void 0;
      },
    };
  }

  export function createEncodingProviderFromJsonConfig(
    hints: EncodingStrategyHint[],
  ): BinaryEncodingProvider {
    return {
      get(c, f) {
        for (let i = 0; i < hints.length; i++) {
          const hint = hints[i];
          if (hint.categoryName === c && hint.columnName === f) {
            return resolveEncoding(hint);
          }
        }
      },
    };
  }

  function resolveEncoding(hint: EncodingStrategyHint): ArrayEncoder {
    const precision: number | undefined = hint.precision;
    if (precision !== void 0) {
      const multiplier = Math.pow(10, precision);
      const fixedPoint = ArrayEncoding.by(ArrayEncoding.fixedPoint(multiplier));
      switch (hint.encoding) {
        case "pack":
          return fixedPoint.and(ArrayEncoding.integerPacking);
        case "rle":
          return fixedPoint
            .and(ArrayEncoding.runLength)
            .and(ArrayEncoding.integerPacking);
        case "delta":
          return fixedPoint
            .and(ArrayEncoding.delta)
            .and(ArrayEncoding.integerPacking);
        case "delta-rle":
          return fixedPoint
            .and(ArrayEncoding.delta)
            .and(ArrayEncoding.runLength)
            .and(ArrayEncoding.integerPacking);
      }
    } else {
      switch (hint.encoding) {
        case "pack":
          return ArrayEncoding.by(ArrayEncoding.integerPacking);
        case "rle":
          return ArrayEncoding.by(ArrayEncoding.runLength).and(
            ArrayEncoding.integerPacking,
          );
        case "delta":
          return ArrayEncoding.by(ArrayEncoding.delta).and(
            ArrayEncoding.integerPacking,
          );
        case "delta-rle":
          return ArrayEncoding.by(ArrayEncoding.delta)
            .and(ArrayEncoding.runLength)
            .and(ArrayEncoding.integerPacking);
      }
    }
    throw new Error("cannot be reached");
  }
}

/**
 * Defines the information needed to encode certain fields: category and column name as well as encoding tag, precision is optional and identifies float columns.
 */
export interface EncodingStrategyHint {
  categoryName: string;
  columnName: string;
  // TODO would be nice to infer strategy and precision if needed
  encoding: EncodingType;
  /**
   * number of decimal places to keep - must be specified to float columns
   */
  precision?: number;
}

type EncodingType = "pack" | "rle" | "delta" | "delta-rle";
