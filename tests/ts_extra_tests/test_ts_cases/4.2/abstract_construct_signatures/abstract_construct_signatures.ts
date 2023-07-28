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
 description: >
  TypeScript allows us to mark a class as abstract. This tells TypeScript that the class is only meant to be extended from, and that certain members need to be filled in by any subclass to actually create an instance.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

abstract class Color {
    abstract red: number;
    abstract green: number;
    abstract blue: number;
    protected abstract rgb: [number, number, number];

    abstract getRGB(): [number, number, number];
}

class ColorCopy extends Color {
    red: number = 0;
    green: number = 0;
    blue: number = 0;
    protected rgb: [number, number, number] = [0, 0, 0];
    getRGB(): [number, number, number] {
        this.rgb = [this.red, this.green, this.blue]
        return this.rgb;
    }
    constructor(r: number, g: number, b: number) {
        super();
        this.red = r;
        this.green = g;
        this.blue = b;
        this.getRGB();
    }
}

let color: ColorCopy = new ColorCopy(255, 0, 0);
Assert.equal(JSON.stringify(color.getRGB()), '[255,0,0]');