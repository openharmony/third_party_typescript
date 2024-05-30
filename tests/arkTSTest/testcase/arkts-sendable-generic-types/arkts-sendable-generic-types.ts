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

class D {}
interface T {}

let a1 = new A<number>();
let a2 = new A1<number>();
let a3 = new A2<number>();
let a4 = new A<D>();
let a5 = new A1<D>();
let a6 = new A2<D>();
let a7 = new A<T>();
let a8 = new A1<T>();
let a9 = new A2<T>();

let b1 = new B<number, string>();
let b2 = new B1<number, string>();
let b3 = new B2<number, string>();
let b4 = new B<number, D>();
let b5 = new B1<number, D>();
let b6 = new B2<number, D>();
let b7 = new B<T, D>();
let b8 = new B1<T, D>();
let b9 = new B2<T, D>();

let c1 = new C<number, string>();
let c2 = new C1<number, string>();
let c3 = new C2<number, string>();
let c4 = new C<number, D>();
let c5 = new C1<number, D>();
let c6 = new C2<number, D>();
let c7 = new C<T, D>();
let c8 = new C1<T, D>();
let c9 = new C2<T, D>();
