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
export namespace Utils {
//import * as path from 'node:path';
//import * as ts from 'typescript';
//import ProblemInfo = ts.ProblemInfo;
//import TypeScriptLinter = TypeScriptLinter;
import AutofixInfo = Common.AutofixInfo;

export const PROPERTY_HAS_NO_INITIALIZER_ERROR_CODE = 2564;

export const NON_INITIALIZABLE_PROPERTY_DECORATORS = ["Link", "Consume", "ObjectLink", "Prop", "BuilderParam"];

export const NON_INITIALIZABLE_PROPERTY_ClASS_DECORATORS = ['CustomDialog']

export const LIMITED_STANDARD_UTILITY_TYPES = [
  "Awaited", "Required", "Readonly", "Pick", "Omit", "Exclude", "Extract", "NonNullable", "Parameters",
  "ConstructorParameters", "ReturnType", "InstanceType", "ThisParameterType", "OmitThisParameter",
  "ThisType", "Uppercase", "Lowercase", "Capitalize", "Uncapitalize",
];

export enum ProblemSeverity { WARNING = 1, ERROR = 2 }

export const ARKTS_IGNORE_DIRS = ['node_modules', 'oh_modules', 'build', '.preview'];
export const ARKTS_IGNORE_FILES = ['hvigorfile.ts'];

let typeChecker: TypeChecker;
export function setTypeChecker(tsTypeChecker: TypeChecker): void {
  typeChecker = tsTypeChecker;
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

export function isAssignmentOperator(tsBinOp: BinaryOperatorToken): boolean {
  return tsBinOp.kind >= SyntaxKind.FirstAssignment && tsBinOp.kind <= SyntaxKind.LastAssignment;
}

export function isTypedArray(tsType: TypeNode | undefined): boolean {
  if (tsType === undefined || !isTypeReferenceNode(tsType)) {
    return false;
  }
  return TYPED_ARRAYS.includes(entityNameToString(tsType.typeName));
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

export function isNumberType(tsType: Type): boolean {
  if (tsType.isUnion()) {
    for (const tsCompType of tsType.types) {
      if ((tsCompType.flags & TypeFlags.NumberLike) === 0) return false;
    }
    return true;
  }
  return (tsType.getFlags() & TypeFlags.NumberLike) !== 0;
}

export function isBooleanType(tsType: Type): boolean {
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

export function isStringType(type: Type): boolean {
  return (type.getFlags() & TypeFlags.String) !== 0;
}

export function isPrimitiveEnumType(type: Type, primitiveType: TypeFlags): boolean {
  const isNonPrimitive = (type.flags & TypeFlags.NonPrimitive) !== 0;
  if (!isEnumType(type) || !type.isUnion() || isNonPrimitive) {
    return false;
  }
  for (const t of type.types) {
    if ((t.flags & primitiveType) === 0) {
      return false;
    }
  }
  return true;
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

export function isEnumType(tsType: Type): boolean {
  // Note: For some reason, test (tsType.flags & TypeFlags.Enum) != 0 doesn't work here.
  // Must use SymbolFlags to figure out if this is an enum type.
  return tsType.symbol && (tsType.symbol.flags & SymbolFlags.Enum) !== 0;
}

export function isEnumMemberType(tsType: Type): boolean {
    // Note: For some reason, test (tsType.flags & TypeFlags.Enum) != 0 doesn't work here.
    // Must use SymbolFlags to figure out if this is an enum type.
    return tsType.symbol && (tsType.symbol.flags & SymbolFlags.EnumMember) !== 0;
  }

export function isObjectLiteralType(tsType: Type): boolean {
  return tsType.symbol && (tsType.symbol.flags & SymbolFlags.ObjectLiteral) !== 0;
}

export function isNumberLikeType(tsType: Type): boolean {
  return (tsType.getFlags() & TypeFlags.NumberLike) !== 0;
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

export function trueSymbolAtLocation(node: Node): Symbol | undefined {
  const sym = typeChecker.getSymbolAtLocation(node);
  return sym === undefined ? undefined : followIfAliased(sym);
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

// does something similar to relatedByInheritanceOrIdentical function
export function isDerivedFrom(tsType: Type, checkType: CheckType): tsType is TypeReference {
  if (isTypeReference(tsType) && tsType.target !== tsType) tsType = tsType.target;

  const tsTypeNode = typeChecker.typeToTypeNode(tsType, undefined, NodeBuilderFlags.None);
  if (checkType === CheckType.Array && (isGenericArrayType(tsType) || isTypedArray(tsTypeNode))) return true;
  if (checkType !== CheckType.Array && isType(tsTypeNode, checkType.toString())) return true;
  if (!tsType.symbol || !tsType.symbol.declarations) return false;

  for (const tsTypeDecl of tsType.symbol.declarations) {
    if (
      (!isClassDeclaration(tsTypeDecl) && !isInterfaceDeclaration(tsTypeDecl)) ||
      !tsTypeDecl.heritageClauses
    ) continue;
    for (const heritageClause of tsTypeDecl.heritageClauses) {
      if (processParentTypesCheck(heritageClause.types, checkType)) return true;
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
  const tsTypes = tsUnionType.types;
  return (
    tsTypes.length === 2 &&
    ((tsTypes[0].flags & TypeFlags.Null) !== 0 || (tsTypes[1].flags & TypeFlags.Null) !== 0)
  );
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

function getDeclaration(tsSymbol: Symbol | undefined): Declaration | null {
  if (tsSymbol && tsSymbol.declarations && tsSymbol.declarations.length > 0) {
    return tsSymbol.declarations[0];
  }
  return null;
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

// Returns true iff typeA is a subtype of typeB
export function relatedByInheritanceOrIdentical(typeA: Type, typeB: Type): boolean {
  if (isTypeReference(typeA) && typeA.target !== typeA) { typeA = typeA.target; }
  if (isTypeReference(typeB) && typeB.target !== typeB) { typeB = typeB.target; }

  if (typeA === typeB || isObjectType(typeB)) { return true; }
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

// return true if two class types are not related by inheritance and structural identity check is needed
export function needToDeduceStructuralIdentity(typeFrom: Type, typeTo: Type, allowPromotion = false): boolean {
  if (isLibraryType(typeTo)) {
    return false;
  }

  let res = typeTo.isClassOrInterface() && typeFrom.isClassOrInterface() && !relatedByInheritanceOrIdentical(typeFrom, typeTo);

  if (allowPromotion) {
    res &&= !relatedByInheritanceOrIdentical(typeTo, typeFrom);
  }

  return res;
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

export function processParentTypesCheck(parentTypes: NodeArray<ExpressionWithTypeArguments>, checkType: CheckType): boolean {
  for (const baseTypeExpr of parentTypes) {
    let baseType = typeChecker.getTypeAtLocation(baseTypeExpr);
    if (isTypeReference(baseType) && baseType.target !== baseType) baseType = baseType.target;
    if (baseType && isDerivedFrom(baseType, checkType)) return true;
  }
  return false;
}


export function isObjectType(tsType: Type): boolean {
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
      const propmMods = value.declarations[0].modifiers; // TSC 4.2 doesn't have 'getModifiers()' method
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
    const classMods = declClass.modifiers; // TSC 4.2 doesn't have 'getModifiers()' method
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

/*
function findDeclaration(type: ClassDeclaration | InterfaceDeclaration, name: string): NamedDeclaration | undefined {
  const members: NodeArray<ClassElement> | NodeArray<TypeElement> = type.members;
  let declFound: NamedDeclaration | undefined;

  for(const m of members) {
    if (m.name && m.name.getText() === name) {
      declFound = m;
      break;
    }
  }

  if (declFound || !type.heritageClauses) return declFound;

  // Search in base classes/interfaces
  for (let i1 = 0; i1 < type.heritageClauses.length; i1++) {
    const v1 = type.heritageClauses[i1];
    for (let i2 = 0; i2 < v1.types.length; i2++) {
      const v2 = v1.types[i2];
      const symbol = typeChecker.getTypeAtLocation(v2.expression).symbol;
      if (
        (symbol.flags === SymbolFlags.Class || symbol.flags === SymbolFlags.Interface) &&
        symbol.declarations && symbol.declarations.length > 0
      ) {
        declFound = findDelaration(symbol.declarations[0] as (ClassDeclaration | InterfaceDeclaration), name);
      }

      if (declFound) break;
    };

    if (declFound) break;
  };

  return declFound;
}
*/

export function areTypesAssignable(lhsType: Type | undefined, rhsExpr: Expression): boolean {
  if (lhsType === undefined) { return false; }

  if (isAnyType(lhsType)) {
    return true;
  }

  if (lhsType.isUnion()) {
    for (const compType of lhsType.types) {
      if (areTypesAssignable(compType, rhsExpr)) return true;
    }
  }

  // Allow initializing with object literal when the type
  // originates from the library.
  if (isLibraryType(lhsType)) return true;

  // issue 13412:
  // Allow initializing with a dynamic object when the LHS type
  // is primitive or defined in standard library.
  if (isDynamicObjectAssignedToStdType(lhsType, rhsExpr)) {
    return true;
  }


  // Allow initializing Record objects with object initializer.
  // Record supports any type for a its value, but the key value
  // must be either a string or number literal.
  if (isStdRecordType(lhsType) && isObjectLiteralExpression(rhsExpr)) {
    return validateRecordObjectKeys(rhsExpr);
  }
  // For Partial<T> type, validate its argument type.
  if (isStdPartialType(lhsType)) {
    if (lhsType.aliasTypeArguments && lhsType.aliasTypeArguments.length === 1) {
      lhsType = lhsType.aliasTypeArguments[0];
    }
    else {
      return false;
    }
  }

  if (isObjectLiteralExpression(rhsExpr)) {
    return isObjectLiteralAssignable(lhsType, rhsExpr);
  }

  // Always compare the non-nullable variant of types.
  lhsType = lhsType.getNonNullableType();
  let rhsType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(rhsExpr).getNonNullableType();

  // issue 13114:
  // Const enum values are convertible to string/number type.
  // Note: This check should appear before calling TypeChecker.getBaseTypeOfLiteralType()
  // to ensure that lhsType has its original form, as it can be a literal type with
  // specific number or string value, which shouldn't pass this check.
  if (isEnumAssignment(lhsType, rhsType)) {
    return true;
  }

  // If type is a literal type, compare its base type.
  lhsType = typeChecker.getBaseTypeOfLiteralType(lhsType);
  rhsType = typeChecker.getBaseTypeOfLiteralType(rhsType);

  // issue 13033:
  // If both types are functional, they are considered compatible.
  if (areCompatibleFunctionals(lhsType, rhsType)) {
    return true;
  }
  return lhsType === rhsType || relatedByInheritanceOrIdentical(rhsType, getTargetType(lhsType));
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

function isObjectLiteralAssignable(lhsType: Type, rhsExpr: Expression): boolean {
  if (isObjectLiteralExpression(rhsExpr)) {
    return validateObjectLiteralType(lhsType) && !hasMethods(lhsType) &&
      validateFields(lhsType, rhsExpr);
  }
  return false;
}

function isEnumAssignment(lhsType: Type, rhsType: Type) {
  const isNumberEnum = isPrimitiveEnumType(rhsType, TypeFlags.NumberLiteral) ||
                         isPrimitiveEnumMemberType(rhsType, TypeFlags.NumberLiteral);
  const isStringEnum = isPrimitiveEnumType(rhsType, TypeFlags.StringLiteral) ||
                         isPrimitiveEnumMemberType(rhsType, TypeFlags.StringLiteral);
  return (isNumberType(lhsType) && isNumberEnum) || (isStringType(lhsType) && isStringEnum);
}

function areCompatibleFunctionals(lhsType: Type, rhsType: Type) {
  return (isStdFunctionType(lhsType) || isFunctionalType(lhsType)) &&
          (isStdFunctionType(rhsType) || isFunctionalType(rhsType));
}

function isFunctionalType(type: Type): boolean {
  const callSigns = type.getCallSignatures();
  return callSigns && callSigns.length > 0;
}

function isStdFunctionType(type: Type) {
  const sym = type.getSymbol();
  return sym && sym.getName() === "Function" && isGlobalSymbol(sym);
}

function getTargetType(type: Type): Type {
  return (type.getFlags() & TypeFlags.Object) &&
    (type as ObjectType).objectFlags & ObjectFlags.Reference ? (type as TypeReference).target : type;
}

export function isLiteralType(type: Type): boolean {
  return type.isLiteral() || (type.flags & TypeFlags.BooleanLiteral) !== 0;
}

export function validateFields(type: Type, objectLiteral: ObjectLiteralExpression): boolean {
  for (const prop of objectLiteral.properties) {
    if (isPropertyAssignment(prop)) {
      const propAssignment = prop;
      const propName = propAssignment.name.getText();
      const propSym = findProperty(type, propName);
      if (!propSym || !propSym.declarations?.length) return false;

      const propType = typeChecker.getTypeOfSymbolAtLocation(propSym, propSym.declarations[0]);
      if (!areTypesAssignable(propType, propAssignment.initializer)) {
        return false;
      }
    }
  };

  return true;
}

function isSupportedTypeNodeKind(kind: SyntaxKind): boolean {
  return kind !== SyntaxKind.AnyKeyword && kind !== SyntaxKind.UnknownKeyword &&
    kind !== SyntaxKind.SymbolKeyword && kind !== SyntaxKind.UndefinedKeyword &&
    kind !== SyntaxKind.ConditionalType && kind !== SyntaxKind.MappedType &&
    kind !== SyntaxKind.InferType && kind !== SyntaxKind.IndexedAccessType;

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

  return !isTypeLiteralNode(typeNode) && !isTypeQueryNode(typeNode) &&
    !isIntersectionTypeNode(typeNode) && !isTupleTypeNode(typeNode) &&
    isSupportedTypeNodeKind(typeNode.kind);
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
    if (!prop.name || (!isStringLiteral(prop.name) && !isNumericLiteral(prop.name))) { return false; }
  }
  return true;
}

export function getDecorators(node: Node): readonly Decorator[] | undefined {
  if (node.decorators) {
    return filter(node.decorators, isDecorator);
  }
}

export enum CheckType {
  Array,
  String = "String",
  Set = "Set",
  Map = "Map",
  Error = "Error",
};

export const ES_OBJECT = "ESObject";

export const LIMITED_STD_GLOBAL_FUNC = [
  "eval", "isFinite", "isNaN", "parseFloat", "parseInt", /*"encodeURI", "encodeURIComponent", */ "Encode", /*"decodeURI",
  "decodeURIComponent", */ "Decode", /* "escape", "unescape", */ "ParseHexOctet"
];
export const LIMITED_STD_GLOBAL_VAR = ["Infinity", "NaN"];
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
export const LIMITED_STD_ARRAYBUFFER_API = ["isView"];

export const ARKUI_DECORATORS = [
    "AnimatableExtend",
    "Builder",
    "BuilderParam",
    "Component",
    "Concurrent",
    "Consume",
    "CustomDialog",
    "Entry",
    "Extend",
    "Link",
    "LocalStorageLink",
    "LocalStorageProp",
    "ObjectLink",
    "Observed",
    "Preview",
    "Prop",
    "Provide",
    "Reusable",
    "State",
    "StorageLink",
    "StorageProp",
    "Styles",
    "Watch",
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

function getParentSymbolName(symbol: Symbol): string | undefined {
  const name = typeChecker.getFullyQualifiedName(symbol);
  const dotPosition = name.lastIndexOf(".");
  return (dotPosition === -1) ? undefined : name.substring(0, dotPosition);
}

export function isGlobalSymbol(symbol: Symbol): boolean {
  const parentName = getParentSymbolName(symbol);
  return !parentName || parentName === "global";
}
export function isStdObjectAPI(symbol: Symbol): boolean {
  const parentName = getParentSymbolName(symbol);
  return !!parentName && (parentName === "Object" || parentName === "ObjectConstructor");
}
export function isStdReflectAPI(symbol: Symbol): boolean {
  const parentName = getParentSymbolName(symbol);
  return !!parentName && (parentName === "Reflect");
}
export function isStdProxyHandlerAPI(symbol: Symbol): boolean {
  const parentName = getParentSymbolName(symbol);
  return !!parentName && (parentName === "ProxyHandler");
}
export function isStdArrayAPI(symbol: Symbol): boolean {
  const parentName = getParentSymbolName(symbol);
  return !!parentName && (parentName === "Array" || parentName === "ArrayConstructor");
}
export function isStdArrayBufferAPI(symbol: Symbol): boolean {
  const parentName = getParentSymbolName(symbol);
  return !!parentName && (parentName === "ArrayBuffer" || parentName === "ArrayBufferConstructor");
}

export function isSymbolAPI(symbol: Symbol): boolean {
  const parentName = getParentSymbolName(symbol);
  if(!!parentName) {
    return (parentName === "Symbol" || parentName === "SymbolConstructor");
  }
  else {
    return (symbol.escapedName === "Symbol" || symbol.escapedName === "SymbolConstructor");
  }
}

export function isDefaultImport(importSpec: ImportSpecifier): boolean {
  return importSpec?.propertyName?.text === "default";
}
export function hasAccessModifier(decl: Declaration): boolean {
  const modifiers = decl.modifiers; // TSC 4.2 doesn't have 'getModifiers()' method
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

export function isStdPartialType(type: Type): boolean {
  const sym = type.aliasSymbol;
  return !!sym && sym.getName() === "Partial" && isGlobalSymbol(sym);
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
    // We still need to confirm support for certain API from the
    // TypeScript standard library in ArkTS. Thus, for now do not
    // count standard library modules.
    return !isStatic &&
      !STANDARD_LIBRARIES.includes(getBaseFileName(srcFile.fileName).toLowerCase());
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

export function isDynamicLiteralInitializer(expr: Expression): boolean {
  if (!isObjectLiteralExpression(expr) && !isArrayLiteralExpression(expr)) {
    return false;
  }

  // Handle nested literals:
  // { f: { ... } }
  let curNode: Node = expr;
  while (isObjectLiteralExpression(curNode) || isArrayLiteralExpression(curNode)) {
    const exprType = typeChecker.getContextualType(curNode);
    if (exprType !== undefined) {
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

export function isEsObjectType(typeNode: TypeNode): boolean {
  return isTypeReferenceNode(typeNode) && isIdentifier(typeNode.typeName) &&
    typeNode.typeName.text === ES_OBJECT;
}

export function isEsObjectAllowed(typeRef: TypeReferenceNode): boolean {
  let node = typeRef.parent;

  if (!isVarDeclaration(node)) {
    return false;
  }

  while (node) {
    if (isBlock(node)) {
      return true;
    }
    node = node.parent;
  }
  return false;
}

export function getVariableDeclarationTypeNode(node: Node): TypeNode | undefined {
  const symbol = typeChecker.getSymbolAtLocation(node);
  const decl = getDeclaration(symbol);
  if (!!decl && isVariableDeclaration(decl)) {
    return decl.type;
  }
  return undefined;
}

export function hasEsObjectType(node: Node): boolean {
  const typeNode = getVariableDeclarationTypeNode(node);
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


}
}
