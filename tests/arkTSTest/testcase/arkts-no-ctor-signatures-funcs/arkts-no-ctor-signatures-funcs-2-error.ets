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
We define a  class named 'Car' and use the 'CarCtor' type to describe the constructor type. We then define a 'createCar' function that takes a constructor and the corresponding arguments and returns a 'Car' instance. Finally, we use the createCar function to create an instance of the Car, print out its property values, and call the startEngine method.
*/

class Car {
  brand: string;
  model: string;
  year: number;

  constructor(brand: string, model: string, year: number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  startEngine() {
    console.log(`Starting the engine of ${this.brand} ${this.model}`);
  }
}

type CarCtor = new (brand: string, model: string, year: number) => Car;

function createCar(Ctor: CarCtor, brand: string, model: string, year: number): Car {
  return new Ctor(brand, model, year);
}

const car = createCar(Car, "BYD", "han", 2022);
console.log(car.brand); // BYD
console.log(car.model); // han
console.log(car.year); // 2022
car.startEngine(); // Starting the engine of BYD han
