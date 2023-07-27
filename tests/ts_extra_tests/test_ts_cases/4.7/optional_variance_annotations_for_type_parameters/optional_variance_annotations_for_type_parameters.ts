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
   With TypeScript 4.7, we're now able to explicitly specify variance on type parameters.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

interface P{
  num: number;
}
interface C extends P{
  str: string;
}

type myType1 = Array<P>;
type myType2 = Array<C>;

var m_ins1: myType1 = [{ num: 5 }];
var m_ins2: myType2 = [{ num: 10, str: 'a' }];

m_ins1 = m_ins2;
Assert.equal(m_ins1, m_ins2);


interface h_C{
  name: string;
  age: number;
}

type myType3<T> = () => T;
type myType4<out T> = () => T;
var m_ins3: myType3<h_C> = () => { return { name: 'xiao', age: 18 } };
var m_ins4: myType4<h_C> = () => { return { name: 'xi', age: 18, height: 18 } };
m_ins3 = m_ins4;
Assert.equal(m_ins3, m_ins4);