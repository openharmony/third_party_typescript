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


namespace MathUtils {
  export function add(a: number, b: number): number {
    return a + b
  }

  export function subtract(a: number, b: number): number {
    return a - b
  }
}

let result1 = MathUtils.add(5, 3)
console.log(result1) // output: 8

let result2 = MathUtils.subtract(10, 4)
console.log(result2) // output: 6