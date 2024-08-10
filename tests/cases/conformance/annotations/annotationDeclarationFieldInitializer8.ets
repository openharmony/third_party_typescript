//@etsAnnotationsEnable: true
// @declaration: true
const enum E {
    A,
    B
}

const a = 10
const b = 20
const c = "a"
const d = "b"
const e = true
const f = false

@interface Anno {
    a: number[] = [1 + 2, a + b, (E.A + E.B) / 3]
    b: Array<number> = [1 + 2, a + b, (E.A + E.B) / 3]
    c: Array<Array<number>> = [[1 + a * b / 3], [E.A + b], [a + E.A], []]
    d: string[] = ["a", (c + d)]
    e: string[][] = [["a", (c + d)], ["b", "abc" + d], []]
    f: Array<boolean> = [true, false, c === c, f || e]
}