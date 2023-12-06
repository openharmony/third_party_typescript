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
description：The unary operators +, -, and ~ are only available for numeric types Use in functions
type: Positive example
*/
function applyUnaryPlus(num: number): number {
  return +num;
}

function applyUnaryMinus(num: number): number {
  return -num;
}

function applyBitwiseNot(num: number): number {
  return ~num;
}

console.log(applyUnaryPlus(5)); // output：5
console.log(applyUnaryMinus(5)); // output：-5
console.log(applyBitwiseNot(5)); // output：-6