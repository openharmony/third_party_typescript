// wrong
let value1: any     // should report
value1 = true
value1 = 42
let value2: unknown // should report
value2 = true
value2 = 42


// right
let value_b: boolean = true
let value_n: number = 42
let value_o1: Object = true
let value_o2: Object = 42


// arkts-no-any-unknown
export let other = 1;