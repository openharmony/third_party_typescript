//@etsAnnotationsEnable: true
@interface Anno {
    a: number = 10
    b: string[] = []
}

@Anno
@Anno
class C {}
