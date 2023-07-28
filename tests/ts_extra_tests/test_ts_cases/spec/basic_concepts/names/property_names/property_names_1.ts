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
   A property name can be any identifier (including a reserved word), a string literal, a numeric literal,
   or a computed property name. String literals may be used to give properties names that are not valid identifiers,
   such as names containing blanks. Numeric literal property names are equivalent to string literal property names
   with the string representation of the numeric literal, as defined in the ECMAScript specification.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Property {
  [key: string]: number | string | boolean;
  [Symbol.match]: symbol = Symbol.match;
  break: string;
  let: string;
  any: string;
  as: string;
  "with blank": number;
  1: boolean;
  constructor() {
    this.break = "break";
    this["with blank"] = 12;
    this[1] = true;
    this.any = "any";
    this.let = "let";
    this.as = "as";
  }
}
var p: Property = new Property();
p['NARC'] = "NARC";
p['0x10'] = 0x10;
p['F'] = false;
Assert.equal("break", p.break);
Assert.equal(12, p["with blank"]);
Assert.equal(true, p[1]);
Assert.equal("any", p.any);
Assert.equal("let", p.let);
Assert.equal("as", p.as);
Assert.equal(p['NARC'], 'NARC');
Assert.equal(p['0x10'], 0x10);
Assert.equal(p['F'], false);
Assert.equal(p[Symbol.match], Symbol.match);