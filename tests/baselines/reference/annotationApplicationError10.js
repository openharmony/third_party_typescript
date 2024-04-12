//// [annotationApplicationError10.ets]
@interface Anno {
    a: number = 10
    b: string[] = []
}


abstract class C {
    @Anno
    public foo() {};
}


//// [annotationApplicationError10.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function () { };
    ;
    return C;
}());
