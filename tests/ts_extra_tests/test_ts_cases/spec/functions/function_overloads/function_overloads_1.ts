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
  The parameter list of a function overload cannot specify default values for parameters. 
  In other words, an overload may use only the ? form when specifying optional parameters.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

function add(): number;
function add(x: number): number;
function add(x: number, y: number): number;
function add(x?: number, y?: number): number {
    let sum: number = 0;
    if (x) {
        sum += x;
    }
    if (y) {
        sum += y;
    }
    return sum;
}
Assert.equal(add(), 0);
Assert.equal(add(1), 1);
Assert.equal(add(1, 1), 2);