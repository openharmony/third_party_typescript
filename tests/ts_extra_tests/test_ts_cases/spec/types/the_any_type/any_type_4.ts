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
    The Any type is a supertype of all types, and is assignable to and from all types.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let x: any
let y1: number;
x = 1024;
y1 = x;
Assert.equal(y1, 1024)
let y2: string;
x = "AAA";
y2 = x;
Assert.equal(y2.length, 3);
let y3: boolean;
x = true;
y3 = x;
Assert.equal(y3, true);
let y4: number[];
x = [1, 2, 3];
y4 = x;
Assert.equal(y4[0], 1);
let y5: string[];
x = ["aa", "bb"];
y5 = x;
Assert.equal(y5[0], "aa");
let y6: Function;
x = (a: number, b: number) => { return a + b };
y6 = x;
Assert.equal(y6(1, 2), 3);
let y7: symbol;
x = Symbol("aa");
y7 = x;
Assert.equal(y7.toString(), "Symbol(aa)");
let y8: object;
x = {
   toString() {
      return 123;
   }
};
y8 = x;
Assert.isObject(x);
Assert.equal(y8.toString(), 123)