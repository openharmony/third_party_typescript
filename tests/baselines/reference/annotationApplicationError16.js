//// [annotationApplicationError16.ets]
@interface Anno {
    a: number = 10
    b: string[] = []
}

@Anno
abstract class C {
    @Anno
    abstract foo();
}


//// [annotationApplicationError16.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
