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
 description: Type guards now support checking “dotted names” consisting of a variable or parameter name followed one or more property accesses.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from "../../../suite/assert.js"

type StrObj =
    {
        strobj?: {
            str1?: string;
            str2?: string;
        };
    }
    | undefined;

function funSO(so?: StrObj): string | void {
    if (so && so.strobj && so.strobj.str1) {
        const x: string = so.strobj.str1;
        Assert.isString(x);
        return x;
    } else if (so && so.strobj && so.strobj.str2) {
        const x: string = so.strobj.str2;
        Assert.isString(x);
        return x;
    } else {
        if (so && so.strobj && so.strobj.str1 === undefined) {
            return "so.strobj.str1 === undefined";
        } else if (so && so.strobj && so.strobj.str2 === undefined) {
            return "so.strobj.str2 === undefined";
        } else if (so !== undefined && so.strobj === undefined) {
            return "so.strobj === undefined";
        } else if (so === undefined) {
            return "so === undefined";
        }
    }
}

let so: StrObj = undefined;
Assert.equal(funSO(so), "so === undefined");
so = {};
Assert.equal(funSO(so), "so.strobj === undefined");
so = { strobj: {} };
Assert.equal(funSO(so), "so.strobj.str1 === undefined");
so = { strobj: { str1: "str1" } };
Assert.equal(funSO(so), "str1");
so = { strobj: {str2: "str2"} };
Assert.equal(funSO(so), "str2");
