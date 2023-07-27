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
 description: TypeScript is able to narrow types based on what’s called a discriminant property. For example, in the following code snippet, TypeScript is able to narrow the type of action based on every time we check against the value of name.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../suite/assert.js'

type T =
  | { name: "Name"; size: number }
  | { name: "Name2"; size: string };
function fun1(action: T) {
  if (action.name === "Name") {
    let num = action.size * 2;
    return num;
  } else if (action.name === "Name2") {
    const str = action.size.trim();
    return str;
  }
}
let action1: T = {
  name: "Name",
  size: 1
}
let action2: T = {
  name: "Name2",
  size: " 1234 "
}
Assert.equal(2, fun1(action1));
Assert.equal("1234", fun1(action2));
type Action2 =
  | { name: "Name"; size: number }
  | { name: "Name2"; size: string };
function fun2(action: Action2) {
  const { name, size } = action;
  if (name === "Name") {
    let num = size * 2;
    return num;
  } else if (name === "Name2") {
    const str = size.trim();
    return str;
  }
}
let action3: T = {
  name: "Name",
  size: 2
}
let action4: T = {
  name: "Name2",
  size: " 5678 "
}
Assert.equal(fun2(action3), 4);
Assert.equal(fun2(action4), "5678");