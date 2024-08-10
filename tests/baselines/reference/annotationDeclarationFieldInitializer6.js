//// [annotationDeclarationFieldInitializer6.ets]
const a = true
const b = false

@interface Anno {
    d  = !a
    r: boolean = a && b
    s = a || b
    t = a < b
    u = a <= b
    v = a > b
    w = a >= b
    x = a === a
    y = b !== b
    z = a == a
}

//// [annotationDeclarationFieldInitializer6.js]
var a = true;
var b = false;


//// [annotationDeclarationFieldInitializer6.d.ets]
declare const a = true;
declare const b = false;
declare @interface Anno {
    d: boolean = !a;
    r: boolean = a && b;
    s: boolean = a || b;
    t: boolean = a < b;
    u: boolean = a <= b;
    v: boolean = a > b;
    w: boolean = a >= b;
    x: boolean = a === a;
    y: boolean = b !== b;
    z: boolean = a == a;
}
