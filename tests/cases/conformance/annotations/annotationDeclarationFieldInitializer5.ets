//@etsAnnotationsEnable: true
// @declaration: true
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