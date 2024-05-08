/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
    satisfies can catch type mismatches. 
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js';

// @ts-check
/**
 * @typedef CompilerOptions
 * @prop {boolean} [strict]
 * @prop {string} [outDir]
 */

/**
 * @typedef ConfigSettings
 * @prop {CompilerOptions} [compilerOptions]
 * @prop {string | string[]} [extends]
 */

let myConfigSettings = /** @satisfies {ConfigSettings} */ {
  compilerOptions: {
    strict: true,
    outDir: '../lib'
  },
  extends: [
    '@tsconfig/strictest/tsconfig.json',
    '../../../tsconfig.base.json'
  ]
};

Assert.isTrue(myConfigSettings.compilerOptions.strict);