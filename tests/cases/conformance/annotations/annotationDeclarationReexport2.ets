//@etsAnnotationsEnable: true
// @filename: A.ets
export @interface Anno {
    a: number = 10
}

// @filename: B.ets
export * as AA from "./A";


// @filename: C.ets
import {AA} from "./B";

@AA.Anno
class C{}