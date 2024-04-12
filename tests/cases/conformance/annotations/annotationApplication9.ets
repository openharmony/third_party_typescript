//@etsAnnotationsEnable: true
// @filename: A.ets
export @interface Anno {
    a: number = 10
}

// @filename: B.ets
import * as AA from "./A";

@AA.Anno({a: 20})
class C {}