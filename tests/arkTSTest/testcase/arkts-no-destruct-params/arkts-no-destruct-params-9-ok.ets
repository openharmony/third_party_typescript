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
interface YearParams {
  year: number
}

function isLeapYear(params: YearParams): boolean {
  return (
    params.year % 4 === 0 &&
    (params.year % 100 !== 0 || params.year % 400 === 0)
  )
}

const result: boolean = isLeapYear({ year: 2023 })
console.log(result)
