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
  There's also optional call, which allows us to conditionally call expressions if they’re not null or undefined.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

class C{
  mem: string;
  constructor(mem: string) {
    this.mem = mem;
  }
  func(mem: string) {
    this.mem = mem;
    return this.mem;
   }
}
async function method(str: string): Promise<string> {
  return str;
}

async function func(str: string, arg?: (str: string) => void): Promise<string>{
  let c = new C('member');
  let para = c.func('member');
  let x = arg?.(para);
  Assert.isUndefined(x);
  const result: string = await method(str);
  let y = arg?.(para);
  Assert.isUndefined(y);
  return result;
}
func('string').then(res => {
  Assert.isObject(res);
}).catch(err => {
});