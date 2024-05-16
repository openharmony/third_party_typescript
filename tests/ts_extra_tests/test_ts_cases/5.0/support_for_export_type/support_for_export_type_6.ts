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
    TypeScript 5.0 support for export * from "module" re-exports.
 module: ES2022
 isCurrent: true
 ---*/


import { SpaceShip, ShipString } from './models/index.js';
import { Assert } from '../../../suite/assert.js';

const mySpaceship = new SpaceShip();
const myShipString = new ShipString();

Assert.equal(mySpaceship.getName(), 'Star');
Assert.equal(myShipString.toUpper(), 'SHIP');