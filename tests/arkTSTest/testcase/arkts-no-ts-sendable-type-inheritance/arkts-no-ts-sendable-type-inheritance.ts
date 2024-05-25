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

interface T {}

class D1 extends A {}
class D2 extends A1 {}
class D3 extends A2 {}
class D4 extends B {}
class D5 extends B1 {}
class D6 extends B2 {}
class D7 extends C {}
class D8 extends C1 {}
class D9 extends C2 {}

interface I1 extends I {}
interface J1 extends J {}
interface K extends I, J, T {}
