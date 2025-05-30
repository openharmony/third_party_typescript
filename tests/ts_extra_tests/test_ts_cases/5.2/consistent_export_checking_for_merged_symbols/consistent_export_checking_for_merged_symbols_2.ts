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
    Individual declarations in merged declaration must be all exported or all local.
 module: ESNext
 isCurrent: true
 error: { code: Individual declarations in merged declaration 'replaceInFile' must be all exported or all local }
 ---*/


declare module 'replace-in-file' {
  // Error: Individual declarations in merged declaration 'replaceInFile' must be all exported or all local.
  export function replaceInFile(): void;

  export {};

  // Error: Individual declarations in merged declaration 'replaceInFile' must be all exported or all local.
  namespace replaceInFile {
    export function sync(): void;
  }
}