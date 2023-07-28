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
  In ES2015, constructors which return an object implicitly substitute the value of this for any callers of super(). 
  it is necessary to capture any potential return value of super() and replace it with this.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

class Test {
    one: number;
    constructor(one: number) {
        this.one = one;
        return {
            one: 1,
        };
    }
}
class Test_sub extends Test {
    constructor(x: number) {
        super(x);
    }
}
let newC = new Test_sub(12);
Assert.equal(newC.one, 1);
Assert.notEqual(newC.one, 12);
