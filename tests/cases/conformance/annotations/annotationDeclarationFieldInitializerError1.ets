//@etsAnnotationsEnable: true
// @declaration: true
let A = 10;

function B(): number {
    return 10;
}

const C = A + B();

@interface Anno {
    a = A
    b = B()
    c = C

}