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
 

class NonSendableClass { public a = '' }
class NonSendableClass2 { public b = '' }
@Sendable
class SendableClass { public a: string = '' }
@Sendable
class SendableClass2 { public b: string = '' }
interface IStruct1 { a: '' }
interface IStruct2 { b: '' }
type alis1 = SendableClass
type alis2 = SendableClass2

/*
 * 1. `any` type can be converted to `Sendable`.
 */

let objectAnyType = Object() as SendableClass
let objectAnyType2 = 1 as ESObject as SendableClass
let objectAnyType3 = JSON.parse('') as SendableClass