//// [annotationDeclarationFieldTypeError4.ets]
const enum E {
    A,
    B
}
type U = boolean | E

@interface Anno {
    a: U
}

//// [annotationDeclarationFieldTypeError4.js]
