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
  class declarations with only public members introduce named types 
  that function exactly like those created by interface declarations.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../../suite/assert.js'

interface TestInterface {
  age: number;
}
class TestClass {
  public age: number;
  constructor(age: number) {
    this.age = age
  }
}
function test1(v: TestInterface) {
  return v.age;
}
function test2(v: TestClass) {
  return v.age;
}
let ee = {
  age: 18,
};
Assert.equal(test1(ee), 18);
Assert.equal(test2(ee), 18);