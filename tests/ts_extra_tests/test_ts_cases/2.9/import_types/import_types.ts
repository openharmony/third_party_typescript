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
  Modules can import types declared in other modules. But non-module global scripts cannot access types declared in modules. Enter import types.
  Using import("mod") in a type annotation allows for reaching in a module and accessing its exported declaration without importing it.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

function func1(i: import("../module").I) {
  Assert.equal(5, `${i.num}`);
  Assert.equal(5, i.num);
}
let i: import("../module.js").I = {
  num: 5
}
func1(i);
function func(p: import("../module").C) {
  Assert.equal('aa', `${p.str}`);
  Assert.equal('aa', p.str);
}
let p: import("../module.js").C = {
  str: "aa",
};
func(p);