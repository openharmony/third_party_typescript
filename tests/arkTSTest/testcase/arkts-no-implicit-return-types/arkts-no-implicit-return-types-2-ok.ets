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

 
// Positive example: Calling functions with significantly annotated return types.
function multiply(a: number, b: number): number {
  return a * b
}

// The return type can be omitted, and it will be inferred based on the return type of the multiply function.
function callMultiplyFunction(a: number, b: number): number {
  return multiply(a, b)
}

console.log(callMultiplyFunction(2, 3))
