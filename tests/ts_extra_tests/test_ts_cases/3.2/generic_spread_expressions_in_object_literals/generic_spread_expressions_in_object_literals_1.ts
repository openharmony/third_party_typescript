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
    Object literals now allow generic spread expressions which now produce intersection types, 
    similar to the Object.assign function and JSX literals.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

function func<T, U>(arg: T, other: U) {
    return { ...arg, other };
}
let f1 = { num: 5, str: 'a' };
let f2 = { num: 8, str: 'b', boo: true };

Assert.isObject(func(f1, 'a'));
Assert.isObject(func(f2, 'b'));