//// [annotationApplicationError3.ets]
@interface Anno {
    a: number = 20
    b: string[]
}

function foo(): number {
    return 10
}

@Anno({a: foo(), b: new C().s})
class C {
    readonly s: string[] = ["a", "b", "c"]
}


@Anno({b: new C().s})
class D {}

//// [annotationApplicationError3.js]
function foo() {
    return 10;
}
var C = /** @class */ (function () {
    function C() {
        this.s = ["a", "b", "c"];
    }
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
