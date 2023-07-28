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
    If the class contains no constructor declaration and has no base class,
    a single construct signature with no parameters, 
    having the same type parameters as the class (if any) 
    and returning an instantiation of the class type with those type parameters passed as type arguments.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class A {
  a: number = 0;
  b: number = 0;
  constructor() { }
}
let a = new A();
Assert.equal(a.a, 0);
Assert.equal(a.b, 0);