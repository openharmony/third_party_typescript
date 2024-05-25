/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import { A, A1, A as A2, B, B1, B as B2, C, C1, C as C2 } from './lib-dependencie'
import { I, J } from './lib-dependencie'

let a1 = {} as A;
let a2 = {} as A;
let a3 = {} as A;
let b1 = { value: 0 } as B;
let b2 = { value: 0 } as B1;
let b3 = { value: 0 } as B2;
let c1 = { value: 0 } as C;
let c2 = { value: 0 } as C1;
let c3 = { value: 0 } as C2;

let i = { v: 0 } as I;
let j = { v: 0, u: 0 } as J;

class D {}

function foo(d: D) {}
foo(new D() as A);
foo(new D() as A1);
foo(new D() as A2);
