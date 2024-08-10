//@etsAnnotationsEnable: true
// @declaration: true
const enum E {
    A,
    B
}

@interface Anno {
    a: number = +E.A
    b: number = -E.A
    c: number = ~E.A
    d  = !E.A
    e: number = E.A | E.B
    f: number = E.A & E.B
    g: number = E.A >> E.B
    h: number = E.A >>> E.B
    i: number = E.A << E.B
    j: number = E.A ^ E.B
    k: number = E.A * E.B
    l: number = E.A / E.B
    m: number = E.A + E.B
    o: number = E.A - E.B
    p: number = E.A % E.B
    q: number = E.A ** E.B
    r: number = E.A && E.B
    s: number = E.A || E.B
    t = E.A < E.B
    u = E.A <= E.B
    v = E.A > E.B
    w = E.A >= E.B
    x = E.A === E.A
    y = E.B !== E.B
    z = E.A == E.A
}