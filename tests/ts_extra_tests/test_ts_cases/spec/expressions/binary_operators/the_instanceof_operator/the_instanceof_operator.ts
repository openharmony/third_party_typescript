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
   The instanceof operator requires the left operand to be of type Any, an object type, or a type parameter type,
   and the right operand to be of type Any or a subtype of the 'Function' interface type.
   The result is always of the Boolean primitive type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

interface Animal {
    species: string
}
class Felidae implements Animal {
    kind: string
    species: string
    constructor(species: string, kind: string) {
        this.species = species
        this.kind = kind
    }
}
class Canidae implements Animal {
    species: string
    name: string
    constructor(species: string, name: string) {
        this.species = species
        this.name = name
    }
}
const getRandomAnimal = () => {
    return Math.random() < 0.5 ?
        new Canidae('Canidae', 'Wolf') :
        new Felidae('Felidae', 'Tiger')
}
let Animal = getRandomAnimal()
if (Animal instanceof Canidae) {
    Assert.isTrue(Animal instanceof Canidae)
}
if (Animal instanceof Felidae) {
    Assert.isTrue(Animal instanceof Felidae);
};