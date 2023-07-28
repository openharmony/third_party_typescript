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
   TypeScript 4.3 now includes some slightly smarter type-narrowing logic on generic values.
   This allows TypeScript to accept more patterns, and sometimes even catch mistakes.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

function funSetorArray<T, C extends Set<T> | T[]>(collection: C): C {
  if (collection instanceof Set) {
    return collection;
  }
  return collection;
}

let num: number[] = [1, 3, 2, 2, 4];
let n = funSetorArray(num);
Assert.equal(JSON.stringify(funSetorArray(num)), "[1,3,2,2,4]");

let ss = new Set<string>();
ss.add("NARC");
ss.add("TypeScript");
let ts = funSetorArray(ss);
Assert.isTrue(ts.has("NARC"));
Assert.isTrue(ts.has("TypeScript"));