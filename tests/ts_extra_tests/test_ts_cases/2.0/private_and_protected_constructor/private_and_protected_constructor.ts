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
 description: A class constructor may be marked private or protected. A class with private constructor cannot be instantiated outside the class body, and cannot be extended. A class with protected constructor cannot be instantiated outside the class body, but can be extended.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

class Box {
  s!:string;
  private static subBox: Box;
  private constructor() { }
  static getSubBos(s:string) {
    if (!Box.subBox) {
      Box.subBox = new Box();
      Box.subBox.s = s;
    }
    return Box.subBox;
  }
}
let v: Box = Box.getSubBos("s");
Assert.equal(v.s, "s");

class myBox{
  arg: string;
  protected constructor(arg: string) {
    this.arg = arg;
  }
}
class myLittleBox extends myBox{
  constructor(arg: string) {
    super(arg);
  }
}
let tool = new myLittleBox('hammer');
Assert.equal(tool.arg, 'hammer');