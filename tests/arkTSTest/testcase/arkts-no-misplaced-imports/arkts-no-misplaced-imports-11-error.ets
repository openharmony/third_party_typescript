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

 
// Counterexample: Importing Modules for Default Export and Named Export (former)
// Conditional statements and loops
let num: number = 10

if (num > 0) {
  console.log('Positive number')
} else if (num < 0) {
  console.log('Negative number')
} else {
  console.log('Zero')
}

for (let i = 0; i < 5; i++) {
  console.log(i)
}
import moduleDefault, { namedExport1, namedExport2 } from './path/moduleName'
