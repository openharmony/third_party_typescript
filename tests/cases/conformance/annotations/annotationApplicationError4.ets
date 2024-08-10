//@etsAnnotationsEnable: true
@interface Anno {
    a: number = 20
    b: string[]
}

@Anno({a: true, b: 10})
class C {}
