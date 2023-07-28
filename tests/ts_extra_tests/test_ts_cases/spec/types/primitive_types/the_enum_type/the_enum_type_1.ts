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
 description: Enum types are distinct user defined subtypes of the Number primitive type and vice versa
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

enum Color {
  Red,
  Green,
  Blue,
  Black,
}
let cc: Color = Color.Blue;
Assert.equal(cc, 2);
let ee: Color = Color.Blue;
let dd: number = cc;
Assert.equal(dd, Color.Blue);
dd = 15;
ee = dd;
Assert.equal(ee, 15);