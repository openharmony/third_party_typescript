//// [annotationDeclarationFieldTypeError1.ets]
class C {}

@interface Anno {
    a: C
}

//// [annotationDeclarationFieldTypeError1.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
