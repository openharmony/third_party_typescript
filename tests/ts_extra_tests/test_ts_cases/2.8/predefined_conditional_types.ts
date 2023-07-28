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
   Predefined conditional types
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../suite/assert.js'

{

    type TypeA = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;

    type TypeB = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;


    type TypeC = Exclude<string | (() => void), Function>;

    type TypeD = Extract<string | (() => void), Function>;

    function fun(s: string) {
        return { a: 1, b: s };
    }

    class C {
        x = 0;
        y = 0;
    }


    type TypeE = ReturnType<typeof fun>;

    type TypeF = InstanceType<typeof C>;

    let a: TypeA = "b";
    let b: TypeA = "d";
    let c: TypeB = "a";
    let d: TypeB = "c";
    let e: TypeC = "c";
    let f: TypeD = ((): string => { return 's' });
    let x: TypeE = { a: 1, b: 's' }
    let y: TypeF = { x: 1, y: 2 }

    Assert.equal(a, 'b');
    Assert.equal(b, 'd');
    Assert.equal(c, 'a');
    Assert.equal(d, 'c');
    Assert.equal(e, 'c');
    Assert.equal(typeof f, "function");
    Assert.equal(x.a, 1);
    Assert.equal(y.x, 1);

    type G = number[] | number | null | undefined
    type TypeG = NonNullable<G>;
    let g: TypeG;
    g = [0, 1, 2];
    Assert.equal(g.length, 3);
    g = -1;
    Assert.equal(g, -1);
};