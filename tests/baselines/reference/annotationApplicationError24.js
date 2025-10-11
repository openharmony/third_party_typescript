//// [tests/cases/conformance/annotations/annotationApplicationError24.ets] ////

//// [A.d.ets]
export @interface Available {
    minApiVersion: string = "1";
}

//// [B.ets]
import { Available } from "./A";

@Available({minApiVersion: 'OpenHarmony 20'})
export type testType = string | number;

@Available({minApiVersion: 'OpenHarmony 20'})
export type testType1 = () => string;

//// [B.js]
"use strict";
exports.__esModule = true;
