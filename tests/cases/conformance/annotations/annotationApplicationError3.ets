//@etsAnnotationsEnable: true
@interface Anno {
    a: number = 20
    b: string[]
}

function foo(): number {
    return 10
}

@Anno({a: foo(), b: new C().s})
class C {
    readonly s: string[] = ["a", "b", "c"]
}


@Anno({b: new C().s})
class D {}