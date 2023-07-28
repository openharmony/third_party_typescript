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
    Properties in an object type literal or interface declaration may be designated required or optional, 
    while properties declared in other contexts are always considered required.
    Properties that are optional in the target type of an assignment may be omitted from source objects.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

interface I {
    h_name: string;
    h_age: number;
    h_height?: number;
    h_weight?: number;
}
let h_s: I = {
    h_name: 'xiao',
    h_age: 19,
    h_height: 180
}
Assert.equal(h_s.h_name, 'xiao');
Assert.equal(h_s.h_age, 19);
Assert.equal(h_s.h_height, 180);