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
    array literals may be used to create values of array types.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

let arr6: number[] = [1, 3, 5, 7, 9];
let arr7: boolean[] = [true, false, true, false, true];
let arr8: string[] = ["a", "b", "c", "d", "e", "f"];
let arr9: object[] = [{ 0x00: "0x00" }, { 0x01: "0x01" }];
arr6[3] = 14;
Assert.equal(arr6[3], 14);
Assert.equal(true, arr7[2]);
Assert.equal(arr8.toString(), "a,b,c,d,e,f");
arr8.pop();
Assert.equal(arr8.toString(), "a,b,c,d,e");
arr8.push("0x02");
Assert.equal(arr8.toString(), "a,b,c,d,e,0x02");
Assert.isObject(arr9);