//@etsAnnotationsEnable: true
// @declaration: true
const a = true
const b = false

@interface Anno {
    d  = !a
    r: boolean = a && b
    s = a || b
    t = a < b
    u = a <= b
    v = a > b
    w = a >= b
    x = a === a
    y = b !== b
    z = a == a
}