/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

@Sendable
class SC1 {};
class NC1 {};
@Sendable
class SC2 {};
class NC2 {};
@Sendable
class SCT1<T> {};
class NCT1<T> {};
@Sendable
class SCT2<T> {};
class NCT2<T> {};

const sc1:SC1 = new SC1();
const nc1:NC1 = new NC1();
const sc2:SC2 = new SC2();
const nc2:NC2 = new NC2();
const sct1:SCT1<number> = new SCT1();
const nct1:NCT1<number> = new NCT1();
const sct2:SCT2<number> = new SCT2();
const nct2:NCT2<number> = new NCT2();

type TSS<T> = SCT1<number> | SCT2<T>;
type TSN<T> = SCT1<number> | NCT1<T>;

let a1: SC1 = new NC1(); // ERROR
a1 = new NC1();// ERROR
function handle(p: SC1):void {};
handle(new NC1());// ERROR
class Main1 {
    constructor(param:SC1) {};
}
new Main1(new NC1());// ERROR
interface IProxy {map: SC1;};
const proxy: IProxy = {map: new NC1()};// ERROR
const proxies: IProxy[] = [{map: new NC1()}];// ERROR



let b1: SC1 = new SC1(); // OK
let b2: SC1 = new NC1(); // ERROR
let b3: SCT1<string> = new SCT1<string>(); // OK
let b4: SCT1<string> = new NCT1<string>(); // ERROR
let b5: SC1 | NC1 = new SC1(); // OK
let b6: SC1 | NC1 = new SC2(); // ERROR
let b7: SC1 | NC1 = new NC1(); // OK
let b8: SC1 | NC1 = new NC2(); // ERROR
let b9: SC1 | NC1 = 1 ? new SC1() : new NC1(); // OK
let b10: SC1 | NC1 = 1 ? new SC1() : new NC2(); // ERROR
let b11: SC1 | NC1 = 1 ? new SC2() : new NC1(); // ERROR
let b12: SC1 | NC1 = 1 ? new SC2() : new NC2(); // ERROR
let b13: TSS<number> = new SCT1<number>(); // OK
let b14: TSS<number> = new SCT2<number>(); // OK
let b15: TSS<number> = new NCT1<number>(); // ERROR
let b16: TSS<number> = new NCT2<number>(); // ERROR
let b17: TSS<number> = 1 ? new SCT1<number>() : new NCT1<number>(); // ERROR
let b18: TSS<number> = 1 ? new SCT1<number>() : new NCT2<number>(); // ERROR
let b19: TSS<number> = 1 ? new SCT2<number>() : new NCT1<number>(); // ERROR
let b20: TSS<number> = 1 ? new SCT2<number>() : new NCT2<number>(); // ERROR
// For compatibility, if both sendable, no strict check
let b21: SCT1<number> = new SCT2<number>();// OK
let b22: TSN<number> = new SCT1<number>(); // OK
let b23: TSN<number> = new SCT2<number>(); // OK
let b24: TSN<number> = new NCT1<number>(); // OK
let b25: TSN<number> = new NCT2<number>(); // OK
let b26: TSN<number> = 1 ? new SCT1<number>() : new NCT1<number>(); // OK
let b27: TSN<number> = 1 ? new SCT1<number>() : new NCT2<number>(); // OK
let b28: TSN<number> = 1 ? new SCT2<number>() : new NCT1<number>(); // OK
let b29: TSN<number> = 1 ? new SCT2<number>() : new NCT2<number>(); // OK



