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
  A type guard of the form !expr,
  when true, narrows the type of x by expr when false, 
  or when false, narrows the type of x by expr when true.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

function func(x: string | number) {
    if (!(typeof x === "string")) {
        Assert.isNumber(x);
        return x + 1;
    }
    else {
        Assert.isString(x);
        return x.length;
    }
}
let a = func(10);
Assert.equal(a, 11);
let b = func('s');
Assert.equal(b, 1);