//// [annotationApplicationError2.ets]
@interface Anno {
    a: number = 10
}

@Anno(10)
class C {}

//// [annotationApplicationError2.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
