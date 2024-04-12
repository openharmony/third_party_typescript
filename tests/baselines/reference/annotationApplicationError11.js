//// [annotationApplicationError11.ets]
@interface Anno {
    a: number = 10
    b: string[] = []
}


abstract class C {
    @Anno
    abstract foo();
}


//// [annotationApplicationError11.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
