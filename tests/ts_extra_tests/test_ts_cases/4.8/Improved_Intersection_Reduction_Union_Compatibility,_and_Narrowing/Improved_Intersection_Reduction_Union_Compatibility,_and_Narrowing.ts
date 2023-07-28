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
    consistency improvements under --strictNullChecks.
    These changes affect how intersection and union types work, and are leveraged in how TypeScript narrows types.
    Another change is that {} intersected with any other object type simplifies right down to that object type.
 module: ESNext
 isCurrent: true
 strictNullChecks: false
 ---*/


import { Assert } from '../../../suite/assert.js'

type T1 = {} & string;
let a: T1 = "sss";
Assert.equal(a, "sss");

type T2 = {} & unknown;
let b: T2 = 2;
Assert.equal(b,2)

let x: unknown = 1;
function f1(x: unknown) {
    let y: null | undefined | {};
    y = x;
    if (x) {
        Assert.equal(y, 1);
    }
}
f1(x);

let z: T1 = "string";
function f2<T>(x: T, y?: T) {
    y = x;
    if (x) {
        Assert.equal(y, "string");
    }
}
f2<string>(z, undefined);

let bar: unknown = 555;
function f3(x: unknown, y?: {} | null | undefined) {
    y = x;
    Assert.equal(y, 555);
}
f3(bar, null);

function ensureNotNull<T>(x: T) {
    if (x != null){
        Assert.isNumber(x);
    }
}
let run: unknown = 111;
ensureNotNull<unknown>(run);
