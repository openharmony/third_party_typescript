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
   The distributive property of conditional types can conveniently be used to filter union types
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../suite/assert.js'

{
  type TA<T, U> = T extends U ? never : T;
  type TB<T, U> = T extends U ? T : never;

  type T0 = TA<string | boolean | number, number>;
  type T1 = TB<number, string | boolean | number>;

  let a: T0 = 'b';
  let b: T0 = true;
  let c: T1 = 1;

  Assert.equal(typeof a, 'string');
  Assert.equal(typeof b, 'boolean');
  Assert.equal(typeof c, 'number');
};