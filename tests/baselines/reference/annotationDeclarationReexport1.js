//// [tests/cases/conformance/annotations/annotationDeclarationReexport1.ets] ////

//// [A.ets]
export @interface Anno {
    a: number
}

//// [B.ets]
export {Anno} from "./A";


//// [C.ets]
import {Anno} from "./B";

//// [A.js]
"use strict";
//// [B.js]
"use strict";
//// [C.js]
"use strict";
