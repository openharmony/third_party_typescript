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

 
// Counterexample: Calling a function without a return type.
function filterArray(numbers: number[], predicate: (num: number) => boolean) {
  return numbers.filter(predicate)
}

function isEven(num: number): boolean {
  return num % 2 === 0
}

function callFilterArrayFunction(numbers: number[]) {
  return filterArray(numbers, isEven)
}

console.log(callFilterArrayFunction([1, 2, 3, 4]))
