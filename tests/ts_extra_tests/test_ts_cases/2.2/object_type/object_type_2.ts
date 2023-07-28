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
     typeScript did not have a type that represents the non-primitive type, i.e. any thing that is not number, string,
     boolean, symbol, null, or undefined.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

let obj2 = { num: 1 };
let obj3 = { str: "OBJ" };
let obj4 = { num: 1 };
Assert.equal(typeof obj2, 'object');
Assert.equal(typeof obj3, 'object');
Assert.isTrue(typeof obj2 === typeof obj3);
Assert.isFalse(obj2 === obj4);