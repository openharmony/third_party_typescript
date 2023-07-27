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
    A class declaration declares a class type and a constructor function: class BindingIdentifieropt TypeParametersopt ClassHeritage { ClassBody }
 module: ESNext
 isCurrent: true
 ---*/
import { Assert } from '../../../../suite/assert.js'

class MyClass {
    constructor(public x: number, public y: number) {
        this.x = x;
        this.y = y;
    }
    static initial = new MyClass(0, 0);
    static distance(a: MyClass, b: MyClass) {
        let dx = a.x - b.x;
        let dy = a.y - b.y;
        return Math.hypot(dx, dy);
    }
}
Assert.equal(0, MyClass.initial.x);
Assert.equal(0, MyClass.initial.y);
let p1 = new MyClass(0, 4);
let p2 = new MyClass(3, 0);
Assert.equal(0, p1.x);
Assert.equal(4, p1.y);
Assert.equal(3, p2.x);
Assert.equal(0, p2.y);
Assert.equal(5, MyClass.distance(p1, p2));