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

 
// Positive example: Assigning values to objects using instances of class.
class Validator {
  static validateEmail(email: string): boolean {
    // Basic email validation logic
    const emailRegex = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$')
    return emailRegex.test(email)
  }
}

type ValidationFunction = (value: string) => boolean
const emailValidator: ValidationFunction = Validator.validateEmail

const isValidEmail = emailValidator('test@example.com')
console.log(isValidEmail) // Output: true
