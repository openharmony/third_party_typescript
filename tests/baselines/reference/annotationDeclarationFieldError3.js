//// [annotationDeclarationFieldError3.ets]
function foo(target: any, key: string) {}

@interface Anno {
    @foo a: number
}

//// [annotationDeclarationFieldError3.js]
function foo(target, key) { }
a: number;
