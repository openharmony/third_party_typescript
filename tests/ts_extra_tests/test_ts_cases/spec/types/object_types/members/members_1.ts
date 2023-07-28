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
    Properties in a class declaration may be designated public, private, or protected, 
    while properties declared in other contexts are always considered public. 
    Private members are only accessible within their declaring class.
    Protected members are only accessible within their declaring class and classes derived from it.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class C {
    public h_pub: string;
    private h_pri: string;
    protected h_pro: string;
    constructor(h_pub: string, h_pri: string, h_pro: string) {
        this.h_pub = h_pub;
        this.h_pri = h_pri;
        this.h_pro = h_pro;
    }
    set(h_pri: string) {
        this.h_pri = h_pri;
    }
    get() {
        return this.h_pri;
    }
    output() {
        return this.h_pro;
    }
}
let x = new C('Public', 'Private', 'Protected');
Assert.equal(x.h_pub, 'Public');
Assert.equal(x.get(), 'Private');
Assert.equal(x.output(), 'Protected');
class Child extends C { }
let y = new Child('public', 'private', 'protected');
Assert.equal(y.output(), 'protected');