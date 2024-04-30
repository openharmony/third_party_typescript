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
    The labeledElementDeclarations property of TupleType 
    may hold undefined for at each position where an element is unlabeled.
 module: ESNext
 isCurrent: true
 ---*/


import * as ts from 'typescript'
import { Assert } from '../../../suite/assert.js'

let flag = true;

enum InternalSymbolName {
  Call = '__call'
}

let mySymbol = {
  escapedName: InternalSymbolName.Call,
  flags: 98304,
  name: 'hello',

  getDeclarations() { return undefined },
  getDocumentationComment() { return [] },
  getEscapedName() { return this.escapedName },
  getFlags() { return 0 },
  getJsDocTags() { return [] },
  getName() { return this.name }
};

let myType = {
  flags: 1,
  symbol: mySymbol,

  getApparentProperties() { return [] },
  getBaseTypes() { return undefined },
  getCallSignatures() { return [] },
  getConstraint() { return undefined },
  getConstructSignatures() { return [] },
  getDefault() { return undefined },
  getFlags() { return 0 },
  getNonNullableType() { return this },
  getNumberIndexType() { return undefined },
  getProperties() { return [] },
  getProperty() { return undefined },
  getStringIndexType() { return undefined },
  getSymbol() { return undefined },
  isClass() {},
  isClassOrInterface() {},
  isIndexType() {},
  isIntersection() {},
  isLiteral() {},
  isNumberLiteral() {},
  isStringLiteral() {},
  isTypeParameter() {},
  isUnion() {},
  isUnionOrIntersection() {}
};

const tuple: ts.TupleType = {
  combinedFlags: 1,
  elementFlags: [],
  fixedLength: 2056000000,
  flags: 1,
  hasRestElement: false,
  labeledElementDeclarations: [
    undefined
  ],
  localTypeParameters: undefined,
  minLength: 1028000,
  objectFlags: 1,
  outerTypeParameters: undefined,
  readonly: false,
  symbol: mySymbol,
  target: {
    flags: 1,
    localTypeParameters: undefined,
    objectFlags: 1,
    outerTypeParameters: undefined,
    symbol: mySymbol,
    target: {} as ts.GenericType,
    thisType: undefined,
    typeParameters: undefined,

    getApparentProperties() { return [] },
    getBaseTypes() { return undefined },
    getCallSignatures() { return [] },
    getConstraint() { return undefined },
    getConstructSignatures() { return [] },
    getDefault() { return undefined },
    getFlags() { return 1 },
    getNonNullableType() { return myType },
    getNumberIndexType() { return undefined },
    getProperties() { return [] },
    getProperty() { return undefined },
    getStringIndexType() { return undefined },
    getSymbol() { return undefined },
    isClass() {},
    isClassOrInterface() {},
    isIndexType() {},
    isIntersection() {},
    isLiteral() {},
    isNumberLiteral() {},
    isStringLiteral() {},
    isTypeParameter() {},
    isUnion() {},
    isUnionOrIntersection() {}
  },
  thisType: undefined,
  typeParameters: undefined,

  getApparentProperties() { return [] },
  getBaseTypes() { return undefined },
  getCallSignatures() { return [] },
  getConstraint() { return undefined },
  getConstructSignatures() { return [] },
  getDefault() { return undefined },
  getFlags() { return 1 },
  getNonNullableType() { return myType },
  getNumberIndexType() { return undefined },
  getProperties() { return [] },
  getProperty() { return undefined },
  getStringIndexType() { return undefined },
  getSymbol() { return undefined },
  isClass() {},
  isClassOrInterface() {},
  isIndexType() {},
  isIntersection() {},
  isLiteral() {},
  isNumberLiteral() {},
  isStringLiteral() {},
  isTypeParameter() {},
  isUnion() {},
  isUnionOrIntersection() {}
};

tuple.labeledElementDeclarations?.forEach((element: any) => {
  if (element) {
    if ('name' in element) {
      console.log('NamedTupleMember');
    } else {
      console.log('ParameterDeclaration');
    }
  } else {
    flag = false;
    console.log('Undefined element in the array');
  }
});

Assert.isFalse(flag);