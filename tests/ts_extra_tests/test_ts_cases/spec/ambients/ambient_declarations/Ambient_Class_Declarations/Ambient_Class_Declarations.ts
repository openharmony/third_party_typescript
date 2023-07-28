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
    An ambient class declaration declares a class type and a constructor function in the containing declaration space.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

declare class Student {
    constructor(sname?: string, sage?: number);
    public sname: string;
    public sage: number;
    cl():number;
}
let s1 :Student ={
    sname:"static",
    sage:12,
    cl(){
        return 1;
    }
}
Assert.equal(s1.sname,"static");
Assert.equal(s1.sage,"12");
Assert.equal(s1.cl(),1);
Assert.isFunction(s1.cl);