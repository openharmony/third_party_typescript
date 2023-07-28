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
 description: Literal type widening can be controlled through explicit type annotations.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

const newString = "hello";

let newV = newString;
newV = "world";
const newS2: "hello" = "hello";
let newV2 = newS2;
Assert.equal(newV2, "hello");

const newN = 1;
let n4 = newN;
n4 = 10;
Assert.equal(n4, 10);
const n5: 1 = 1;
let n6 = n5;
n6 = 1;
Assert.equal(n6, 1);

const newB = false;
let b8 = newB;
b8 = true;
Assert.equal(b8, true);
const b9: false = false;
let b10 = b9;
b10 = false;
Assert.equal(b10, false);