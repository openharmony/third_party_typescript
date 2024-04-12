//// [annotationAsValueError1.ets]
@interface Anno {}

const a = {Anno};

//// [annotationAsValueError1.js]
var a = { Anno: Anno };
