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
 description: Optional properties and methods can now be declared in classes, similar to what is already permitted in interfaces.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

class Demo {
    a: number = 0;
    b?: number;
    func() {
        return this.a;
    }

    get?(): number;
    handle?() {
        return this.b;
    }
}
let c = new Demo();
c.a = 1024;
c.b = 1408;
Assert.equal(c.func(), 1024);

if (c.handle) {
    Assert.equal(c.handle(), 1408);
}

c.get = () => {
    if (c.b !== undefined) {
        return c.a + c.b;
    } else {
        return c.a;
    }
}
Assert.equal(c.get(), 2432);
