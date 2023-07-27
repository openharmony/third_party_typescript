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
 description: spreading an object can be handy to get a shallow copy.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

let humen = {
    name: "caihua",
    age: 20,
};
let job = { job: "stu" };
let data = {
    location: "mars",
    pets: {
        type: "dog",
        name: "ahuang",
    },
};

let combine = { ...humen, ...job, ...data };

Assert.equal(combine.name, humen.name);
Assert.equal(combine.age, humen.age);
Assert.equal(combine.job, job.job);
Assert.equal(combine.location, data.location);
Assert.equal(combine.pets.name, data.pets.name);
Assert.equal(combine.pets.type, data.pets.type);
Assert.equal(combine.name == humen.name, true);
Assert.equal(combine.age == humen.age, true);
Assert.equal(combine.job == job.job, true);
Assert.equal(combine.location == data.location, true);
Assert.equal(combine.pets == data.pets, true);
Assert.equal(combine.pets.type == data.pets.type, true);
Assert.equal(combine.pets.name == data.pets.name, true);
