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


/* 
description：Since in ArkTS the object layout is deterministic at compile time and cannot be changed at runtime, the use of for.. initerate over the properties of an object. For arrays, you can use a regular for loop.
*/
interface Person {
  name: string;
  age: number;
  city: string;
}
const person: Person = {
  name: "John",
  age: 30,
  city: "New York",
};

const properties = Object.getOwnPropertyNames(person);
properties.forEach((key) => {
   console.log(key)
  // console.log(key, person[key as keyof Person]);
});
