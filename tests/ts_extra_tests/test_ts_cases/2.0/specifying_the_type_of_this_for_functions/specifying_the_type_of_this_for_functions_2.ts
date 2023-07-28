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
  this parameters in callbacks.Libraries can also use this parameters to declare how callbacks will be invoked.
  this: void means that addClickListener expects onclick to be a function that does not require a this type.
module: ESNext
isCurrent: true
---*/


import { Assert } from "../../../suite/assert.js"

interface Web {
    Click(onclick: (this: void, e: Event) => void): void;
}

class NetLink {
    info: string;
    constructor(info: string) {
        this.info = info;
    }
    onClickGood(this: void, e: Event) {
    }
}

let web: Web = {
    Click(Onclick: (this: void, e: Event) => void) {
        Assert.equal(typeof this, "object");
    }
};
let onAir = new NetLink("OnAir");
web.Click(onAir.onClickGood);