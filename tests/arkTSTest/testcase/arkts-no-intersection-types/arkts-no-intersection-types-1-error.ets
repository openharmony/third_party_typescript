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


// Counterexample：Crossing of object types: Two or more object types can be crossed to generate a new object type that contains all the properties and methods of the original type
interface Person { name: string; age: number};
interface Employee { id: number; department: string};

type PersonEmployee = Person & Employee;

const person: Person = {name:'John', age:25};
const employee: Employee = { id: 1, department: "IT" };
const personEmployee: PersonEmployee = { name: 'John', age: 25, id: 1, department: 'IT' };
console.log(personEmployee.name);   