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
    Class decorator.
 module: ESNext
 isCurrent: true
 experimentalDecorators: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

function create(name:string,age:number){
    return function<T extends {new (...args:any[]):{}}>(constructor:T){
        return class extends constructor {
            name = name
            age = age
        }
    }
}

@create("小张",22)
class Man {
    name:string
    height = 180
    constructor(name:string){
        this.name = name
    }
}
let man = new Man("jack");
Assert.equal(man.height,"180");
Assert.notEqual(man.name,"jack");
Assert.equal(man.name,"小张")
