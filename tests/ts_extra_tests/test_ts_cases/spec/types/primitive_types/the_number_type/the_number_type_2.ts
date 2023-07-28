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
 description: The number keyword references the Number primitive type and numeric literals may be used to write values of the Number primitive type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'


let n1: number = 1;
Assert.isNumber(n1);
Assert.equal(n1, 1);
n1 = 2;
Assert.isNumber(n1);
Assert.equal(n1, 2);
let n2: number = 1.51;
Assert.isNumber(n2);
Assert.equal(n2, 1.51);
n2 = 3.53;
Assert.isNumber(n2);
Assert.equal(n2, 3.53);
let n3: number = 0b1011;
Assert.isNumber(n3);
Assert.equal(n3, 0b1011);
n3 = 0b1111;
Assert.isNumber(n3);
Assert.equal(n3, 0b1111);
let n4: number = 0o17;
Assert.isNumber(n4);
Assert.equal(n4, 0o17);
n4 = 0o24;
Assert.isNumber(n4);
Assert.equal(n4, 0o24);
let n5: number = 0xf00d;
Assert.isNumber(n5);
Assert.equal(n5, 0xf00d);
n5 = 0xf01c;
Assert.isNumber(n5);
Assert.equal(n5, 0xf01c);
let n6: 1 | 2 = 1;
let n7: number;
n7 = n6;
Assert.equal(n7, 1);
n6 = 2;
n7 = n6;
Assert.equal(n7, 2);