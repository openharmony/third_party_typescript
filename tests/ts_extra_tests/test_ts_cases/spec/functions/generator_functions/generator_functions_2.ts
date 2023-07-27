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
 description: Generator Functions
 options:
   lib: es2015
   target: es2015
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

function* g1(n: number, step: number = 1): Generator<number, void, unknown> {
  let i: number = 0, c: number = 0;
  while (true) {
    yield i += step;
    c++;
    if (c >= n) {
      break;
    }
  }
}
function getGeneratorArray(gen: Generator<any, any, any>, step: number = 1): any[] {
  let c: number = 0;
  let arr: any[] = [];
  let i: number = 0;
  while (true) {
    let next = gen.next();
    if (next.done == true) {
      break;
    }
    arr[i] = next.value;
    i++;
    Assert.equal(next.value, c += step);
  }
  return arr;
}
let genS1 = g1(10);
let arr: number[] = getGeneratorArray(genS1);
Assert.equal(JSON.stringify(arr), '[1,2,3,4,5,6,7,8,9,10]');