//// [annotationApplication10.ets]
const enum E{
    A,
    B,
    C
}

@interface Anno {
    a: number
    b: boolean
    c: string
    d: E[]
}


@Anno({a: 10 + 20 / 2, b: (10 === 10), c: "a" + "b" + "c", d: [E.A, E.B, E.C]})
class C {}

//// [annotationApplication10.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
