//// [annotationDeclarationFieldInitializer8.ets]
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

//// [annotationDeclarationFieldInitializer8.js]
var a = 10;
var b = 20;
var c = "a";
var d = "b";
var e = true;
var f = false;


//// [annotationDeclarationFieldInitializer8.d.ets]
declare const enum E {
    A = 0,
    B = 1
}
declare const a = 10;
declare const b = 20;
declare const c = "a";
declare const d = "b";
declare const e = true;
declare const f = false;
declare @interface Anno {
    a: number[] = [1 + 2, a + b, (E.A + E.B) / 3];
    b: Array<number> = [1 + 2, a + b, (E.A + E.B) / 3];
    c: Array<Array<number>> = [[1 + a * b / 3], [E.A + b], [a + E.A], []];
    d: string[] = ["a", (c + d)];
    e: string[][] = [["a", (c + d)], ["b", "abc" + d], []];
    f: Array<boolean> = [true, false, c === c, f || e];
}
