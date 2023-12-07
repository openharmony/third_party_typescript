/*
 * Copyright (c) 2023-2023 Huawei Device Co., Ltd.
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
export namespace ArkTSLinter_1_1 {

const LIMITED_STD_SYMBOL_API = [
  // properties
  'asyncIterator',
  'description',
  'hasInstance',
  'isConcatSpreadable',
  'match',
  'matchAll',
  'replace',
  'search',
  'species',
  'split',
  'toPrimitive',
  'toStringTag',
  'unscopables',

  // methods
  'for',
  'keyFor',
  'toString',
  'valueOf'
];

const LIMITED_STD_OBJECT_API = [
  // properties
  '__proto__',

  // methods
  '__defineGetter__',
  '__defineSetter__',
  '__lookupGetter__',
  '__lookupSetter__',
  'assign',
  'create',
  'defineProperties',
  'defineProperty',
  'freeze',
  'fromEntries',
  'getOwnPropertyDescriptor',
  'getOwnPropertyDescriptors',
  'getOwnPropertySymbols',
  'getPrototypeOf',
  'hasOwnProperty',
  'is',
  'isExtensible',
  'isFrozen',
  'isPrototypeOf',
  'isSealed',
  'preventExtensions',
  'propertyIsEnumerable',
  'seal',
  'setPrototypeOf'
];

const LIMITED_STD_PROXYHANDLER_API = [
  // properties

  // methods
  'apply',
  'construct',
  'defineProperty',
  'deleteProperty',
  'get',
  'getOwnPropertyDescriptor',
  'getPrototypeOf',
  'has',
  'isExtensible',
  'ownKeys',
  'preventExtensions',
  'set',
  'setPrototypeOf'
];

const LIMITED_STD_REFLECT_API = [
  // properties

  // methods
  'apply',
  'construct',
  'defineProperty',
  'deleteProperty',
  'getOwnPropertyDescriptor',
  'getPrototypeOf',
  'isExtensible',
  'preventExtensions',
  'setPrototypeOf'
];

const LIMITED_STD_FUNCTION_API_APPLY_CALL = [
  // properties

  // methods
  'apply',
  'call'
];

const LIMITED_STD_FUNCTION_API_BIND = [
  // properties

  // methods
  'bind'
];

const LIMITED_STD_GLOBAL_API = [
  // properties

  // methods
  'eval'
];

const STD_SYMBOL_ENTRY = [{ api: LIMITED_STD_SYMBOL_API, faultId: Problems.FaultID.SymbolType }];
const STD_OBJECT_ENTRY = [{ api: LIMITED_STD_OBJECT_API, faultId: Problems.FaultID.LimitedStdLibApi }];
const STD_PROXYHANDLER_ENTRY = [{ api: LIMITED_STD_PROXYHANDLER_API, faultId: Problems.FaultID.LimitedStdLibApi }];
const STD_REFLECT_ENTRY = [{ api: LIMITED_STD_REFLECT_API, faultId: Problems.FaultID.LimitedStdLibApi }];
const STD_FUNCTION_ENTRY = [
  { api: LIMITED_STD_FUNCTION_API_APPLY_CALL, faultId: Problems.FaultID.FunctionApplyCall },
  { api: LIMITED_STD_FUNCTION_API_BIND, faultId: Problems.FaultID.FunctionBind }
];
const STD_GLOBAL_ENTRY = [{ api: LIMITED_STD_GLOBAL_API, faultId: Problems.FaultID.LimitedStdLibApi }];

export type LimitedStdLibApiEntry = { api: string[]; faultId: Problems.FaultID };

export const LIMITED_STD_API = new Map<string | undefined, LimitedStdLibApiEntry[]>([
  [undefined, STD_GLOBAL_ENTRY],
  ['Object', STD_OBJECT_ENTRY],
  ['ObjectConstructor', STD_OBJECT_ENTRY],
  ['Reflect', STD_REFLECT_ENTRY],
  ['ProxyHandler', STD_PROXYHANDLER_ENTRY],
  ['Symbol', STD_SYMBOL_ENTRY],
  ['SymbolConstructor', STD_SYMBOL_ENTRY],
  ['Function', STD_FUNCTION_ENTRY],
  ['CallableFunction', STD_FUNCTION_ENTRY]
]);

}
} 
