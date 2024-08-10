//// [annotationApplicationError1.ets]
@interface Anno {
    a: number = 10
}

@Anno([])
class C {}

//// [annotationApplicationError1.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
