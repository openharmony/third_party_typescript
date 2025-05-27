//@etsAnnotationsEnable: true
@interface Anno {
    a: number = 10
    b: string[] = []
}

@Anno
@Anno
abstract class C {
    abstract foo();
}
