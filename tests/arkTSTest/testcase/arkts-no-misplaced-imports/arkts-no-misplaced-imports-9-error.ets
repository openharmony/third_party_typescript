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

 
// Counterexample: All exports in the import module (former)
// Class definition and instantiation
class Car {
  private brand: string

  constructor(brand: string) {
    this.brand = brand
  }

  startEngine(): void {
    console.log(`Starting the engine of ${this.brand} car.`)
  }
}

let myCar = new Car('Toyota')
myCar.startEngine()

import * as myModule from './path/module'
