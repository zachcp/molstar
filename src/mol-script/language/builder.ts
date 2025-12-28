/**
 * Copyright (c) 2018 Mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import type { Expression } from "./expression.ts";
import type { MSymbol, Argument, Arguments } from "./symbol.ts";
import type { Type } from "./type.ts";
import { MolScriptSymbolTable as SymbolTable } from "./symbol-table.ts";

export namespace MolScriptBuilder {
  export const core = SymbolTable.core;
  export const struct = SymbolTable.structureQuery;
  export const internal = SymbolTable.internal;

  /** Atom-name constructor */
  export function atomName(s: string): Expression {
    return struct.type.atomName([s]);
  }
  /** Element-symbol constructor */
  export function es(s: string): Expression {
    return struct.type.elementSymbol([s]);
  }
  /** List constructor */
  export function list(...xs: Expression[]): Expression {
    return core.type.list(xs);
  }
  /** Set constructor */
  export function set(...xs: Expression[]): Expression {
    return core.type.set(xs);
  }
  /** RegEx constructor */
  export function re(pattern: string, flags?: string): Expression {
    return core.type.regex([pattern, flags]);
  }
  /** Function constructor */
  export function fn(x: Expression): Expression {
    return core.ctrl.fn([x]);
  }
  export function evaluate(x: Expression): Expression {
    return core.ctrl.eval([x]);
  }

  const _acp = struct.atomProperty.core,
    _ammp = struct.atomProperty.macromolecular,
    _atp = struct.atomProperty.topology;

  /** atom core property */
  export function acp(p: keyof typeof _acp): Expression {
    return (_acp[p] as MSymbol<any>)();
  }

  /** atom topology property */
  export function atp(p: keyof typeof _atp): Expression {
    return (_atp[p] as MSymbol<any>)();
  }

  /** atom macromolecular property */
  export function ammp(p: keyof typeof _ammp) {
    return (_ammp[p] as MSymbol<any>)();
  }

  const _aps = struct.atomSet.propertySet;
  /** atom core property set */
  export function acpSet(p: keyof typeof _acp): Expression {
    return _aps([acp(p)]);
  }
  /** atom topology property set */
  export function atpSet(p: keyof typeof _atp): Expression {
    return _aps([atp(p)]);
  }
  /** atom macromolecular property set */
  export function ammpSet(p: keyof typeof _ammp) {
    return _aps([ammp(p)]);
  }
}
