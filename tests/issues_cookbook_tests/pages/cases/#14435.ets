eval('console.log("foo")'); // report
let inf = Infinity;
let nan= NaN;
isFinite(1);
isNaN(2);
parseFloat('3');
parseInt('4',10);
encodeURI('');
encodeURIComponent()
decodeURI('');
decodeURIComponent('');
escape('');
unescape('');

global.eval('console.log("foo")');     // report
globalThis.eval('console.log("foo")'); // report 1 error and report 1 warn
const evl = "eval('console.log(1)')";
const res: void = Function(evl)();
const arr1 = ['foo', 'foo', 'foo'];



export let other= 1;
