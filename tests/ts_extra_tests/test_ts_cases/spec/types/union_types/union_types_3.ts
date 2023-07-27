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
      a union type U is a subtype of a type T if each type in U is a subtype of T.
      a type T is a subtype of a union type U if T is a subtype of any type in U.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

class ClassT {
      size: number = 0;
      description: string = '';
}
class ClassU1 extends ClassT {
      alive: boolean = false;
}
class ClassU2 extends ClassT {
      weight: number = 0;
}
interface InterfaceU1 {
      speak(): string;
}
interface InterfaceU2 {
      eat(): string;
}
class ClassT2 implements InterfaceU1, InterfaceU2 {
      food: string = '';
      language: string = '';
      speak() {
            return this.language;
      }
      eat() {
            return this.food;
      }
      constructor(food: string, language: string) {
            this.food = food;
            this.language = language;
      }
}
let u1: ClassU1 | ClassU2 = { size: 7, description: "A", alive: false };
let t1: ClassT;
t1 = u1;
Assert.equal(JSON.stringify(t1), '{"size":7,"description":"A","alive":false}');
let u2: InterfaceU1 | InterfaceU2;
let t2: ClassT2 = new ClassT2("rice", "Chinese");
u2 = t2;
Assert.equal(JSON.stringify(u2), '{"food":"rice","language":"Chinese"}');