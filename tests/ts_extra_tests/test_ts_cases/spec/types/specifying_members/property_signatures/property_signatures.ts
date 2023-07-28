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
    the PropertyName of a property signature must be unique within its containing type, and must denote a well-known symbol if it is a computed property name. 
    if the property name is followed by a question mark, the property is optional. Otherwise, the property is required.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

let fname: { fristName: string, middleName?: string, lastName: string; } = { fristName: "NARC", lastName: "TypeScript" };
let f2name: { fristName: string, middleName?: string, lastName: string; } = {
  fristName: "Isaac",
  middleName: "F",
  lastName: "Newton",
};
function fullName(name: { fristName: string, middleName?: string, lastName: string; }): string {
  if (name.middleName != undefined) {
    return name.fristName + " " + name.middleName + " " + name.lastName;
  } else {
    return name.fristName + " " + name.lastName;
  }
}
let fn1: string = fullName(fname);
Assert.equal(fn1, "NARC TypeScript");
let fn2: string = fullName(f2name);
Assert.equal(fn2, "Isaac F Newton");