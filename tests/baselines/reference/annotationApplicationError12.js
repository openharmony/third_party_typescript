//// [annotationApplicationError12.ets]
@interface Anno {
    a: number = 10
    b: string[] = []
}

@Anno
@Anno
class C {}


//// [annotationApplicationError12.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
