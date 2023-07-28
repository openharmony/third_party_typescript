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
   A name that denotes a value has an associated type and can be referenced in expressions.
   A name that denotes a type can be used by itself in a type reference or on the right hand side of a dot in a type reference.
   A name that denotes a namespace can be used on the left hand side of a dot in a type reference.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let Rog: string = "a is string";
Assert.equal("a is string1", Rog + "1");
type Rog = String;
let newOne: Rog = "xx";
Assert.equal("xx", newOne);
namespace Rog {
  export type b = string;
}
let yoo: Rog.b = "ystr";
Assert.equal("ystr", yoo);