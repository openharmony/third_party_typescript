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


// Remove the properties of the class and replace delete with null
class MyClass {
  prop1: string | null = "Property 1";
  prop2: string = "Property 2";
}

const obj: MyClass = new MyClass();
obj.prop1 = null;
console.log(obj.prop1); // output：undefined
console.log(obj.prop2); // output：Property 2


