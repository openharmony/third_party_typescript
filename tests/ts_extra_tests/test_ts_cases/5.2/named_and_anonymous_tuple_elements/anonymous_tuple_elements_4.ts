/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
    Named and Anonymous Tuple Elements,In TypeScript 5.2, 
    the all-or-nothing restriction on tuple labels has been lifted
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

type Person = [string, age: number];

const person: Person = ['John', 25];
const [name, age] = person;

Assert.isString(name);
Assert.equal(name, 'John');

Assert.isNumber(age);
Assert.equal(age, 25);