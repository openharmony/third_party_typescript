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
    A type alias may optionally have type parameters
    that serve as placeholders for actual types to be provided when the type alias is referenced in type references.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

type MyType = {
    h_name: string;
    h_age: number;
    h_height?: number;
    h_weight?: number
}
var h_ty: MyType = {
    h_name: 'xiao',
    h_age: 18,
    h_height: 180
}
Assert.equal(h_ty.h_height, 180);