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
  The ++ and -- operators in prefix or postfix form, require their operand to be of type Any, the Number primitive type, or an enum type, 
  and classified as a reference. They produce a result of the Number primitive type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

var a: any = '10';
a++;
a--;
--a;
++a;
Assert.isNumber(a);
Assert.equal(a, 10);
enum e {
  A,
  B,
  C,
  D
}
let b = e.A
b++;
b--;
++b;
--b;
Assert.isNumber(b);
Assert.equal(b, 0);
var c: number = 10;
c++;
++c;
--c;
c--;
Assert.isNumber(c);
Assert.equal(c, 10);