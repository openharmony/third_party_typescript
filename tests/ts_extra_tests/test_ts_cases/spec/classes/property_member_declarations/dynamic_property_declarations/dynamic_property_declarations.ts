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
    A dynamic property declaration does not introduce a property in the class type or constructor function type.
    The property name expression of a dynamic property assignment must be of type Any or the String, Number, or Symbol primitive type.
    The name associated with a dynamic property declarations is considered to be a numeric property name if the property name expression is of type Any or the Number primitive type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class computer {
    [compute:string]:any
    constructor(
        public name:string,
        public age:number
    ){}
    sayOne(){return "one"}
}
let uce = new computer("aa",22);
uce.pid = "223";
uce.id=1;
Assert.equal(uce.name,"aa");
Assert.equal(typeof uce,"object");
Assert.equal(uce.id+uce.pid,"1223");
Assert.equal(uce.sayOne(),"one");