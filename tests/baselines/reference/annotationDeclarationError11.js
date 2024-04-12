//// [tests/cases/conformance/annotations/annotationDeclarationError11.ets] ////

//// [A.ets]
export @interface Anno {
    a: number
}

//// [B.ets]
import {Anno as B} from "./A";


//// [A.js]
"use strict";
//// [B.js]
"use strict";
