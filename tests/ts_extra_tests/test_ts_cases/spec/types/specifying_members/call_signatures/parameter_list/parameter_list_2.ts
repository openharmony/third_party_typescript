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
    A parameter declaration may specify either an identifier or a binding pattern.
    The identifiers specified in parameter declarations and binding patterns in a parameter list must be unique within that parameter list.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../../suite/assert.js'

class Animal {
  fname: string;
  constructor(fname: string) {
    this.fname = fname;
  }
}
let name1 = "Anny";
let animal = new Animal(name1);
name1 = "Bob";
Assert.notEqual(animal.fname, name1);
let name2: "name2" = "name2";
let animal2 = new Animal(name2);
Assert.equal(name2, animal2.fname);
const x: number = 3;
function fun(a: number, c = 1, b = x) {
  return a + c + b;
}
let y = 1;
Assert.equal(y, 1);
let z = fun(y);
Assert.equal(z, 5);