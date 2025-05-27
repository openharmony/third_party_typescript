//// [annotationApplicationError17.ets]
@interface Anno {
    a: number = 10
    b: string[] = []
}

@Anno
abstract class C {
    abstract foo();
}


//// [annotationApplicationError17.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
