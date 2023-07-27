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
    In a contextually typed object literal, each property value expression is contextually typed by
    the type of the property with a matching name in the contextual type, if any, or otherwise
    for a numerically named property, the numeric index type of the contextual type, if any, or otherwise
    the string index type of the contextual type, if any.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

interface Person {
  (a: number): void
}
interface B {
  fn: Person
}
const obj: B = {
  fn: function (a) {
    Assert.isNumber(a)
  }
}
obj.fn(10);