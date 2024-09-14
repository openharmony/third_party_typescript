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
 * 1. `NonSendable` can be converted to `NonSendable`.
 * 2. `NonSendable` can be converted to a union type that includes `Sendable`.
 * 3. `Sendable` has no conversion restrictions.
 * 4. Union types that include `null` or `undefined` can be considered as the type without them.
 * 5. Union with system types (e.g., `number`, `string`) have special behavior.
 */
/* // cmp `let struct2 = new NonSendableClass() as IStruct1;` */
/* // cmp `let struct3 = new NonSendableClass() as IStruct1 | SendableClass;` */
/* // cmp `let struct4 = new NonSendableClass() as SendableClass | IStruct1;` */
/* // cmp `let struct5 = new NonSendableClass() as SendableClass | boolean;` */
let struct6 = new NonSendableClass() as SendableClass | null; // ERROR
let struct7 = new NonSendableClass() as SendableClass | undefined; // ERROR
let struct8 = new NonSendableClass() as SendableClass | alis1; // ERROR
/* // cmp `let struct9 = new NonSendableClass() as SendableClass | alis2;` */
let struct10 = new NonSendableClass() as SendableClass; // ERROR
/* // cmp `let struct11 = new NonSendableClass() as IStruct1;` */
let struct12 = new NonSendableClass() as undefined; // TSC


let noStruct1 = new NonSendableClass2() as IStruct1; // TSC
let noStruct2 = new NonSendableClass2() as SendableClass | IStruct1; // TSC
let noStruct3 = new NonSendableClass2() as SendableClass | null; // ERROR
let noStruct4 = new NonSendableClass2() as SendableClass | undefined; // ERROR
let noStruct5 = new NonSendableClass2() as SendableClass | boolean; // TSC
let noStruct6 = new NonSendableClass2() as SendableClass; // ERROR
let noStruct7 = new NonSendableClass2() as boolean; // TSC
let noStruct8 = new NonSendableClass2() as SendableClass | number; // TSC