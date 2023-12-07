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


class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

type AnimalCtor = new (name: string) => Animal;

function createAnimal(Ctor: AnimalCtor, name: string): Animal {
  return new Ctor(name);
}

const animal = createAnimal(Animal, "Dog");
console.log(animal.name); // Dog