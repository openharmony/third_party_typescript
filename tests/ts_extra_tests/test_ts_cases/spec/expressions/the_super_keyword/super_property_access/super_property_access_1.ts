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
    In a constructor, instance member function, instance member accessor, or instance member variable initializer where this references a derived class instance,
    a super property access is permitted and must specify a public instance member function of the base class.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Animal {
    public age: number = 10;
    constructor() { }
    public makeSound(): string {
        return "the animal makes";
    }
    static weight: number = 0;
}
class Dog extends Animal {

    constructor() {
        super();
        this.age = 20;
    }
    public makeSound(): string {
        super.makeSound();
        Assert.equal(super.makeSound(), "the animal makes");
        return "the dog barks";
    }
    public Animalweight(): number {
        return Animal.weight;
    }
    get _age(): number {
        return this.age
    }
    set _age(age: number) {
        this.age = age;
    }
}
let myDog = new Dog();
myDog.makeSound();
Assert.equal(myDog.makeSound(), "the dog barks");
Assert.equal(myDog.age, 20);
Assert.equal(myDog.Animalweight(), 0);