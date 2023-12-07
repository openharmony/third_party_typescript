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


//  9.The direct assignment of a new inheritance class relationship, assigning a parent to a child, is not allowed by ArkTs
class B {
  n: number = 0
  s: string = ''
}

// D is the inheritance class of B, which constructs the relationship between subtypes and supertypes
class D extends B {
  constructor() {
    super()
  }
}

let b = new B()
let d = new D()
d = b // Assigning b to d will cause compile time errors