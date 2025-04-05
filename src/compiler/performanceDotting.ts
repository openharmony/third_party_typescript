/*
 * Copyright (c) 2025 Huawei Device Co., Ltd.
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
    export namespace PerformanceDotting {
        const eventStack: string[] = []; // record the event
        const timeStack: string[] = []; // sort the relation of Parent-Child time
        let tempMap = new Map<string, Array<PerformanceData>>; // deal with the template performance dotting
        let recordMap = new Map<string, Array<PerformanceData>>; // record the performance dotting
        let timeHooks = require('perf_hooks'); // the method of processing time
        let count: number = 0;
        const layerCount = 5; // limit the layer number
        let advancedSwitch = false; // the advanced switch
        let traceSwitch = false; // the trace switch
        const TIME_CONVERSION: number = 1000000; // the conversion of time

        // Accordding to this parameter based on the enumeration sequence of switches set in the hvigor.
        export enum AnalyzeMode {
            DEFAULT = 0,
            VERBOSE = 1,
            TRACE = 3,
        }

        interface PerformanceData {
            startTime: number;
            endTime: number;
            duration: number;
            name: string;
            parentEvent: string;
            tier: number;
            fullPath: string;
            id: string;
            parentId: string;
            fileName: string;
        }

        export function setPerformanceSwitch(projectConfigPerf: AnalyzeMode): void {
            if (projectConfigPerf === AnalyzeMode.VERBOSE) {
                advancedSwitch = true;
            }
            if (projectConfigPerf === AnalyzeMode.TRACE) {
                advancedSwitch = true;
                traceSwitch = true;
            }
        }

        function processSharedStart(eventName: string, fileName: string): void {
            if (++count > layerCount) {
                return;
            }

            const currentEvent = eventName;
            const currentParentEvent = eventStack.length > 0 ? eventStack[eventStack.length - 1] : '';
            const currentParentId = timeStack.length > 0 ? timeStack[timeStack.length - 1] : '';
            const fullPath = eventStack.length > 0 ? `${eventStack.join('-')}-${eventName}` : eventName;
            let startTime = timeHooks.performance.now();
            let id = startTime.toString();
            const recordCurrentData: PerformanceData = {
                startTime: startTime,
                endTime: -1,
                duration: 0,
                name: currentEvent,
                parentEvent: currentParentEvent,
                tier: count,
                fullPath: fullPath,
                id: id,
                parentId: currentParentId,
                fileName: fileName
            };

            addOrUpdateEventData(tempMap, eventName, recordCurrentData);
            eventStack.push(eventName);
            timeStack.push(id);
        }

        function processSharedStop(eventName: string): void {
            if (count-- > layerCount) {
                return;
            }

            if (eventStack.length === 0 || eventStack[eventStack.length - 1] !== eventName) {
                throw new Error(`Event ${eventName} is not the current active event`);
            }

            const records = tempMap.get(eventName);
            if (records && records.length > 0) {
                const lastRecord = records.pop()!;
                lastRecord.endTime = timeHooks.performance.now();
                lastRecord.duration = lastRecord.endTime - lastRecord.startTime;
                addOrUpdateEventData(recordMap, eventName, lastRecord);
            } else {
                throw new Error(`No active record found for event ${eventName}`);
            }

            // remove the current event
            eventStack.pop();
            timeStack.pop();
        }

        export function startAdvanced(eventName: string, fileName: string = ''): void {
            if (!advancedSwitch) {
                return;
            }
            processSharedStart(eventName, fileName);
        }

        export function stopAdvanced(eventName: string): void {
            if (!advancedSwitch) {
                return;
            }
            processSharedStop(eventName);
        }

        export function start(eventName: string, fileName: string = ''): void {
            if (!traceSwitch) {
                return;
            }
            processSharedStart(eventName, fileName);
        }

        function addOrUpdateEventData(map: Map<Array<PerformanceData>>, eventName: string, data: PerformanceData): void {
            let records = map.get(eventName);
            if (!records) {
                records = [];
                map.set(eventName, records);
            }
            records.push(data);
        }

        export function stop(eventName: string): void {
            if (!traceSwitch) {
                return;
            }
            processSharedStop(eventName);
        }

        export function getEventData(): Array<PerformanceData> {
            const mergedRecordsMap: Map<PerformanceData> = new Map();

            // traverse all records
            recordMap.forEach((records) => {
                records.forEach((record) => {
                    // generate unique key
                    const key = `${record.fullPath}-${record.fileName}-${record.parentId}`;

                    // check whether the system already exists
                    if (mergedRecordsMap.has(key)) {
                        const existingRecord = mergedRecordsMap.get(key)!;
                        // add duration
                        existingRecord.duration += record.duration;
                        // update the smaller value of startTime
                        existingRecord.startTime = Math.min(existingRecord.startTime, record.startTime);
                        existingRecord.endTime = Math.max(existingRecord.endTime, record.endTime);
                    } else {
                        // add new record, and remove tier
                        mergedRecordsMap.set(key, record);
                    }
                });
            });

            let mergedRecords: Array<PerformanceData> = Array.from(mapValuesToArray(mergedRecordsMap));
            mergedRecords = mergedRecords.map(record => ({
                ...record,
                duration: record.duration * TIME_CONVERSION
            }));
            clearEvent();
            return mergedRecords;
        }

        function mapValuesToArray<K, V>(map: ReadonlyESMap<K, V>): V[] {
            const result: V[] = [];
            const iterator = map.values();

            let item: IteratorResult<V>;
            while (!(item = iterator.next()).done) {
              result.push(item.value);
            }
            return result;
        }
    
        export function clearEvent(): void {
            recordMap.clear();
            tempMap.clear();
            eventStack.length = 0;
            timeStack.length = 0;
            count = 0;
            advancedSwitch = false;
            traceSwitch = false;
        }
    }
}
