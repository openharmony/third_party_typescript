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
    When an enum declaration includes a const modifier it is said to be a constant enum declaration. 
    The members of a constant enum declaration must all have constant values that can be computed at compile time.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

const enum H_Date {
    Monday = 'Mon',
    Tuesday = 'Tues',
    Wednesday = 'Wed',
    Thursday = 'Thur',
    Friday = 'Fri',
    Saturday = 'Satur',
    Sunday = 'Sun'
}
let h_date1 = H_Date.Monday;
Assert.equal(h_date1, 'Mon');
let h_date2 = H_Date.Tuesday;
Assert.equal(h_date2, 'Tues');
let h_date3 = H_Date.Wednesday;
Assert.equal(h_date3, 'Wed');
let h_date4 = H_Date.Thursday;
Assert.equal(h_date4, 'Thur');
let h_date5 = H_Date.Friday;
Assert.equal(h_date5, 'Fri');
let h_date6 = H_Date.Saturday;
Assert.equal(h_date6, 'Satur');
let h_date7 = H_Date.Sunday;
Assert.equal(h_date7, 'Sun');
const enum H_Odd {
    a = 1,
    b = a + 2,
    c = a + 4,
    d = c + 2,
    e = b * b,
}
Assert.equal(H_Odd.a, 1);
Assert.equal(H_Odd.b, 3);
Assert.equal(H_Odd.c, 5);
Assert.equal(H_Odd.d, 7);
Assert.equal(H_Odd.e, 9);