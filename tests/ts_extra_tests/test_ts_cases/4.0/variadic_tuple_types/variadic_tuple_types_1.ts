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
  The first change is that spreads in tuple type syntax can now be generic. 
  This means that we can represent higher-order operations on tuples and arrays even when we don’t know the actual types we’re operating over. 
  When generic spreads are instantiated (or, replaced with a real type) in these tuple types, they can produce other sets of array and tuple types.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

function dropFrist<T, U>(arr1: T[], arr2: U[]): Array<T | U> {
  const [first, ...others] = [...arr1, ...arr2];
  return others;
}
let num123: number[] = [1, 2, 3];
let abc: string[] = ['a', 'b', 'c'];
let arr = dropFrist<number, string>(num123, abc);
Assert.equal(JSON.stringify(arr), '[2,3,"a","b","c"]');
