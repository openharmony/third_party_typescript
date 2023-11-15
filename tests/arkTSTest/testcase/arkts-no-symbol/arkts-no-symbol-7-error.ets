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


/* 
description：The Symbol() API in TypeScript is used to generate unique property names at runtime. Since the common use cases of this API do not make sense in statically typed languages, ArkTS does not support the Symbol() API. In ArkTS, the object layout is determined at compile time and cannot be changed at runtime.
type: Positive example
*/
class EvenNumber {
  static [Symbol.hasInstance](instance: number) {
    return typeof instance === "number" && instance % 2 === 0;
  }
}

const number1 = 10;
const number2 = 7;

// console.log(number1 instanceof EvenNumber); 
// console.log(number2 instanceof EvenNumber); 
