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
  The type inferred for a const variable or readonly property without a type annotation is the type of the literal initializer.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

const a = 1;
let aa: typeof a = 1;
Assert.equal(typeof aa , "number");
const b = false;
let bb: typeof b = false;
Assert.equal(typeof bb , "boolean");
const c = "hello";
let cc: typeof c = "hello";
Assert.equal(typeof cc , "string");


class Test {
  static readonly age = 12;
  static readonly isJob = false;
  static readonly nickName = "wangcai";
}

let age: typeof Test.age = 12;
Assert.equal(typeof age, "number");
let isJob: typeof Test.isJob = false;
Assert.equal(typeof isJob, "boolean");
let nickName: typeof Test.nickName = "wangcai";
Assert.equal(typeof nickName, "string");