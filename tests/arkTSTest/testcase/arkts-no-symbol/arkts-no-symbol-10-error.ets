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


class CustomMatcher {
  [Symbol.match](value: string): RegExpMatchArray | null {
    const matches = value.match(/Hello/g);
    return matches;
  }
}

const testString = "Hello, Hello!";
const customObj = new CustomMatcher();
const result = testString.match(customObj);
console.log(result); // output: [ 'Hello', 'Hello' ]