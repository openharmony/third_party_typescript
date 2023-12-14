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


function withObject<T>(obj: T, callback: (obj: T) => void) {
  callback(obj);
}

const person = {
  name: "Alice",
  age: 25,
  address: "123 Main St",
};

withObject(person, ({ name, age, address }) => {
  console.log(name); //  "Alice"
  console.log(age); //  25
  console.log(address); //  "123 Main St"
});
