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
    allows you to re-map keys in mapped types with a new as clause.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

type G<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
interface I1 {
  a: string;
  b: number;
  c: string;
}
type I1Type = G<I1>;
let k1: I1Type = {
  getA() {
    return "honny";
  },
  getB() {
    return 2;
  },
  getC() {
    return "qingdao";
  },
};
Assert.equal(k1.getA(), "honny");
Assert.equal(k1.getB(), 2);
Assert.equal(k1.getC(), "qingdao");