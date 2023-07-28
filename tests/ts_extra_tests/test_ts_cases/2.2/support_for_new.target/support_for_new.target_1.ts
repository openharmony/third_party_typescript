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
    the new.target meta-property is new syntax introduced in ES2015. When an instance of a constructor is created via new, the value of new.target is set to be a reference to the constructor function initially used to allocate the instance. 
    if a function is called rather than constructed via new, new.target is set to undefined.
 options:
    lib: es2015
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

class A {
    public cname: string;
    constructor() {
        this.cname = new.target.name;
    }
}

class B extends A { constructor() { super(); } }

var na = new A();
Assert.equal(na.cname, "A");
var nb = new B();
Assert.equal(nb.cname, "B");

class C {
    public data: any;
    constructor() {
        this.data = new.target;
    }
}
class D extends C { constructor() { super(); } }

var nc = new C();
Assert.equal(nc.data.name, "C");
var nd = new D();
Assert.equal(nd.data.name, "D");