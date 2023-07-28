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
    if T is a union or intersection type:
    First, inferences are made from S to each constituent type in T 
    that isn't simply one of the type parameters for which inferences are being made.
    If the first step produced no inferences then 
    if T is a union type and exactly one constituent type in T is simply a type parameter for which inferences are being made, 
    inferences are made from S to that type parameter.
    Otherwise, if S is a union or intersection type, inferences are made from each constituent type in S to T.
 module: ESNext
 isCurrent: true
 ---*/

import { Assert } from '../../../../../suite/assert.js'


type Maybe<T> = T | void
function isDefined<T>(x: Maybe<T>): x is T {
    return x! == undefined && x !== null;
}
function isUndefined<T>(x: Maybe<T>): x is void {
    return x === undefined || x === null;
}
function getOrElse<T>(x: Maybe<T>, defaultValue: T): T {
    return isDefined(x) ? x : defaultValue;
}
function test1(x: Maybe<string>) {
    let x1 = getOrElse(x, "Undefined");
    Assert.isString(x1)
    let x2 = isDefined(x) ? x : "undefined";
    Assert.isString(x2)
    let x3 = isUndefined(x) ? "Undefined" : x;
    Assert.isString(x3)
}
test1('t1')
function test2(x: Maybe<number>) {
    let x1 = getOrElse(x, - 1);
    Assert.isNumber(x1)
    let x2 = isDefined(x) ? x : -1;
    Assert.isNumber(x2)
    let x3 = isUndefined(x) ? -1 : x;
    Assert.isNumber(x3)
}
test2(5);