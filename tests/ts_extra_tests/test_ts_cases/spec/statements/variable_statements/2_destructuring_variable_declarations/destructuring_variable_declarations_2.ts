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
   The type T associated with a destructuring variable declaration is determined as follows:
   If the declaration includes a type annotation, T is that type.
   Otherwise, if the declaration includes an initializer expression, T is the type of that initializer expression.
   Otherwise, T is the Any type.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../../../suite/assert.js'

interface IPerson {
    myname: string,
    myage: number,
}

var customer: IPerson = {
    myname: "Tom",
    myage: 10,
}
let { myname, myage } = customer;

Assert.isString(myname);
Assert.isNumber(myage)


let o = {
    a: "foo",
    b: 12,
    c: "bar"
};
let { a: newName1 } = o;
Assert.isString(newName1);
var ohArray: number[] = [10, 20, 30];

var [x, y, z = 10, k = 10] = ohArray;
Assert.equal(10, x);
Assert.equal(20, y);
Assert.equal(30, z);
Assert.equal(10, k);

