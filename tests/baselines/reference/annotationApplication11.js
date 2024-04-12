//// [annotationApplication11.ets]
const enum E {
	A, B, C
}

@interface D {
	a: number
	b = [(10 + 3), E.A]
	c: string
	d: boolean
	e: E[] = [E.A, E.B, E.C]
	f: number[]
	g: E[][][]
}


@D({a: E.A + 10, c: "a" + "b", d: (1 === 1), f: [], g: [[[0]]]})
class C{}

//// [annotationApplication11.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
