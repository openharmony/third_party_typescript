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
    A get accessor declaration is processed in the same manner as an ordinary function declaration (section 6.1) with no parameters.
    A set accessor declaration is processed in the same manner as an ordinary function declaration with a single parameter and a Void return type.
    When both a get and set accessor is declared for a property:
    If both accessors include type annotations, the specified types must be identical.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

interface Obj {
  id: number;
  name: string;
  get gid(): number;
  set sid(id: number);
}
let obj1: Obj = {
  id: 1,
  name: "obj1",
  get gid() {
    return this.id
  },
  set sid(id: number) {
    this.id = id;
  }
}
Assert.equal(obj1.id, 1);
obj1.sid = 2;
Assert.equal(obj1.gid, 2);
