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
description：The unary operators +, -, and ~ are only available for numeric types Use in a namespace
type: Positive example
*/
namespace MathOperations {
  export function negateNumber(num: number): number {
    return -num; // Use unary operators - Negate numeric values
  }

  export function bitwiseNot(num: number): number {
    return ~num; // Use the unary operator ~ to perform bitwise negation of values
  }
}

// Use functions in the namespace
const num = 10;
const negNum = MathOperations.negateNumber(num); // Gets the opposite of the numeric value
const bitwiseNotNum = MathOperations.bitwiseNot(num); // Bitwise negation of values
console.log(negNum, bitwiseNotNum);

