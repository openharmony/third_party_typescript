//@etsAnnotationsEnable: true
@interface Anno {}

function foo(o: Object): o is Anno {
    return true;
}