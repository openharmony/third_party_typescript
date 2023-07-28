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
    Classes and interfaces support inheritance and therefore the instance represented by this in a method 
    isn't necessarily an instance of the containing class—it may in fact be an instance of a derived class or interface. 
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class CA {
  name: string = "CA";
  f() {
    return this;
  }
  caName(cname: string) {
    this.name = cname;
    return "CA:" + this.name;
  }
}

class CB extends CA {
  b() {
    return this;
  }
  cbName(cname: string) {
    this.name = cname;
    return "CB:" + this.name;
  }
}

let bB: CB = new CB();
let xB = bB.f().b();
Assert.equal(bB, xB);
let thisStrB: string = bB.cbName("CB");
Assert.equal(thisStrB, "CB:CB");
let thisStrA: string = bB.caName("CA");
Assert.equal(thisStrA, "CA:CA");