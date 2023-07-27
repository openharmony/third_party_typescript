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
  The second change is that rest elements can occur anywhere in a tuple - not just at the end!
  Note that in cases when we spread in a type without a known length, the resulting type becomes unbounded as well, and all the following elements factor into the resulting rest element type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

type N = [number, number, number];
type S = [string, string, string];
type NBSB = [...N, boolean, ...S, boolean]
function mergedArray1(nbsb: NBSB): string {
  return JSON.stringify(nbsb);
}
let a: NBSB = [1, 2, 3, true, 'A', 'B', 'C', false];
let s = mergedArray1(a);
Assert.equal(s, '[1,2,3,true,"A","B","C",false]');
