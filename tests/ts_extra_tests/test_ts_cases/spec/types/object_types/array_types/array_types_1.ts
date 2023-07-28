/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**---
 description: >
    array types represent JavaScript arrays with a common element type.
    array types are named type references created from the generic interface type 'Array' in the global namespace with the array element type as a type argument.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

let arr1: Array<string> = ["ABC", "DEF", "GHI"];
let arr2: Array<number> = [1, 3, 5, 7, 9];
let arr3: Array<boolean> = [true, false];
let arr4: Array<object> = [Object, { 0xff: "0xFF" }];
Assert.equal(arr1[0], "ABC");
Assert.equal(arr2[0], 1);
Assert.equal(arr3[0], true);
Assert.equal(arr4[0], Object);
let objArray: object[] = [];
arr1.forEach(function (element, index, arr) {
  objArray[index] = { index: index, element: element, arr: arr };
});
Assert.equal(arr2.toString(), "1,3,5,7,9");
Assert.equal(arr3.length, 2);
Assert.equal(arr2.pop(), 9);
Assert.equal(arr2.toString(), "1,3,5,7");
arr3[0] = false;
Assert.equal(arr3[0], false);
interface ArrayNumber {
  [x: number]: number;
}
let arr5: ArrayNumber = arr2;
Assert.equal(arr5[0], 1);
Assert.equal(arr5[1], 3);
class ArrayString {
  [x: number]: string;
}
let arr6: ArrayString = arr1;
Assert.equal(arr6[0], "ABC");
Assert.equal(arr6[1], "DEF");
type ArrayType = {
  [x: number]: number;
}
let arr7: ArrayType = [1, 2, 3];
Assert.equal(arr7[0], 1);
Assert.equal(arr7[1], 2);
let arr8: Object[];
arr8 = [
  111,
  true,
  "aaa"
];
Assert.equal(arr8[0], 111);
Assert.equal(arr8[1], true);
Assert.equal(arr8[2], "aaa");