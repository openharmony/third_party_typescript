//// [tests/cases/conformance/annotations/annotationApplicationError25.ets] ////

//// [A.d.ets]
export @interface Available {
    minApiVersion: string = "1";
}

//// [B.ets]
import { Available } from "./A";

@Available({minApiVersion: 'OpenHarmony 20'})
export namespace A1 {}

@Available({minApiVersion: 'OpenHarmony 20'})
export module A2 {}

//// [B.js]
"use strict";
exports.__esModule = true;
