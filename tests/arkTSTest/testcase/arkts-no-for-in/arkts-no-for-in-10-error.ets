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


interface MyObject {
  prop1: string;
  prop2: string;
}


function printObjectProperties(obj: MyObject, a: number, b: string) {
  for (const prop in arguments) {
    console.log(prop, arguments[prop]);
  }
}

const myObject: MyObject = {
  prop1: "value1",
  prop2: "value2",
};

printObjectProperties(myObject, 1, "d");
