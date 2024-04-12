//@etsAnnotationsEnable: true
// @declaration: true
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