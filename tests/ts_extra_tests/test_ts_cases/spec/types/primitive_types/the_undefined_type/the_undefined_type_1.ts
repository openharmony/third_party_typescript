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
 description: The Undefined type corresponds to the similarly named JavaScript primitive type and is the type of the undefined literal.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

let u: undefined = undefined;
Assert.equal(u, undefined);
interface I2 {
    s: number;
}
interface I {
    a: number;
    b?: string;
    c?: number;
    d?: object;
    e?: string | number;
    f?: I2;
    g?: string & number;
}
let x: I = { a: 1 };
Assert.isUndefined(x.b);
Assert.isUndefined(x.c);
Assert.isUndefined(x.d);
Assert.isUndefined(x.e);
Assert.isUndefined(x.f);
Assert.isUndefined(x.g);