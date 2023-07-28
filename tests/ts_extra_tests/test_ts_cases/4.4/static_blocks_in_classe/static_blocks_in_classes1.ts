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
   These static blocks allow you to write a sequence of statements with their own scope
   that can access private fields within the containing class.
   we can write initialization code with all the capabilities of writing statements, no leakage of variables, and full access to our class’s internals.
 options:
   target: es2015
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

class C {
  static #aa = 0;

  get aaValue() {
    return C.#aa;
  }

  static {
    C.#aa++;
  }
}
let x = new C();
Assert.equal(x.aaValue, 1);
