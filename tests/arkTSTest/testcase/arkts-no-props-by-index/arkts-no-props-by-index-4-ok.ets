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


// 4. ArkTS can only access fields that are already declared or inherited in a class (access declaration fields)
class Person {
  name: string = ''
  age: number = 0
  email: string = ''
  phoneNumber: string = ''
  constructor(name: string, age: number, email: string,
        phoneNumber: string) {
    this.name = name
    this.age = age
    this.email = email
    this.phoneNumber = phoneNumber
  }
}

let p = new Person('John', 30, '***@example.com', '18*********')
console.log(p.name)