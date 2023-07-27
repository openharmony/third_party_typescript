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
  The type T of a variable introduced by a simple variable declaration is determined as follows:
  If the declaration includes a type annotation, T is that type.
  Otherwise, if the declaration includes an initializer expression, T is the widened form (section 3.12) of the type of the initializer expression.
  Otherwise, T is the Any type.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../../../suite/assert.js'

var h_a;

var h_b: number;

var h_c = 30;

var h_d = { x: 40, y: "hello" };

var h_e: any = "test";
h_a = 1;
Assert.equal(1, h_a);

h_a = '111';
Assert.equal('111', h_a);

h_b = 20;
Assert.equal(20, h_b);

Assert.equal(30, h_c);

Assert.equal(40, h_d.x);
Assert.equal("hello", h_d.y);

var h_x = 50;
Assert.equal(50, h_x);
var h_x: number;
Assert.equal(50, h_x);
if (h_x == 50) {
  var h_x = 100;
  Assert.equal(100, h_x);

  h_x = 200;

  Assert.equal(200, h_x);
}

Assert.equal(200, h_x);