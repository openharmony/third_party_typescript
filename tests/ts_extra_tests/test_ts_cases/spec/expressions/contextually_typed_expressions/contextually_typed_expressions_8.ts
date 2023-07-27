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
  In a typed function call, argument expressions are contextually typed by their corresponding parameter types.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

const obj: Record<string, any> = {
  boo: false,
  arr: ['a', 'b', 'c']
}
const para = <T extends {}>(str: string): [T, Function] => {
  const result1: T = obj[str];
  const result2: Function = (value: T) => {
    obj[str] = value;
    return obj[str];
  }
  return [result1, result2];
}
const [boo, mem2] = para('boo');
const [arr, mem4] = para('arr');
Assert.isBoolean(boo);
Assert.equal(arr, 'a,b,c');
let x = mem2(true);
let y = mem4(false);
Assert.isTrue(x);
Assert.isFalse(y);