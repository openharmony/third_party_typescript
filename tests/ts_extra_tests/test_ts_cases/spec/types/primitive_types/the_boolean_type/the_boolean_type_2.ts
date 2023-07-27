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
    The boolean keyword references the Boolean primitive
    type and the true and false literals reference the two Boolean truth values.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

let a: boolean = true;
Assert.isBoolean(a);
Assert.equal(a, true);
a = false;
Assert.isBoolean(a);
Assert.equal(a, false);

let b: boolean = 2 > 1;
Assert.isBoolean(b);
Assert.equal(b, true);
b = !b;
Assert.isBoolean(b);
Assert.equal(b, false);

let c: boolean = 2 > 1 && 7 < 8;
Assert.isBoolean(c);
Assert.equal(c, true);
c = 2 < 1 && 7 < 8;
Assert.isBoolean(c);
Assert.equal(c, false);

c = 2 > 1 || 7 < 8;
Assert.isBoolean(c);
Assert.equal(c, true);
c = 2 < 1 || 7 > 8;
Assert.isBoolean(c);
Assert.equal(c, false);