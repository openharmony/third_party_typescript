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


// Counterexample: Function declaration for parameter deconstruction.
function sum({ a = 0, b = 0, c = 0 }): boolean {
  const num = a + b + c
  const isEven = num % 2 === 0
  console.log(isEven)
  return isEven
}

sum({ a: 10, b: 3, c: 9 })
