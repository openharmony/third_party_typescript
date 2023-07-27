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
 description: In TypeScript 3.6, the checker now knows that the correct type for iter.next().value
 options:
  lib:es2015
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

function* func() {
    yield 100;
    yield "Finished!";
    return false;
}
let t1 = func();
let t2 = t1.next();
Assert.isNumber(t2.value);
t2 = t1.next();
Assert.isString(t2.value);
t2 = t1.next();
Assert.isBoolean(t2.value);
t2 = t1.next();
Assert.equal(t2.done, true);