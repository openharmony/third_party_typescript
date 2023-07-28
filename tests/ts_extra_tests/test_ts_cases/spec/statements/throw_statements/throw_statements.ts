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
 description: The expression specified in a 'throw' statement can be of any type.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../../suite/assert.js'

function testThrow(inputVar: number) {
    let outputVar: string;
    if (inputVar == 1) {
        throw 100;
    }

    if (inputVar == 2) {
        throw 'a';
    }

    if (inputVar == 3) {
        throw true;
    }

    if (inputVar == 4) {
        throw new Error('Something bad happened');
    }
}

try {
    testThrow(1);
} catch (error) {
    Assert.equal(100, error);
}

try {
    testThrow(2);
} catch (error) {
    Assert.equal('a', error);
}

try {
    testThrow(3);
} catch (error) {
    Assert.isTrue(error);
}

try {
    testThrow(4);
} catch (error: any) {
    Assert.equal('Something bad happened', error.message);
}

try {
    testThrow(4);
} catch (error) {
    Assert.isTrue(error instanceof Error);
};