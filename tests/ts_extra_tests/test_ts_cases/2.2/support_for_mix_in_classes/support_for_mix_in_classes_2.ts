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
     mixin classes can constrain the types of classes they can mix into by specifying a construct signature return type in the constraint for the type parameter.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

class Color {
    public Red: number;
    public Green: number;
    public Blue: number;
    constructor(red: number = 0x00, green: number = 0x00, blue: number = 0x00) {
        this.Red = red;
        this.Green = green;
        this.Blue = blue;
    }
    toString() {
        return 'Color(' + this.Red + ', ' + this.Green + ', ' + this.Blue + ')';
    }
}
type MIXTypeCopy<T> = new (...members: any[]) => T;
function ColorClassMix<T extends MIXTypeCopy<Color>>(BC: T) {
    return class extends BC {
        getColors(): [number, number, number] {
            return [this.Red, this.Green, this.Blue];
        }
    }
}

const ColorMix = ColorClassMix(Color);
var color = new ColorMix(255, 255, 255);
Assert.equal(color.toString(), "Color(255, 255, 255)");
Assert.equal(color.getColors()[0], 255);

