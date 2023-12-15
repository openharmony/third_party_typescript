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


interface Car {
  startEngine(): void;
}

class Car {
  brand: string;

  constructor(brand: string) {
    this.brand = brand;
  }

  static honk() {
    console.log("Honk honk!");
  }
}

Car.prototype.startEngine = function() {
  console.log(`Starting the ${this.brand} engine...`);
};

const myCar = new Car("BYD");
myCar.startEngine(); // output: "Starting the BYD engine..."