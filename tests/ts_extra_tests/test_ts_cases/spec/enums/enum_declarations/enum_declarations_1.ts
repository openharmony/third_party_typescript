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
    an EnumDeclaration introduces a named type and a named value in the containing declaration space. 
    The enum type is a distinct subtype of the Number primitive type. 
    the enum object is a value of an anonymous object type containing a set of properties, 
    all of the enum type, corresponding to the values declared for the enum type in the body of the declaration. 
    The enum object's type furthermore includes a numeric index signature with the signature '[x: number]: string'.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

enum Animal {
  cat = 0xff0000,
  dog = 0x00ff00,
  pig = 0x0000ff,
}
Assert.isString(Animal[0xff0000]);
Assert.equal(Animal[0x00ff00], "dog");
Assert.isNumber(Animal.pig);
enum TypeABC {
  A,
  B,
  C,
}
var index = TypeABC.A;
Assert.equal(TypeABC.A, 0);
Assert.equal(TypeABC.B, index + 1);
Assert.equal(TypeABC.C, index + 2);