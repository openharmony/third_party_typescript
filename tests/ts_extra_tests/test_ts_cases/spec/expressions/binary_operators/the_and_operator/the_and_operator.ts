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
   The && operator permits the operands to be of any type and produces a result of the same type as the second operand.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

var a: any = 10
var b: any = 's'
var c: boolean = false
var d: boolean = true
var e: number = 20
var f: number = 15
var g: string = 'a'
var h: string = 'b'
var i: undefined = undefined
var j: undefined = undefined
var k = a && b
Assert.isString(k);
Assert.equal(k, 's');
var l = c && d
Assert.isFalse(l);
var m = e && f
Assert.isNumber(m);
Assert.equal(m, 15);
var n = g && h
Assert.isString(n);
Assert.equal(n, 'b');
var o = i && j
Assert.isUndefined(o);
var p = a && c
Assert.isFalse(p);
var q = a && e
Assert.isNumber(q);
Assert.equal(q, 20);
var r = a && g
Assert.isString(r);
Assert.equal(r, 'a');
var s = a && i
Assert.isUndefined(s);
var t = c && e
Assert.isFalse(t);
var u = c && g
Assert.isFalse(u);
var v = c && i
Assert.isFalse(v);
var w = e && g
Assert.isString(w);
Assert.equal(w, 'a');
var x = e && i
Assert.isUndefined(x);
var y = g && i
Assert.isUndefined(y);