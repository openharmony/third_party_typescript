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
 description: In a 'switch' statement, each 'case' expression must be of a type that is assignable to or from (section 3.11.4) the type of the 'switch' expression
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../../suite/assert.js'

function testSwitch(inputVar: number) {
    let outputVar: string;
    switch (inputVar) {
        case 1:
            outputVar = 'a';
            break;
        case 2:
            outputVar = 'b';
            break;
        case 3:
            outputVar = 'c';
            break;
        case 4:
            outputVar = 'd';
            break;
        default:
            outputVar = 'e';
            break;
    }
    return outputVar;
}

Assert.equal("a", testSwitch(1));
Assert.equal("b", testSwitch(2));
Assert.equal("c", testSwitch(3));
Assert.equal("d", testSwitch(4));
Assert.equal("e", testSwitch(5));

function testSwitchExpression(x: number, y: number) {
    let outputVar: string;
    switch (x + y) {
        case 0:
            outputVar = 'a';
            break;
        case 5:
            outputVar = 'b';
            break;
        case 10:
            outputVar = 'c';
            break;

        default:
            outputVar = 'd';
    }
    return outputVar;
}

Assert.equal("a", testSwitchExpression(-1, 1));
Assert.equal("b", testSwitchExpression(1, 4));
Assert.equal("c", testSwitchExpression(5, 5));
Assert.equal("d", testSwitchExpression(8, 10));