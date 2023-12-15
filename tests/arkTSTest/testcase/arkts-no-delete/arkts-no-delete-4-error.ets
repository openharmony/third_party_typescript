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


// Counterexample: Delete the properties of a class
interface MyClass {
  prop1?: string;
  prop2: string;
}

const obj: MyClass = {
  prop1: "Property 1",
  prop2: "Property 2",
};

delete obj.prop1;
console.log(obj.prop1); // output：undefined
console.log(obj.prop2); // output：Property 2

