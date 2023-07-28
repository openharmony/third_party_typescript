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
    tuple types now permit a ? postfix on element types to indicate that the element is optional.In strictNullChecks mode, a ? modifier automatically includes undefined in the element type, similar to optional parameters.
    a tuple type permits an element to be omitted if it has a postfix ? modifier on its type and all elements to the right of it also have ? modifiers.
    The length property of a tuple type with optional elements is a union of numeric literal types representing the possible lengths. For example, the type of the length property in the tuple type [number, string?, boolean?] is 1 | 2 | 3.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let opt: [number, string?, boolean?, number[]?];
opt = [1024, "str", true, [1, 2]];
Assert.equal(JSON.stringify(opt), "[1024,\"str\",true,[1,2]]");
Assert.equal(opt.length, 4);
opt = [1024, "str", true];
Assert.equal(JSON.stringify(opt), "[1024,\"str\",true]");
Assert.equal(opt.length, 3);
opt = [1408, "N"];
Assert.equal(JSON.stringify(opt), "[1408,\"N\"]");
Assert.equal(opt.length, 2);
opt = [0];
Assert.equal(JSON.stringify(opt), "[0]");
Assert.equal(opt.length, 1);