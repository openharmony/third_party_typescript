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
   A compound assignment of the form 'v ??= expr' where '??=' is one of the compound assignment operators,
   is subject to the same requirements, and produces a value of the same type, as the corresponding non-compound operation.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

var x: number = 10
var y: number = 20
x *= y
Assert.isNumber(x);
Assert.equal(x, 200);
x = 10;
y = 20;
x /= y
Assert.isNumber(x);
Assert.equal(x, 0.5);
x = 10;
y = 20;
x %= y
Assert.isNumber(x);
Assert.equal(x, 10);
x = 10;
y = 20;
x += y
Assert.isNumber(x);
Assert.equal(x, 30);
x = 10;
y = 20;
x -= y
Assert.isNumber(x);
Assert.equal(x, -10);
x = 10;
y = 20;
x <<= y
Assert.isNumber(x);
Assert.equal(x, 10485760);
x = 10;
y = 20;
x >>= y
Assert.isNumber(x);
Assert.equal(x, 0);
x = 10;
y = 20;
x >>>= y
Assert.isNumber(x);
Assert.equal(x, 0);
x = 10;
y = 20;
x &= y
Assert.isNumber(x);
Assert.equal(x, 0);
x = 10;
y = 20;
x ^= y
Assert.isNumber(x);
Assert.equal(x, 30);
x = 10;
y = 20;
x |= y
Assert.isNumber(x);
Assert.equal(x, 30);