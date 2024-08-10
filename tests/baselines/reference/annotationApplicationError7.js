//// [annotationApplicationError7.ets]
@interface Anno {
    a: number
    b: string[]
}

@Anno
class C {}


//// [annotationApplicationError7.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
