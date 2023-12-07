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

 
/* 
  Positive example: Using this in class instance methods.
*/
class StringUtils {
  reverse(str: string): string {
    return this.reverseString(str)
  }

  reverseString(str: string): string {
    return str.split('').reverse().join('')
  }
}

function printReversedString(reverseFn: (str: string) => string): void {
  const reversed = reverseFn('hello')
  console.log(reversed)
}

const stringUtils = new StringUtils()
printReversedString(stringUtils.reverse.bind(stringUtils)) // olleh
