//@etsAnnotationsEnable: true
const enum E {
    A,
    B
}
type U = boolean | E

@interface Anno {
    a: U
}