//// [annotationApplication2.ets]
@interface Anno {
    a = 10
}

@Anno({})
class C {}

//// [annotationApplication2.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
