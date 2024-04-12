//// [annotationApplication1.ets]
@interface Anno {
    a = 10
}

@Anno
class C {}

//// [annotationApplication1.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
