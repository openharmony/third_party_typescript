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

import {lang} from "@arkts.lang";

'use shared'

export const enum A{a, b} // ok, const enum is sendable type
export enum B{a, b} // error, enum is not sendable type
export let var1: number | A; // ok, union type of const enum and number
export let var2: A.a; // error, enum member is not sendable type

export class C{} // error, class is not sendable type
@Sendable
export class D{} // ok, sendable class is sendable type
export {D as DD};
export let var3: A | C; //error

export interface E{} // error, interface is not sendable type
type ee = E;
export {ee}; // error
let var4: C | ee;
export {var4}; // error

export * as ns from '@arkts.lang'; // err,  ns is not sendable type
export * from '@arkts.lang'; // error, export * from 'xxx' is not supported
export default lang.ISendable; // ok

export let var6: A | A.a; // error, union type of sendable and unsendbale
export let var7: string | B = 'aaa'; // error , union type of sendable and unsendbale
export let var8 = var7; // ok, no explicit type, the inferred type of var8 is string
namespace ns {
  export let a: C; // ok, exports from namespace is not checked
}

export {ns} // error, ns is not sendable type

function fun: boolean() {}
export {fun}
