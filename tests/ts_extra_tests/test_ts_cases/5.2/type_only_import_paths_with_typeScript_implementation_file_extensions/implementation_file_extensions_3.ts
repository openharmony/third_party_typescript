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
    Type-Only Import Paths with TypeScript Implementation File Extensions
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'
import type { JustAType } from './justTypes.cts'

export function f(param: JustAType) {
  Assert.isString(param.name);
  Assert.equal(param.name, 'Alice');

  Assert.isNumber(param.age);
  Assert.equal(param.age, 25);
}

f({ name: 'Alice', age: 25 });