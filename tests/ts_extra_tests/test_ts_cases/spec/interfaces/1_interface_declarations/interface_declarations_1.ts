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
   An interface declaration declares an interface type.
   An InterfaceDeclaration introduces a named type (section 3.7) in the containing declaration space.
   The BindingIdentifier of an interface declaration may not be one of the predefined type names (section 3.8.1).
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

{
    interface Worker {
        x: number;

        work(): string;

        getS(): { rate: number,velocity: number; };
    }

    interface Tool {
        y: number;

        tool(): string;

        getS(): { rate: number, velocity: number;};
    }

    interface Runer extends Tool,Worker{
        z:string,

        getS(): { rate: number, velocity: number,play:string};

        run():string;

        tool(): string;
    }

    let result1: { rate: number,velocity: number; } = {
        rate: 1,
        velocity:123,
    };
    let result2: { velocity: number,rate: number,} = {
        velocity: 1,
        rate:999,
    };
    let  ToRun: {velocity: number, rate: number, play: string} = {
        velocity: 1314,
        rate:999,
        play:"一万年",
    }

    let point: Worker = {
        x: 1,
        getS(): {rate: number, velocity: number} {
            return result2
        },
        work(): string {
            return "work";
        }
    };
    let pointer: Tool = {
        y: 1,
        getS(): {rate: number, velocity: number} {
            return result1
        },
        tool(): string {
            return "tool";
        },
    };
    let run:Runer = {
        x: ++point.x,
        y: --pointer.y,
        z:"with z",
        getS(): { rate: number; velocity: number; play: string } {
            return ToRun;
        },
        work(): string {
            return "let it work";
        },
        run():string {
            return "let it run";
        },
        tool(): string {
            return "He is the tool of work";
        }
    }

    Assert.equal(run.x,2);
    Assert.equal(run.y,0);
    Assert.equal(run.z,"with z");
    Assert.equal(run.getS(),ToRun);
    Assert.equal(run.run()+","+run.work()+","+run.tool(),"let it run,let it work,He is the tool of work");
    Assert.equal(point.x, 2);
    Assert.equal(pointer.y, 0);
    Assert.equal(point.getS(), result2);
    Assert.equal(pointer.getS(), result1);
    Assert.equal(pointer.tool(), "tool");
    Assert.equal(point.work(), "work");
};
