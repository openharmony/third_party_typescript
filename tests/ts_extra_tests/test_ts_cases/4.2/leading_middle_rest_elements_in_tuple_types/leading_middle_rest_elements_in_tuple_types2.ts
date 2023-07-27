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
  they can have optional elements and rest elements, and can even have labels for tooling and readability.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

type myType = Function | object;

let tup1: [myType, string?] = [() => { }];
tup1 = [{ o: "obj" }, "a"];

let tup2: [arg1: myType, arg2?: string] = [() => { }];
tup2 = [{ o: "obj" }, "a"];

let tup3: [myType, string, ...unknown[]];

tup3 = [() => { }, "world"];
tup3 = [{ o: "obj" }, "world", false];
tup3 = [{ o: "obj" }, "world", true, 2];

Assert.equal(JSON.stringify(tup1), "[{\"o\":\"obj\"},\"a\"]");
Assert.equal(JSON.stringify(tup2), "[{\"o\":\"obj\"},\"a\"]");
Assert.equal(JSON.stringify(tup3), "[{\"o\":\"obj\"},\"world\",true,2]");