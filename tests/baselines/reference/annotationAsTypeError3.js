//// [annotationAsTypeError3.ets]
@interface Anno {}

class C implements Anno{}

//// [annotationAsTypeError3.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
