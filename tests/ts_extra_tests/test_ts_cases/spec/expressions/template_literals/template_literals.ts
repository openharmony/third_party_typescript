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
    Template literals are literals delimited with backtick (`) characters, allowing for multi-line strings, string interpolation with embedded expressions, and special constructs called tagged templates.
    Template literals are sometimes informally called template strings, because they are used most commonly for string interpolation (to create strings by doing substitution of placeholders). 
    However, a tagged template literal may not result in a string; it can be used with a custom tag function to perform whatever operations you want on the different parts of the template literal.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../../suite/assert.js";

function hiStr(str: string | TemplateStringsArray) {
    return 'hi ' + str;
}
let hi = hiStr`TypeScript`;
Assert.equal(hi, 'hi TypeScript');

let bool1 = `\`` == "\`";
Assert.isTrue(bool1);

let bool2 = `\${37*3}` == '${37*3}';
Assert.isTrue(bool2);

let bool3 = `${bool1}` == 'true';
Assert.isTrue(bool3);

let str1 = hiStr`Type
Script`;
Assert.equal(str1, `hi Type
Script`);
Assert.equal(str1, 'hi Type\nScript');

function funF(str: string | TemplateStringsArray) {
    let str2 = `${str}\n${str}`;
    function funFF(str1: string | TemplateStringsArray, ...strs: string[] | TemplateStringsArray[]) {
        let s = `${str2}\n${str1}`;
        for (let i = 0; i < strs.length; i++) {
            s = s + `\n` + strs[i];
        }
        return s;
    }
    return funFF;
}
let s1 = funF`A``B`;
Assert.equal(s1, `A
A
B`);
let s2 = funF`A``B` + `C`;
Assert.equal(s2, `A
A
BC`);
let s3 = funF`A`(`B`, `C`);
Assert.equal(s3, `A
A
B
C`);

function sRaw(str: TemplateStringsArray) {
    return str.raw[0];
}
let s4 = sRaw`ABC\nDEF`;
Assert.equal(s4, 'ABC\\nDEF');

let s5 = String.raw`AB\n${s4}`;
Assert.equal(s5, 'AB\\nABC\\nDEF');