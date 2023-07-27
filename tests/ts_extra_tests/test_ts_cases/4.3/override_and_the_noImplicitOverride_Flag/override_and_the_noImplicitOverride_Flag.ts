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
    adds the override keyword.provides a new noImplicitOverride flag.When this option is turned on, it becomes an error to override any method from a superclass unless you explicitly use an override keyword.
    In that last example, TypeScript would error under noImplicitOverride, and give us a clue that we probably need to rename our method inside of Derived.
    And index signatures can now be declared as static.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

class Boss {
    run(person?: string): string {
        return person + " go"
    }
}
class Manage extends Boss {
    run(person?: string): string {
        return super.run(person);
    }
}
class Staff extends Boss {
    override run(person?: string): string {
        super.run();
        return person + " run";
    }
}
let boss = new Boss();
Assert.equal(boss.run("boss"), "boss go");

let manage = new Manage();
Assert.equal(manage.run("manage"), "manage go");

let staff = new Staff();
Assert.equal(staff.run("staff"), "staff run");
