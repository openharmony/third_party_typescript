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
   TypeScript 4.7 can now perform more granular inferences from functions within objects and arrays.
   This allows the types of these functions to consistently flow in a left-to-right manner just like for plain arguments.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

function func1<T>(arg: T): T{
  return arg;
}
var f1 = func1(5);
Assert.isNumber(f1);
var f2 = func1('a');
Assert.isString(f2);
var f3 = func1(true);
Assert.isBoolean(f3);
var f4 = func1({ num: 5 });
Assert.isObject(f4);
var f5 = func1(() => { return; });
Assert.isFunction(f5);

function func2<T>(arg: { member: (str: string) => T }) {
  return arg;
}
var f6 = func2({ member: str => { return str; } });
var result = f6.member('a');
Assert.isString(result);

function f<T>(arg: {
    arg1: (n: string) => T;
    arg2: (x: T) => void;
}) {
    arg.arg2 = function (x:T) {
      Assert.equal(typeof x, "String");
    }
    arg.arg2;
}
f({
    arg1: ():string => "string",
    arg2: (x:string) => x.toLowerCase(),
});
f({
    arg1: n => n,
    arg2: (x:string) => x.toLowerCase(),
});


class C<T>{
  arg: {
    mem: (str: string) => T;
    t: T;
  }
  constructor(arg: {
    mem: (str: string) => T;
    t: T;
  }) {
    this.arg = arg;
    this.arg.t = arg.t;
  }
}
var c1 = new C({
  mem: function () { return 'a' },
  t: 't'
})
Assert.isString(c1.arg.t);
var c2 = new C({
  mem() { return 'a' },
  t: 't'
})
Assert.isString(c2.arg.t);
var c3 = new C({
  mem: str => str,
  t: 't'
})
Assert.isString(c3.arg.t);


