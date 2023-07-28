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
     when enum declarations are merged, they must either all specify a const modifier or all specify no const modifier.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

const enum T1 {
  Tex0,
  Tex1,
}
const enum T1 {
  Tex2 = 2,
  Tex3,
}
Assert.equal(T1.Tex0, 0);
Assert.equal(T1.Tex1, 1);
Assert.equal(T1.Tex2, 2);
Assert.equal(T1.Tex3, 3);
enum T2 {
  Tex0,
  Tex1,
}
enum T2 {
  Tex2 = 2,
  Tex3,
}
Assert.equal(T2.Tex0, 0);
Assert.equal(T2.Tex1, 1);
Assert.equal(T2.Tex2, 2);
Assert.equal(T2.Tex3, 3);