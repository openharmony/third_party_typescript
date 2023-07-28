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
    In a static member function or static member accessor, the type of this is the constructor function type of the containing class.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

class C{
    static mem: string = 'a';
    static get getMem() {
        Assert.isFunction(this);
        return this.mem;
    }
    static set setMem(mem: string) {
        this.mem = mem;
    }
    static func() {
        return this;
    }
}
C.getMem;
Assert.isFunction(C.func());