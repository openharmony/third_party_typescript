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
      Arrow functions are extended from JavaScript to optionally include parameter and return type annotations.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

const addNumbers = (num1: number, num2: number): number => {
  return num1 + num2;
};
const result1 = addNumbers(5, 10);
Assert.equal(result1, 15);
const greet = (name: string) => {
  return name;
};
const result2 = greet("Alice");
Assert.equal(result2, "Alice");