//@etsAnnotationsEnable: true
// @declaration: true
const a = "a"
const b = "b"

@interface Anno {
    d  = !a
    r = a && b
    s = a || b
    t = a < b
    u = a <= b
    v = a > b
    w = a >= b
    x = a === a
    y = a !== a
    z = a == a
}