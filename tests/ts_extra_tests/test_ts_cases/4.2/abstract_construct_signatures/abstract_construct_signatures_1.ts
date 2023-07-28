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
  Assign an abstract class to anything that expects a construct signature is the right thing in case we intend to run code.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

abstract class myClass {
    abstract getMy(): number;
}
interface myInter {
    getMy(): number;
}

function func(myCode: new () => myInter) {
    let test = new myCode();
    return test.getMy();
}

class my_C extends myClass {
    getMy(): number {
        return 10;
    }
}

Assert.equal(func(my_C), 10);