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
 description: Variable declarations in 'for' statements are extended in the same manner as variable declarations in variable statements
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../../suite/assert.js'

let result = 0;
for (let i: number = 0; i < 10; i++) {
    result++;
}
Assert.equal(10, result);

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
for (let i: number = 0; i < arr.length; i++) arr[i] = 0;
Assert.equal(JSON.stringify(arr), '[0,0,0,0,0,0,0,0,0]');
