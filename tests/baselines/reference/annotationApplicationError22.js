//// [tests/cases/conformance/annotations/annotationApplicationError22.ets] ////

//// [A.d.ets]
export @interface Available {
    minApiVersion: string = "1";
}

//// [B.ets]
import { Available } from "./A";

@Available({minApiVersion: 'OpenHarmony 20'})
export function testFunc(): void {
    return;
}

//// [B.js]
"use strict";
exports.__esModule = true;
exports.testFunc = void 0;
function testFunc() {
    return;
}
exports.testFunc = testFunc;
