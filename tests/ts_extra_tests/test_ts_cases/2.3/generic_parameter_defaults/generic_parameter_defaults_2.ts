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
    typescript 2.3 adds support for declaring defaults for generic type parameters.
    a class or interface declaration that merges with an existing class or interface declaration may introduce a default for an existing type parameter.
    a class or interface declaration that merges with an existing class or interface declaration may introduce a new type parameter as long as it specifies a default.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

class CA<V, T, U>{
   ca0: V;
   ca1: T;
   ca2: U;
   constructor(ca0: V, ca1: T, ca2: U) { this.ca0 = ca0; this.ca1 = ca1; this.ca2 = ca2; }
   creatOBJ() {
      let a = this.ca0;
      let b = this.ca1;
      let c = this.ca2;
      return { a, b, c };
   }
   toJSON() {
      return JSON.stringify(this.creatOBJ());
   }
}
class CCA<V = number, T = V[], U = T[]> extends CA<V, T, U>{ }
let cca1 = new CCA(0, [0, 0], "[0]");
Assert.equal(cca1.toJSON(), "{\"a\":0,\"b\":[0,0],\"c\":\"[0]\"}");
let cca2 = new CCA<string>("A", ["A"], [["A"], ["B"]]);
Assert.equal(cca2.toJSON(), "{\"a\":\"A\",\"b\":[\"A\"],\"c\":[[\"A\"],[\"B\"]]}");

interface IB<V, T, U> {
   ia: V;
   ib: T;
   ic: U;
}
interface CIB<V = number, T = V[], U = T[]> extends IB<V, T, U> { }
let cib1: CIB = { ia: 0, ib: [0], ic: [[0], [1, 2]] };
Assert.equal(JSON.stringify(cib1), "{\"ia\":0,\"ib\":[0],\"ic\":[[0],[1,2]]}");
let cib2: CIB<string> = { ia: "A", ib: ["A", "B"], ic: [["A"], ["B", "C"]] };
Assert.equal(JSON.stringify(cib2), "{\"ia\":\"A\",\"ib\":[\"A\",\"B\"],\"ic\":[[\"A\"],[\"B\",\"C\"]]}");
