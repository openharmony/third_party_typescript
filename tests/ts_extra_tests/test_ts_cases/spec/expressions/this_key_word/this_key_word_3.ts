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
    In a function declaration or a function expression, this is of type Any.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

interface Str {
    id: number;
}
interface Obj {
    name: string;
    getName(this: Obj): string;
}
interface Obj2 {
    name: string;
    getName(this: Str): number;
}
let obj: Obj = {
    name: "obj",
    getName() {
        return this.name;
    },
}
let obj2: Obj2 & Str = {
    name: "obj2",
    id: 1,
    getName() {
        return this.id;
    }
}
Assert.equal(obj.getName(), "obj");
Assert.equal(obj2.getName(), 1);