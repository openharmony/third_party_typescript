//// [annotationAsTypeError5.ets]
@interface Anno {}

let o: Object
const a = (o as Anno)

//// [annotationAsTypeError5.js]
var o;
var a = o;
