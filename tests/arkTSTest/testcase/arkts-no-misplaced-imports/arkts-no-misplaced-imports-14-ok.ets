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

 
// Example: Import and rename modules for default and named exports (back)

import moduleDefault, {
  namedExport1 as myExport1,
  namedExport2 as myExport2,
} from './path/moduleName'
// Arrays and iterations
let numbers: number[] = [1, 2, 3, 4, 5]
for (let num of numbers) {
  console.log(num)
}

let doubledNumbers = numbers.map((num) => num * 2)
console.log(doubledNumbers)
