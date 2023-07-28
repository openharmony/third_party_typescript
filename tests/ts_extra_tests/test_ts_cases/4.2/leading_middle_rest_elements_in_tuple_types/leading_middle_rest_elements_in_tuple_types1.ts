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
  In TypeScript, tuple types are meant to model arrays with specific lengths and element types.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

type myType = Function | object;

let tup: [myType, string, boolean] = [() => { }, 'a', true];
Assert.isFunction(tup[0]);
Assert.isString(tup[1]);
Assert.isBoolean(tup[2]);

tup = [{ o: 'obj' }, 'b', false];
Assert.isObject(tup[0]);
Assert.isString(tup[1]);
Assert.isBoolean(tup[2]);