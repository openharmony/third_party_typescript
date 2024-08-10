//@etsAnnotationsEnable: true
// @filename: A.ets
export @interface Anno {
    a: number
}

// @filename: B.ets
export {Anno as default} from "./A";