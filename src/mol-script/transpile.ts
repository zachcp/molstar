/**
 * Copyright (c) 2022 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Koya Sakuma <koya.sakuma.work@gmail.com>
 *
 * Adapted from MolQL src/transpile.ts
 */

import { Transpiler } from './transpilers/transpiler.ts';
import { _transpiler } from './transpilers/all.ts';
import { Expression } from './language/expression.ts';
import { Script } from './script.ts';
const transpiler: {[index: string]: Transpiler} = _transpiler;

export function parse(lang: Script.Language, str: string): Expression {
    try {

        const query = transpiler[lang](str);
        return query;

    } catch (e) {

        console.error(e.message);
        throw e;

    }
}
