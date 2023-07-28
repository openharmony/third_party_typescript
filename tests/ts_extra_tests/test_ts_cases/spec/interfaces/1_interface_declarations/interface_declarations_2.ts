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
   An interface can inherit from zero or more base types which are specified in the InterfaceExtendsClause.
   The base types must be type references to class or interface types.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

{
    interface Worker {
        x: number;

        work(): void;

        getS(): { velocity: number; };
    }

    interface Tool {
        y: number;

        tool(): void;

        getS(): { rate: number; };
    }

    interface WorkerTool extends Worker, Tool {
        z: string;

        getS(): { velocity: number; rate: number; };
    }

    let result: { velocity: number; rate: number; } = {
        velocity: 1,
        rate: 1
    };

    let point: WorkerTool = {
        x: 1 ,
        y: 1,
        z: "zzz",
        getS(): { velocity: number; rate: number; } {
            return result
        },
        tool(): string {
            return "tool";
        },
        work(): string {
            return "work";
        }
    };

    Assert.equal(point.x, 1);
    Assert.equal(point.y, 1);
    Assert.equal(point.z, "zzz");
    Assert.equal(point.getS(), result);
    Assert.equal(point.tool(), "tool");
    Assert.equal(point.work(), "work");
};
