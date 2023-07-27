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
   TypeScript 3.4 introduces a new construct for literal values called const assertions. Its syntax is a type assertion with const in place of the type name.
   The angle bracket assertion syntax can also be used.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../suite/assert.js"

let a1 = 1408 as const;
let a2 = <const>1408;
Assert.equal(a1, 1408);
Assert.equal(a2, 1408);
let b1 = 'NARC' as const;
let b2 = <const>'NARC';
Assert.equal(b1, 'NARC');
Assert.equal(b2, 'NARC');
let c1 = [255, 0, 0] as const;
let c2 = <const>[255, 0, 0];
Assert.equal(JSON.stringify(c1), '[255,0,0]');
Assert.equal(JSON.stringify(c2), '[255,0,0]');
let d1 = { mem: 'member' } as const;
let d2 = <const>{ mem: 'member' };
Assert.equal(JSON.stringify(d1), '{"mem":"member"}');
Assert.equal(JSON.stringify(d2), '{"mem":"member"}');


let obj1 = { kind: "circle", length: 80 };
let obj2 = { kind: "square", length: 50 };

function func() {
  let result = [obj1, obj2] as const;
  return result;
}
for (const shape of func()) {
  if (shape.kind === "circle") {
    Assert.equal(shape.length, 80);
  } else {
    Assert.equal(shape.length, 50);
  }
};
