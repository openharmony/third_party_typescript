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
   TypeScript 4.7 allows exactly that we can now take functions and constructors and feed them type arguments directly.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

const Data:any = Map<string, Error>;

const data = new Data();

data.set("name",new Error("TS error"))

Assert.equal(data.get("name").name, 'Error');


interface I1 {
    name: string;
}
interface I2 {
    use: string;
}
function fc<T>(value: T) {
    return value;
}
let obj1 = fc<I1>({ name: 'xiao' });
let obj2 = fc<I2>({ use: 'play' });
Assert.equal(JSON.stringify(obj1), '{"name":"xiao"}');
Assert.equal(JSON.stringify(obj2), '{"use":"play"}');

type myType1 = number | string;
type myType2 = { str: string } | (() => number);
function func<T>(arg: T) {
    return arg;
}

var f1 = func<myType1>(5);
Assert.isNumber(f1);
var f2 = func<myType1>('a');
Assert.isString(f2);
var f3 = func<myType2>({str: 'str'});
Assert.isObject(f3);
var f4 = func<myType2>(() => {
    return 10;
});
Assert.isFunction(f4);

let map = Map<string, number>;
let map_instantiation = new map();
map_instantiation.set('num', 8);
Assert.isNumber(map_instantiation.get('num'));

let set = new Set<number>([2]);
for (let arg of set) {
    Assert.isNumber(arg);
};
