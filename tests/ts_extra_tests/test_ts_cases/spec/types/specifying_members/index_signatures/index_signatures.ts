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
    string index signatures, specified using index type string, define type constraints for all properties and numeric index signatures in the containing type.
    numeric index signatures, specified using index type number, define type constraints for all numerically named properties in the containing type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

let x: { [key: string]: number } = { a: 97, A: 65 };
x["b"] = 98;
Assert.equal(x["a"], 97);
Assert.equal(x["A"], 65);
let y: { [key: number]: boolean } = { 0: false, 1: true };
y[-1] = true;
Assert.isBoolean(y[0]);
Assert.equal(y[-1], true);
interface StringKey {
  [key: string]: string;
}
let z: StringKey = { "1": "0x01", "2": "0x02", 3: "0x03", "4": "0x04" };
Assert.equal(z["1"], "0x01");
Assert.equal(z["2"], "0x02");
interface NumberKey {
  [key: number]: string;
}
let u: NumberKey = { 1: "0x01", 2: "0x02", "3": "0x03", 4: "0x04" };
Assert.equal(u[1], "0x01");
Assert.equal(u[2], "0x02");