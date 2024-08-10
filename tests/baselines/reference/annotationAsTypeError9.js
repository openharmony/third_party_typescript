//// [annotationAsTypeError9.ets]
@interface Anno {}

class C {
    a: Anno
}

let a: Anno[];

//// [annotationAsTypeError9.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var a;
