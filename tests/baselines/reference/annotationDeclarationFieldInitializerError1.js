//// [annotationDeclarationFieldInitializerError1.ets]
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

//// [annotationDeclarationFieldInitializerError1.js]
var A = 10;
function B() {
    return 10;
}
var C = A + B();


//// [annotationDeclarationFieldInitializerError1.d.ets]
declare let A: number;
declare function B(): number;
declare const C: number;
declare @interface Anno {
    a: number = A;
    b: number = B();
    c: number = C;
}
