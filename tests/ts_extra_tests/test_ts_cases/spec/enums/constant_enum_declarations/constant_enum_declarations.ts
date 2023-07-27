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
     in a constant enum declaration, all members must have constant values and it is an error for a member declaration to specify an expression that isn't classified as a constant enum expression.
     it is an error to reference a constant enum object in any other context than a property access that selects one of the enum's members. 
     the only permitted references to the enum object are those that are replaced with an enum member value.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

const enum CED {
  None = -1,
  False,
  True = 1,
  DEF = 1024,
  Val = DEF / 8,
}
Assert.equal(CED.None, -1);
Assert.equal(CED.False, 0);
Assert.equal(CED.True, 1);
Assert.equal(CED.DEF, 1024);
Assert.equal(CED.Val, 128);
Assert.equal(CED["None"], -1);
Assert.equal(CED["False"], 0);
Assert.equal(CED["True"], 1);
Assert.equal(CED["DEF"], 1024);
Assert.equal(CED["Val"], 128);

enum CED_COPY {
  None = -1,
  False,
  True = 1,
  DEF = 1024,
  Val = DEF / 8,
}
Assert.equal(CED_COPY[-1], "None");
Assert.equal(CED_COPY[0], "False");
Assert.equal(CED_COPY[1], "True");
Assert.equal(CED_COPY[1024], "DEF");
Assert.equal(CED_COPY[128], "Val");