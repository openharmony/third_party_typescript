//@etsAnnotationsEnable: true
// @filename: A.ets
export @interface Anno {
    a: number = 10
}

// @filename: B.ets
import {Anno} from "./A";

@Anno({a: 20})
class C {}