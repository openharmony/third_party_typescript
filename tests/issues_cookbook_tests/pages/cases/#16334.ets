import collections from './attached/@arkts.collections';

let array1: collections.Array<number> = new collections.Array<number>();
let arrayInt8: collections.Int8Array = new collections.Int8Array();
let arrayUint8: collections.Uint8Array = new collections.Uint8Array();
let arrayInt16: collections.Int16Array = new collections.Int16Array();
let arrayUint16: collections.Uint16Array = new collections.Uint16Array();
let arrayInt32: collections.Int32Array = new collections.Int32Array();
let arrayUint32: collections.Uint32Array = new collections.Uint32Array();
let set1: collections.Set<number> = new collections.Set<number>();

array1[0]; // should NOT report
arrayInt8[0]; // should NOT report
arrayUint8[0]; // should NOT report
arrayInt16[0]; // should NOT report
arrayUint16[0]; // should NOT report
arrayInt32[0]; // should NOT report
arrayUint32[0]; // should NOT report
const num = 123;
array1[num]; // should NOT report
arrayInt8[num]; // should NOT report
arrayUint8[num]; // should NOT report
arrayInt16[num]; // should NOT report
arrayUint16[num]; // should NOT report
arrayInt32[num]; // should NOT report
arrayUint32[num]; // should NOT report

array1['str']; // should report, arkts-no-props-by-index
arrayInt8['str']; // should report, arkts-no-props-by-index
arrayUint8['str']; // should report, arkts-no-props-by-index
arrayInt16['str']; // should report, arkts-no-props-by-index
arrayUint16['str']; // should report, arkts-no-props-by-index
arrayInt32['str']; // should report, arkts-no-props-by-index
arrayUint32['str']; // should report, arkts-no-props-by-index
const str = 'abc';
array1[str]; // should report, arkts-no-props-by-index
arrayInt8[str]; // should report, arkts-no-props-by-index
arrayUint8[str]; // should report, arkts-no-props-by-index
arrayInt16[str]; // should report, arkts-no-props-by-index
arrayUint16[str]; // should report, arkts-no-props-by-index
arrayInt32[str]; // should report, arkts-no-props-by-index
arrayUint32[str]; // should report, arkts-no-props-by-index

set1[0]; // should report, arkts-no-props-by-index

let normalArray: number[] = [];
normalArray[0] // OK
normalArray['0'] // OK

let a:number = [1, 2, 3]; // should report, tsc type error
let b:number[] = [1, 2, 3]; // should NOT report


export let other = 1;