//// [annotationAsTypeError2.ets]
@interface Anno {}

class C<T>{}

new C<Anno>();

//// [annotationAsTypeError2.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
new C();
