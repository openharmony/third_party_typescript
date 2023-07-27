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
    In a constructor, instance member function, instance member accessor,
    or instance member variable initializer, this is of the this-type (section 3.6.3) of the containing class.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

class C {
    public mem: string;
    private num: number;
    constructor(mem: string, num: number) {
        this.mem = mem;
        this.num = num;
        Assert.isObject(this);
    }
    func() {
        return this;
    }
    get getNum() {
        Assert.isObject(this);
        return this.num;
    }
    set setNum(num: number) {
        this.num = num;
    }
}
let c: C = new C('a', 10);
c.getNum;
c.setNum = 11;
Assert.isObject(c.func());