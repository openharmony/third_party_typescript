//@etsAnnotationsEnable: true
// @filename: A.ets
export @interface Anno {
    a: number
}

// @filename: B.ets
export {Anno} from "./A";


// @filename: C.ets
import {Anno} from "./B";