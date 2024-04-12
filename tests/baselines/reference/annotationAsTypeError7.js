//// [annotationAsTypeError7.ets]
@interface Anno {}

function foo(o: Object): o is Anno {
    return true;
}

//// [annotationAsTypeError7.js]
function foo(o) {
    return true;
}
