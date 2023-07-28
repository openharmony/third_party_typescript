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
     Common properties of unions are now considered discriminants as long as they contain some singleton type, 
     and they contain no generics.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

interface I<T>{
    mem: { x: Error, y: undefined } | { x: undefined, y: T };
}
function fun<T>(arg: I<T>) {
    if (arg.mem.x) {
        throw arg.mem.x;
    }
    return arg.mem.y;
}

let i1 = {
    mem: { x: undefined, y: undefined, }
};
let result1 = fun(i1);
Assert.isUndefined(result1);

let i2 = {
     mem: { x: undefined, y: 10 }
};
let result2 = fun(i2);
Assert.isNumber(result2);

type R<T> = { e: Error; data: null } | { e: null; data: T };

function func<T>(result: R<T>) {
    if (result.e) {
        throw result.e;
    }
    return result.data;
}

var a = {
    e: null,
    data: null,
};
var b = func(a);
let f = false;
if (b == null) {
    f = true;
}
Assert.isTrue(f);

var c = {
    e: null,
    data: 10,
};
var d = func(c);
Assert.equal(d, 10);
