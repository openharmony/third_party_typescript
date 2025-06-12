//@etsAnnotationsEnable: true
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
