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
    export namespace MemoryDotting {
        export interface RecordInfo {
            recordStage: string,
            recordIndex: number
        }
        export const BINDE_SOURCE_FILE = 'binder(bindSourceFile: Bind)';
        export const CHECK_SOURCE_FILE = 'checker(checkSourceFile: Check)';
        export const EMIT_FILES = 'emitter(emitFiles: EmitEachOutputFile)';
        export const CREATE_SORUCE_FILE_PARSE = 'parser(createSourceFile: Parse)';
        export const BEFORE_PROGRAM = 'program(createProgram: beforeProgram)';
        export const TRANSFORM = 'transformer(transformNodes: Transform)';
    
        let memoryDottingCallback: ((stage: string) => RecordInfo) | undefined;
        let memoryDottingStopCallback: ((recordInfo: RecordInfo) => void) | undefined;
    
        export function recordStage(stage: string): RecordInfo | null {
            if (memoryDottingCallback !== undefined) {
                return memoryDottingCallback(stage);
            }
            return null;
        }
    
        export function stopRecordStage(recordInfo: RecordInfo | null): void {
            if (memoryDottingStopCallback !== undefined && recordInfo !== null) {
                memoryDottingStopCallback(recordInfo);
            }
        }
    
        export function setMemoryDottingCallBack(recordCallback: (stage: string) => RecordInfo, stopCallback: (recordInfo: RecordInfo) => void): void {
            if (recordCallback) {
                memoryDottingCallback = recordCallback;
            }
            if (stopCallback) {
                memoryDottingStopCallback = stopCallback;
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
}

