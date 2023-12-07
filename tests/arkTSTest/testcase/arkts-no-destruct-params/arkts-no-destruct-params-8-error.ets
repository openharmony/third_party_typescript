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
interface JoinArrayParams {
  arr: string[]
  separator: string
}

function joinArray({ arr, separator }: JoinArrayParams): string {
  return arr.join(separator)
}

const array: string[] = ['Hello', 'world']
const separator: string = '-'
const result: string = joinArray({ arr: array, separator: separator })
console.log(result)
