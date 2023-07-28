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
 description: TypeScript now can correctly infer to indexed access types which immediately index into a mapped object type.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../suite/assert.js'

interface I {
    a: number;
    b: string;
    c: boolean;
    d: object;
}
type T<P extends keyof I> = {
    [K in P]: {
        nameI: K;
        v: I[K];
        f: (p: I[K]) => void;
    };
}[P];
function fun<K extends keyof I>(x: T<K>) {
    x.f(x.v);
}
fun({
    nameI: "a",
    v: 11,
    f: (x) => {
        Assert.isNumber(x);
    },
});
fun({
    nameI: "b",
    v: "b",
    f: (x) => {
        Assert.isString(x);
    },
});
fun({
    nameI: "c",
    v: true,
    f: (x) => {
        Assert.isBoolean(x);
    },
});
fun({
    nameI: "d",
    v: {},
    f: (x) => {
        Assert.isObject(x);
    },
});