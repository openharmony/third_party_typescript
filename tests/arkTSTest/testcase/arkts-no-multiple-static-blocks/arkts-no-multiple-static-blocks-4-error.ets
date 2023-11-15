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

 
// Counterexample：Multiple static blocks in class.
let condition1 = true
let condition2 = false

class MyClass {
  static {
    console.log('Static block 1')
    if (condition1) {
      console.log('Logic 1')
    }
  }

  static {
    console.log('Static block 2')
    if (condition2) {
      console.log('Logic 2')
    }
  }
}
