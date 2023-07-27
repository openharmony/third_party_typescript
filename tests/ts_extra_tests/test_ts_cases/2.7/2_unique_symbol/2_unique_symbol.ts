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
 description: To enable treating symbols as unique literals a new type unique symbol is available.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

const usym1: unique symbol = Symbol();
const usym2: unique symbol = Symbol.for("Bar");
 
let t1: typeof usym1 = usym1;
let t2: typeof usym2 = usym2;

class C {
  static readonly StaticUsym: unique symbol = Symbol();
}

Assert.isTrue('symbol' === typeof t1);
Assert.isTrue('symbol' === typeof t2);
Assert.isTrue('symbol' === typeof C.StaticUsym);