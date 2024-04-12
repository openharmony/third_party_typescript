//// [annotationDeclarationError1.ets]
function goo(target: any) {}

@goo
@interface Anno {
    a: number
}

//// [annotationDeclarationError1.js]
function goo(target) { }
