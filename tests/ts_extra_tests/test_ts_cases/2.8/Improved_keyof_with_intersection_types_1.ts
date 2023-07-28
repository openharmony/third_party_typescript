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
   With TypeScript 2.8 keyof applied to an intersection type is transformed to a union of keyof applied to each intersection constituent. 
   In other words, types of the form keyof (A & B) are transformed to be keyof A | keyof B. This change should address inconsistencies with inference from keyof expressions.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../suite/assert.js"

type A = { a: string };
type B = { b: number };

type TAB = keyof (A & B);
let tab: TAB;
tab = "a";
tab = "b";

type TTB<T> = keyof (T & B);
let ttb: TTB<boolean>;
ttb = "b";
ttb = "valueOf";

type TAU<U> = keyof (A & U);
let tau: TAU<string>;
tau = "a";
tau = "charCodeAt";

type TTU<T, U> = keyof (T & U);
let ttu: TTU<number, string>;
ttu = "charAt";
ttu = "toString";

type IsEqual<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false


let f1: IsEqual<TAB, keyof A | keyof B> = true;
Assert.isTrue(f1);

let f2: IsEqual<TTB<boolean>, keyof boolean | keyof B> = true;
Assert.isTrue(f2);

let f3: IsEqual<TAU<string>, keyof A | keyof string> = true;
Assert.isTrue(f3);

let f4: IsEqual<TTU<number, string>, keyof number | keyof string> = true;
Assert.isTrue(f4);
