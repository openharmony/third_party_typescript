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
function sendableFunction1(): void{

}

@Sendable
function sendableFunction2(): number{
    return 0;
}

@Sendable
function sendableFunction3(): string{
    return '1';
}

@Sendable
class SendableClass {
    new SendableClass1(); // OK
    sendableFunction1(); // OK
    sendableFunction2(); // OK
    sendableFunction3(); // OK
    handle() {
        new SendableClass1(); // OK
        sendableFunction1(); // OK
        sendableFunction2(); // OK
        sendableFunction3(); // OK
    }
}