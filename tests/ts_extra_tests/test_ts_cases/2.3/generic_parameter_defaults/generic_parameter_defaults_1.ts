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
    typescript 2.3 adds support for declaring defaults for generic type parameters.
    a type parameter is deemed optional if it has a default.Required type parameters must not follow optional type parameters.
    when specifying type arguments, you are only required to specify type arguments for the required type parameters. Unspecified type parameters will resolve to their default types.If a default type is specified and inference cannot choose a candidate, the default type is inferred.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

type ALL = string | number | boolean | object;
function fun1<V, T = V[]>(v: V, t: T) {
   return JSON.stringify({ v, t });
}
let f1 = fun1<number>(1, [1, 0]);
Assert.equal(f1, "{\"v\":1,\"t\":[1,0]}")

let f2 = fun1<string, number>("A", 0);
Assert.equal(f2, "{\"v\":\"A\",\"t\":0}");

let f3 = fun1<ALL>("A", [1, "A"]);
Assert.equal(f3, "{\"v\":\"A\",\"t\":[1,\"A\"]}");
