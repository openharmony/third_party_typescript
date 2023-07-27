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
  Conditional Types.
module: ESNext
isCurrent: true
 ---*/


import { Assert } from "../../suite/assert.js"

interface I1{
  str: string;
}
interface I2{
  num: number;
}
type mT<T> = T extends I1 ? boolean : T extends I2 ? number : string;
function func1<T extends mT<I1>>(arg: T) {
  return arg;
}
Assert.isBoolean(func1(true));
function func2<T extends mT<I2>>(arg: T) {
  return arg;
}
Assert.isNumber(func2(5));
function func3<T extends mT<object>>(arg: T) {
  return arg;
}
Assert.isString(func3('a'));
