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
    A type reference references a named type or type parameter through its name and, in the case of a generic type, supplies a type argument list.
    A TypeReference consists of a TypeName that a references a named type or type parameter. A reference to a generic type must be followed by a list of TypeArguments.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

let obj: {
    month: number;
    day: number;
} = {
    month: 5,
    day: 15
}
Assert.equal(obj.month, 5);
Assert.equal(obj.day, 15);
function identity1<T, U>(value: T, message: U): [T, U] {
    return [value, message];
}
let identi = identity1<number, string>(1, 'string');
Assert.equal(identi[0], 1);
Assert.equal(identi[1], 'string');