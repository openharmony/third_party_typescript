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
    The above has some undesirable behavior if we’re trying to prevent more errors from happening in our error-handling code! 
    Because these variables have the type any by default, they lack any type-safety which could have errored on invalid operations.
    That’s why TypeScript 4.0 now lets you specify the type of catch clause variables as unknown instead. 
    unknown is safer than any because it reminds us that we need to perform some sorts of type-checks before operating on our values.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

let flag: boolean = false;

function getErrorMessage(): never {
  throw new Error("An error occurred");
}
function getUnknown(): never {
  let err: unknown;
  throw err;
}
function getFlag(fun: Function) {
  try {
    fun();
  } catch (error: unknown) {
    if (error instanceof Error) {
      flag = true;
      Assert.equal(error.message, "An error occurred");
      return error.message;
    } else {
      flag = false;
      let errString = "An unknow error occurred";
      return errString;
    }
  }
}
getFlag(getErrorMessage);
Assert.isTrue(flag);
let errString = getFlag(getUnknown);
Assert.equal(errString, "An unknow error occurred");
Assert.isFalse(flag);