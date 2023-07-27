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
  Type guards are particular expression patterns involving the 'typeof' and 'instanceof' operators 
  that cause the types of variables or parameters to be narrowed to more specific types.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

function fun(x: boolean | number | string) {
    if (typeof x === 'string') {
        Assert.isString(x);
    }
    if (typeof x === 'boolean') {
        x = true;
        Assert.isTrue(x);
    }
    if (typeof x === 'number') {
        Assert.isNumber(x);
    }
}
fun('string');
fun(10);
fun(false);