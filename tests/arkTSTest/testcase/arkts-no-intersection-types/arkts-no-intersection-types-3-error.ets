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


// Counterexample：Intersection of interfaces: Two or more interfaces can be intersected to generate a new interface that contains all the properties and methods of the original interface
interface Logger {
  log: (msg: string = '') => msg;
}

interface Person {
  name: string;
  age: number;
}

type PersonLogger = Person & Logger; 
// Create a new interface type that includes properties and methods for Perosn and Logger

const jack: PersonLogger = {
  name: "Jack",
  age: 32,
  log: (msg: string = '') => msg,
};

jack.log(`${jack.name} is ${jack.age} years old.`); // Jack is 32 years old.