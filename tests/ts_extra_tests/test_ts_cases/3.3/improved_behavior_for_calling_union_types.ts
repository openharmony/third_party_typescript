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
   Improved behavior for calling union types.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../suite/assert.js'

{
    type DamageType = "XO" | "EXP";
    type ColorType = "red" | "green" | "blue";

    type ATK = (atk: DamageType) => number;

    let s: ATK = (atk: DamageType) => 1;

    type newColorConstructor = (color: ColorType) => string;

    let sp: newColorConstructor = (color: ColorType) => 'good';

    Assert.equal(s("XO"), 1)
    Assert.equal(sp("green"), 'good')

    interface Dog {
        kind: "dog";
        dogProp: any;
    }

    interface Cat {
        kind: "cat";
        catProp: any;
    }

    const petArray: Dog[] | Cat[] = [{ kind: "dog", dogProp: 1 }, { kind: "dog", dogProp: 2 }];
    let ex: number[] = [];
    petArray.forEach((animal: Dog | Cat) => {
        if (animal.kind === "dog") {
            ex.push(animal.dogProp);
        } else if (animal.kind === "cat") {
            ex.push(animal.catProp);
        }
    });

    Assert.equal(ex[0], 1);
    Assert.equal(ex[1], 2);
};
