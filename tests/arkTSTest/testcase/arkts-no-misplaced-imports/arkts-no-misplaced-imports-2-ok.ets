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

 
// Example: Import the module of the default export and merge it with the named export into one object (back)

import moduleDefault, * as myModule from './path/module'
// Generic functions
function reverse<T>(array: T[]): T[] {
  return array.reverse()
}

let names: string[] = ['Alice', 'Bob', 'Charlie']
let reversedNames = reverse(names)
console.log(reversedNames)
