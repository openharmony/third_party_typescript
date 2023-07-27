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
  Partial<Type>
  Constructs a type with all properties of Type set to optional. 
  This utility will return a type that represents all subsets of a given type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

interface HumanTest {
    name: string;
    age: number;
    destination: string;
}
type PersonType = Partial<HumanTest>;

let pt1: HumanTest = {
    name: "caihua",
    age: 20,
    destination: "earth",
};

let pt2: PersonType;
pt2 = {};
Assert.equal(pt2.name, undefined);
Assert.equal(pt2.age, undefined);
Assert.equal(pt2.destination, undefined);
pt2 = { name: "caihua" };
Assert.equal(pt2.name, "caihua");
Assert.equal(pt2.age, undefined);
Assert.equal(pt2.destination, undefined);
pt2 = { age: 20 };
Assert.equal(pt2.name, undefined);
Assert.equal(pt2.age, 20);
Assert.equal(pt2.destination, undefined);
pt2 = { destination: "earth" };
Assert.equal(pt2.name, undefined);
Assert.equal(pt2.age, undefined);
Assert.equal(pt2.destination, "earth");
pt2 = { name: "caihua", age: 20 };
Assert.equal(pt2.name, "caihua");
Assert.equal(pt2.age, 20);
Assert.equal(pt2.destination, undefined);
pt2 = { name: "lwx", age: 27, destination: "nanj" };
Assert.equal(pt2.name, "lwx");
Assert.equal(pt2.age, 27);
Assert.equal(pt2.destination, "nanj");