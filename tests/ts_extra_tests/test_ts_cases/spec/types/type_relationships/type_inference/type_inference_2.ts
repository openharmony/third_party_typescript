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
  if S and T are references to the same generic type, 
  inferences are made from each type argument in S to each corresponding type argument in T.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

function map<T, U>(a: T[], f: (x: T) => U): U[] {
  var result: U[] = [];
  for (var i = 0; i < a.length; i++) result.push(f(a[i]));
  return result;
}

var names = ["Peter", "Paul", "Mary"];

var lengths = map(names, s => s.length);
Assert.equal(typeof lengths, 'object');