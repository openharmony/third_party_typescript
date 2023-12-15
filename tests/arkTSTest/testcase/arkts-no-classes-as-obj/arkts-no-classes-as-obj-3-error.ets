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

 
// Counterexample: Assigning a Class to a Variable.
class Calculator {
  static add(a: number, b: number): number {
    return a + b
  }
}

function performOperation(
  a: number,
  b: number,
  operation: (a: number, b: number) => number
): number {
  return operation(a, b)
}

const calculator: typeof Calculator = Calculator
const result: number = performOperation(2, 3, calculator.add)
console.log(result) // Output: 5
