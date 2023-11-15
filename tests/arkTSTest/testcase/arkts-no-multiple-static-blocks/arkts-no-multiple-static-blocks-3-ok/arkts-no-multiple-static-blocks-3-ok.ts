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


// Multiple static blocks for ets use.
export class MyClass {
  static s1: string
  static s2: number

  static {
    MyClass.s1 = 'Hello'
    MyClass.s2 = 42
    console.log('First static block')
  }

  static {
    console.log('Second static block')
    console.log(`s1: ${MyClass.s1}`)
    console.log(`s2: ${MyClass.s2}`)
  }

  static {
    console.log('Third static block')
    if (MyClass.s2 === 42) {
      console.log('s2 is 42')
    }
  }
}
