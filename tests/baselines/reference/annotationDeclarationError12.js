//// [tests/cases/conformance/annotations/annotationDeclarationError12.ets] ////

//// [A.ets]
export @interface Anno {
    a: number
}

//// [B.ets]
export {Anno as B} from "./A";

//// [A.js]
"use strict";
//// [B.js]
"use strict";
