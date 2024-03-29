import collections from './attached/@arkts.collections';

let array1: collections.Array<number> = new collections.Array<number>();
let set1: collections.Set<number> = new collections.Set<number>();

array1[0]; // should NOT report
const num = 123;
array1[num]; // should NOT report

array1["str"]; // should report, arkts-no-props-by-index
const str = "abc";
array1[str]; // should report, arkts-no-props-by-index

set1[0]; // should report, arkts-no-props-by-index