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
    TypeScript 5.2 will always emit the namespace keyword when generating declaration files.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js';

namespace Shapes {
  export namespace Polygons {
    export class Triangle {}

    export class Square {
      val: number = 1;

      get value(): number {
        return this.val * 4;
      }
    }
  }
}

import polygons = Shapes.Polygons;

let sq = new polygons.Square();
Assert.equal(sq.value, 4);