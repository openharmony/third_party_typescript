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


class AddressInfo {
  cityName: string = "";
  country: string = "";
}

class PersonB {
  yourName: string = "";
  age: number = 0;
  address: AddressInfo = {
    cityName: "",
    country: "",
  };
}

let people: PersonB = {
  yourName: "John",
  age: 30,
  address: {
    cityName: "New York",
    country: "USA",
  },
};

let yourName = people.yourName
let cityName = people.address.cityName
let country = people.address.country

console.log(yourName); // John
console.log(cityName); // New York
console.log(country); // USA



