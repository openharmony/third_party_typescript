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
  Counterexample: Declaring a function within a function. 
  Check if the value is even.
*/
function isEven(num: number): boolean {
  function divideByTwo(num: number): number {
    return num / 2
  }

  return divideByTwo(num) % 2 === 0
}

const result = isEven(57)
console.log(result)
