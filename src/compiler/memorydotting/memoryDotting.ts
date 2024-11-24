/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

namespace ts {
    export const BINDE_SOURCE_FILE = 'binder(bindSourceFile: Bind)'
    export const CHECK_SOURCE_FILE = 'checker(checkSourceFile: Check)'
    export const EMIT_FILES = 'emitter(emitFiles: EmitEachOutputFile)'
    export const CREATE_SORUCE_FILE_PARSE = 'parser(createSourceFile: Parse)'
    export const BEFORE_PROGRAM = 'program(createProgram: beforeProgram)'
    export const CREATE_SCANNER = 'scanner(createScanner: createScanner)'
    export const TRANSFORM = 'transformer(transformNodes: Transform)'

    let memoryDottingCallback: ((stage: string, parentStage?: string) => void) | undefined;
    let memoryDottingStopCallback: ((stage: string, parentStage?: string) => void) | undefined;

    export function recordStage(stage: string, parentStage?: string): void {
        if (memoryDottingCallback !== undefined) {
            memoryDottingCallback(stage, parentStage);
        }
    }

    export function stopRecordStage(stage: string, parentStage?: string): void {
        if (memoryDottingStopCallback !== undefined) {
            memoryDottingStopCallback(stage, parentStage);
        }
    }

    export function setMemoryDottingCallBack(memorydottingCallback: (stage: string, parentStage?: string) => void, 
        memorydottingStopCallback: (stage: string, parentStage?: string) => void): void {
        if (memorydottingCallback) {
            memoryDottingCallback = memorydottingCallback;
        }
        if (memorydottingStopCallback) {
            memoryDottingStopCallback = memorydottingStopCallback;
        }
    }

    export function clearCallBack(): void {
        if (memoryDottingCallback !== undefined) {
            memoryDottingCallback = undefined;
        }
        if (memoryDottingStopCallback !== undefined) {
            memoryDottingStopCallback = undefined;
        }
    }
}
