//// [annotationApplicationError6.ets]
@interface Anno {
    a: number
    b: string[]
}

@Anno()
class C {}


//// [annotationApplicationError6.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
