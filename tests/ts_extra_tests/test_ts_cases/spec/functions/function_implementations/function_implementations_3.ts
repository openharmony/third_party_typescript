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
  the inferred return type is the first of the types of the return statement expressions in the function body
  that is a supertype of each of the others, ignoring return statements with no expressions. 
  A compile-time error occurs if no return statement expression has a type that is a supertype of each of the others.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

function foo(x: string | number, y: string | boolean) {
    if (typeof x === "string") {
        return x.toUpperCase();
    } else if (typeof x === "number") {
        return x.toString();
    } else if (typeof y === "string") {
        return y.toUpperCase();
    } else {
        return y;
    }
}
type cc = ReturnType<typeof foo>;
let dd: cc = "string";
Assert.isString(dd);
dd = true;
Assert.isBoolean(dd);