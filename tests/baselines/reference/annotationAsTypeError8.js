//// [annotationAsTypeError8.ets]
@interface Anno {}

function foo(a: Anno) {
}

class C {
    public goo(a: Anno) {}
}

//// [annotationAsTypeError8.js]
function foo(a) {
}
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.goo = function (a) { };
    return C;
}());
