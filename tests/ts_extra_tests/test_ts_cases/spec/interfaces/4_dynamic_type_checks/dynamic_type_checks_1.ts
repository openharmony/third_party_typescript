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
   TypeScript does not provide a direct mechanism for dynamically testing whether an object implements a particular
   interface. Instead, TypeScript code can use the JavaScript technique of checking whether an appropriate set of members
   are present on the object
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'


interface WorkerTool {
        shift(): void;

        rock(): void;

        getS(): void;
}

function asWorkerTool(o: any): WorkerTool {
        return o && o.shift && o.rock && o.getS ? o : null;
}

let point: WorkerTool = {
        getS(): void {
        },
        rock(): void {
        },
        shift(): void {
        }
};

Assert.equal(asWorkerTool(point), point);
Assert.equal(typeof asWorkerTool(point),"object")