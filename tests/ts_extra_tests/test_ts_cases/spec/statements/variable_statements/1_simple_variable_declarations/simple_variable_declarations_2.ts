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

interface Point { h_x: number; h_y: number; }

var h_a = { h_x: 0, h_y: 1 };
var h_b: Point = { h_x: 10, h_y: 11 };
var h_c = <Point>{ h_x: 100, h_y: 111 };
var h_d: { h_x: number; h_y: number; } = { h_x: 1000, h_y: 1001 };
var h_e = <{ h_x: number; h_y: number; }>{ h_x: 10000, h_y: 10001 };

Assert.equal(0, h_a.h_x);
Assert.equal(1, h_a.h_y);

Assert.equal(10, h_b.h_x);
Assert.equal(11, h_b.h_y);

Assert.equal(100, h_c.h_x);
Assert.equal(111, h_c.h_y);

Assert.equal(1000, h_d.h_x);
Assert.equal(1001, h_d.h_y);

Assert.equal(10000, h_e.h_x);
Assert.equal(10001, h_e.h_y);