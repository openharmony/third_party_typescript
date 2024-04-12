//// [annotationApplicationError9.ets]
@interface Anno {
    a: number = 10
    b: string[] = []
}

@Anno
abstract class C {}


//// [annotationApplicationError9.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
