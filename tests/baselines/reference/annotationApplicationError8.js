//// [annotationApplicationError8.ets]
@interface Anno {
    a: number = 10
    b: string[] = []
}


class C {
    @Anno
    public a: number

    public foo(@Anno a: number) {}

    @Anno
    get prop(): number { return 0}

    @Anno
    set prop(a: number) {}
}


//// [annotationApplicationError8.js]
class C {
    a;
    foo(a) { }
    get prop() { return 0; }
    set prop(a) { }
}
