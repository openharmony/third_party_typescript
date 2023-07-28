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
   An abstract class can declare abstract properties and/or accessors. Any sub class will need to declare the abstract
   properties or be marked as abstract. Abstract properties cannot have an initializer. Abstract accessors cannot have bodies.
module: ESNext
isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

abstract class Skill {
    abstract name: string;
    abstract damage: number;
    abstract get accessor();
    abstract set accessor(ok: string);
}
class Divied extends Skill {
    name = "derived";
    damage = 128;
    get accessor() {
        return 'ok'
    }
    set accessor(ok: string) {
        this.name = ok;
    }
}
let d = new Divied();
Assert.equal(d.name, "derived");
Assert.equal(d.damage, 128);
Assert.equal(d.accessor, "ok");