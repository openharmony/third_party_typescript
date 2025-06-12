//// [annotationApplication13.ets]
@interface Anno1 {}

@interface Anno2 {
    a: number = 10
}

@Anno1()
class C1 {
	@Anno1()
	foo() {}
	@Anno1()
	static bar() {}
}

@Anno2()
class C2 {
	@Anno2()
	foo() {}
	@Anno2()
	static bar() {}
}


//// [annotationApplication13.js]
var C1 = /** @class */ (function () {
    function C1() {
    }
    C1.prototype.foo = function () { };
    C1.bar = function () { };
    return C1;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    C2.prototype.foo = function () { };
    C2.bar = function () { };
    return C2;
}());
