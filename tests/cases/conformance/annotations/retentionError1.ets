//@etsAnnotationsEnable: true

// @filename: @arkts.lang.d.ets
export const enum RetentionPolicy {
    SOURCE='source',
    BYTECODE='bytecode'
}

export @interface Retention {
    policy: RetentionPolicy
}

// @filename: A.ets
import { RetentionPolicy, Retention } from "./@arkts.lang"

@Retention({policy: RetentionPolicy.SOURCE})
class A {}

@Retention
@interface Anno1 {}

@Retention({policy: RetentionPolicy.SOURCE})
@interface Anno2 {
    value: number
}

let a = 1;

@Anno1({value: 1})
a = 2;

@Retention({policy: RetentionPolicy.BYTECODE})
@interface Anno3 {
    value: number
}

@Anno3({value: 2})
let b = 2;

