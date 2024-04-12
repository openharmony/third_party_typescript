//// [annotationDeclarationError15.ets]
@Anno
class C {}

@interface Anno {}

//// [annotationDeclarationError15.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
