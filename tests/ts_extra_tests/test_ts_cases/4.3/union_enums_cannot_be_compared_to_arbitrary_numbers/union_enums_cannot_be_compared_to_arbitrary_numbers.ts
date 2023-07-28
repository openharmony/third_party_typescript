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
  If a value with a union enum type is compared with a numeric literal that it could never be equal to, 
  then the type-checker will issue an error.
  As a workaround, you can re-write an annotation to include the appropriate literal type.
  You can also use a type-assertion on the value.
  Alternatively, you can re-declare your enum to have a non-trivial initializer so that any number is both assignable and comparable to that enum.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

enum AB {
    A = 0,
    B = 1,
}

function eFun01(x: AB | -1) {
    if (x === -1) {
        return -1;
    }
    return 1;
}
Assert.equal(eFun01(-1), -1);
Assert.equal(eFun01(AB.A), 1);

function eFun02(x: AB) {
    if ((x as number) === -1) {
        return x;
    }
    return x + 1;
}
Assert.equal(eFun02(AB.A), 1);

enum ab {
    A = +0,
    B = 1,
}
function eFun03(x: ab) {
    if (x === 1) {
        return x;
    }
    return x + 2;
}

Assert.equal(eFun03(ab.A), 2);
Assert.equal(eFun03(ab.B), 1);
