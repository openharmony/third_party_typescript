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
    The union and intersection type operators can be applied to type parameters.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

function getSmallPet(name: string | number) {
  return name;
}
let pet = getSmallPet("fishbird");
Assert.equal(pet, "fishbird");
interface Person1 { name: string }
interface People1 { sex: string }
type PersonMan = Person1 & People1
function getPerson(person: PersonMan) {
  return person.name;
}
let man: PersonMan = {
  name: "join",
  sex: "man"
}
let getpersonname = getPerson(man);
Assert.equal(getpersonname, "join");