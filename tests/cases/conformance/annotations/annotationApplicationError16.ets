//@etsAnnotationsEnable: true
@interface Anno {
    a: number = 10
    b: string[] = []
}

@Anno
abstract class C {
    @Anno
    abstract foo();
}
