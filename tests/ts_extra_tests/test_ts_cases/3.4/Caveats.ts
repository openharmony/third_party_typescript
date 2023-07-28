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
    One thing to note is that const assertions can only be applied immediately on simple literal expressions.
    Another thing to keep in mind is that const contexts don’t immediately convert an expression to be fully immutable.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../suite/assert.js"

let math = 1/3;
let compare = math<0.5? 1 as const:3 as const;
Assert.isNumber(compare);
Assert.equal(compare,1);

let list = [9,8,7,6,5];

let bar = {
    name: "foo",
    age:1,
    contents: list,
} as const;

bar.contents.push(21);
Assert.equal(list[5],21);

bar.contents.pop();
Assert.equal(list.length,5);
Assert.equal(list[5],undefined);