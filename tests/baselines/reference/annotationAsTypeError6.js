//// [annotationAsTypeError6.ets]
@interface Anno {}

let o: Object
const a = (o instanceof Anno)

//// [annotationAsTypeError6.js]
var o;
var a = (o instanceof Anno);
