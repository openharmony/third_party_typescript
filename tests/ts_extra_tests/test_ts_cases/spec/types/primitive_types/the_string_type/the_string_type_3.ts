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
    the String primitive type behaves as an object type 
    with the same properties as the global interface type 'String'.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

let str: string = "string";
Assert.equal(str.charAt(1), "t");
Assert.equal(str.charCodeAt(2), 114);
Assert.equal(str.toString(), 'string');
Assert.equal(str.concat("new"), "stringnew");
str = "cbaabcda";
Assert.equal(str.indexOf("a"), 2);
Assert.equal(str.indexOf("a", 4), 7);
Assert.equal(str.lastIndexOf("b"), 4);
Assert.equal(str.lastIndexOf("b", 2), 1);