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


// Counterexample: The member function in the class returns the instance object of the current class or the instance object of a subclass
class Animal {
  name: string = '';
  setName(name: string): Animal {
    this.name = name;
    return this;
  }
}
class Cat extends Animal {
  meow(): void {
    console.log('meow');
  }
  setName(name: string): this {
    return super.setName(name) as this;
  }
}
const cat = new Cat();cat.setName('Tom').meow();