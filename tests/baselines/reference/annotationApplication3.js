//// [annotationApplication3.ets]
@interface Anno {
    a = 10
}

@Anno({a: 20})
class C {}

//// [annotationApplication3.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
