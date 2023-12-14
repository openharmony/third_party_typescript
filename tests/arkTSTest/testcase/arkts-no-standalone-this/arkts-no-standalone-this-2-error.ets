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
  Counterexample: Using this to call other static methods in a class's static methods.
*/
class Logger {
  static log(message: string): void {
    console.log(this.formatMessage(message))
  }

  static formatMessage(message: string): string {
    return `[${new Date().toISOString()}] ${message}`
  }
}

Logger.log('Hello, world!')
