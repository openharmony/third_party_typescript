/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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

@Sendable
class SendableClassA<T> {
    var1: number = 1;
    var2: string = '1';
}

@Sendable
class SendableClassB {
    var1: number = 1;
    var2: string = '1';
}

let A1: SendableClassA<SendableClassB> = new SendableClassA<SendableClassB>();
let A2: SendableClassA<number> = new SendableClassA<number>();
let A3: SendableClassA<string> = new SendableClassA<string>();
let A4: SendableClassA<boolean> = new SendableClassA<boolean>();
let A5: SendableClassA<bigint> = new SendableClassA<bigint>();
let A6: SendableClassA<null> = new SendableClassA<null>();
let A7: SendableClassA<undefined> = new SendableClassA<undefined>();