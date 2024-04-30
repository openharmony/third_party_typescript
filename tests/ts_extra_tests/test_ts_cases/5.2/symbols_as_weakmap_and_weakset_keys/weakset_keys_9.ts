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
const key1 = { symbolKey: Symbol('key1') };
const key2 = { symbolKey: Symbol('key2') };
const obj1 = { name: 'Object 1' };
const obj2 = { name: 'Object 2' };

myWeakSet.add(obj1);
myWeakSet.add(key2);

Assert.isTrue(myWeakSet.has(obj1));
Assert.isFalse(myWeakSet.has(obj2));
Assert.isFalse(myWeakSet.has(key1));
Assert.isTrue(myWeakSet.has(key2));

myWeakSet.delete(key1);
myWeakSet.delete(obj2);

Assert.isTrue(myWeakSet.has(obj1));
Assert.isFalse(myWeakSet.has(obj2));
Assert.isFalse(myWeakSet.has(key1));
Assert.isTrue(myWeakSet.has(key2));