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
/**---
 description: >
    The compile-time processing of a typed function call consists,
    a list of candidate signatures is constructed from the call signatures in the function type in declaration order.
    A generic signature is a candidate in a function call with type arguments when the signature has the same number of type parameters 
    as were supplied in the type argument list, the type arguments satisfy their constraints, 
    and once the type arguments are substituted for their associated type parameters, 
    the signature is applicable with respect to the argument list of the function call.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

function fun<T, U>(x: Array<T>, y: Array<U>): Array<T>
function fun<T, U, V>(x: Array<T>, y: Array<U>, z: Array<V>): Array<T>
function fun<T, U, V>(x: Array<T>, y: Array<U>, z?: V): Array<T> {
  return x
}
let arr1: Array<number> = [1, 2, 3];
let arr2: Array<string> = ['a', 'b'];
let arr3: Array<boolean> = [true, false];
let a = fun<number, string>(arr1, arr2);
Assert.equal(a, arr1);
let b = fun<number, string, boolean>(arr1, arr2, arr3);
Assert.equal(b, arr1);