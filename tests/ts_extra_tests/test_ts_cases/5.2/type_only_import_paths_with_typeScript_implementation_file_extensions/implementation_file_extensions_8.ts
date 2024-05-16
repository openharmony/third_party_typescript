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


import { Assert } from '../../../suite/assert.js';

/**
* @param {import("./justTypes.cts").JustAType} JustAType
*/

export function f(JustAType: import("./justTypes.cts").JustAType): void {
  Assert.isString(JustAType.name);
  Assert.equal(JustAType.name, 'Alice');

  Assert.isNumber(JustAType.age);
  Assert.equal(JustAType.age, 25);
}

f({ name: 'Alice', age: 25 });