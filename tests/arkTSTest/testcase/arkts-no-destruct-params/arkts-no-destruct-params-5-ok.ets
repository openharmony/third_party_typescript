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


// Positive example: Pass arguments directly to the function.
interface ArraySumParams {
  numbers: number[]
}

class Calculator {
  arraySum(params: ArraySumParams): number {
    return params.numbers.reduce((acc, curr) => acc + curr, 0)
  }
}

const calculator = new Calculator()
const result = calculator.arraySum({ numbers: [1, 2, 3, 4, 5] })
console.log(result)
