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
  Readonly<Type>
  Constructs a type with all properties of Type set to readonly, 
  meaning the properties of the constructed type cannot be reassigned.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

interface HumanTest {
    name: string;
    age: number;
    destination: string;
}
type PersonType = Readonly<HumanTest>;

let pt1: HumanTest = {
    name: "caihua",
    age: 20,
    destination: "earth",
};
pt1.name = "caihua1";
Assert.notEqual(pt1.name, "caihua");
pt1.age = 15;
Assert.notEqual(pt1.age, 20);
pt1.destination = "Mars";
Assert.notEqual(pt1.destination, "earth");
let pt2: PersonType = {
    name: "caihua",
    age: 20,
    destination: "earth",
};