//// [annotationApplicationError19.ets]
@interface Anno {
    a: number = 10
    b: string[] = []
}

abstract class C {
    @Anno
    @Anno
    abstract foo();
}


//// [annotationApplicationError19.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
