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
    this appendix contains a summary of the grammar found in the main document. 
    typescript grammar is a superset of the grammar defined in the ECMAScript 2015 Language Specification (specifically, the ECMA-262 Standard, 6th Edition) 
    and this appendix lists only productions that are new or modified from the ECMAScript grammar.
 options:
    target: es2015
    lib: es2015
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let num: number = 1024;
let str: string = "string";
let bool: boolean = false;
let big: bigint = 1n;
let sym: symbol = Symbol();
let obj: object = {};
let fun: Function = () => { return "Function"; }
let udf: undefined = undefined;
Assert.isNumber(num);
Assert.isString(str);
Assert.isBoolean(bool);
Assert.equal(typeof big, "bigint");
Assert.isSymbol(sym);
Assert.equal(typeof obj, "object");
Assert.isFunction(fun);
Assert.isUndefined(udf);

type Ver = { ver: string };
interface Data extends Ver {
    data: number;
}
let v: Data = { data: 1024, ver: "1.0.1" };
Assert.equal(v.data, 1024);
Assert.equal(v.ver, "1.0.1");

function addNumbers(...num: number[]): number {
    let n: number = 0;
    for (let i: number = 0; i < num.length; i++) {
        n += num[i];
    }
    return n;
}
Assert.equal(addNumbers(5, 5, 5, 5, 5), 25);

interface StrIndex {
    [key: string]: number;
}
let si: StrIndex = { C: 3, D: 4 };
si['A'] = 1;
si.B = 2;
Assert.equal(si.A, 1);
Assert.equal(si['B'], 2);
Assert.equal(si.C, 3);
Assert.equal(si['D'], 4);
Assert.equal(JSON.stringify(si), '{"C":3,"D":4,"A":1,"B":2}');

interface NumIndex {
    [key: number]: string;
}
let ni: NumIndex = { 1: 'A' };
ni[3] = 'C';
Assert.equal(ni[1], 'A');
Assert.equal(ni[3], 'C');
Assert.equal(JSON.stringify(ni), '{"1":"A","3":"C"}');

class AB<T, U>{
    a: T | undefined;
    b: U | undefined;
    public c: string = "";
    private d: string = "";
    protected e: string = "";
    setD(val: string) {
        this.d = val;
    }
    setE(val: string) {
        this.e = val;
    }
    show() {
        return JSON.stringify({ d: this.d, e: this.e });
    }
    constructor(a?: T, b?: U) {
        this.a = a;
        this.b = b;
    }
}
let ab = new AB<number, string>(123, "ABC");
Assert.equal(ab.a, 123);
Assert.equal(ab.b, "ABC");

let ab2 = new AB<number, number>(1024);
Assert.equal(ab2.a, 1024);
Assert.isUndefined(ab2.b);

ab.c = "1024";
Assert.equal(ab.c, "1024");

ab.setD("D");
ab.setE("E");
Assert.equal(ab.show(), "{\"d\":\"D\",\"e\":\"E\"}");

type ONS = { n1?: number | string, n2?: number | string };
let ons: ONS = { n1: 0, n2: "ABC" };
Assert.equal(ons.n1, 0);
Assert.equal(ons.n2, "ABC");


type NumStrBool = number | string | boolean;
type NumObjBool = number | object | boolean;
type NumBool = NumObjBool & NumStrBool;
let nb: NumBool = 1;
Assert.isNumber(nb);
nb = true;
Assert.isBoolean(nb);

type StrFun = (a: string, b: string) => string;
let strFun: StrFun = (a: string, b: string) => { return a + b; }
Assert.equal(strFun("AB", "CD"), "ABCD");

let a: any;
let vo: void;

let arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
Assert.equal(arr[0], 0);

type type0 = "A" | "B" | "C" | "D";
let t0: type0 = "A";
Assert.equal(t0, "A");

type NumStrArray = number[] | string[] | (number | string)[];
let nsa1: NumStrArray = [1, 3, 5];
let ar1 = [1, 3, 5]
let nsa2: NumStrArray = ["A", "B", "C"];
let ar2 = ["A", "B", "C"];
let nsa3: NumStrArray = ["A", 1, "B", 2, "C", 3];
let ar3 = ["A", 1, "B", 2, "C", 3];
Assert.equal(JSON.stringify(nsa1), JSON.stringify(ar1));
Assert.equal(JSON.stringify(nsa2), JSON.stringify(ar2));
Assert.equal(JSON.stringify(nsa3), JSON.stringify(ar3));

type ABC = [number, string, boolean];
let abc: ABC = [1, "A", true];
let abc2 = [1, "A", true];
Assert.equal(JSON.stringify(abc), JSON.stringify(abc2));