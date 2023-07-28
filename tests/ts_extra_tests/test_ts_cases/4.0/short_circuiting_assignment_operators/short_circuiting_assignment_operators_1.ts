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
    JavaScript, and a lot of other languages, support a set of operators called compound assignment operators. 
    Compound assignment operators apply an operator to two arguments, 
    and then assign the result to the left side. You may have seen these before:
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

let a: number = 1;
let b: number = 2;
a += b;
Assert.equal(a, 3);

let c: number = 4;
let d: number = 3;
c -= d;
Assert.equal(c, 1);

let e: number = 5;
let f: number = 6;
e *= f;
Assert.equal(e, 30);

let g: number = 7;
let h: number = 8;
g /= h;
Assert.equal(g, 0.875);

let j: number = 2;
let k: number = 3;
j **= k;
Assert.equal(j, 8);

let m: number = 20;
let n: number = 30;
m <<= n;
Assert.equal(m, 0);

let o: number = 4;
let p: number = 5;
let o1 = o && p;
o &&= p;
Assert.equal(o, 5);
Assert.equal(o1, 5);

let s: number = 7;
let t: number = 8;
let s1 = s || t;
s ||= t;
Assert.equal(s, 7);
Assert.equal(s1, 7);

let u: number = 10;
let v: number = 20;
let u1 = u ?? v;
u ??= v;
Assert.equal(u1, 10);
Assert.equal(u, 10);
