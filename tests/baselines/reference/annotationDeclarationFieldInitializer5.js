//// [annotationDeclarationFieldInitializer5.ets]
@interface Anno {
    d  = !false
    r: boolean = true && false
    s: boolean = false || true
    t = true < false
    u = false <= true
    v = false > true
    w = false >= true
    x = true === true
    y = true !== true
    z = false == false
}

//// [annotationDeclarationFieldInitializer5.js]


//// [annotationDeclarationFieldInitializer5.d.ets]
declare @interface Anno {
    d: boolean = !false;
    r: boolean = true && false;
    s: boolean = false || true;
    t: boolean = true < false;
    u: boolean = false <= true;
    v: boolean = false > true;
    w: boolean = false >= true;
    x: boolean = true === true;
    y: boolean = true !== true;
    z: boolean = false == false;
}
