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
   The in operator requires the left operand to be of type Any, the String primitive type, or the Number primitive type,
   and the right operand to be of type Any, an object type, or a type parameter type.
   The result is always of the Boolean primitive type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

interface A {
    num: number
}
interface B {
    str: string
}
function isString(k: A | B) {
    let flag: boolean = false;
    if ('num' in k) {
        Assert.isTrue('num' in k);
        flag = false;
    } else if ('str' in k) {
        Assert.isTrue('str' in k);
        flag = true;
    }
    return flag;
}
let result1 = isString({ num: 20 });
Assert.isFalse(result1);
let result2 = isString({ str: 'A' });
Assert.isTrue(result2);