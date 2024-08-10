//@etsAnnotationsEnable: true
// @declaration: true
@interface Anno {
    a: number = +1
    b: number = -1
    c: number = ~1
    d  = !1
    e: number = 1 | 2
    f: number = 1 & 2
    g: number = 100 >> 1
    h: number = 100 >>> 1
    i: number = 10 << 1
    j: number = 1 ^ 2
    k: number = 10 * 10
    l: number = 100 / 10
    m: number = 2 + 3
    o: number = 2 - 3
    p: number = 9 % 3
    q: number = 2 ** 3
    r: number = 10 && 10
    s: number = 0 || 10
    t = 1 < 2
    u = 1 <= 1
    v = 1 > 2
    w = 1 >= 1
    x = 1 === 1
    y = 1 !== 1
    z = 1 == 1
}