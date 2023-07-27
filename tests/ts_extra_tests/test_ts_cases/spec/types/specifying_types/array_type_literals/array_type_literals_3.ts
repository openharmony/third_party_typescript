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
    When union, intersection, function, or constructor types are used as array element types they must be enclosed in parentheses. 
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

let test: string | number[];
test = 'string';
Assert.equal(test, 'string');
test = [3, 5];
Assert.equal(test[0], 3);
Assert.equal(test[1], 5);
let test2: (string | number)[];
test2 = [2, 'a'];
Assert.equal(test2[0], 2);
Assert.equal(test2[1], 'a');