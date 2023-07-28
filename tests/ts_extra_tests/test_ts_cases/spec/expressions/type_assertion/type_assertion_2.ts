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
  type assertions are not checked at run-time and it is up to the programmer to guard against errors,
  for example using the instanceof operator
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

class Foo {
    foo: number;
    cname: string;
    constructor(foo: number = 123, cname: string = 'Foo') {
        this.foo = foo;
        this.cname = cname;
    }
}
class Bar extends Foo {
    bar: number;
    cname: string;
    constructor(bar: number = 1024, cname: string = 'Bar') {
        super();
        this.bar = bar;
        this.cname = cname;
    }
}
function toFoo(): Foo {
    return new Bar();
}
let foo: Foo = toFoo();
let bar: Bar = <Bar>toFoo();
function toBar(arg: Foo | Bar): Bar | string {
    let bar: Bar;
    if (arg instanceof Bar) {
        bar = <Bar>arg;
        return bar;
    }
    return "Can not";
}
let foo1 = toBar(new Foo());
let foo2 = toBar(foo);
let bar1 = toBar(bar);
Assert.equal(foo1, 'Can not');
Assert.equal(JSON.stringify(foo2), '{"foo":123,"cname":"Bar","bar":1024}');
Assert.equal(JSON.stringify(foo2), JSON.stringify(bar1));