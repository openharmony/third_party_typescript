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
   A type parameter may have an associated type parameter constraint that establishes an upper bound for type arguments. 
   Type parameters may be referenced in type parameter constraints within the same type parameter list, 
   including even constraint declarations that occur to the left of the type parameter.
 module: ESNext
 isCurrent: true
 ---*/


import {Assert} from '../../../../../suite/assert.js'

type Dog = {
  m_name: string;
  m_age: number;
  m_job: string;
};
type PickProperty<T, K extends keyof T> = { [P in K]: T[P] };
type test = PickProperty<Dog, "m_name" | "m_age">;
let cc: test = {
  m_age: 20,
  m_name: "wangwang",
};
Assert.isNumber(cc.m_age);
Assert.isString(cc.m_name);
