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


import * as ts from 'typescript';
import { Assert } from '../../../suite/assert.js';

let flag = true;

enum InternalSymbolName {
  Call = '__call'
}

let mySymbol = {
  escapedName: InternalSymbolName.Call,
  flags: 98304,
  name: 'hello',

  getDeclarations(): undefined { return undefined },
  getDocumentationComment(): ts.SymbolDisplayPart[] { return [] },
  getEscapedName(): ts.__String { return this.escapedName },
  getFlags(): number { return 0 },
  getJsDocTags(): ts.JSDocTagInfo[] { return [] },
  getName(): string { return this.name }
};

let myType = {
  flags: 1,
  symbol: mySymbol,

  getApparentProperties(): ts.Symbol[] { return [] },
  getBaseTypes(): undefined { return undefined },
  getCallSignatures(): ts.Signature[] { return [] },
  getConstraint(): undefined { return undefined },
  getConstructSignatures(): ts.Signature[] { return [] },
  getDefault(): undefined { return undefined },
  getFlags(): number { return 0 },
  getNonNullableType(): ts.Type { return this },
  getNumberIndexType(): undefined { return undefined },
  getProperties(): ts.Symbol[] { return [] },
  getProperty(): undefined { return undefined },
  getStringIndexType(): undefined { return undefined },
  getSymbol(): undefined { return undefined },
  isClass(): void {},
  isClassOrInterface(): void {},
  isIndexType(): void {},
  isIntersection(): void {},
  isLiteral(): void {},
  isNumberLiteral(): void {},
  isStringLiteral(): void {},
  isTypeParameter(): void {},
  isUnion(): void {},
  isUnionOrIntersection(): void {}
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

    getApparentProperties(): ts.Symbol[] { return [] },
    getBaseTypes(): undefined { return undefined },
    getCallSignatures(): ts.Signature[] { return [] },
    getConstraint(): undefined { return undefined },
    getConstructSignatures(): ts.Signature[] { return [] },
    getDefault(): undefined { return undefined },
    getFlags(): number { return 1 },
    getNonNullableType(): ts.Type { return myType },
    getNumberIndexType(): undefined { return undefined },
    getProperties(): ts.Symbol[] { return [] },
    getProperty(): undefined { return undefined },
    getStringIndexType(): undefined { return undefined },
    getSymbol(): undefined { return undefined },
    isClass(): void {},
    isClassOrInterface(): void {},
    isIndexType(): void {},
    isIntersection(): void {},
    isLiteral(): void {},
    isNumberLiteral(): void {},
    isStringLiteral(): void {},
    isTypeParameter(): void {},
    isUnion(): void {},
    isUnionOrIntersection(): void {}
  },
  thisType: undefined,
  typeParameters: undefined,

  getApparentProperties(): ts.Symbol[] { return [] },
  getBaseTypes(): undefined { return undefined },
  getCallSignatures(): ts.Signature[] { return [] },
  getConstraint(): undefined { return undefined },
  getConstructSignatures(): ts.Signature[] { return [] },
  getDefault(): undefined { return undefined },
  getFlags(): number { return 1 },
  getNonNullableType(): ts.Type { return myType },
  getNumberIndexType(): undefined { return undefined },
  getProperties(): ts.Symbol[] { return [] },
  getProperty(): undefined { return undefined },
  getStringIndexType(): undefined { return undefined },
  getSymbol(): undefined { return undefined },
  isClass(): void {},
  isClassOrInterface(): void {},
  isIndexType(): void {},
  isIntersection(): void {},
  isLiteral(): void {},
  isNumberLiteral(): void {},
  isStringLiteral(): void {},
  isTypeParameter(): void {},
  isUnion(): void {},
  isUnionOrIntersection(): void {}
};

tuple.labeledElementDeclarations?.forEach((element: ts.NamedTupleMember | ts.ParameterDeclaration | undefined) => {
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