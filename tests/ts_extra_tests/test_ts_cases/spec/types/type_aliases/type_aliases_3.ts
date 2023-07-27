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
    Type aliases are referenced using type references. 
    Type references to generic type aliases produce instantiations of the aliased type with the given type arguments. 
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

interface I<T, U> {
    h_x: T;
    h_y: U;
}
interface I2<T, U> {
    h_y: T;
    h_b: U;
}
type MyType = I<number, string> | I2<string, boolean>
var mytest: MyType = {
    h_x: 10,
    h_y: 'y',
    h_b: true
}
Assert.isString(mytest.h_y);

type KeyOf<T, U> = keyof T & keyof U;
let key1: KeyOf<string, number> = 'toString';
let key2: KeyOf<boolean, symbol> = 'valueOf';
Assert.equal(key1, 'toString');
Assert.equal(key2, 'valueOf');
