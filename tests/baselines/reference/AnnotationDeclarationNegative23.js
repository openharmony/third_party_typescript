//// [AnnotationDeclarationNegative23.ets]
declare let interface:PropertyDecorator
declare let f:PropertyDecorator;
class C{
    @interface
    @f
    a:number=1;
    @f
    @interface
    b:number=1;
}

//// [AnnotationDeclarationNegative23.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
a: number = 1;
number = 1;
