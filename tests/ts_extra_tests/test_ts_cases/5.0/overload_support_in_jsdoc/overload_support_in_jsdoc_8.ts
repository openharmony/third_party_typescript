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
    TypeScript 5.0 now allows JSDoc to declare overloads with a new @overload tag. 
    Each JSDoc comment with an @overload tag is treated as a distinct overload for the following function declaration. 
 module: ES2022
 isCurrent: true
 ---*/

 
import { Assert } from '../../../suite/assert.js'

/**
 * @overload
 * @param {void} obj
 */

/**
 * @overload
 * @param {any} obj
 */

class Square {
  public x: number;
  public y: number;
  public height: number;
  public width: number;

  constructor(obj?: any) {
    this.x = obj?.x ?? 0;
    this.y = obj?.y ?? 0;
    this.height = obj?.height ?? 0;
    this.width = obj?.width ?? 0;
  }
}

let squareConfig: Square;
squareConfig = new Square();
squareConfig.x = 10;
squareConfig.y = 50;
squareConfig.height = 100;
squareConfig.width = 100;

Assert.equal(squareConfig.x, 10);
Assert.equal(squareConfig.y, 50);
Assert.equal(squareConfig.height, 100);
Assert.equal(squareConfig.width, 100);

let square: Square;
square = new Square({ x: 10, y: 50, height: 100, width: 100 });

Assert.equal(square.x, 10);
Assert.equal(square.y, 50);
Assert.equal(square.height, 100);
Assert.equal(square.width, 100);