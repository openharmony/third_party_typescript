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
/**---
 description: Blocks are extended to include, enum
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../../suite/assert.js'

enum Direction {
    Forward,
    Back,
    Left,
    Right,
}

class Car {
    name!: string;
    direction!: Direction;
}

const car = new Car();
car.name = "myCar";
car.direction = Direction.Forward;

Assert.equal("myCar", car.name)
Assert.equal(Direction.Forward, car.direction);