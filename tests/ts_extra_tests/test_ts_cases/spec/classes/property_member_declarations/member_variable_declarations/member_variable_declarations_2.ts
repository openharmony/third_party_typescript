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
    Instance member variable initializers are equivalent to assignments to properties of this in the constructor
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Staff1 {
  public name: string;
  public place: string;
  public work: boolean;
  constructor(name: string, place: string, work: boolean) {
    this.name = name;
    this.place = place;
    this.work = work;
  }
  initializer(name: string, place: string, work: boolean) {
    this.name = name;
    this.place = place;
    this.work = work;
  }
}
class Staff2 {
  public name: string;
  public place: string;
  public work: boolean;
  constructor(name: string, place: string, work: boolean) {
    this.name = name;
    this.place = place;
    this.work = work;
  }
}
let em1 = new Staff1("zhangsan", "shanghai", true);
em1.initializer("wangwu", "hainan", true);
let em2 = new Staff2("lisi", "qingdao", true);
Assert.equal(em1.name, "wangwu");
Assert.equal(em1.place, "hainan");
Assert.equal(em1.work, true);
Assert.equal(em2.name, "lisi");
Assert.equal(em2.place, "qingdao");
Assert.equal(em2.work, true);