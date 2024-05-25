/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

declare namespace lang {
  interface ISendable {}
}

// sendable class
@Sendable
class sendableClassA {}

// sendable class var
let sendableVar = sendableClassA

// non-sendable class
class nonSendableClassB {}

// non-sendable class var
let nonSendableVar = nonSendableClassB

// sendable interface
interface sendableInterface extends lang.ISendable {}

// non-sendable interface
interface nonSendableInterface {}

export { 
  sendableClassA,
  sendableVar,
  nonSendableClassB,
  nonSendableVar,
  sendableInterface,
  nonSendableInterface,
  lang,
};