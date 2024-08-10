//@etsAnnotationsEnable: true
// @filename: A.ets
export @interface Anno {
    a: number
}

// @filename: B.ets
import {Anno as B} from "./A";
