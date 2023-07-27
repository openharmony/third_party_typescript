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
  if f is a contextually typed function expression 
  the inferred return type is the union type of the types of the return statement expressions in the function body, 
  ignoring return statements with no expressions.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

function f(x: number) {
    switch (x) {
        case 0:
            return "hello";
        case 1:
            return 1;
        default:
            return true;
    }
}
type testType = ReturnType<typeof f>;
type ttStr = testType & string;
let tt1: ttStr = "hello";
Assert.isString(tt1);
type ttBoo = testType & boolean;
let tt2: ttBoo = true;
Assert.isBoolean(tt2);
type ttNum = testType & number;
let tt3: ttNum = 1;
Assert.isNumber(tt3);