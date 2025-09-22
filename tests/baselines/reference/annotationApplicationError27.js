//// [tests/cases/conformance/annotations/annotationApplicationError27.ets] ////

//// [A.d.ets]
export @interface Available {
    minApiVersion: string = "1";
}

//// [B.ets]
import { Available } from "./A";

@Available({minApiVersion: 'OpenHarmony 20'})
export @interface Anno {
    a: number = 1;
}

//// [B.js]
"use strict";
