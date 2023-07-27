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
    properties of any name can be accessed through an Any value 
    and Any values can be called as functions or constructors with any argument list.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let x: any
let fun: any;
fun = (x: any) => x;
Assert.equal(fun(5), 5);
x = 1024;
x.toString();
Assert.isString(x.toString());
x = "AAA";
x.length;
Assert.equal(x.length, 3);
Assert.equal(fun(x), "AAA");
x = true;
Assert.equal(x, true);
Assert.equal(fun(x), true);
x = [1, 2, 3];
Assert.equal(x[0], 1);
Assert.equal(fun(x), "1,2,3");
x = ["aa", "bb"];
Assert.equal(x[0], "aa");
Assert.equal(fun(x), "aa,bb");
x = (a: number, b: number) => { return a + b };
Assert.isFunction(x);
Assert.isFunction(fun(x));
x = Symbol("aa");
Assert.isSymbol(x);
Assert.isSymbol(fun(x));
x = { a: 1, b: 1 };
Assert.isObject(x);
Assert.isObject(fun(x));
class C {
   public a: any;
   public b: any;
   constructor(a: any, b: any) {
      this.a = a;
      this.b = b;
   }
}
let c1 = new C(1, "1");
Assert.isNumber(c1.a);
let c2 = new C("aa", "bb");
Assert.isString(c2.a);
let c3 = new C(true, true);
Assert.isBoolean(c3.a);
let c4 = new C({}, {});
Assert.isObject(c4.a);