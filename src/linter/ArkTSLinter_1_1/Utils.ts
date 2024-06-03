/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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

import FaultID = Problems.FaultID;
import AutofixInfo = Common.AutofixInfo;

export namespace Utils {
//import * as path from 'node:path';
//import * as ts from 'typescript';
//import ProblemInfo = ts.ProblemInfo;
//import TypeScriptLinter = TypeScriptLinter;

export const PROPERTY_HAS_NO_INITIALIZER_ERROR_CODE = 2564;

export const NON_INITIALIZABLE_PROPERTY_DECORATORS = ['Link', 'Consume', 'ObjectLink', 'Prop', 'BuilderParam', 'Param', 'Event'];

export const NON_INITIALIZABLE_PROPERTY_CLASS_DECORATORS = ['CustomDialog']

export const LIMITED_STANDARD_UTILITY_TYPES = [
  "Awaited", "Pick", "Omit", "Exclude", "Extract", "NonNullable", "Parameters",
  "ConstructorParameters", "ReturnType", "InstanceType", "ThisParameterType", "OmitThisParameter",
  "ThisType", "Uppercase", "Lowercase", "Capitalize", "Uncapitalize",
];

export const ALLOWED_STD_SYMBOL_API = ["iterator"]

export const ARKTS_IGNORE_DIRS = ['node_modules', 'oh_modules', 'build', '.preview'];
export const ARKTS_IGNORE_FILES = ['hvigorfile.ts'];

export const SENDABLE_DECORATOR = 'Sendable';

export const SENDABLE_INTERFACE = 'ISendable';

export const ARKTS_COLLECTIONS_D_ETS = '@arkts.collections.d.ets';

export const COLLECTIONS_NAMESPACE = 'collections';

export const ARKTS_LANG_D_ETS = '@arkts.lang.d.ets';

export const LANG_NAMESPACE = 'lang';

export const ISENDABLE_TYPE = 'ISendable';

export const USE_SHARED = 'use shared';

let typeChecker: TypeChecker;
export function setTypeChecker(tsTypeChecker: TypeChecker): void {
  typeChecker = tsTypeChecker;
}

export function clearTypeChecker(): void {
  typeChecker = {} as TypeChecker;
}

let testMode = false;
export function setTestMode(tsTestMode: boolean): void {
  testMode = tsTestMode;
}

export function getStartPos(nodeOrComment: Node | CommentRange): number {
  return (nodeOrComment.kind === SyntaxKind.SingleLineCommentTrivia || nodeOrComment.kind === SyntaxKind.MultiLineCommentTrivia)
    ? (nodeOrComment as CommentRange).pos
    : (nodeOrComment as Node).getStart();
}

export function getEndPos(nodeOrComment: Node | CommentRange): number {
  return (nodeOrComment.kind === SyntaxKind.SingleLineCommentTrivia || nodeOrComment.kind === SyntaxKind.MultiLineCommentTrivia)
    ? (nodeOrComment as CommentRange).end
    : (nodeOrComment as Node).getEnd();
}

export function getHighlightRange(nodeOrComment: Node | CommentRange, faultId: number): [number, number] {
  return (
    highlightRangeHandlers.get(faultId)?.call(undefined, nodeOrComment) ?? [
      getStartPos(nodeOrComment),
      getEndPos(nodeOrComment)
    ]
  );
}

const highlightRangeHandlers = new Map([
  [FaultID.VarDeclaration, getVarDeclarationHighlightRange],
  [FaultID.CatchWithUnsupportedType, getCatchWithUnsupportedTypeHighlightRange],
  [FaultID.ForInStatement, getForInStatementHighlightRange],
  [FaultID.WithStatement, getWithStatementHighlightRange],
  [FaultID.DeleteOperator, getDeleteOperatorHighlightRange],
  [FaultID.TypeQuery, getTypeQueryHighlightRange],
  [FaultID.InstanceofUnsupported, getInstanceofUnsupportedHighlightRange],
  [FaultID.ConstAssertion, getConstAssertionHighlightRange],
  [FaultID.LimitedReturnTypeInference, getLimitedReturnTypeInferenceHighlightRange],
  [FaultID.LocalFunction, getLocalFunctionHighlightRange],
  [FaultID.FunctionBind, getFunctionApplyCallHighlightRange],
  [FaultID.FunctionApplyCall, getFunctionApplyCallHighlightRange],
  [FaultID.DeclWithDuplicateName, getDeclWithDuplicateNameHighlightRange],
  [FaultID.ObjectLiteralNoContextType, getObjectLiteralNoContextTypeHighlightRange],
  [FaultID.ClassExpression, getClassExpressionHighlightRange],
  [FaultID.MultipleStaticBlocks, getMultipleStaticBlocksHighlightRange],
  [FaultID.SendableDefiniteAssignment, getSendableDefiniteAssignmentHighlightRange]
]);

export function getVarDeclarationHighlightRange(nodeOrComment: Node | CommentRange): [number, number] | undefined {
  return getKeywordHighlightRange(nodeOrComment, 'var');
}

export function getCatchWithUnsupportedTypeHighlightRange(
  nodeOrComment: Node | CommentRange
): [number, number] | undefined {
  const catchClauseNode = (nodeOrComment as CatchClause).variableDeclaration;
  if (catchClauseNode !== undefined) {
    return [catchClauseNode.getStart(), catchClauseNode.getEnd()];
  }

  return undefined;
}

export function getForInStatementHighlightRange(nodeOrComment: Node | CommentRange): [number, number] | undefined {
  return [
    getEndPos((nodeOrComment as ForInStatement).initializer) + 1,
    getStartPos((nodeOrComment as ForInStatement).expression) - 1
  ];
}

export function getWithStatementHighlightRange(nodeOrComment: Node | CommentRange): [number, number] | undefined {
  return [getStartPos(nodeOrComment), (nodeOrComment as WithStatement).statement.getStart() - 1];
}

export function getDeleteOperatorHighlightRange(nodeOrComment: Node | CommentRange): [number, number] | undefined {
  return getKeywordHighlightRange(nodeOrComment, 'delete');
}

export function getTypeQueryHighlightRange(nodeOrComment: Node | CommentRange): [number, number] | undefined {
  return getKeywordHighlightRange(nodeOrComment, 'typeof');
}

export function getInstanceofUnsupportedHighlightRange(
  nodeOrComment: Node | CommentRange
): [number, number] | undefined {
  return getKeywordHighlightRange((nodeOrComment as BinaryExpression).operatorToken, 'instanceof');
}

export function getConstAssertionHighlightRange(nodeOrComment: Node | CommentRange): [number, number] | undefined {
  if (nodeOrComment.kind === SyntaxKind.AsExpression) {
    return [
      (nodeOrComment as AsExpression).expression.getEnd() + 1,
      (nodeOrComment as AsExpression).type.getStart() - 1
    ];
  }
  return [
    (nodeOrComment as TypeAssertion).expression.getEnd() + 1,
    (nodeOrComment as TypeAssertion).type.getEnd() + 1
  ];
}

export function getLimitedReturnTypeInferenceHighlightRange(
  nodeOrComment: Node | CommentRange
): [number, number] | undefined {
  let node: Node | undefined;
  if (nodeOrComment.kind === SyntaxKind.FunctionExpression) {
    // we got error about return type so it should be present
    node = (nodeOrComment as FunctionExpression).type;
  } else if (nodeOrComment.kind === SyntaxKind.FunctionDeclaration) {
    node = (nodeOrComment as FunctionDeclaration).name;
  } else if (nodeOrComment.kind === SyntaxKind.MethodDeclaration) {
    node = (nodeOrComment as MethodDeclaration).name;
  }
  if (node !== undefined) {
    return [node.getStart(), node.getEnd()];
  }

  return undefined;
}

export function getLocalFunctionHighlightRange(nodeOrComment: Node | CommentRange): [number, number] | undefined {
  return getKeywordHighlightRange(nodeOrComment, 'function');
}

export function getFunctionApplyCallHighlightRange(nodeOrComment: Node | CommentRange): [number, number] | undefined {
  const pointPos = (nodeOrComment as Node).getText().lastIndexOf('.');
  return [getStartPos(nodeOrComment) + pointPos + 1, getEndPos(nodeOrComment)];
}

export function getDeclWithDuplicateNameHighlightRange(
  nodeOrComment: Node | CommentRange
): [number, number] | undefined {
  // in case of private identifier no range update is needed
  const nameNode: Node | undefined = (nodeOrComment as NamedDeclaration).name;
  if (nameNode !== undefined) {
    return [nameNode.getStart(), nameNode.getEnd()];
  }

  return undefined;
}

export function getObjectLiteralNoContextTypeHighlightRange(
  nodeOrComment: Node | CommentRange
): [number, number] | undefined {
  return getKeywordHighlightRange(nodeOrComment, '{');
}

export function getClassExpressionHighlightRange(nodeOrComment: Node | CommentRange): [number, number] | undefined {
  return getKeywordHighlightRange(nodeOrComment, 'class');
}

export function getMultipleStaticBlocksHighlightRange(nodeOrComment: ts.Node | ts.CommentRange): [number, number] | undefined {
  return getKeywordHighlightRange(nodeOrComment, 'static');
}

// highlight ranges for Sendable rules
export function getSendableDefiniteAssignmentHighlightRange(
  nodeOrComment: ts.Node | ts.CommentRange
): [number, number] | undefined {
  const name = (nodeOrComment as ts.PropertyDeclaration).name;
  const exclamationToken = (nodeOrComment as ts.PropertyDeclaration).exclamationToken;
  return [name.getStart(), exclamationToken ? exclamationToken.getEnd() : name.getEnd()];
}

export function getKeywordHighlightRange(nodeOrComment: Node | CommentRange, keyword: string): [number, number] {
  const start = getStartPos(nodeOrComment);
  return [start, start + keyword.length];
}

export function isAssignmentOperator(tsBinOp: BinaryOperatorToken): boolean {
  return tsBinOp.kind >= SyntaxKind.FirstAssignment && tsBinOp.kind <= SyntaxKind.LastAssignment;
}

export function isType(tsType: TypeNode | undefined, checkType: string): boolean {
  if (tsType === undefined || !isTypeReferenceNode(tsType)) {
    return false;
  }
  return entityNameToString(tsType.typeName) === checkType;
}

export function entityNameToString(name: EntityName): string {
  if (isIdentifier(name)) {
    return name.escapedText.toString();
  }
  else {
    return entityNameToString(name.left) + entityNameToString(name.right);
  }
}

export function isNumberLikeType(tsType: Type): boolean {
  return (tsType.getFlags() & TypeFlags.NumberLike) !== 0;
}

export function isBooleanLikeType(tsType: Type): boolean {
  return (tsType.getFlags() & TypeFlags.BooleanLike) !== 0;
}

export function isStringLikeType(tsType: Type): boolean {
  if (tsType.isUnion()) {
    for (const tsCompType of tsType.types) {
      if ((tsCompType.flags & TypeFlags.StringLike) === 0) return false;
    }
    return true;
  }
  return (tsType.getFlags() & TypeFlags.StringLike) !== 0;
}

export function isStringType(tsType: ts.Type): boolean {
  if ((tsType.getFlags() & ts.TypeFlags.String) !== 0) {
    return true;
  }

  if (!isTypeReference(tsType)) {
    return false;
  }

  const symbol = tsType.symbol;
  const name = typeChecker.getFullyQualifiedName(symbol);
  return name === 'String' && isGlobalSymbol(symbol);
}

export function isPrimitiveEnumMemberType(type: Type, primitiveType: TypeFlags): boolean {
  const isNonPrimitive = (type.flags & TypeFlags.NonPrimitive) !== 0;
  if (!isEnumMemberType(type) || isNonPrimitive) {
    return false;
  }
  return (type.flags & primitiveType) !== 0;
}

export function unwrapParenthesizedType(tsType: TypeNode): TypeNode {
  while (isParenthesizedTypeNode(tsType)) {
    tsType = tsType.type;
  }
  return tsType;
}

export function findParentIf(asExpr: AsExpression): IfStatement | null {
  let node = asExpr.parent;
  while (node) {
    if (node.kind === SyntaxKind.IfStatement) {
      return node as IfStatement;
    }
    node = node.parent;
  }

  return null;
}

export function isDestructuringAssignmentLHS(
  tsExpr: ArrayLiteralExpression | ObjectLiteralExpression
): boolean {
  // Check whether given expression is the LHS part of the destructuring
  // assignment (or is a nested element of destructuring pattern).
  let tsParent = tsExpr.parent;
  let tsCurrentExpr: Node = tsExpr;
  while (tsParent) {
    if (
      isBinaryExpression(tsParent) && isAssignmentOperator(tsParent.operatorToken) &&
      tsParent.left === tsCurrentExpr
    ) {
      return true;
    }
    if (
      (isForStatement(tsParent) || isForInStatement(tsParent) || isForOfStatement(tsParent)) &&
      tsParent.initializer && tsParent.initializer === tsCurrentExpr
    ) {
      return true;
    }
    tsCurrentExpr = tsParent;
    tsParent = tsParent.parent;
  }

  return false;
}

export function isEnumType(tsType: ts.Type): boolean {
  // when type equals `typeof <Enum>`, only symbol contains information about it's type.
  const isEnumSymbol = tsType.symbol && isEnum(tsType.symbol);
  // otherwise, we should analyze flags of the type itself
  const isEnumType = !!(tsType.flags & ts.TypeFlags.Enum) || !!(tsType.flags & ts.TypeFlags.EnumLiteral);
  return isEnumSymbol || isEnumType;
}

export function isEnum(tsSymbol: ts.Symbol): boolean {
  return !!(tsSymbol.flags & ts.SymbolFlags.Enum);
}

export function isEnumMemberType(tsType: Type): boolean {
  // Note: For some reason, test (tsType.flags & TypeFlags.Enum) != 0 doesn't work here.
  // Must use SymbolFlags to figure out if this is an enum type.
  return tsType.symbol && (tsType.symbol.flags & SymbolFlags.EnumMember) !== 0;
}

export function isObjectLiteralType(tsType: Type): boolean {
  return tsType.symbol && (tsType.symbol.flags & SymbolFlags.ObjectLiteral) !== 0;
}

export function hasModifier(tsModifiers: readonly Modifier[] | undefined, tsModifierKind: number): boolean {
  // Sanity check.
  if (!tsModifiers) return false;

  for (const tsModifier of tsModifiers) {
    if (tsModifier.kind === tsModifierKind) return true;
  }

  return false;
}

export function unwrapParenthesized(tsExpr: Expression): Expression {
  let unwrappedExpr = tsExpr;
  while (isParenthesizedExpression(unwrappedExpr)) {
    unwrappedExpr = unwrappedExpr.expression;
  }
  return unwrappedExpr;
}

export function followIfAliased(sym: Symbol): Symbol {
  if ((sym.getFlags() & SymbolFlags.Alias) !== 0) {
    return typeChecker.getAliasedSymbol(sym);
  }
  return sym;
}

let trueSymbolAtLocationCache = new Map<ts.Node, ts.Symbol | null>();

export function trueSymbolAtLocation(node: Node): Symbol | undefined {
  let cache = trueSymbolAtLocationCache;
  let val = cache.get(node);
  if (val !== undefined) {
    return val !== null ? val : undefined;
  }
  let sym = typeChecker.getSymbolAtLocation(node);
  if (sym === undefined) {
    cache.set(node, null);
    return undefined;
  }
  sym = followIfAliased(sym);
  cache.set(node, sym);
  return sym;
}

export function clearTrueSymbolAtLocationCache(): void {
  trueSymbolAtLocationCache.clear();
}

export function isTypeDeclSyntaxKind(kind: SyntaxKind) {
  return isStructDeclarationKind(kind) ||
    kind === SyntaxKind.EnumDeclaration ||
    kind === SyntaxKind.ClassDeclaration ||
    kind === SyntaxKind.InterfaceDeclaration ||
    kind === SyntaxKind.TypeAliasDeclaration;
}

export function symbolHasDuplicateName(symbol: Symbol, tsDeclKind: SyntaxKind): boolean {
  // Type Checker merges all declarations with the same name in one scope into one symbol.
  // Thus, check whether the symbol of certain declaration has any declaration with
  // different syntax kind.
  const symbolDecls = symbol?.getDeclarations();
  if (symbolDecls) {
    for (const symDecl of symbolDecls) {
      const declKind = symDecl.kind;
      // we relax arkts-unique-names for namespace collision with class/interface/enum/type/struct
      const isNamespaceTypeCollision =
        (isTypeDeclSyntaxKind(declKind) && tsDeclKind === SyntaxKind.ModuleDeclaration) ||
        (isTypeDeclSyntaxKind(tsDeclKind) && declKind === SyntaxKind.ModuleDeclaration);

      // Don't count declarations with 'Identifier' syntax kind as those
      // usually depict declaring an object's property through assignment.
      if (declKind !== SyntaxKind.Identifier && declKind !== tsDeclKind && !isNamespaceTypeCollision) return true;
    }
  }

  return false;
}

export function isReferenceType(tsType: Type): boolean {
  const f = tsType.getFlags();
  return (
    (f & TypeFlags.InstantiableNonPrimitive) !== 0 || (f & TypeFlags.Object) !== 0 ||
    (f & TypeFlags.Boolean) !== 0 || (f & TypeFlags.Enum) !== 0 || (f & TypeFlags.NonPrimitive) !== 0 ||
    (f & TypeFlags.Number) !== 0 || (f & TypeFlags.String) !== 0
  );
}

export function isPrimitiveType(type: Type): boolean {
  const f = type.getFlags();
  return (
    (f & TypeFlags.Boolean) !== 0 || (f & TypeFlags.BooleanLiteral) !== 0 ||
    (f & TypeFlags.Number) !== 0 || (f & TypeFlags.NumberLiteral) !== 0
    // In ArkTS 'string' is not a primitive type. So for the common subset 'string'
    // should be considered as a reference type. That is why next line is commented out.
    //(f & TypeFlags.String) != 0 || (f & TypeFlags.StringLiteral) != 0
  );
}

export function isTypeSymbol(symbol: Symbol | undefined): boolean {
  return (
    !!symbol && !!symbol.flags &&
    ((symbol.flags & SymbolFlags.Class) !== 0 || (symbol.flags & SymbolFlags.Interface) !== 0)
  );
}

// Check whether type is generic 'Array<T>' type defined in TypeScript standard library.
export function isGenericArrayType(tsType: Type): tsType is TypeReference {
  return (
    isTypeReference(tsType) && tsType.typeArguments?.length === 1 && tsType.target.typeParameters?.length === 1 &&
    tsType.getSymbol()?.getName() === "Array"
  );
}

export function isReadonlyArrayType(tsType: Type): boolean {
  return (
    isTypeReference(tsType) && tsType.typeArguments?.length === 1 && tsType.target.typeParameters?.length === 1 &&
    (tsType.getSymbol()?.getName() === 'ReadonlyArray')
  );
}

export function isTypedArray(tsType: ts.Type): boolean {
  const symbol = tsType.symbol;
  if (!symbol) {
    return false;
  }
  const name = typeChecker.getFullyQualifiedName(symbol);
  return isGlobalSymbol(symbol) && TYPED_ARRAYS.includes(name);
}

export function isArray(tsType: ts.Type): boolean {
  return isGenericArrayType(tsType) || isReadonlyArrayType(tsType) || isTypedArray(tsType);
}

export function isTuple(tsType: ts.Type): boolean {
  return isTypeReference(tsType) && !!(tsType.objectFlags & ts.ObjectFlags.Tuple);
}

// does something similar to relatedByInheritanceOrIdentical function
export function isOrDerivedFrom(tsType: ts.Type, checkType: CheckType, checkedBaseTypes?: Set<ts.Type>): boolean {
  if (isTypeReference(tsType) && tsType.target !== tsType) {
    tsType = tsType.target;
  }
  if (checkType(tsType)) {
    return true;
  }
  if (!tsType.symbol || !tsType.symbol.declarations) {
    return false;
  }

  // Avoid type recursion in heritage by caching checked types.
  (checkedBaseTypes ||= new Set<ts.Type>()).add(tsType);

  for (const tsTypeDecl of tsType.symbol.declarations) {
    const isClassOrInterfaceDecl = ts.isClassDeclaration(tsTypeDecl) || ts.isInterfaceDeclaration(tsTypeDecl);
    const isDerived = isClassOrInterfaceDecl && !!tsTypeDecl.heritageClauses;
    if (!isDerived) {
      continue;
    }
    for (const heritageClause of tsTypeDecl.heritageClauses) {
      if (processParentTypesCheck(heritageClause.types, checkType, checkedBaseTypes)) {
        return true;
      }
    }
  }

  return false;
}

export function isTypeReference(tsType: Type): tsType is TypeReference {
  return (
    (tsType.getFlags() & TypeFlags.Object) !== 0 &&
    ((tsType as ObjectType).objectFlags & ObjectFlags.Reference) !== 0
  );
}

export function isNullType(tsTypeNode: TypeNode): boolean {
  return (isLiteralTypeNode(tsTypeNode) && tsTypeNode.literal.kind === SyntaxKind.NullKeyword);
}

export function isThisOrSuperExpr(tsExpr: Expression): boolean {
  return (tsExpr.kind === SyntaxKind.ThisKeyword || tsExpr.kind === SyntaxKind.SuperKeyword);
}

export function isPrototypeSymbol(symbol: Symbol | undefined): boolean {
  return (!!symbol && !!symbol.flags && (symbol.flags & SymbolFlags.Prototype) !== 0);
}

export function isFunctionSymbol(symbol: Symbol | undefined): boolean {
  return (!!symbol && !!symbol.flags && (symbol.flags & SymbolFlags.Function) !== 0);
}

export function isInterfaceType(tsType: Type | undefined): boolean {
  return (
    !!tsType && !!tsType.symbol && !!tsType.symbol.flags &&
    (tsType.symbol.flags & SymbolFlags.Interface) !== 0
  );
}

export function isAnyType(tsType: Type): tsType is TypeReference {
  return (tsType.getFlags() & TypeFlags.Any) !== 0;
}

export function isUnknownType(tsType: Type): boolean {
  return (tsType.getFlags() & TypeFlags.Unknown) !== 0;
}

export function isUnsupportedType(tsType: Type): boolean {
  return (
    !!tsType.flags && ((tsType.flags & TypeFlags.Any) !== 0 || (tsType.flags & TypeFlags.Unknown) !== 0 ||
    (tsType.flags & TypeFlags.Intersection) !== 0)
  );
}

export function isUnsupportedUnionType(tsType: Type): boolean {
  if (tsType.isUnion()) {
    return !isNullableUnionType(tsType) && !isBooleanUnionType(tsType);
  }
  return false;
}

function isNullableUnionType(tsUnionType: UnionType): boolean {
  for (const t of tsUnionType.types) {
    if (!!(t.flags & ts.TypeFlags.Undefined) || !!(t.flags & ts.TypeFlags.Null)) {
      return true;
    }
  }
  return false;
}

function isBooleanUnionType(tsUnionType: UnionType): boolean {
  // For some reason, 'boolean' type is also represented as as union
  // of 'true' and 'false' literal types. This form of 'union' type
  // should be considered as supported.
  const tsCompTypes = tsUnionType.types;
  return (
    tsUnionType.flags === (TypeFlags.Boolean | TypeFlags.Union) && tsCompTypes.length === 2 &&
    tsCompTypes[0].flags === TypeFlags.BooleanLiteral && (tsCompTypes[1].flags === TypeFlags.BooleanLiteral)
  );
}

export function isFunctionOrMethod(tsSymbol: Symbol | undefined): boolean {
  return (
    !!tsSymbol &&
    ((tsSymbol.flags & SymbolFlags.Function) !== 0 || (tsSymbol.flags & SymbolFlags.Method) !== 0)
  );
}

export function isMethodAssignment(tsSymbol: Symbol | undefined): boolean {
  return (
    !!tsSymbol &&
    ((tsSymbol.flags & SymbolFlags.Method) !== 0 && (tsSymbol.flags & SymbolFlags.Assignment) !== 0)
  );
}

export function getDeclaration(tsSymbol: ts.Symbol | undefined): ts.Declaration | undefined {
  if (tsSymbol && tsSymbol.declarations && tsSymbol.declarations.length > 0) {
    return tsSymbol.declarations[0];
  }
  return undefined;
}

function isVarDeclaration(tsDecl: Node): boolean {
  return isVariableDeclaration(tsDecl) && isVariableDeclarationList(tsDecl.parent);
}

export function isValidEnumMemberInit(tsExpr: Expression): boolean {
  if (isNumberConstantValue(tsExpr.parent as EnumMember)) {
    return true;
  }
  if (isStringConstantValue(tsExpr.parent as EnumMember)) {
    return true;
  }
  return isCompileTimeExpression(tsExpr);
}

export function isCompileTimeExpression(tsExpr: Expression): boolean {
  if (
    isParenthesizedExpression(tsExpr) ||
    (isAsExpression(tsExpr) && tsExpr.type.kind === SyntaxKind.NumberKeyword)) {
    return isCompileTimeExpression(tsExpr.expression);
  }
  switch (tsExpr.kind) {
    case SyntaxKind.PrefixUnaryExpression:
      return isPrefixUnaryExprValidEnumMemberInit(tsExpr as PrefixUnaryExpression);
    case SyntaxKind.ParenthesizedExpression:
    case SyntaxKind.BinaryExpression:
      return isBinaryExprValidEnumMemberInit(tsExpr as BinaryExpression);
    case SyntaxKind.ConditionalExpression:
      return isConditionalExprValidEnumMemberInit(tsExpr as ConditionalExpression);
    case SyntaxKind.Identifier:
      return isIdentifierValidEnumMemberInit(tsExpr as Identifier);
    case SyntaxKind.NumericLiteral:
      return true;
    case SyntaxKind.StringLiteral:
        return true;
    case SyntaxKind.PropertyAccessExpression: {
      // if enum member is in current enum declaration try to get value
      // if it comes from another enum consider as constant
      const propertyAccess = tsExpr as PropertyAccessExpression;
      if(isNumberConstantValue(propertyAccess)) {
        return true;
      }
      const leftHandSymbol = typeChecker.getSymbolAtLocation(propertyAccess.expression);
      if(!leftHandSymbol) {
        return false;
      }
      const decls = leftHandSymbol.getDeclarations();
      if (!decls || decls.length !== 1) {
        return false;
      }
      return isEnumDeclaration(decls[0]);
    }
    default:
      return false;
  }
}

function isPrefixUnaryExprValidEnumMemberInit(tsExpr: PrefixUnaryExpression): boolean {
  return (isUnaryOpAllowedForEnumMemberInit(tsExpr.operator) && isCompileTimeExpression(tsExpr.operand));
}

function isBinaryExprValidEnumMemberInit(tsExpr: BinaryExpression): boolean {
  return (
    isBinaryOpAllowedForEnumMemberInit(tsExpr.operatorToken) && isCompileTimeExpression(tsExpr.left) &&
    isCompileTimeExpression(tsExpr.right)
  );
}

function isConditionalExprValidEnumMemberInit(tsExpr: ConditionalExpression): boolean {
  return (isCompileTimeExpression(tsExpr.whenTrue) && isCompileTimeExpression(tsExpr.whenFalse));
}

function isIdentifierValidEnumMemberInit(tsExpr: Identifier): boolean {
  const tsSymbol = typeChecker.getSymbolAtLocation(tsExpr);
  const tsDecl = getDeclaration(tsSymbol);
  return (!!tsDecl &&
            ((isVarDeclaration(tsDecl) && isConst(tsDecl.parent)) ||
              (tsDecl.kind === SyntaxKind.EnumMember)
            )
  );
}

function isUnaryOpAllowedForEnumMemberInit(tsPrefixUnaryOp: PrefixUnaryOperator): boolean {
  return (
    tsPrefixUnaryOp === SyntaxKind.PlusToken || tsPrefixUnaryOp === SyntaxKind.MinusToken ||
    tsPrefixUnaryOp === SyntaxKind.TildeToken
  );
}

function isBinaryOpAllowedForEnumMemberInit(tsBinaryOp: BinaryOperatorToken): boolean {
  return (
    tsBinaryOp.kind === SyntaxKind.AsteriskToken || tsBinaryOp.kind === SyntaxKind.SlashToken ||
    tsBinaryOp.kind === SyntaxKind.PercentToken || tsBinaryOp.kind === SyntaxKind.MinusToken ||
    tsBinaryOp.kind === SyntaxKind.PlusToken || tsBinaryOp.kind === SyntaxKind.LessThanLessThanToken ||
    tsBinaryOp.kind === SyntaxKind.GreaterThanGreaterThanToken || tsBinaryOp.kind === SyntaxKind.BarBarToken ||
    tsBinaryOp.kind === SyntaxKind.GreaterThanGreaterThanGreaterThanToken ||
    tsBinaryOp.kind === SyntaxKind.AmpersandToken || tsBinaryOp.kind === SyntaxKind.CaretToken ||
    tsBinaryOp.kind === SyntaxKind.BarToken || tsBinaryOp.kind === SyntaxKind.AmpersandAmpersandToken
  );
}

export function isConst(tsNode: Node): boolean {
  return !!(getCombinedNodeFlags(tsNode) & NodeFlags.Const);
}

export function isNumberConstantValue(
  tsExpr: EnumMember | PropertyAccessExpression | ElementAccessExpression | NumericLiteral
): boolean {

  const tsConstValue = (tsExpr.kind === SyntaxKind.NumericLiteral) ?
    Number(tsExpr.getText()) :
    typeChecker.getConstantValue(tsExpr);

  return tsConstValue !== undefined && typeof tsConstValue === "number";
}

export function isIntegerConstantValue(
  tsExpr: EnumMember | PropertyAccessExpression | ElementAccessExpression | NumericLiteral
): boolean {

  const tsConstValue = (tsExpr.kind === SyntaxKind.NumericLiteral) ?
    Number(tsExpr.getText()) :
    typeChecker.getConstantValue(tsExpr);
  return (
    tsConstValue !== undefined && typeof tsConstValue === "number" &&
    tsConstValue.toFixed(0) === tsConstValue.toString()
  );
}

export function isStringConstantValue(
  tsExpr: EnumMember | PropertyAccessExpression | ElementAccessExpression
): boolean {
  const tsConstValue = typeChecker.getConstantValue(tsExpr);
  return (
    tsConstValue !== undefined && typeof tsConstValue === "string"
  );
}

// Returns true if typeA is a subtype of typeB
export function relatedByInheritanceOrIdentical(typeA: Type, typeB: Type): boolean {
  if (isTypeReference(typeA) && typeA.target !== typeA) { typeA = typeA.target; }
  if (isTypeReference(typeB) && typeB.target !== typeB) { typeB = typeB.target; }

  if (typeA === typeB || isObject(typeB)) { return true; }
  if (!typeA.symbol || !typeA.symbol.declarations) { return false; }

  for (const typeADecl of typeA.symbol.declarations) {
    if (
      (!isClassDeclaration(typeADecl) && !isInterfaceDeclaration(typeADecl)) ||
      !typeADecl.heritageClauses
    ) { continue; }
    for (const heritageClause of typeADecl.heritageClauses) {
      const processInterfaces = typeA.isClass() ? (heritageClause.token !== SyntaxKind.ExtendsKeyword) : true;
      if (processParentTypes(heritageClause.types, typeB, processInterfaces)) return true;
    }
  }

  return false;
}

export function reduceReference(t: ts.Type): ts.Type {
  return isTypeReference(t) && t.target !== t ? t.target : t;
}

function needToDeduceStructuralIdentityHandleUnions(
  lhsType: Type,
  rhsType: Type,
  rhsExpr: Expression
): boolean {
  if (rhsType.isUnion()) {
    // Each Class/Interface of the RHS union type must be compatible with LHS type.
    for (const compType of rhsType.types) {
      if (needToDeduceStructuralIdentity(lhsType, compType, rhsExpr)) {
        return true;
      }
    }
    return false;
  }

  if (lhsType.isUnion()) {
    // RHS type needs to be compatible with at least one type of the LHS union.
    for (const compType of lhsType.types) {
      if (!needToDeduceStructuralIdentity(compType, rhsType, rhsExpr)) {
        return false;
      }
    }
    return true;
  }
  // should be unreachable
  return false;
}

// return true if two class types are not related by inheritance and structural identity check is needed
export function needToDeduceStructuralIdentity(
  lhsType: Type,
  rhsType: Type,
  rhsExpr: Expression
): boolean {
  lhsType = getNonNullableType(lhsType);
  rhsType = getNonNullableType(rhsType);
  if (isLibraryType(lhsType)) {
    return false;
  }
  if (isDynamicObjectAssignedToStdType(lhsType, rhsExpr)) {
    return false;
  }
  // #14569: Check for Function type.
  if (areCompatibleFunctionals(lhsType, rhsType)) {
    return false;
  }
  if (rhsType.isUnion() || lhsType.isUnion()) {
    return needToDeduceStructuralIdentityHandleUnions(lhsType, rhsType, rhsExpr);
  }
  return lhsType.isClassOrInterface() && rhsType.isClassOrInterface() &&
    !relatedByInheritanceOrIdentical(rhsType, lhsType);
}

export function hasPredecessor(node: Node, predicate: (node: Node) => boolean): boolean {
  let parent = node.parent;
  while (parent !== undefined) {
    if (predicate(parent)) {
      return true;
    }
    parent = parent.parent;
  }
  return false;
}

export function processParentTypes(parentTypes: NodeArray<ExpressionWithTypeArguments>, typeB: Type, processInterfaces: boolean): boolean {
  for (const baseTypeExpr of parentTypes) {
    let baseType = typeChecker.getTypeAtLocation(baseTypeExpr);
    if (isTypeReference(baseType) && baseType.target !== baseType) baseType = baseType.target;
    if (baseType && (baseType.isClass() !== processInterfaces) && relatedByInheritanceOrIdentical(baseType, typeB)) return true;
  }
  return false;
}

function processParentTypesCheck(
  parentTypes: ts.NodeArray<ts.Expression>,
  checkType: CheckType,
  checkedBaseTypes: Set<ts.Type>
): boolean {
  for (const baseTypeExpr of parentTypes) {
    let baseType = typeChecker.getTypeAtLocation(baseTypeExpr);
    if (isTypeReference(baseType) && baseType.target !== baseType) {
      baseType = baseType.target;
    }
    if (
      baseType &&
      !checkedBaseTypes.has(baseType) &&
      isOrDerivedFrom(baseType, checkType, checkedBaseTypes)
    ) {
      return true;
    }
  }
  return false;
}


export function isObject(tsType: Type): boolean {
  if (!tsType) {
    return false;
  }
  if (tsType.symbol && (tsType.isClassOrInterface() && tsType.symbol.name === "Object")) {
    return true;
  }
  const node = typeChecker.typeToTypeNode(tsType, undefined, undefined);
  return node !== undefined && node.kind === SyntaxKind.ObjectKeyword;
}

export function logTscDiagnostic(diagnostics: readonly Diagnostic[], log: (message: any, ...args: any[]) => void): void {
  diagnostics.forEach((diagnostic) => {
    let message = flattenDiagnosticMessageText(diagnostic.messageText, "\n");

    if (diagnostic.file && diagnostic.start) {
      const { line, character } = getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
      message = `${diagnostic.file.fileName} (${line + 1}, ${character + 1}): ${message}`;
    }

    log(message);
  });
}

export function encodeProblemInfo(problem: ProblemInfo): string {
  return `${problem.problem}%${problem.start}%${problem.end}`;
}

export function decodeAutofixInfo(info: string): AutofixInfo {
  const infos = info.split("%");
  return { problemID: infos[0], start: Number.parseInt(infos[1]), end: Number.parseInt(infos[2]) };
}

export function isCallToFunctionWithOmittedReturnType(tsExpr: Expression): boolean {
  if (isCallExpression(tsExpr)) {
    const tsCallSignature = typeChecker.getResolvedSignature(tsExpr);
    if (tsCallSignature) {
      const tsSignDecl = tsCallSignature.getDeclaration();
      // `tsSignDecl` is undefined when `getResolvedSignature` returns `unknownSignature`
      if (!tsSignDecl || !tsSignDecl.type) return true;
    }
  }

  return false;
}

function hasReadonlyFields(type: Type): boolean {
  if (type.symbol.members === undefined) return false; // No members -> no readonly fields

  let result = false;

  type.symbol.members.forEach((value /*, key*/) => {
    if (
      value.declarations !== undefined && value.declarations.length > 0 &&
      isPropertyDeclaration(value.declarations[0])
    ) {
      const propmMods = ts.getModifiers(value.declarations[0] as ts.PropertyDeclaration);//value.declarations[0].modifiers; // TSC 4.2 doesn't have 'getModifiers()' method
      if (hasModifier(propmMods, SyntaxKind.ReadonlyKeyword)) {
        result = true;
        return;
      }
    }
  });

  return result;
}

function hasDefaultCtor(type: Type): boolean {
  if (type.symbol.members === undefined) return true; // No members -> no explicite constructors -> there is default ctor

  let hasCtor = false; // has any constructor
  let hasDefaultCtor = false; // has default constructor

  type.symbol.members.forEach((value /*, key*/) => {
    if ((value.flags & SymbolFlags.Constructor) !== 0) {
      hasCtor = true;

      if (value.declarations !== undefined && value.declarations.length > 0) {
        const declCtor = value.declarations[0] as ConstructorDeclaration;
        if (declCtor.parameters.length === 0) {
          hasDefaultCtor = true;
          return;
        }
      }
    }
  });

  return !hasCtor || hasDefaultCtor; // Has no any explicite constructor -> has implicite default constructor.
}

function isAbstractClass(type: Type): boolean {
  if (type.isClass() && type.symbol.declarations && type.symbol.declarations.length > 0) {
    const declClass = type.symbol.declarations[0] as ClassDeclaration;
    const classMods = ts.getModifiers(declClass); //declClass.modifiers; // TSC 4.2 doesn't have 'getModifiers()' method
    if (hasModifier(classMods, SyntaxKind.AbstractKeyword)) {
      return true;
    }
  }

  return false;
}

export function validateObjectLiteralType(type: Type | undefined): boolean {
  if (!type) return false;

  type = getTargetType(type);
  return (
    type !== undefined && type.isClassOrInterface() && hasDefaultCtor(type) &&
    !hasReadonlyFields(type) && !isAbstractClass(type)
  );
}

export function isStructDeclarationKind(kind: SyntaxKind) {
  return kind === SyntaxKind.StructDeclaration;
}

export function isStructDeclaration(node: Node) {
  return isStructDeclarationKind(node.kind);
}
export function isStructObjectInitializer(objectLiteral: ObjectLiteralExpression): boolean {
  if(isCallLikeExpression(objectLiteral.parent)) {
    const signature = typeChecker.getResolvedSignature(objectLiteral.parent);
    const signDecl = signature?.declaration;
    return !!signDecl && isConstructorDeclaration(signDecl) && isStructDeclaration(signDecl.parent);
  }
  return false;
}

export function hasMethods(type: Type): boolean {
  const properties = typeChecker.getPropertiesOfType(type);
  if (properties?.length) {
    for (const prop of properties) {
      if (prop.getFlags() & SymbolFlags.Method) return true;
    }
  };

  return false;
}

function findProperty(type: Type, name: string): Symbol | undefined {
  const properties = typeChecker.getPropertiesOfType(type);
  if(properties.length) {
    for (const prop of properties) {
      if (prop.name === name) return prop;
    }
  }
  return undefined;
}

export function checkTypeSet(typeSet: ts.Type, predicate: CheckType): boolean {
  if (!typeSet.isUnionOrIntersection()) {
    return predicate(typeSet);
  }
  for (let elemType of typeSet.types) {
    if (checkTypeSet(elemType, predicate)) {
      return true;
    }
  }
  return false;
}

export function getNonNullableType(t: ts.Type): ts.Type {
  if (t.isUnion()) {
    return t.getNonNullableType();
  }
  return t;
}

export function isObjectLiteralAssignable(lhsType: ts.Type | undefined, rhsExpr: ts.ObjectLiteralExpression): boolean {
  if (lhsType === undefined) {
    return false;
  }

  // Always check with the non-nullable variant of lhs type.
  lhsType = getNonNullableType(lhsType);

  if (lhsType.isUnion()) {
    for (const compType of lhsType.types) {
      if (isObjectLiteralAssignable(compType, rhsExpr)) {
        return true;
      }
    }
  }

  // Allow initializing with anything when the type
  // originates from the library.
  if (isAnyType(lhsType) || isLibraryType(lhsType)) {
    return true;
  }

  // issue 13412:
  // Allow initializing with a dynamic object when the LHS type
  // is primitive or defined in standard library.
  if (isDynamicObjectAssignedToStdType(lhsType, rhsExpr)) {
    return true;
  }

  // For Partial<T>, Required<T>, Readonly<T> types, validate their argument type.
  if (isStdPartialType(lhsType) || isStdRequiredType(lhsType) || isStdReadonlyType(lhsType)) {
    if (lhsType.aliasTypeArguments && lhsType.aliasTypeArguments.length === 1) {
      lhsType = lhsType.aliasTypeArguments[0];
    } else {
      return false;
    }
  }

  // Allow initializing Record objects with object initializer.
  // Record supports any type for a its value, but the key value
  // must be either a string or number literal.
  if (isStdRecordType(lhsType)) {
    return validateRecordObjectKeys(rhsExpr);
  }

  return validateObjectLiteralType(lhsType) && !hasMethods(lhsType) && validateFields(lhsType, rhsExpr);
}

function isDynamicObjectAssignedToStdType(lhsType: Type, rhsExpr: Expression): boolean {
  if (isStdLibraryType(lhsType) || isPrimitiveType(lhsType)) {
    const rhsSym = isCallExpression(rhsExpr)
      ? getSymbolOfCallExpression(rhsExpr)
      : typeChecker.getSymbolAtLocation(rhsExpr);

    if (rhsSym && isLibrarySymbol(rhsSym)) return true;
  }
  return false;
}

function getTargetType(type: Type): Type {
  return (type.getFlags() & TypeFlags.Object) &&
    (type as ObjectType).objectFlags & ObjectFlags.Reference ? (type as TypeReference).target : type;
}

export function isLiteralType(type: Type): boolean {
  return type.isLiteral() || (type.flags & TypeFlags.BooleanLiteral) !== 0;
}

export function validateFields(objectType: Type, objectLiteral: ObjectLiteralExpression): boolean {
  for (const prop of objectLiteral.properties) {
    if (isPropertyAssignment(prop)) {
      if (!validateField(objectType, prop)) {
        return false;
      }
    }
  };

  return true;
}

function validateField(type: ts.Type, prop: ts.PropertyAssignment): boolean {
  // Issue 15497: Use unescaped property name to find correpsponding property.
  const propNameSymbol = typeChecker.getSymbolAtLocation(prop.name);
  const propName = propNameSymbol ?
    ts.symbolName(propNameSymbol) :
    ts.isMemberName(prop.name) ?
      ts.idText(prop.name) :
      prop.name.getText();
  const propSym = findProperty(type, propName);
  if (!propSym || !propSym.declarations?.length) {
    return false;
  }

  const propType = typeChecker.getTypeOfSymbolAtLocation(propSym, propSym.declarations[0]);
  const initExpr = unwrapParenthesized(prop.initializer);
  if (ts.isObjectLiteralExpression(initExpr)) {
    if (!isObjectLiteralAssignable(propType, initExpr)) {
      return false;
    }
  } else {
    // Only check for structural sub-typing.
    if (needToDeduceStructuralIdentity(propType, typeChecker.getTypeAtLocation(initExpr), initExpr)) {
      return false;
    }
  }

  return true;
}

function isSupportedTypeNodeKind(kind: SyntaxKind): boolean {
  return kind !== SyntaxKind.AnyKeyword && kind !== SyntaxKind.UnknownKeyword &&
    kind !== SyntaxKind.SymbolKeyword && kind !== SyntaxKind.IndexedAccessType &&
    kind !== SyntaxKind.ConditionalType && kind !== SyntaxKind.MappedType &&
    kind !== SyntaxKind.InferType;

}

export function isSupportedType(typeNode: TypeNode): boolean {
  if (isParenthesizedTypeNode(typeNode)) return isSupportedType(typeNode.type);

  if (isArrayTypeNode(typeNode)) return isSupportedType(typeNode.elementType);

  if (isTypeReferenceNode(typeNode) && typeNode.typeArguments) {
    for (const typeArg of typeNode.typeArguments) {
      if (!isSupportedType(typeArg)) { return false; }
    }
    return true;
  }

  if (isUnionTypeNode(typeNode)) {
    for (const unionTypeElem of typeNode.types) {
      if (!isSupportedType(unionTypeElem)) { return false; }
    }
    return true;
  }

  if (isTupleTypeNode(typeNode)) {
    for (const elem of typeNode.elements) {
      if (isTypeNode(elem) && !isSupportedType(elem)) return false;
      if (isNamedTupleMember(elem) && !isSupportedType(elem.type)) return false;
    }
    return true;
  }

  return !isTypeLiteralNode(typeNode) && !isTypeQueryNode(typeNode) &&
    !isIntersectionTypeNode(typeNode) && isSupportedTypeNodeKind(typeNode.kind);
}

export function isStruct(symbol: Symbol) {
  if (!symbol.declarations) {
    return false;
  }
  for (const decl of symbol.declarations) {
    if (isStructDeclaration(decl)) {
      return true;
    }
  }
  return false;
}

function validateRecordObjectKeys(objectLiteral: ObjectLiteralExpression): boolean {
  for (const prop of objectLiteral.properties) {
    if (!prop.name) {
      return false;
    }
    const isValidComputedProperty = isComputedPropertyName(prop.name) && isValidComputedPropertyName(prop.name, true);
    if (!isStringLiteral(prop.name) && !isNumericLiteral(prop.name) && !isValidComputedProperty) {
      return false;
    }
  }
  return true;
}

/* Not need in Tsc 4.9
export function getDecorators(node: Node): readonly Decorator[] | undefined {
  if (node.decorators) {
    return filter(node.decorators, isDecorator);
  }
}
*/

export type CheckType = ((t: Type) => boolean);

export const ES_OBJECT = "ESObject";

export const LIMITED_STD_GLOBAL_FUNC = [
  "eval"
];
export const LIMITED_STD_OBJECT_API = [
  "__proto__", "__defineGetter__", "__defineSetter__", "__lookupGetter__", "__lookupSetter__", "assign", "create",
  "defineProperties", "defineProperty", "freeze", "fromEntries", "getOwnPropertyDescriptor",
  "getOwnPropertyDescriptors", "getOwnPropertySymbols", "getPrototypeOf", "hasOwnProperty", "is",
  "isExtensible", "isFrozen", "isPrototypeOf", "isSealed", "preventExtensions", "propertyIsEnumerable",
  "seal", "setPrototypeOf"
];
export const LIMITED_STD_REFLECT_API = [
 "apply", "construct", "defineProperty", "deleteProperty", "getOwnPropertyDescriptor", "getPrototypeOf",
    "isExtensible", "preventExtensions", "setPrototypeOf"
];
export const LIMITED_STD_PROXYHANDLER_API = [
  "apply", "construct", "defineProperty", "deleteProperty", "get", "getOwnPropertyDescriptor", "getPrototypeOf",
  "has", "isExtensible", "ownKeys", "preventExtensions", "set", "setPrototypeOf"
];

export const FUNCTION_HAS_NO_RETURN_ERROR_CODE = 2366;
export const NON_RETURN_FUNCTION_DECORATORS = ["AnimatableExtend", "Builder", "Extend", "Styles" ];

export const STANDARD_LIBRARIES = [
  "lib.dom.d.ts", "lib.dom.iterable.d.ts", "lib.webworker.d.ts", "lib.webworker.importscripd.ts",
  "lib.webworker.iterable.d.ts", "lib.scripthost.d.ts", "lib.decorators.d.ts", "lib.decorators.legacy.d.ts",
  "lib.es5.d.ts", "lib.es2015.core.d.ts", "lib.es2015.collection.d.ts", "lib.es2015.generator.d.ts",
  "lib.es2015.iterable.d.ts", "lib.es2015.promise.d.ts", "lib.es2015.proxy.d.ts", "lib.es2015.reflect.d.ts",
  "lib.es2015.symbol.d.ts", "lib.es2015.symbol.wellknown.d.ts", "lib.es2016.array.include.d.ts",
  "lib.es2017.object.d.ts", "lib.es2017.sharedmemory.d.ts", "lib.es2017.string.d.ts", "lib.es2017.intl.d.ts",
  "lib.es2017.typedarrays.d.ts", "lib.es2018.asyncgenerator.d.ts", "lib.es2018.asynciterable.d.ts",
  "lib.es2018.intl.d.ts", "lib.es2018.promise.d.ts", "lib.es2018.regexp.d.ts", "lib.es2019.array.d.ts",
  "lib.es2019.object.d.ts", "lib.es2019.string.d.ts", "lib.es2019.symbol.d.ts", "lib.es2019.intl.d.ts",
  "lib.es2020.bigint.d.ts", "lib.es2020.date.d.ts", "lib.es2020.promise.d.ts", "lib.es2020.sharedmemory.d.ts",
  "lib.es2020.string.d.ts", "lib.es2020.symbol.wellknown.d.ts", "lib.es2020.intl.d.ts", "lib.es2020.number.d.ts",
  "lib.es2021.promise.d.ts", "lib.es2021.string.d.ts", "lib.es2021.weakref.d.ts", "lib.es2021.intl.d.ts",
  "lib.es2022.array.d.ts", "lib.es2022.error.d.ts", "lib.es2022.intl.d.ts", "lib.es2022.object.d.ts",
  "lib.es2022.sharedmemory.d.ts", "lib.es2022.string.d.ts", "lib.es2022.regexp.d.ts", "lib.es2023.array.d.ts",
];

export const TYPED_ARRAYS = [
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Uint16Array",
  "Int32Array",
  "Uint32Array",
  "Float32Array",
  "Float64Array",
  "BigInt64Array",
  "BigUint64Array",
  ];

export function getParentSymbolName(symbol: Symbol): string | undefined {
  const name = typeChecker.getFullyQualifiedName(symbol);
  const dotPosition = name.lastIndexOf(".");
  return (dotPosition === -1) ? undefined : name.substring(0, dotPosition);
}

export function isGlobalSymbol(symbol: Symbol): boolean {
  const parentName = getParentSymbolName(symbol);
  return !parentName || parentName === "global";
}

export function isSymbolAPI(symbol: Symbol): boolean {
  const parentName = getParentSymbolName(symbol);
  let name = parentName ? parentName : symbol.escapedName;
  return name === 'Symbol' || name === "SymbolConstructor";
}

export function isStdSymbol(symbol: ts.Symbol): boolean {
  const name = typeChecker.getFullyQualifiedName(symbol);
  return name === 'Symbol' && isGlobalSymbol(symbol);
}

export function isSymbolIterator(symbol: ts.Symbol): boolean {
  const name = symbol.name;
  const parName = getParentSymbolName(symbol);
  return (parName === 'Symbol' || parName === 'SymbolConstructor') && name === 'iterator'
}

export function isDefaultImport(importSpec: ImportSpecifier): boolean {
  return importSpec?.propertyName?.text === "default";
}
export function hasAccessModifier(decl: Declaration): boolean {
  const modifiers = ts.getModifiers(decl as HasModifiers); //decl.modifiers; // TSC 4.2 doesn't have 'getModifiers()' method
  return (
    !!modifiers &&
    (hasModifier(modifiers, SyntaxKind.PublicKeyword) ||
      hasModifier(modifiers, SyntaxKind.ProtectedKeyword) ||
      hasModifier(modifiers, SyntaxKind.PrivateKeyword))
  );
}

export function getModifier(modifiers: readonly Modifier[] | undefined, modifierKind: SyntaxKind): Modifier | undefined {
  if (!modifiers) return undefined;
  return modifiers.find(x => x.kind === modifierKind);
}

export function getAccessModifier(modifiers: readonly Modifier[] | undefined): Modifier | undefined {
  return getModifier(modifiers, SyntaxKind.PublicKeyword) ??
    getModifier(modifiers, SyntaxKind.ProtectedKeyword) ??
    getModifier(modifiers, SyntaxKind.PrivateKeyword);
}

export function isStdRecordType(type: Type): boolean {
  // In TypeScript, 'Record<K, T>' is defined as type alias to a mapped type.
  // Thus, it should have 'aliasSymbol' and 'target' properties. The 'target'
  // in this case will resolve to origin 'Record' symbol.
  if (type.aliasSymbol) {
    const target = (type as TypeReference).target;
    if (target) {
      const sym = target.aliasSymbol;
      return !!sym && sym.getName() === "Record" && isGlobalSymbol(sym);
    }
  }

  return false;
}

export function isStdMapType(type: Type): boolean {
  const sym = type.symbol;
  return !!sym && sym.getName() === "Map" && isGlobalSymbol(sym);
}

export function isStdErrorType(type: ts.Type): boolean {
  const symbol = type.symbol;
  if (!symbol) {
    return false;
  }
  const name = typeChecker.getFullyQualifiedName(symbol);
  return name === 'Error' && isGlobalSymbol(symbol);
}

export function isStdPartialType(type: Type): boolean {
  const sym = type.aliasSymbol;
  return !!sym && sym.getName() === "Partial" && isGlobalSymbol(sym);
}

export function isStdRequiredType(type: Type): boolean {
  const sym = type.aliasSymbol;
  return !!sym && sym.getName() === "Required" && isGlobalSymbol(sym);
}

export function isStdReadonlyType(type: Type): boolean {
  const sym = type.aliasSymbol;
  return !!sym && sym.getName() === "Readonly" && isGlobalSymbol(sym);
}

export function isLibraryType(type: Type): boolean {
  const nonNullableType = type.getNonNullableType();
  if (nonNullableType.isUnion()) {
    for (const componentType of nonNullableType.types) {
      if (!isLibraryType(componentType)) {
        return false;
      }
    }
    return true;
  }
  return isLibrarySymbol(nonNullableType.aliasSymbol ?? nonNullableType.getSymbol());
}

export function hasLibraryType(node: Node): boolean {
  return isLibraryType(typeChecker.getTypeAtLocation(node));
}

export function isLibrarySymbol(sym: Symbol | undefined) {
  if (sym && sym.declarations && sym.declarations.length > 0) {
    const srcFile = sym.declarations[0].getSourceFile();
    if (!srcFile) {
      return false;
    }
    const fileName = srcFile.fileName;

    // Symbols from both *.ts and *.d.ts files should obey interop rules.
    // We disable such behavior for *.ts files in the test mode due to lack of 'ets'
    // extension support.
    const ext = getAnyExtensionFromPath(fileName);
    const isThirdPartyCode =
      ARKTS_IGNORE_DIRS.some(ignore => pathContainsDirectory(normalizePath(fileName), ignore)) ||
      ARKTS_IGNORE_FILES.some(ignore => getBaseFileName(fileName) === ignore);
    const isEts = (ext === '.ets');
    const isTs = (ext === '.ts' && !srcFile.isDeclarationFile);
    const isStatic = (isEts || (isTs && testMode)) && !isThirdPartyCode;
    const isStdLib = STANDARD_LIBRARIES.includes(getBaseFileName(fileName).toLowerCase());
    // We still need to confirm support for certain API from the
    // TypeScript standard library in ArkTS. Thus, for now do not
    // count standard library modules as dynamic.
    return !isStatic && !isStdLib;
  }

  return false;
}

export function pathContainsDirectory(targetPath: string, dir: string): boolean {
  for (const subdir of getPathComponents(targetPath)) {
    if (subdir === dir) {
      return true;
    }
  }
  return false;
}

export function getScriptKind(srcFile: SourceFile): ScriptKind {
  const fileName = srcFile.fileName;
  const ext = getAnyExtensionFromPath(fileName);
  switch (ext.toLowerCase()) {
    case Extension.Js:
      return ScriptKind.JS;
    case Extension.Jsx:
      return ScriptKind.JSX;
    case Extension.Ts:
      return ScriptKind.TS;
    case Extension.Tsx:
      return ScriptKind.TSX;
    case Extension.Json:
      return ScriptKind.JSON;
    default:
      return ScriptKind.Unknown;
  }
}

export function isStdLibraryType(type: Type): boolean {
  return isStdLibrarySymbol(type.aliasSymbol ?? type.getSymbol());
}

export function isStdLibrarySymbol(sym: Symbol | undefined) {
  if (sym && sym.declarations && sym.declarations.length > 0) {
    const srcFile = sym.declarations[0].getSourceFile();
    return srcFile &&
      STANDARD_LIBRARIES.includes(getBaseFileName(srcFile.fileName).toLowerCase());
  }

  return false;
}

export function isIntrinsicObjectType(type: Type): boolean {
  return !!(type.flags & TypeFlags.NonPrimitive);
}

export function isDynamicType(type: Type | undefined): boolean | undefined {
  if (type === undefined) {
    return false;
  }

  // Return 'true' if it is an object of library type initialization, otherwise
  // return 'false' if it is not an object of standard library type one.
  // In the case of standard library type we need to determine context.

  // Check the non-nullable version of type to eliminate 'undefined' type
  // from the union type elements.
  type = type.getNonNullableType();


  if (type.isUnion()) {
    for (const compType of type.types) {
      const isDynamic = isDynamicType(compType);
      if (isDynamic || isDynamic === undefined) {
        return isDynamic;
      }
    }
    return false;
  }

  if (isLibraryType(type)) {
    return true;
  }

  if (!isStdLibraryType(type) && !isIntrinsicObjectType(type) && !isAnyType(type)) {
    return false;
  }

  return undefined;
}

export function isObjectType(type: ts.Type): type is ts.ObjectType {
  return !!(type.flags & ts.TypeFlags.Object);
}

export function isAnonymous(type: ts.Type): boolean {
  if (isObjectType(type)) {
    return !!(type.objectFlags & ts.ObjectFlags.Anonymous);
  }
  return false;
}


export function isDynamicLiteralInitializer(expr: Expression): boolean {
  if (!isObjectLiteralExpression(expr) && !isArrayLiteralExpression(expr)) {
    return false;
  }

  // Handle nested literals:
  // { f: { ... } }
  let curNode: Node = expr;
  while (isObjectLiteralExpression(curNode) || isArrayLiteralExpression(curNode)) {
    const exprType = typeChecker.getContextualType(curNode);
    if (exprType !== undefined && !isAnonymous(exprType)) {
      const res = isDynamicType(exprType);
      if (res !== undefined) {
        return res;
      }
    }

    curNode = curNode.parent;
    if (isPropertyAssignment(curNode)) {
      curNode = curNode.parent;
    }
  }

  // Handle calls with literals:
  // foo({ ... })
  if (isCallExpression(curNode)) {
    const callExpr = curNode;
    const type = typeChecker.getTypeAtLocation(callExpr.expression);

    // this check is a hack to fix #13474, only for tac 4.2
    if (isAnyType(type)) return true;

    let sym: Symbol | undefined = type.symbol;
    if(isLibrarySymbol(sym)) {
      return true;
    }

    // #13483:
    // x.foo({ ... }), where 'x' is a variable exported from some library:
    if (isPropertyAccessExpression(callExpr.expression)) {
      sym = typeChecker.getSymbolAtLocation(callExpr.expression.expression);
      if (sym && sym.getFlags() & SymbolFlags.Alias) {
        sym = typeChecker.getAliasedSymbol(sym);
        if (isLibrarySymbol(sym)) {
          return true;
        }
      }
    }
  }

  // Handle property assignments with literals:
  // obj.f = { ... }
  if (isBinaryExpression(curNode)) {
    const binExpr = curNode;
    if (isPropertyAccessExpression(binExpr.left)) {
      const propAccessExpr = binExpr.left;
      const type = typeChecker.getTypeAtLocation(propAccessExpr.expression);
      return isLibrarySymbol(type.symbol);
    }
  }

  return false;
}

export function isEsObjectType(typeNode: ts.TypeNode | undefined): boolean {
  return !!typeNode && ts.isTypeReferenceNode(typeNode) && ts.isIdentifier(typeNode.typeName) &&
    typeNode.typeName.text === ES_OBJECT;
}

export function isInsideBlock(node: ts.Node): boolean {
  let par = node.parent
  while (par) {
    if (ts.isBlock(par)) {
      return true;
    }
    par = par.parent;
  }
  return false;
}

export function  isEsObjectPossiblyAllowed(typeRef: ts.TypeReferenceNode): boolean {
  return ts.isVariableDeclaration(typeRef.parent);
}

export function  isValueAssignableToESObject(node: ts.Node): boolean {
  if (ts.isArrayLiteralExpression(node) || ts.isObjectLiteralExpression(node)) {
    return false;
  }
  const valueType = typeChecker.getTypeAtLocation(node);
  return isUnsupportedType(valueType) || isAnonymousType(valueType)
}

export function getVariableDeclarationTypeNode(node: Node): TypeNode | undefined {
  let sym = trueSymbolAtLocation(node);
    if (sym === undefined) {
      return undefined;
    }
    return getSymbolDeclarationTypeNode(sym);
  }

export function getSymbolDeclarationTypeNode(sym: ts.Symbol): ts.TypeNode | undefined {
    const decl = getDeclaration(sym);
  if (!!decl && isVariableDeclaration(decl)) {
    return decl.type;
  }
  return undefined;
}

export function hasEsObjectType(node: Node): boolean {
  const typeNode = getVariableDeclarationTypeNode(node);
  return typeNode !== undefined && isEsObjectType(typeNode);
}

export function symbolHasEsObjectType(sym: ts.Symbol): boolean {
  const typeNode = getSymbolDeclarationTypeNode(sym);
  return typeNode !== undefined && isEsObjectType(typeNode);
}

export function isEsObjectSymbol(sym: Symbol): boolean {
  const decl = getDeclaration(sym);
  return !!decl && isTypeAliasDeclaration(decl) && decl.name.escapedText === ES_OBJECT &&
    decl.type.kind === SyntaxKind.AnyKeyword;
}

export function isAnonymousType(type: Type): boolean {
  if (type.isUnionOrIntersection()) {
    for (const compType of type.types) {
      if (isAnonymousType(compType)) {
        return true;
      }
    }
    return false;
  }

  return (type.flags & TypeFlags.Object) !== 0 &&
    ((type as ObjectType).objectFlags & ObjectFlags.Anonymous) !== 0;
}

export function getSymbolOfCallExpression(callExpr: CallExpression): Symbol | undefined {
  const signature = typeChecker.getResolvedSignature(callExpr);
  const signDecl = signature?.getDeclaration();
  if (signDecl && signDecl.name) {
    return typeChecker.getSymbolAtLocation(signDecl.name);
  }
  return undefined;
}

export function typeIsRecursive(topType: Type, type: Type | undefined = undefined): boolean {
  if (type === undefined) {
    type = topType;
  }
  else if (type === topType) {
    return true;
  }
  else if (type.aliasSymbol) {
    return false;
  }

  if (type.isUnion()) {
    for (const unionElem of type.types) {
      if (typeIsRecursive(topType, unionElem)) {
        return true;
      }
    }
  }
  if (type.flags & TypeFlags.Object && (type as ObjectType).objectFlags & ObjectFlags.Reference) {
    const typeArgs = typeChecker.getTypeArguments(type as TypeReference);
    if (typeArgs) {
      for (const typeArg of typeArgs) {
        if (typeIsRecursive(topType, typeArg)) {
          return true;
        }
      }
    }
  }
  return false;
}

export function getTypeOrTypeConstraintAtLocation(expr: ts.Expression): ts.Type {
  let type = typeChecker.getTypeAtLocation(expr);
  if (type.isTypeParameter()) {
    let constraint = type.getConstraint();
    if (constraint) {
      return constraint;
    }
  }
  return type;
}

function areCompatibleFunctionals(lhsType: ts.Type, rhsType: ts.Type): boolean {
  return (
    (isStdFunctionType(lhsType) || isFunctionalType(lhsType)) &&
    (isStdFunctionType(rhsType) || isFunctionalType(rhsType))
  );
}

function isFunctionalType(type: ts.Type): boolean {
  const callSigns = type.getCallSignatures();
  return callSigns && callSigns.length > 0;
}

function isStdFunctionType(type: ts.Type): boolean {
  const sym = type.getSymbol();
  return !!sym && sym.getName() === 'Function' && isGlobalSymbol(sym);
}

export function isStdBigIntType(type: ts.Type): boolean {
  const sym = type.symbol;
  return !!sym && sym.getName() === 'BigInt' && isGlobalSymbol(sym);
}

export function isStdNumberType(type: ts.Type): boolean {
  const sym = type.symbol;
  return !!sym && sym.getName() === 'Number' && isGlobalSymbol(sym);
}

export function isStdBooleanType(type: ts.Type): boolean {
  const sym = type.symbol;
  return !!sym && sym.getName() === 'Boolean' && isGlobalSymbol(sym);
}

export function isEnumStringLiteral(expr: ts.Expression): boolean {
  const symbol = trueSymbolAtLocation(expr);
  const isEnumMember = !!symbol && !!(symbol.flags & ts.SymbolFlags.EnumMember);
  const type = typeChecker.getTypeAtLocation(expr);
  const isStringEnumLiteral = isEnumType(type) && !!(type.flags & ts.TypeFlags.StringLiteral);
  return isEnumMember && isStringEnumLiteral;
}

export function isValidComputedPropertyName(computedProperty: ComputedPropertyName, isRecordObjectInitializer = false): boolean {
  const expr = computedProperty.expression;
  if (!isRecordObjectInitializer) {
    const symbol = trueSymbolAtLocation(expr);
    if (!!symbol && isSymbolIterator(symbol)) {
      return true;
    }
  }
  return isStringLiteralLike(expr) || isEnumStringLiteral(computedProperty.expression);
}

export function isAllowedIndexSignature(node: ts.IndexSignatureDeclaration): boolean {

  /*
   * For now, relax index signature only for specific array-like types
   * with the following signature: 'collections.Array<T>.[_: number]: T'.
   */

  if (node.parameters.length !== 1) {
    return false;
  }

  const paramType = typeChecker.getTypeAtLocation(node.parameters[0]);
  if ((paramType.flags & ts.TypeFlags.Number) === 0) {
    return false;
  }

  return isArkTSCollectionsArrayLikeDeclaration(node.parent);
}

export function isArkTSCollectionsArrayLikeType(type: ts.Type): boolean {
  const symbol = type.aliasSymbol ?? type.getSymbol();
  if (symbol?.declarations === undefined || symbol.declarations.length < 1) {
    return false;
  }

  return isArkTSCollectionsArrayLikeDeclaration(symbol.declarations[0]);
}

function isArkTSCollectionsArrayLikeDeclaration(decl: ts.Declaration): boolean {
  if (!ts.isClassDeclaration(decl) && !ts.isInterfaceDeclaration(decl) || !decl.name) {
    return false;
  }

  if (!ts.hasIndexSignature(typeChecker.getTypeAtLocation(decl))) {
    return false;
  } 

  if (!ts.isModuleBlock(decl.parent) || decl.parent.parent.name.text !== COLLECTIONS_NAMESPACE) {
    return false;
  }

  if (getBaseFileName(decl.getSourceFile().fileName).toLowerCase() !== ARKTS_COLLECTIONS_D_ETS) {
    return false;
  }

  return true;
}

export function getDecoratorName(decorator: ts.Decorator): string {
  let decoratorName = '';
  if (ts.isIdentifier(decorator.expression)) {
    decoratorName = decorator.expression.text;
  } else if (ts.isCallExpression(decorator.expression) && ts.isIdentifier(decorator.expression.expression)) {
    decoratorName = decorator.expression.expression.text;
  }
  return decoratorName;
}

export function unwrapParenthesizedTypeNode(typeNode: ts.TypeNode): ts.TypeNode {
  let unwrappedTypeNode = typeNode;
  while (ts.isParenthesizedTypeNode(unwrappedTypeNode)) {
    unwrappedTypeNode = unwrappedTypeNode.type;
  }
  return unwrappedTypeNode;
}

export function isSendableTypeNode(typeNode: ts.TypeNode): boolean {

  /*
   * In order to correctly identify the usage of the enum member or
   * const enum in type annotation, we need to handle union type and
   * type alias cases by processing the type node and checking the
   * symbol in case of type reference node.
   */

  typeNode = unwrapParenthesizedTypeNode(typeNode);

  // Only a sendable union type is supported
  if (ts.isUnionTypeNode(typeNode)) {
    return typeNode.types.every((elemType) => {
      return isSendableTypeNode(elemType);
    });
  }

  const sym = ts.isTypeReferenceNode(typeNode) ?
    trueSymbolAtLocation(typeNode.typeName) :
    undefined;

  if (sym && sym.getFlags() & ts.SymbolFlags.TypeAlias) {
    const typeDecl = getDeclaration(sym);
    if (typeDecl && ts.isTypeAliasDeclaration(typeDecl)) {
      return isSendableTypeNode(typeDecl.type);
    }
  }

  // Const enum type is supported
  if (isConstEnum(sym)) {
    return true;
  }

  return isSendableType(typeChecker.getTypeFromTypeNode(typeNode));
}

export function isSendableType(type: ts.Type): boolean {
  if ((type.flags & (ts.TypeFlags.Boolean | ts.TypeFlags.Number | ts.TypeFlags.String |
    ts.TypeFlags.BigInt | ts.TypeFlags.Null | ts.TypeFlags.Undefined |
    ts.TypeFlags.TypeParameter)) !== 0) {
    return true;
  }

  return isSendableClassOrInterface(type);
}

export function isShareableType(tsType: ts.Type): boolean {
  const sym = tsType.getSymbol();
  if (isConstEnum(sym)) {
    return true;
  }

  if (tsType.isUnion()) {
    return tsType.types.every((elemType) => {
      return isShareableType(elemType);
    });
  }

  return isSendableType(tsType);
}

export function isSendableClassOrInterface(type: ts.Type): boolean {
  const sym = type.getSymbol();
  if (!sym) {
    return false;
  }

  const targetType = reduceReference(type);

  // class with @Sendable decorator
  if (targetType.isClass()) {
    if (sym.declarations?.length) {
      const decl = sym.declarations[0];
      if (ts.isClassDeclaration(decl)) {
        return hasSendableDecorator(decl);
      }
    }
  }
  // ISendable interface, or a class/interface that implements/extends ISendable interface
  return isOrDerivedFrom(type, isISendableInterface);
}

export function typeContainsSendableClassOrInterface(type: ts.Type): boolean {
  // Only check type contains sendable class / interface
  if ((type.flags & ts.TypeFlags.Union) !== 0) {
    return !!(type as ts.UnionType)?.types?.some((type) => {
      return typeContainsSendableClassOrInterface(type);
    });
  }

  return isSendableClassOrInterface(type);
}

export function isConstEnum(sym: ts.Symbol | undefined): boolean {
  return !!sym && sym.flags === ts.SymbolFlags.ConstEnum;
}

export function isSendableUnionType(type: ts.UnionType): boolean {
  const types = type?.types;
  if (!types) {
    return false;
  }

  return types.every((type) => {
    return isSendableType(type);
  });
}

export function hasSendableDecorator(decl: ts.ClassDeclaration): boolean {
  const decorators = ts.getDecorators(decl);
  return decorators !== undefined && decorators.some((x) => {
    return getDecoratorName(x) === SENDABLE_DECORATOR;
  });
}

export function getNonSendableDecorators(decl: ts.ClassDeclaration): ts.Decorator[] | undefined {
  const decorators = ts.getDecorators(decl);
  return decorators?.filter((x) => {
    return getDecoratorName(x) !== SENDABLE_DECORATOR;
  });
}

export function getDecoratorsIfInSendableClass(declaration: ts.HasDecorators): readonly ts.Decorator[] | undefined {
  const classNode = getClassNodeFromDeclaration(declaration);
  if (classNode === undefined || !hasSendableDecorator(classNode)) {
    return undefined;
  }
  return ts.getDecorators(declaration);
}

function getClassNodeFromDeclaration(declaration: ts.HasDecorators): ts.ClassDeclaration | undefined {
  if (declaration.kind === ts.SyntaxKind.Parameter) {
    return ts.isClassDeclaration(declaration.parent.parent) ? declaration.parent.parent : undefined;
  }
  return ts.isClassDeclaration(declaration.parent) ? declaration.parent : undefined;
}

export function isISendableInterface(type: ts.Type): boolean {
  const symbol = type.aliasSymbol ?? type.getSymbol();
  if (symbol?.declarations === undefined || symbol.declarations.length < 1) {
    return false;
  }

  return isArkTSISendableDeclaration(symbol.declarations[0]);
}

function isArkTSISendableDeclaration(decl: ts.Declaration): boolean {
    if (!ts.isInterfaceDeclaration(decl) || !decl.name || decl.name.text !== ISENDABLE_TYPE) {
      return false;
    }

    if (!ts.isModuleBlock(decl.parent) || decl.parent.parent.name.text !== LANG_NAMESPACE) {
      return false;
    }

    if (getBaseFileName(decl.getSourceFile().fileName).toLowerCase() !== ARKTS_LANG_D_ETS) {
      return false;
    }

    return true;
}

export function isSharedModule(sourceFile: ts.SourceFile): boolean {
  const statements = sourceFile.statements;
  for (let statement of statements) {
    if (ts.isImportDeclaration(statement)) {
      continue;
    }

    return (
      ts.isExpressionStatement(statement) &&
      ts.isStringLiteral(statement.expression) &&
      statement.expression.text === USE_SHARED
    );
  }

  return false;
}

export function getDeclarationNode(node: ts.Node): ts.Declaration | undefined {
  const sym = trueSymbolAtLocation(node);
  return getDeclaration(sym);
}

function isFunctionLikeDeclaration(node: ts.Declaration): boolean {
  return ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node) ||
    ts.isGetAccessorDeclaration(node) || ts.isSetAccessorDeclaration(node) || ts.isConstructorDeclaration(node) || 
    ts.isFunctionExpression(node) || ts.isArrowFunction(node);
}

export function isShareableEntity(node: ts.Node): boolean {
  const decl = getDeclarationNode(node);
  const typeNode = (decl as any)?.type;
  return (typeNode && !isFunctionLikeDeclaration(decl!)) ?
    isSendableTypeNode(typeNode) :
    isShareableType(typeChecker.getTypeAtLocation(decl ? decl : node));
}

export function isShareableClassOrInterfaceEntity(node: ts.Node): boolean {
  const decl = getDeclarationNode(node);
  return isSendableClassOrInterface(typeChecker.getTypeAtLocation(decl ?? node));
}

export function isInImportWhiteList(resolvedModule: ResolvedModuleFull): boolean {
  if (
    !resolvedModule.resolvedFileName ||
    ts.getBaseFileName(resolvedModule.resolvedFileName) !== ARKTS_LANG_D_ETS &&
    ts.getBaseFileName(resolvedModule.resolvedFileName) !== ARKTS_COLLECTIONS_D_ETS
  ) {
    return false;
  }
  return true;
}
}
}
}
