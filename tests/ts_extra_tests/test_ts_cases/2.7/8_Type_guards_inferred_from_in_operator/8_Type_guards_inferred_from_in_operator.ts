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
  The in operator now acts as a narrowing expression for types.
  For a n in x expression, where n is a string literal or string literal type and x is a union type, the “true” branch narrows to types which have an optional or required property n, and the “false” branch narrows to types which have an optional or missing property n.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

type myType = { [T in 'key1' | 'key2' | 'key3']: string };
let mt: myType = {
  key1: 'a',
  key2: 'b',
  key3: 'c'
}
Assert.isObject(mt);

interface I1{
  name: string;
  age: number;
}
interface I2{
  height: number;
}
let i1: I1 = {
  name: 'xiao',
  age: 18
};
let i2: I2 = {
  height: 180
};
function func(arg: I1 | I2) {
  if ('name' in arg) {
    arg.age = 20;
    return arg.age;
  } 
  arg.height = 185;
  return arg.height;
}
Assert.equal(func(i1), 20);
Assert.equal(func(i2), 185);