//// [annotationDeclarationFieldInitializer4.ets]
const a = "a"
const b = "b"

@interface Anno {
    d  = !a
    r = a && b
    s = a || b
    t = a < b
    u = a <= b
    v = a > b
    w = a >= b
    x = a === a
    y = a !== a
    z = a == a
}

//// [annotationDeclarationFieldInitializer4.js]
var a = "a";
var b = "b";


//// [annotationDeclarationFieldInitializer4.d.ets]
declare const a = "a";
declare const b = "b";
declare @interface Anno {
    d: boolean = !a;
    r: string = a && b;
    s: string = a || b;
    t: boolean = a < b;
    u: boolean = a <= b;
    v: boolean = a > b;
    w: boolean = a >= b;
    x: boolean = a === a;
    y: boolean = a !== a;
    z: boolean = a == a;
}
