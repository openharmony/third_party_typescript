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
     types with a string index signature can be indexed using the "[]" notation, but were not allowed to use the ".". Starting with TypeScript 2.2 using either should be allowed.
     this only apply to types with an explicit string index signature. It is still an error to access unknown properties on a type using "." notation.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

type myType = { [arg: string]: string };
let my_t: myType = {
    'color': 'blue'
}

Assert.equal(my_t['color'], 'blue');
Assert.equal(my_t.color, 'blue');

class C{
    Arg: { [arg: string]: string };
    constructor(Arg: { [arg: string]: string }) {
        this.Arg = Arg;
    }
}
let c = new C({ 'color': 'black' });
Assert.equal(c.Arg['color'], 'black');
Assert.equal(c.Arg.color, 'black');

interface StringArrIndex<T> {
    [x: string]: T;
}
var strArr: StringArrIndex<number> = {};
strArr["ATP"] = 0x00;
strArr.NARC = 0x01;
Assert.equal(strArr.ATP, 0x00);
Assert.equal(strArr["NARC"], 0x01);
