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
  Record<Keys, Type>
  Constructs an object type whose property keys are Keys and whose property values are Type. 
  This utility can be used to map the properties of a type to another type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

interface CatInfoTest {
    age: number;
    breed: string;
}

type CatNameType = "miffy" | "boris" | "mordred";

const cats: Record<CatNameType, CatInfoTest> = {
    miffy: { age: 10, breed: "Persian" },
    boris: { age: 5, breed: "Maine Coon" },
    mordred: { age: 16, breed: "British Shorthair" },
};
Assert.equal(cats.miffy.age, 10);
Assert.equal(cats.boris.age, 5);
Assert.equal(cats.mordred.age, 16);
Assert.equal(cats.miffy.breed, "Persian");
Assert.equal(cats.boris.breed, "Maine Coon");
Assert.equal(cats.mordred.breed, "British Shorthair");
