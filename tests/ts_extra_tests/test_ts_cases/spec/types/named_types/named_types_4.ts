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
  TypeScript has a structural type system, and therefore an instantiation of a generic type 
  is indistinguishable from an equivalent manually written expansion.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../../suite/assert.js'

class C {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
interface I<T, U> {
  front: T;
  later: U;
}
function test(v: I<string, C>) {
  Assert.equal(v.front, "abc");
  Assert.equal(v.later.x, 1);
  Assert.equal(v.later.y, 1);
}
test({ front: "abc", later: { x: 1, y: 1 } });
let cc: I<string, C>;
cc = {
  front: "abc",
  later: {
    x: 1,
    y: 1,
  },
};
test(cc);