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
class SendableClassT<T> {
  public var1: number = 1;
  public var2: string = '1';
}

@Sendable
class SendableClass1 {
  public var1: number = 1;
  public var2: string = '1';
}

@Sendable
class SendableClass2 {
  public var1: number = 1;
  public var2: string = '1';
}

class NonSendableClass1 {}
class NonSendableClass2 { public p1 = 1 }

/*
 * 1. The generic parameter of `SendableClass` must be of a `Sendable` type.
 * 2. If the parameter is a union, each type in the union must be a `Sendable` type.
 */
let A1: SendableClassT<SendableClass1 | SendableClass2> = new SendableClassT<SendableClass1 | SendableClass2>();