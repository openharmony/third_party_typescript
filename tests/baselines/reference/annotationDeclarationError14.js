//// [tests/cases/conformance/annotations/annotationDeclarationError14.ets] ////

//// [A.ets]
export @interface Anno {
    a: number
}

//// [B.ets]
export {Anno as default} from "./A";

//// [A.js]
"use strict";
//// [B.js]
"use strict";
