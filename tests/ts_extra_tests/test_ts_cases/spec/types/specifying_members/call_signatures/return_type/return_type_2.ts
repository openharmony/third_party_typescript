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
    When a call signature with no return type annotation occurs in a context without a function body, 
    the return type is assumed to be the Any type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../../suite/assert.js'

let add: { (x: number, y: number): any };
type anyT = ReturnType<typeof add>;
let x: anyT;
x = 1;
Assert.equal(x, 1);
x = "any";
Assert.equal(x, "any");
x = true;
Assert.equal(x, true);
x = undefined;
Assert.equal(x, undefined);