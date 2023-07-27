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
  The || operator permits the operands to be of any type.
  The type of the result is the union type of the two operand types.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

var a: any = 10;
var b: any = 's';
var c: boolean = false;
var d: boolean = true;
var e: number = 20;
var f: number = 15;
var g: string = 'a';
var h: string = 'b';
var i: undefined = undefined;
var j: undefined = undefined;
var k = a || b;
Assert.isNumber(k);
Assert.equal(k, 10);
var l = c || d;
Assert.isTrue(l);
var m = e || f;
Assert.isNumber(m);
Assert.equal(m, 20);
var n = g || h;
Assert.isString(n);
Assert.equal(n, 'a');
var o = i || j;
Assert.isUndefined(o);
var p = a || c;
Assert.isNumber(p);
Assert.equal(p, 10);
var q = a || e;
Assert.isNumber(q);
Assert.equal(q, 10);
var r = a || g;
Assert.isNumber(r);
Assert.equal(r, 10);
var s = a || i;
Assert.isNumber(s);
Assert.equal(s, 10);
var t = c || e;
Assert.isNumber(t);
Assert.equal(t, 20);
var u = c || g;
Assert.isString(u);
Assert.equal(u, 'a');
var v = c || i;
Assert.isUndefined(v);
var w = e || g;
Assert.isNumber(w);
Assert.equal(w, 20);
var x = e || i;
Assert.isNumber(x);
Assert.equal(x, 20);
var y = g || i;
Assert.isString(y);
Assert.equal(y, 'a');