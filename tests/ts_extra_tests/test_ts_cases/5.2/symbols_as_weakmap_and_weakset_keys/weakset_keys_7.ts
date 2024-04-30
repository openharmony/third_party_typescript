/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
    symbols as WeakMap and WeakSet Keys
 lib: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

const myWeakSet = new WeakSet();
const key = { symbolKey: Symbol('key') };
const obj = { name: 'Object' };

myWeakSet.add(obj);
myWeakSet.add(key);

Assert.isTrue(myWeakSet.has(obj));
Assert.isTrue(myWeakSet.has(key));

myWeakSet.delete(obj);
myWeakSet.delete(key);

Assert.isFalse(myWeakSet.has(obj));
Assert.isFalse(myWeakSet.has(key));