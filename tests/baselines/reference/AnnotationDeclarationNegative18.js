//// [AnnotationDeclarationNegative18.ets]
function foo(d: Function){}

@foo
@interface Anno {}

//// [AnnotationDeclarationNegative18.js]
function foo(d) { }
