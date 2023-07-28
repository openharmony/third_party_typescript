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

var gstr: string = "";
function newTarget(): void {
    if (new.target === undefined) {
        gstr = "The function is called without \"new\"";
    } else {
        gstr = "The function is called with \"new\"";
    }
}
newTarget();
var ntf1: string = gstr;
Assert.equal(ntf1, "The function is called without \"new\"");

new (newTarget as any)();
var ntf2: string = gstr;
Assert.equal(ntf2, "The function is called with \"new\"");