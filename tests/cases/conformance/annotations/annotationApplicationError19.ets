//@etsAnnotationsEnable: true
@interface Anno {
    a: number = 10
    b: string[] = []
}

abstract class C {
    @Anno
    @Anno
    abstract foo();
}
