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
    an ambient namespace declaration declares a namespace.
    except for ImportAliasDeclarations, AmbientNamespaceElements always declare exported entities regardless of whether they include the optional export modifier.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

declare namespace AmbientNamespace {
   var an1: string;
   export var an2: string;
   interface ColorInterface {
      Red: number;
      Green: number;
      Blue: number;
   }
}
var colorI: AmbientNamespace.ColorInterface = { Red: 0, Green: 1, Blue: 2 };
Assert.equal(JSON.stringify(colorI), '{"Red":0,"Green":1,"Blue":2}');
let an: typeof AmbientNamespace.an2 = "1024";
Assert.equal(an, '1024');