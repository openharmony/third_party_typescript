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
   Conditional types are a bit of a power-user feature.
   They allow us to match and infer against the shape of types, and make decisions based on them.
   TypeScript 4.7 now allows to place a constraint on any infer type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

type myType1<T> = T extends (...arg: infer R) => number ? R : boolean;

const Add = (a: number, b: number) => a + b;
type add = typeof Add;
type t1 = myType1<add>;
const arr: t1 = [1, 2];
Assert.isObject(arr);

type fs = Function | string;
type myType2<T> = T extends [infer S extends fs, ...any[]] ? S : boolean;

const Min = (a: number, b: number)=>{
  if (a > b) {
    return b;
  } else {
    return a;
  }
}
type min = typeof Min;
type t2 = myType2<[min, number, string]>;
const func: t2 = Min;
Assert.isFunction(func);