//// [tests/cases/conformance/annotations/annotationApplicationError23.ets] ////

//// [A.d.ets]
export @interface Available {
    minApiVersion: string = "1";
}

//// [B.ets]
import { Available } from "./A";

@Available({minApiVersion: 'OpenHarmony 20'})
export let a1: number = 1;

@Available({minApiVersion: 'OpenHarmony 20'})
export const a2: number = 1;

//// [B.js]
"use strict";
exports.__esModule = true;
exports.a2 = exports.a1 = void 0;
exports.a1 = 1;
exports.a2 = 1;
