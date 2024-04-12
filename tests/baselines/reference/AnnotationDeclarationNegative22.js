//// [AnnotationDeclarationNegative22.ets]
declare let interface:ClassDecorator
declare let f:ClassDecorator;
@interface
@f
class C1{}
@f
@interface
class C2{}

//// [AnnotationDeclarationNegative22.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var C1 = /** @class */ (function () {
    function C1() {
    }
    C1 = __decorate([
        f
    ], C1);
    return C1;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
