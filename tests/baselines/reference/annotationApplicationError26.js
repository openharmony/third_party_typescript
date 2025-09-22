//// [tests/cases/conformance/annotations/annotationApplicationError26.ets] ////

//// [A.d.ets]
export @interface Available {
    minApiVersion: string = "1";
}

//// [B.ets]
import { Available } from "./A";

@Available({minApiVersion: 'OpenHarmony 20'})
export enum E1 {
    A1 = 0
}

//// [B.js]
"use strict";
exports.__esModule = true;
exports.E1 = void 0;
var E1;
(function (E1) {
    E1[E1["A1"] = 0] = "A1";
})(E1 = exports.E1 || (exports.E1 = {}));
