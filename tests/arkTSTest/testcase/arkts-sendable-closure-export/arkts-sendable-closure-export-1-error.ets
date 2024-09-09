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

@Sendable
class SendableClass1 {

}

@Sendable
function sendableFunction1() {

};

@Sendable
export class SendableClass2 {

}

@Sendable
export function sendableFunction2() {

};

@Sendable
class SendableClass3 {

}

@Sendable
function sendableFunction3() {

};

@Sendable
class SendableClass4 {

}

@Sendable
function sendableFunction4() {

};

@Sendable
class SendableClass5 {

}

@Sendable
function sendableFunction5() {

};

@Sendable 
class SendableClass {
  handle() {
    new SendableClass1(); // OK
    sendableFunction1(); // OK
    new SendableClass2(); // WARING, export decl
    sendableFunction2(); // WARING, export decl
    new SendableClass3(); // WARING, export { decl }
    sendableFunction3(); // WARING, export { decl }
    new SendableClass4(); // WARING, export { decl as alias }
    sendableFunction4(); // WARING, export { decl as alias }
    new SendableClass5(); // WARING, export default decl
  }
}

@Sendable
function sendableFunction() {
  new SendableClass1(); // OK
  sendableFunction1(); // OK
  new SendableClass2(); // WARING, export decl
  sendableFunction2(); // WARING, export decl
  new SendableClass3(); // WARING, export { decl }
  sendableFunction3(); // WARING, export { decl }
  new SendableClass4(); // WARING, export { decl as alias }
  sendableFunction4(); // WARING, export { decl as alias }
  new SendableClass5(); // WARING, export default decl
}

export { SendableClass3, 
        sendableFunction3, 
        SendableClass4 as sendableFunction42,
        sendableFunction4 as sendableFunction42 };


export default SendableClass5;
