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
  Classes, enums, and type aliases are named types that are introduced through class declarations, 
  interface declarations, enum declarations, and type alias declarations.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../../suite/assert.js'

class Test {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
let tt = new Test("caihua");
Assert.equal(tt.name, "caihua");
interface A {
  a: string;
}
function f(obj: A) {
  obj.a = obj.a + "bb";
}
let obj: A = { a: "aa" };
f(obj);
Assert.equal(obj.a, "aabb");
enum Color {
  Red,
  Green,
  Blue,
}
let a: Color.Red = Color.Red;
Assert.equal(a, Color.Red);
type pp = number | string;
let b: pp;
b = 10;
Assert.equal(b, 10);
b = "hello";
Assert.equal(b, "hello");