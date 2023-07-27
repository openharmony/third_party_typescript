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
  TypeScript 2.7 improves the handling of structurally identical classes in union types and instanceof expressions:
  Structurally identical, but distinct, class types are now preserved in union types (instead of eliminating all but one).
  Union type subtype reduction only removes a class type if it is a subclass of and derives from another class type in the union.
  Type checking of the instanceof operator is now based on whether the type of the left operand derives from the type indicated by the right operand (as opposed to a structural subtype check).
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

class C1{
  num: number;
  constructor(num: number) {
    this.num = num;
  }
}
class C2 extends C1{
  str: string;
  constructor(num: number,str:string) {
    super(5);
    this.num = num;
    this.str = str;
  }
}
class C3 extends C1{
  boo: boolean;
  constructor(num: number,boo:boolean) {
    super(6);
    this.num = num;
    this.boo = boo;
  }
}
class C4 extends C1{
  obj: object;
  constructor(num: number, obj: object) {
    super(7);
    this.obj = obj;
    this.num = num;
  }
}

let t1 = !true ? new C1(10) : new C2(11, 'a');
function func1(arg: C1 | C2 | C3 | C4) {
  if (arg instanceof C1) {
    arg.num = 20;
    return arg.num
  }
  return false;
}
Assert.equal(func1(t1), 20);

let t2 = !true ? new C2(12, 'b') : new C3(13, false);
function func2(arg: C1 | C2 | C3 | C4) {
  if (arg instanceof C3) {
    arg.num = 20;
    return arg.num
  }
  return false;
}
Assert.equal(func2(t2), 20);

let t3 = !true ? new C3(14, true) : new C4(15, { a: 'a' });
function func3(arg: C1 | C2 | C3 | C4) {
  if (arg instanceof C4) {
    arg.num = 20;
    return arg.num
  }
  return false;
}
Assert.equal(func3(t3), 20);


function func(x: C2 | C3 | C4) {
  if (x instanceof C2 ) {
    return x.str;
  } else if (x instanceof C3) {
    return x.boo;
  } else {
    return x.obj
  }
}
Assert.isString(func(new C2(1, 'C2')));
Assert.isBoolean(func(new C3(2, true)));
Assert.isObject(func(new C4(3, { o: 'obj' })));