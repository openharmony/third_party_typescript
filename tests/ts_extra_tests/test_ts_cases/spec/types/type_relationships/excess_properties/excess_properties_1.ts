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
  the type contains only optional properties, without the excess property check, 
  any object literal would be assignable to the  variable.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

interface I {
    a?: number
    b?: boolean
    c?: string
}
let x: I = {
    a: 12,
    b: true,
    c: "ccc"
}
Assert.equal(x.a, 12);
Assert.equal(x.b, true);
Assert.equal(x.c, "ccc");
let y: I = {
    a: 11,
    b: false
}
Assert.equal(y.a, 11);
Assert.equal(y.b, false);
