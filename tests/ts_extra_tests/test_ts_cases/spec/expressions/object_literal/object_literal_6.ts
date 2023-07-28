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
    If a get accessor is declared for a property, 
    the return type of the get accessor becomes the type of the property. 
    If only a set accessor is declared for a property, 
    the parameter type of the set accessor becomes the type of the property.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

class C{
    private mem;
    constructor(mem: string) {
        this.mem = mem;
    }
    get Mem(): string {
        return this.mem;
    }
    set Mem(mem: string) {
        this.mem = mem;
    }
}
let c = new C('a');
Assert.isString(c.Mem);
