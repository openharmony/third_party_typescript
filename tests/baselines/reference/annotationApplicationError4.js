//// [annotationApplicationError4.ets]
@interface Anno {
    a: number = 20
    b: string[]
}

@Anno({a: true, b: 10})
class C {}


//// [annotationApplicationError4.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
