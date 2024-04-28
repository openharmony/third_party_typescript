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
    TypeScript 5.0 now allows JSDoc to declare overloads with a new @overload tag. 
    Each JSDoc comment with an @overload tag is treated as a distinct overload for the following function declaration. 
 module: ES2022
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

/**
 * @overload
 * @param {string} a
 * @return {string}
 */

/**
 * @overload
 * @param {number} a
 * @param {number} b
 * @return {number}
 */

class printValue {
  overload(a: string | number, b?: number) {
    if (typeof a === 'number' && typeof b === 'number') {
      return a + b;
    }
    else {
      return a;
    }
  }
}

let ol = new printValue();
Assert.equal(ol.overload(1, 2), 3);
Assert.equal(ol.overload('hello'), 'hello');