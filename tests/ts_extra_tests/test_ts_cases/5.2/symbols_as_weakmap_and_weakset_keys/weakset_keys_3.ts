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


import { Assert } from '../../../suite/assert.js';

const myWeakMap = new WeakMap();
const key1 = { symbolKey: Symbol('key1') };
const key2 = { symbolKey: Symbol('key2') };
const value1 = 'Value for key1';
const value2 = 'Value for key2';

myWeakMap.set(key1, value1);
myWeakMap.set(key2, value2);

Assert.equal(myWeakMap.get(key1), 'Value for key1');
Assert.equal(myWeakMap.get(key2), 'Value for key2');