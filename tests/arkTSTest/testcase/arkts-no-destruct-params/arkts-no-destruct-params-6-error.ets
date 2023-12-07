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
interface MyObject {
  name: string
  age: number
}

interface PropertyParams {
  obj: MyObject
  prop: keyof MyObject
}

function getProperty({ obj, prop }: PropertyParams): string {
  return obj[prop]
}

const obj: MyObject = { name: 'xiaoming', age: 30 }
const propertyValue: string = getProperty({ obj, prop: 'name' })
console.log(propertyValue)
