/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
    In TypeScript 5.0, you can now add a const modifier to a type 
    parameter declaration to cause const-like inference to be the default. 
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

function constTest<const T extends readonly string[]>(args: T): T {
  return args;
};

const myString = ['a', 'b', 'c'];

let myArr = constTest(myString);
Assert.equal(myArr[2], 'c');

myArr[2] = 'd';
Assert.equal(myArr[2], 'd');