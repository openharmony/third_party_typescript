class A {}
class B {}
class C {}

function f(a1: A | B, a2: A | C) {
    a1 = a2; // should report, NOT OK
    a2 = a1; // should report, NOT OK
}
function f2(a1: A | B | C, a2: A | C) {
    a1 = a2; // OK
    a2 = a1; // should report, NOT OK
}


export let other = 1;