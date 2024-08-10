//// [annotationDeclarationFieldInitializer3.ets]
@interface Anno {
    d  = !"abc"
    q: string = "a" + "b"
    r: string = "a" && "b"
    s: string = "c" || "d"
    t = "abc" < "abd"
    u = "abc" <= "abc"
    v = "b" > "a"
    w = "b" >= "b"
    x = "abc" === "abc"
    y = "qwe" !== "qwe"
    z = "" == ""
}

//// [annotationDeclarationFieldInitializer3.js]


//// [annotationDeclarationFieldInitializer3.d.ets]
declare @interface Anno {
    d: boolean = !"abc";
    q: string = "a" + "b";
    r: string = "a" && "b";
    s: string = "c" || "d";
    t: boolean = "abc" < "abd";
    u: boolean = "abc" <= "abc";
    v: boolean = "b" > "a";
    w: boolean = "b" >= "b";
    x: boolean = "abc" === "abc";
    y: boolean = "qwe" !== "qwe";
    z: boolean = "" == "";
}