// add check in PropertyDeclaration 
class Main {
    public p1: SC1 = new SC1(); // OK
    public p2: SC1 = new NC1(); // ERROR
    public p3: SCT1<string> = new SCT1<string>(); // OK
    public p4: SCT1<string> = new NCT1<string>(); // ERROR
    public p5: SC1 | NC1 = new SC1(); // OK
    public p6: SC1 | NC1 = new SC2(); // OK
    public p7: SC1 | NC1 = new NC1(); // OK
    public p8: SC1 | NC1 = new NC2(); // OK
    public p9: SC1 | NC1 = 1 ? new SC1() : new NC1(); // OK
    public p10: SC1 | NC1 = 1 ? new SC1() : new NC2(); // OK
    public p11: SC1 | NC1 = 1 ? new SC2() : new NC1(); // OK
    public p12: SC1 | NC1 = 1 ? new SC2() : new NC2(); // OK
    public p13: TSS<number> = new SCT1<number>(); // OK
    public p14: TSS<number> = new SCT2<number>(); // OK
    public p15: TSS<number> = new NCT1<number>(); // ERROR
    public p16: TSS<number> = new NCT2<number>(); // ERROR
    public p17: TSS<number> = 1 ? new SCT1<number>() : new NCT1<number>(); // ERROR
    public p18: TSS<number> = 1 ? new SCT1<number>() : new NCT2<number>(); // ERROR
    public p19: TSS<number> = 1 ? new SCT2<number>() : new NCT1<number>(); // ERROR
    public p20: TSS<number> = 1 ? new SCT2<number>() : new NCT2<number>(); // ERROR
} 

// add check in ArrayLiteralExpression
const l1: [SC1] = [sc1]; // OK
const l2: [SC1] = [nc1]; // ERROR
const l3: SC1[] = [sc1]; // OK
const l4: SC1[] = [nc1]; // ERROR
const l5: SCT1<string>[] = [sct1]; // OK
const l6: SCT1<string>[] = [nct1]; // ERROR
const l7: (SC1 | NC1)[] = [
    sc1, // OK
    sc2, // OK
    nc1, // OK
    nc2, // OK
    1 ? sc1 : nc1, // OK
    1 ? sc1 : nc2, // OK
    1 ? sc2 : nc1, // OK
    1 ? sc2 : nc2 // OK
];
const l8: TSS<number>[] = [
    sct1, // OK
    sct2, // OK
    nct1, // ERROR
    nct2, // ERROR
    1 ? sct1 : nct1, // ERROR
    1 ? sct1 : nct2, // ERROR
    1 ? sct2 : nct1, // ERROR
    1 ? sct2 : nct2 // ERROR
];

// add check in ReturnStatement
function f1(): SC1 {
    if (1) {
        return new NC1(); // ERROR
    }
    return new SC1(); // OK
}

function f2(): SCT1<number> {
    if (1) {
        return new NCT1<number>(); // ERROR
    }
    return new SCT1<number>(); // OK
}

function f3():(SC1 | NC1) {
    if (1) {
        return new SC1(); // OK
    }
    if (1) {
        return new SC2(); // OK
    }
    if (1) {
        return new NC1(); // OK
    }
    if (1) {
        return new NC2(); // OK
    }
    if (1) {
        return 1 ? new SC1() : new NC1(); // OK
    }
    if (1) {
        return 1 ? new SC1() : new NC2(); // OK
    }
    if (1) {
        return 1 ? new SC2() : new NC1(); // OK
    }
    if (1) {
        return 1 ? new SC2() : new NC2(); // OK
    }
    return new SC1(); // OK
}


function f4():(TSS<number>) {
    if (1) {
        return new SCT1<number>(); // OK
    }
    if (1) {
        return new SCT2<number>(); // OK
    }
    if (1) {
        return new NCT1<number>(); // ERROR
    }
    if (1) {
        return new NCT2<number>(); // ERROR
    }
    if (1) {
        return 1 ? new SCT1<number>() : new NCT1<number>(); // ERROR
    }
    if (1) {
        return 1 ? new SCT1<number>() : new NCT2<number>(); // ERROR
    }
    if (1) {
        return 1 ? new SCT2<number>() : new NCT1<number>(); // ERROR
    }
    if (1) {
        return 1 ? new SCT2<number>() : new NCT2<number>(); // ERROR
    }
    return new SCT1<number>(); // OK
}