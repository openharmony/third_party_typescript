//// [annotationApplicationError20.ets]
@interface Anno {
    a: number = 10
    b: string[] = []
}

@Anno
@Anno
abstract class C {
    @Anno
    @Anno
    abstract foo();
}


//// [annotationApplicationError20.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
