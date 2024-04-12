//@etsAnnotationsEnable: true
// @declaration: true
const a = 1
const b = 2

@interface Anno {
    d  = !a
    e: number = a | b
    f: number = a & b
    g: number = a >> b
    h: number = a >>> b
    i: number = a << b
    j: number = a ^ b
    k: number = a * b
    l: number = a / b
    m: number = a + b
    o: number = a - b
    p: number = a % b
    q: number = a ** b
    r: number = a && b
    s: number = (a - 1) || b
    t = a < 2
    u = a <= 1
    v = a > 2
    w = a >= 1
    x = a === 1
    y = a !== 1
    z = a == 1
}