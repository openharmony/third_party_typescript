/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
/**---
 description: >
    TypeScript 5.0 support for export * as ns from "module" re-exports.
 module: ES2022
 isCurrent: true
 ---*/


import { fac, SpaceShip, ShipString, vehicles, VehiclesFactory, MyVehicles } from './models/index.js';
import { Assert } from '../../../suite/assert.js';

function takeASpaceship(s: fac.SpaceShip, d: fac.ShipString): void {
  Assert.equal(s.getName(), 'Star');
  Assert.equal(d.toUpper(), 'SHIP');
}

function takeVehicles(s: vehicles.VehiclesFactory, d: vehicles.MyVehicles): void {
  Assert.equal(s.getName(), 'Audi');
  Assert.equal(d.myCar, 'alto');
}

const mySpaceship = new SpaceShip();
const myShipString = new ShipString();
takeASpaceship(mySpaceship, myShipString);

const myCar = new VehiclesFactory();
const myCarToUpper = new MyVehicles();
takeVehicles(myCar, myCarToUpper);