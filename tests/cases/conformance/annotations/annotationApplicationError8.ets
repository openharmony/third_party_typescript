//@etsAnnotationsEnable: true
// @target: esnext
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
