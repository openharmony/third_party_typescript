//// [annotationApplicationError18.ets]
@interface Anno {
    a: number = 10
    b: string[] = []
}

@Anno
@Anno
abstract class C {
    abstract foo();
}


//// [annotationApplicationError18.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
