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

 
const objA: Promise<ESObject>; // OK
const objB: Promise<ESObject> = import('../../../common-lib/@arkts.lang'); // OK
const objC: Promise<ESObject> = await import('../../../common-lib/@arkts.lang'); // OK
const objD: () => Promise<ESObject> = (): ESObject => import('../../../common-lib/@arkts.lang'); // OK
const objE: () => Promise<ESObject> = (): Promise<ESObject> => import('../../../common-lib/@arkts.lang'); // OK
const objF: () => Promise<ESObject> = (): ESObject => await import('../../../common-lib/@arkts.lang'); // OK
const objG: () => Promise<ESObject> = (): Promise<ESObject> => await import('../../../common-lib/@arkts.lang'); // OK
const objH: () => Promise<ESObject> = async (): ESObject => import('../../../common-lib/@arkts.lang'); // OK
const objI: () => Promise<ESObject> = async (): Promise<ESObject> => import('../../../common-lib/@arkts.lang'); // OK
const objJ: () => Promise<ESObject> = async (): ESObject => await import('../../../common-lib/@arkts.lang'); // OK
const objK: () => Promise<ESObject> = async (): Promise<ESObject> => await import('../../../common-lib/@arkts.lang'); // OK
