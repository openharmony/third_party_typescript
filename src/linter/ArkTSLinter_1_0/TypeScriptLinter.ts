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
import * as ts from "../_namespaces/ts";
import {
    ArrayLiteralExpression, ArrowFunction, AsExpression, BinaryExpression, BindingName, CallExpression, CatchClause,
    ClassDeclaration, ClassStaticBlockDeclaration, CommentRange, ComputedPropertyName, ConciseBody, Declaration,
    Decorator, Diagnostic, DiagnosticMessageChain, ElementAccessExpression, EnumDeclaration, EnumMember,
    ExportAssignment, ExpressionWithTypeArguments, forEachChild, ForInStatement, ForOfStatement, ForStatement,
    FunctionDeclaration, FunctionExpression, FunctionLikeDeclaration, GetAccessorDeclaration, getCombinedNodeFlags,
    getDecorators, getLeadingCommentRanges, getModifiers, getTrailingCommentRanges, HeritageClause, Identifier,
    ImportClause, ImportDeclaration, ImportSpecifier, InterfaceDeclaration, isAccessor, isArrayBindingPattern,
    isArrayLiteralExpression, isArrayTypeNode, isArrowFunction, isBinaryExpression, isBlock, isCallExpression,
    isCallLikeExpression, isCatchClause, isClassDeclaration, isClassExpression, isClassLike,
    isClassStaticBlockDeclaration, isConstructorDeclaration, isElementAccessExpression, isEnumDeclaration,
    isExportAssignment, isExportSpecifier, isExpressionWithTypeArguments, isFunctionDeclaration, isFunctionExpression,
    isFunctionTypeNode, isIdentifier, isImportClause, isImportDeclaration, isImportEqualsDeclaration, isImportSpecifier,
    isInterfaceDeclaration, isMetaProperty, isMethodDeclaration, isModuleBlock, isModuleDeclaration, isNamedImports,
    isNamespaceImport, isNewExpression, isObjectBindingPattern, isObjectLiteralExpression, isOmittedExpression,
    isParameter, isPrivateIdentifier, isPropertyAccessExpression, isPropertyAssignment, isPropertyDeclaration,
    isQualifiedName, isReturnStatement, isShorthandPropertyAssignment, isSourceFile, isSpreadElement, isStringLiteral,
    isStructDeclaration, isTypeNode, isTypeOfExpression, isVariableDeclaration, Map, MetaProperty, MethodDeclaration,
    MethodSignature, ModuleDeclaration, NamespaceImport, NewExpression, Node, NodeArray, NodeBuilderFlags, NodeFlags,
    normalizePath, NumericLiteral, ObjectFlags, ObjectLiteralExpression, ObjectType, ParameterDeclaration,
    PrefixUnaryExpression, Program, PropertyAccessExpression, PropertyAssignment, PropertyDeclaration,
    PropertySignature, Set, SetAccessorDeclaration, Signature, SourceFile, Symbol, SymbolFlags, SyntaxKind,
    ThrowStatement, Type, TypeAliasDeclaration, TypeAssertion, TypeChecker, TypeFlags, TypeNode, TypeReference,
    TypeReferenceNode, VariableDeclaration, perfLogger as Logger
} from "../_namespaces/ts";

//import Utils = Utils;
import { 
  ARGUMENT_OF_TYPE_0_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_ERROR_CODE,
  TYPE_0_IS_NOT_ASSIGNABLE_TO_TYPE_1_ERROR_CODE,
  NO_OVERLOAD_MATCHES_THIS_CALL_ERROR_CODE,
  LibraryTypeCallDiagnosticChecker, autofixInfo, cookBookTag, cookBookMsg, DiagnosticChecker, FaultID, faultsAttrs, LinterConfig, fixLiteralAsPropertyName,
  shouldAutofix, fixFunctionExpression, fixReturnType, fixPropertyAccessByIndex, Autofix, getStartPos, getEndPos, ProblemSeverity,
  symbolHasDuplicateName, trueSymbolAtLocation, isLibrarySymbol, isAnyType, isPrototypeSymbol, isTypeSymbol, isFunctionSymbol, isDestructuringAssignmentLHS,
  isStructObjectInitializer, isDynamicLiteralInitializer, isExpressionAssignableToType, hasModifier, isDerivedFrom, CheckType, isSymbolAPI,
  ALLOWED_STD_SYMBOL_API, symbolHasEsObjectType, isStdRecordType, NON_INITIALIZABLE_PROPERTY_DECORATORS, PROPERTY_HAS_NO_INITIALIZER_ERROR_CODE,
  NON_INITIALIZABLE_PROPERTY_ClASS_DECORATORS, hasPredecessor, isLibraryType, isUnsupportedType, isCallToFunctionWithOmittedReturnType, unwrapParenthesized,
  isIntegerConstantValue, isAssignmentOperator, isMethodAssignment, isEnumMemberType, isNumberType, isStringLikeType, isPrimitiveType,
  needToDeduceStructuralIdentity, getVariableDeclarationTypeNode, isEsObjectType, isInsideBlock, isValueAssignableToESObject, isDefaultImport,
  NON_RETURN_FUNCTION_DECORATORS, FUNCTION_HAS_NO_RETURN_ERROR_CODE, hasLibraryType, isStruct, isGenericArrayType, isThisOrSuperExpr, isTypedArray,
  isObjectLiteralType, hasEsObjectType, isValidEnumMemberInit, isInterfaceType, LIMITED_STD_GLOBAL_FUNC, LIMITED_STD_OBJECT_API, LIMITED_STD_REFLECT_API,
  LIMITED_STD_PROXYHANDLER_API, getParentSymbolName, isBooleanType, isEsObjectPossiblyAllowed, entityNameToString, LIMITED_STANDARD_UTILITY_TYPES,
  isEsObjectSymbol, isSymbolIterator, isUnknownType, ARKUI_DECORATORS
} from "../_namespaces/ts.ArkTSLinter_1_0";
import * as ArkTSLinter_1_0 from "../_namespaces/ts.ArkTSLinter_1_0";
//import cookBookMsg = cookBookMsg;
//import cookBookTag = ts.cookBookTag;

//import LinterConfig = ts.LinterConfig;
//import Autofixer = ts.Autofixer;

//const logger = Logger.getLogger();

export interface ProblemInfo {
  line: number;
  column: number;
  start: number;
  end: number;
  type: string;
  severity: number;
  problem: string;
  suggest: string;
  rule: string;
  ruleTag: number;
  autofixable: boolean;
  autofix?: Autofix[];
}

export class TypeScriptLinter {
  static ideMode: boolean;
  static strictMode: boolean;
  static logTscErrors: boolean;
  static warningsAsErrors: boolean;
  static lintEtsOnly: boolean;
  static totalVisitedNodes: number;
  static nodeCounters: number[];
  static lineCounters: number[];

  static totalErrorLines: number;
  static errorLineNumbersString: string;
  static totalWarningLines: number;
  static warningLineNumbersString: string;
  static reportDiagnostics = true;

  // The SyntaxKind enum defines additional elements at the end of the enum
  // that serve as markers (FirstX/LastX). Those elements are initialized
  // with indices of the previously defined elements. As result, the enum
  // may return incorrect name for a certain kind index (e.g. 'FirstStatement'
  // instead of 'VariableStatement').
  // The following code creates a map with correct syntax kind names.
  // It can be used when need to print name of syntax kind of certain
  // AST node in diagnostic messages.
  //private static tsSyntaxKindNames: string[];

  static problemsInfos: ProblemInfo[] = [];

  static filteredDiagnosticMessages: DiagnosticMessageChain[] = [];

  public static initGlobals(): void {
    TypeScriptLinter.filteredDiagnosticMessages = []
  }

  public static initStatic(): void {
    TypeScriptLinter.strictMode = true;
    TypeScriptLinter.logTscErrors = false;
    TypeScriptLinter.warningsAsErrors = false;
    TypeScriptLinter.lintEtsOnly = true;
    TypeScriptLinter.totalVisitedNodes = 0;
    TypeScriptLinter.nodeCounters = [];
    TypeScriptLinter.lineCounters = [];

    TypeScriptLinter.totalErrorLines = 0;
    TypeScriptLinter.totalWarningLines = 0;
    TypeScriptLinter.errorLineNumbersString = "";
    TypeScriptLinter.warningLineNumbersString = "";

    autofixInfo.length = 0;

    //TypeScriptLinter.tsSyntaxKindNames = [];
    //const keys = Object.keys(ts.SyntaxKind);
    //const keys: string[] = [];
    //const values = Object.values(ts.SyntaxKind);
    //const values: string[] = [];

    /*
    for (let i = 0; i < values.length; i++) {
      const val = values[i];
      const kindNum = typeof val === "string" ? parseInt(val) : val;
      if (kindNum && !TypeScriptLinter.tsSyntaxKindNames[kindNum])
        TypeScriptLinter.tsSyntaxKindNames[kindNum] = keys[i];
    }
    */

    for (let i = 0; i < FaultID.LAST_ID; i++) {
      TypeScriptLinter.nodeCounters[i] = 0;
      TypeScriptLinter.lineCounters[i] = 0;
    }

    TypeScriptLinter.problemsInfos = [];
  }

  public static tsTypeChecker: TypeChecker;

  currentErrorLine: number;
  currentWarningLine: number;
  staticBlocks: Set<string>;
  libraryTypeCallDiagnosticChecker: LibraryTypeCallDiagnosticChecker;
  skipArkTSStaticBlocksCheck: boolean;

  constructor(private sourceFile: SourceFile,
            /* private */ tsProgram: Program,
            private tscStrictDiagnostics?: Map<Diagnostic[]>) {
    TypeScriptLinter.tsTypeChecker = tsProgram.getLinterTypeChecker();
    this.currentErrorLine = 0;
    this.currentWarningLine = 0;
    this.staticBlocks = new Set<string>();
    this.libraryTypeCallDiagnosticChecker = new LibraryTypeCallDiagnosticChecker(TypeScriptLinter.filteredDiagnosticMessages);

    const options = tsProgram.getCompilerOptions();
    this.skipArkTSStaticBlocksCheck = false;
    if (options.skipArkTSStaticBlocksCheck) {
      this.skipArkTSStaticBlocksCheck = options.skipArkTSStaticBlocksCheck as boolean;
    }
  }

  public static clearTsTypeChecker(): void {
    TypeScriptLinter.tsTypeChecker = {} as TypeChecker;
  }

  public static clearQualifiedNameCache(): void {
    if (TypeScriptLinter.tsTypeChecker) {
      TypeScriptLinter.tsTypeChecker.clearQualifiedNameCache && TypeScriptLinter.tsTypeChecker.clearQualifiedNameCache();
    }
  }
  
  readonly handlersMap: ts.ESMap<SyntaxKind, (node: Node) => void> = new Map([
    [SyntaxKind.ObjectLiteralExpression, this.handleObjectLiteralExpression],
    [SyntaxKind.ArrayLiteralExpression, this.handleArrayLiteralExpression],
    [SyntaxKind.Parameter, this.handleParameter],
    [SyntaxKind.EnumDeclaration, this.handleEnumDeclaration],
    [SyntaxKind.InterfaceDeclaration, this.handleInterfaceDeclaration],
    [SyntaxKind.ThrowStatement, this.handleThrowStatement], [SyntaxKind.ImportClause, this.handleImportClause],
    [SyntaxKind.ForStatement, this.handleForStatement],
    [SyntaxKind.ForInStatement, this.handleForInStatement],
    [SyntaxKind.ForOfStatement, this.handleForOfStatement],
    [SyntaxKind.ImportDeclaration, this.handleImportDeclaration],
    [SyntaxKind.PropertyAccessExpression, this.handlePropertyAccessExpression],
    [SyntaxKind.PropertyDeclaration, this.handlePropertyAssignmentOrDeclaration],
    [SyntaxKind.PropertyAssignment, this.handlePropertyAssignmentOrDeclaration],
    [SyntaxKind.FunctionExpression, this.handleFunctionExpression],
    [SyntaxKind.ArrowFunction, this.handleArrowFunction],
    [SyntaxKind.ClassExpression, this.handleClassExpression], [SyntaxKind.CatchClause, this.handleCatchClause],
    [SyntaxKind.FunctionDeclaration, this.handleFunctionDeclaration],
    [SyntaxKind.PrefixUnaryExpression, this.handlePrefixUnaryExpression],
    [SyntaxKind.BinaryExpression, this.handleBinaryExpression],
    [SyntaxKind.VariableDeclarationList, this.handleVariableDeclarationList],
    [SyntaxKind.VariableDeclaration, this.handleVariableDeclaration],
    [SyntaxKind.ClassDeclaration, this.handleClassDeclaration],
    [SyntaxKind.ModuleDeclaration, this.handleModuleDeclaration],
    [SyntaxKind.TypeAliasDeclaration, this.handleTypeAliasDeclaration],
    [SyntaxKind.ImportSpecifier, this.handleImportSpecifier],
    [SyntaxKind.NamespaceImport, this.handleNamespaceImport],
    [SyntaxKind.TypeAssertionExpression, this.handleTypeAssertionExpression],
    [SyntaxKind.MethodDeclaration, this.handleMethodDeclaration],
    [SyntaxKind.Identifier, this.handleIdentifier],
    [SyntaxKind.ElementAccessExpression, this.handleElementAccessExpression],
    [SyntaxKind.EnumMember, this.handleEnumMember], [SyntaxKind.TypeReference, this.handleTypeReference],
    [SyntaxKind.ExportAssignment, this.handleExportAssignment],
    [SyntaxKind.CallExpression, this.handleCallExpression], [SyntaxKind.MetaProperty, this.handleMetaProperty],
    [SyntaxKind.NewExpression, this.handleNewExpression], [SyntaxKind.AsExpression, this.handleAsExpression],
    [SyntaxKind.SpreadElement, this.handleSpreadOp], [SyntaxKind.SpreadAssignment, this.handleSpreadOp],
    [SyntaxKind.GetAccessor, this.handleGetAccessor], [SyntaxKind.SetAccessor, this.handleSetAccessor],
    [SyntaxKind.ConstructSignature, this.handleConstructSignature],
    [SyntaxKind.ExpressionWithTypeArguments, this.handleExpressionWithTypeArguments],
    [SyntaxKind.ComputedPropertyName, this.handleComputedPropertyName],
    [SyntaxKind.ClassStaticBlockDeclaration, this.handleClassStaticBlockDeclaration],
  ]);

  public incrementCounters(node: Node | CommentRange, faultId: number, autofixable = false, autofix?: Autofix[]): void {
    if (!TypeScriptLinter.strictMode && faultsAttrs[faultId].migratable) { return; } // In relax mode skip migratable

    const startPos = getStartPos(node);
    const endPos = getEndPos(node);

    TypeScriptLinter.nodeCounters[faultId]++;
    // TSC counts lines and columns from zero
    let { line, character } = this.sourceFile.getLineAndCharacterOfPosition(startPos);
    ++line;
    ++character;

    const faultDescr = LinterConfig.nodeDesc[faultId];
    const faultType = "unknown"; //TypeScriptLinter.tsSyntaxKindNames[node.kind];

    const cookBookMsgNum = faultsAttrs[faultId] ? Number(faultsAttrs[faultId].cookBookRef) : 0;
    const cookBookTg = cookBookTag[cookBookMsgNum];
    let severity = ProblemSeverity.ERROR;
    if (faultsAttrs[faultId] && faultsAttrs[faultId].warning) {
      severity = ProblemSeverity.WARNING;
    }
    const badNodeInfo: ProblemInfo = {
      line: line,
      column: character,
      start: startPos,
      end: endPos,
      type: faultType,
      severity: severity,
      problem: FaultID[faultId],
      suggest: cookBookMsgNum > 0 ? cookBookMsg[cookBookMsgNum] : "",
      rule: cookBookMsgNum > 0 && cookBookTg !== "" ? cookBookTg : faultDescr ? faultDescr : faultType,
      ruleTag: cookBookMsgNum,
      autofixable: autofixable,
      autofix: autofix
    };

    TypeScriptLinter.problemsInfos.push(badNodeInfo);

    if (!TypeScriptLinter.reportDiagnostics) {
      //logger.info(
      Logger.logEvent(
        `Warning: ${this.sourceFile.fileName} (${line}, ${character}): ${faultDescr ? faultDescr : faultType}`
      );
    }

    TypeScriptLinter.lineCounters[faultId]++;

    if (faultsAttrs[faultId].warning) {
      if (line !== this.currentWarningLine) {
        this.currentWarningLine = line;
        ++TypeScriptLinter.totalWarningLines;
        TypeScriptLinter.warningLineNumbersString += line + ", " ;
      }
    }
    else if (line !== this.currentErrorLine) {
      this.currentErrorLine = line;
      ++TypeScriptLinter.totalErrorLines;
      TypeScriptLinter.errorLineNumbersString += line + ", ";
    }
  }

  public visitTSNode(node: Node): void {
    const self = this;
    visitTSNodeImpl(node);
    function visitTSNodeImpl(node: Node): void {
      if (node === null || node.kind === null) {
        return;
      }
      TypeScriptLinter.totalVisitedNodes++;

      //if (TypeScriptLinter.tsSyntaxKindNames[node.kind] === "StructDeclaration") {
      // if (node.kind === SyntaxKind.StructDeclaration) {
      //if ( SyntaxKind[node.kind] === 'StructDeclaration') {
      if(isStructDeclaration(node)) {
        self.handleStructDeclaration(node);
        return;
      }

      self.handleComments(node);

      if (LinterConfig.terminalTokens.has(node.kind)) return;

      const incrementedType = LinterConfig.incrementOnlyTokens.get(node.kind);
      if (incrementedType !== undefined) {
        self.incrementCounters(node, incrementedType);
      }
      else {
        const handler = self.handlersMap.get(node.kind);
        if (handler !== undefined) {
          handler.call(self, node);
        }
      }

      forEachChild(node, visitTSNodeImpl);
    }
  }

  private countInterfaceExtendsDifferentPropertyTypes(
    node: Node,
    prop2type: Map<string /*, string*/>,
    propName: string,
    type: TypeNode | undefined
  ): void {
    if (type) {
      const methodType = type.getText();
      const propType = prop2type.get(propName);
      if (!propType) {
        prop2type.set(propName, methodType);
      }
      else if (propType !== methodType) {
        this.incrementCounters(node, FaultID.IntefaceExtendDifProps);
      }
    }
  }

  private countDeclarationsWithDuplicateName(
    tsNode: Node, tsDeclNode: Node, tsDeclKind?: SyntaxKind
  ): void {
    const symbol = TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(tsNode);

    // If specific declaration kind is provided, check against it.
    // Otherwise, use syntax kind of corresponding declaration node.
    if (!!symbol && symbolHasDuplicateName(symbol, tsDeclKind ?? tsDeclNode.kind)) {
      this.incrementCounters(tsDeclNode, FaultID.DeclWithDuplicateName);
    }
  }

  private countClassMembersWithDuplicateName(tsClassDecl: ClassDeclaration): void {
    for (const tsCurrentMember of tsClassDecl.members) {
      if (
        !tsCurrentMember.name ||
        !(isIdentifier(tsCurrentMember.name) || isPrivateIdentifier(tsCurrentMember.name))
      ) {
        continue;
      }
      for (const tsClassMember of tsClassDecl.members) {
        if (tsCurrentMember === tsClassMember) continue;

        if (
          !tsClassMember.name ||
          !(isIdentifier(tsClassMember.name) || isPrivateIdentifier(tsClassMember.name))
        ) {
          continue;
        }
        if (
          isIdentifier(tsCurrentMember.name) &&
          isPrivateIdentifier(tsClassMember.name) &&
          tsCurrentMember.name.text === tsClassMember.name.text.substring(1)
        ) {
          this.incrementCounters(tsCurrentMember, FaultID.DeclWithDuplicateName);
          break;
        }

        if (
          isPrivateIdentifier(tsCurrentMember.name) &&
          isIdentifier(tsClassMember.name) &&
          tsCurrentMember.name.text.substring(1) === tsClassMember.name.text
        ) {
          this.incrementCounters(tsCurrentMember, FaultID.DeclWithDuplicateName);
          break;
        }
      }
    }
  }

  private functionContainsThis(tsNode: Node): boolean {
    let found = false;

    function visitNode(tsNode: Node): void {
      // Stop visiting child nodes if finished searching.
      if (found) return;

      if (tsNode.kind === SyntaxKind.ThisKeyword) {
        found = true;
        return;
      }

      // Visit children nodes. Skip any local declaration that defines
      // its own scope as it needs to be checked separately.
      if (
        !isClassDeclaration(tsNode) &&
        !isClassExpression(tsNode) &&
        !isModuleDeclaration(tsNode) &&
        !isFunctionDeclaration(tsNode) &&
        !isFunctionExpression(tsNode)
      ) {
        tsNode.forEachChild(visitNode);
      }
    }

    visitNode(tsNode);

    return found;
  }

  private isPrototypePropertyAccess(tsPropertyAccess: PropertyAccessExpression, propAccessSym: Symbol | undefined, baseExprSym: Symbol | undefined, baseExprType: Type): boolean {
    if (!(isIdentifier(tsPropertyAccess.name) && tsPropertyAccess.name.text === "prototype")) {
      return false;
    }
    // #13600: Relax prototype check when expression comes from interop.
    let curPropAccess: Node = tsPropertyAccess;
    while (curPropAccess && isPropertyAccessExpression(curPropAccess)) {
      const baseExprSym = trueSymbolAtLocation(curPropAccess.expression);
      if (isLibrarySymbol(baseExprSym)) {
        return false;
      }
      curPropAccess = curPropAccess.expression;
    }
    if (isIdentifier(curPropAccess) && curPropAccess.text !== 'prototype') {
      const type = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(curPropAccess);
      if (isAnyType(type)) {
        return false;
      }
    }
    // Check if property symbol is "Prototype"
    if (isPrototypeSymbol(propAccessSym)) {
      return true;
    }

    // Check if symbol of LHS-expression is Class or Function.
    if (isTypeSymbol(baseExprSym) || isFunctionSymbol(baseExprSym)) {
      return true;
    }
    // Check if type of LHS expression Function type or Any type.
    // The latter check is to cover cases with multiple prototype
    // chain (as the 'Prototype' property should be 'Any' type):
    //      X.prototype.prototype.prototype = ...
    const baseExprTypeNode = TypeScriptLinter.tsTypeChecker.typeToTypeNode(
      baseExprType, undefined, NodeBuilderFlags.None
    );

    return ((baseExprTypeNode && isFunctionTypeNode(baseExprTypeNode)) || isAnyType(baseExprType));
  }

  private interfaceInheritanceLint(node: Node, heritageClauses: NodeArray<HeritageClause>): void {
    for (const hClause of heritageClauses) {
      if (hClause.token !== SyntaxKind.ExtendsKeyword) continue;

      const prop2type = new Map<string, string>();
      for (const tsTypeExpr of hClause.types) {
        const tsExprType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsTypeExpr.expression);
        if (tsExprType.isClass()) {
          this.incrementCounters(node, FaultID.InterfaceExtendsClass);
        }
        else if (tsExprType.isClassOrInterface()) {
          this.lintForInterfaceExtendsDifferentPorpertyTypes(node, tsExprType, prop2type);
        }
      }
    }
  }

  private lintForInterfaceExtendsDifferentPorpertyTypes(
    node: Node, tsExprType: Type, prop2type: Map</*string,*/ string>
  ): void {
    const props = tsExprType.getProperties();
    for (const p of props) {
      if (!p.declarations) continue;

      const decl: Declaration = p.declarations[0];
      if (decl.kind === SyntaxKind.MethodSignature) {
        this.countInterfaceExtendsDifferentPropertyTypes(
          node, prop2type, p.name, (decl as MethodSignature).type
        );
      }
      else if (decl.kind === SyntaxKind.MethodDeclaration) {
        this.countInterfaceExtendsDifferentPropertyTypes(
          node, prop2type, p.name, (decl as MethodDeclaration).type
        );
      }
      else if (decl.kind === SyntaxKind.PropertyDeclaration) {
        this.countInterfaceExtendsDifferentPropertyTypes(
          node, prop2type, p.name, (decl as PropertyDeclaration).type
        );
      }
      else if (decl.kind === SyntaxKind.PropertySignature) {
        this.countInterfaceExtendsDifferentPropertyTypes(
          node, prop2type, p.name, (decl as PropertySignature).type
        );
      }
    }
  }

  private handleObjectLiteralExpression(node: Node): void {
    const objectLiteralExpr = node as ObjectLiteralExpression;

    // If object literal is a part of destructuring assignment, then don't process it further.
    if (isDestructuringAssignmentLHS(objectLiteralExpr)) {
      return;
    }
    const objectLiteralType = TypeScriptLinter.tsTypeChecker.getContextualType(objectLiteralExpr);
    if (!isStructObjectInitializer(objectLiteralExpr) &&
        !isDynamicLiteralInitializer(objectLiteralExpr) &&
        !isExpressionAssignableToType(objectLiteralType, objectLiteralExpr)
      //  !Utils.validateObjectLiteralType(objectLiteralType) || Utils.hasMemberFunction(objectLiteralExpr) ||
      //  !Utils.validateFields(objectLiteralType, objectLiteralExpr)
    ) {
      this.incrementCounters(node, FaultID.ObjectLiteralNoContextType);
    }
  }

  private handleArrayLiteralExpression(node: Node): void {
    // If array literal is a part of destructuring assignment, then
    // don't process it further.
    if (isDestructuringAssignmentLHS(node as ArrayLiteralExpression)) {
      return;
    }

    const arrayLitNode = node as ArrayLiteralExpression;
    let noContextTypeForArrayLiteral = false;

    // check that array literal consists of inferrable types
    // e.g. there is no element which is untyped object literals
    const arrayLitElements = arrayLitNode.elements;
    for(const element of arrayLitElements) {
      if(element.kind === SyntaxKind.ObjectLiteralExpression) {
        const objectLiteralType = TypeScriptLinter.tsTypeChecker.getContextualType(element);
        if (!isDynamicLiteralInitializer(arrayLitNode) &&
            !isExpressionAssignableToType(objectLiteralType, element)) {
          noContextTypeForArrayLiteral = true;
          break;
        }
      }
    }

    if (noContextTypeForArrayLiteral) {
      this.incrementCounters(node, FaultID.ArrayLiteralNoContextType);
    }
  }

  private handleParameter(node: Node): void {
    const tsParam = node as ParameterDeclaration;
    if (isArrayBindingPattern(tsParam.name) || isObjectBindingPattern(tsParam.name)) {
      this.incrementCounters(node, FaultID.DestructuringParameter);
    }
    const tsParamMods = getModifiers(tsParam); //tsParam.modifiers;
    if (
      tsParamMods &&
      (hasModifier(tsParamMods, SyntaxKind.PublicKeyword) ||
        hasModifier(tsParamMods, SyntaxKind.ProtectedKeyword) ||
        hasModifier(tsParamMods, SyntaxKind.ReadonlyKeyword) ||
        hasModifier(tsParamMods, SyntaxKind.PrivateKeyword))
    ) {
      this.incrementCounters(node, FaultID.ParameterProperties);
    }
    this.handleDecorators(getDecorators(tsParam));

    this.handleDeclarationInferredType(tsParam);
  }

  private handleEnumDeclaration(node: Node): void {
    const enumNode = node as EnumDeclaration;
    this.countDeclarationsWithDuplicateName(enumNode.name, enumNode);

    const enumSymbol = trueSymbolAtLocation(enumNode.name);
    if (!enumSymbol) return;

    const enumDecls = enumSymbol.getDeclarations();
    if (!enumDecls) return;

    // Since type checker merges all declarations with the same name
    // into one symbol, we need to check that there's more than one
    // enum declaration related to that specific symbol.
    // See 'countDeclarationsWithDuplicateName' method for details.
    let enumDeclCount = 0;
    for (const decl of enumDecls) {
      if (decl.kind === SyntaxKind.EnumDeclaration) enumDeclCount++;
    }

    if (enumDeclCount > 1) this.incrementCounters(node, FaultID.EnumMerging);
  }

  private handleInterfaceDeclaration(node: Node): void {
    const interfaceNode = node as InterfaceDeclaration;
    const iSymbol = trueSymbolAtLocation(interfaceNode.name);
    const iDecls = iSymbol ? iSymbol.getDeclarations() : null;
    if (iDecls) {
      // Since type checker merges all declarations with the same name
      // into one symbol, we need to check that there's more than one
      // interface declaration related to that specific symbol.
      // See 'countDeclarationsWithDuplicateName' method for details.
      let iDeclCount = 0;
      for (const decl of iDecls) {
        if (decl.kind === SyntaxKind.InterfaceDeclaration) iDeclCount++;
      }

      if (iDeclCount > 1) this.incrementCounters(node, FaultID.InterfaceMerging);
    }

    if (interfaceNode.heritageClauses) this.interfaceInheritanceLint(node, interfaceNode.heritageClauses);

    this.countDeclarationsWithDuplicateName(interfaceNode.name, interfaceNode);
  }

  private handleThrowStatement(node: Node): void {
    const throwStmt = node as ThrowStatement;
    const throwExprType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(throwStmt.expression);
    if (!throwExprType.isClassOrInterface() || !isDerivedFrom(throwExprType, CheckType.Error)) {
      this.incrementCounters(node, FaultID.ThrowStatement);
    }
  }

  private handleForStatement(node: Node): void {
  const tsForStmt = node as ForStatement;
  const tsForInit = tsForStmt.initializer;
    if (tsForInit && (isArrayLiteralExpression(tsForInit) || isObjectLiteralExpression(tsForInit))) {
      this.incrementCounters(tsForInit, FaultID.DestructuringAssignment);
    }
  }

  private handleForInStatement(node: Node): void {
    const tsForInStmt = node as ForInStatement;
    const tsForInInit = tsForInStmt.initializer;
    if (isArrayLiteralExpression(tsForInInit) || isObjectLiteralExpression(tsForInInit)) {
      this.incrementCounters(tsForInInit, FaultID.DestructuringAssignment);
    }
    this.incrementCounters(node, FaultID.ForInStatement);
  }

  private handleForOfStatement(node: Node): void {
    const tsForOfStmt = node as ForOfStatement;
    const tsForOfInit = tsForOfStmt.initializer;
    if (isArrayLiteralExpression(tsForOfInit) || isObjectLiteralExpression(tsForOfInit)) {
      this.incrementCounters(tsForOfInit, FaultID.DestructuringAssignment);
    }
  }

  private handleImportDeclaration(node: Node): void {
    const importDeclNode = node as ImportDeclaration;
    for (const stmt of importDeclNode.parent.statements) {
      if (stmt === importDeclNode) {
        break;
      }
      if (!isImportDeclaration(stmt)) {
        this.incrementCounters(node, FaultID.ImportAfterStatement);
        break;
      }
    }
    const expr1 = importDeclNode.moduleSpecifier;
    if (expr1.kind === SyntaxKind.StringLiteral) {
      if (!importDeclNode.importClause) this.incrementCounters(node, FaultID.ImportFromPath);
    }
  }

  private handlePropertyAccessExpression(node: Node): void {
    if (isCallExpression(node.parent) && node === node.parent.expression) {
      return;
    }

    const propertyAccessNode = node as PropertyAccessExpression;
    const exprSym = trueSymbolAtLocation(propertyAccessNode);
    const baseExprSym = trueSymbolAtLocation(propertyAccessNode.expression);
    const baseExprType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(propertyAccessNode.expression);
    if (this.isPrototypePropertyAccess(propertyAccessNode, exprSym, baseExprSym, baseExprType)) {
      this.incrementCounters(propertyAccessNode.name, FaultID.Prototype);
    }
    if (!!exprSym && isSymbolAPI(exprSym) && !ALLOWED_STD_SYMBOL_API.includes(exprSym.getName())) {
      this.incrementCounters(propertyAccessNode, FaultID.SymbolType);
    }
    if (!!baseExprSym && symbolHasEsObjectType(baseExprSym)) {
      this.incrementCounters(propertyAccessNode, FaultID.EsObjectType);
    }
  }

  private handlePropertyAssignmentOrDeclaration(node: Node) {
    const propName = (node as PropertyAssignment | PropertyDeclaration).name;

    if (propName && (propName.kind === SyntaxKind.NumericLiteral || propName.kind === SyntaxKind.StringLiteral)) {
      // We can use literals as property names only when creating Record or any interop instances.
      let isRecordObjectInitializer = false;
      let isLibraryType = false;
      let isDynamic = false;
      if (isPropertyAssignment(node)) {
        let objectLiteralType = TypeScriptLinter.tsTypeChecker.getContextualType(node.parent);
        if (objectLiteralType) {
          isRecordObjectInitializer = isStdRecordType(objectLiteralType);
          isLibraryType = ArkTSLinter_1_0.isLibraryType(objectLiteralType);
        }
        isDynamic = isLibraryType || isDynamicLiteralInitializer(node.parent);
      }

      if (!isRecordObjectInitializer && !isDynamic) {
        let autofix: Autofix[] | undefined = fixLiteralAsPropertyName(node);
        const autofixable = autofix !== undefined;
        if (!shouldAutofix(node, FaultID.LiteralAsPropertyName)) {
          autofix = undefined;
        }
        this.incrementCounters(node, FaultID.LiteralAsPropertyName, autofixable, autofix);
      }
    }

    if (isPropertyDeclaration(node)) {
      const decorators = getDecorators(node);
      this.handleDecorators(decorators);
      this.filterOutDecoratorsDiagnostics(
          decorators,
          NON_INITIALIZABLE_PROPERTY_DECORATORS,
          { begin: propName.getStart(), end: propName.getStart() },
          PROPERTY_HAS_NO_INITIALIZER_ERROR_CODE
        );
      const classDecorators = getDecorators(node.parent);
      const propType = (node as PropertyDeclaration).type?.getText();
      this.filterOutDecoratorsDiagnostics(classDecorators, NON_INITIALIZABLE_PROPERTY_ClASS_DECORATORS,
        {begin: propName.getStart(), end: propName.getStart()}, PROPERTY_HAS_NO_INITIALIZER_ERROR_CODE, propType);
      this.handleDeclarationInferredType(node);
      this.handleDefiniteAssignmentAssertion(node);
    }
  }

  private filterOutDecoratorsDiagnostics(decorators: readonly Decorator[] | undefined,
    expectedDecorators: readonly string[],
    range: { begin: number, end: number},
    code: number,
    prop_type?: string) {
    // Filter out non-initializable property decorators from strict diagnostics.
    if (this.tscStrictDiagnostics && this.sourceFile) {
      if (decorators?.some(x => {
        let decoratorName = "";
        if (isIdentifier(x.expression)) {
          decoratorName = x.expression.text;
        }
        else if (isCallExpression(x.expression) && isIdentifier(x.expression.expression)) {
          decoratorName = x.expression.expression.text;
        }
        // special case for property of type CustomDialogController of the @CustomDialog-decorated class
        if (expectedDecorators.includes(NON_INITIALIZABLE_PROPERTY_ClASS_DECORATORS[0])) {
          return expectedDecorators.includes(decoratorName) && prop_type === "CustomDialogController"
        }
        //return Utils.NON_INITIALIZABLE_PROPERTY_DECORATORS.includes(decoratorName);
        return expectedDecorators.includes(decoratorName);
      })) {
        const file = normalizePath(this.sourceFile.fileName);
        const tscDiagnostics = this.tscStrictDiagnostics.get(file);
        if (tscDiagnostics) {
          const filteredDiagnostics = tscDiagnostics.filter(
            (val /*, idx, array */) => {
              if (val.code !== code) return true;
              if (val.start === undefined) return true;
              if (val.start < range.begin) return true;
              if (val.start > range.end) return true;
              return false;
            }
          );
          this.tscStrictDiagnostics.set(file, filteredDiagnostics);
        }
      }
    }
  }

  private checkInRange(rangesToFilter: { begin: number, end: number }[], pos: number): boolean {
    for (let i = 0; i < rangesToFilter.length; i++) {
      if (pos >= rangesToFilter[i].begin && pos < rangesToFilter[i].end) {
        return false;
      }
    }
    return true;
  }

  private filterStrictDiagnostics(filters: { [code: number]: (pos: number) => boolean },
    diagnosticChecker: DiagnosticChecker): boolean {
    if (!this.tscStrictDiagnostics || !this.sourceFile) {
      return false;
    }
    const file = normalizePath(this.sourceFile.fileName);
    const tscDiagnostics = this.tscStrictDiagnostics.get(file);
    if (!tscDiagnostics) {
      return false;
    }

    const checkDiagnostic = (val: Diagnostic) => {
      const checkInRange = filters[val.code];
      if (!checkInRange) {
        return true;
      }
      if (val.start === undefined || checkInRange(val.start)) {
        return true;
      }
      return diagnosticChecker.checkDiagnosticMessage(val.messageText);
    };

    if (tscDiagnostics.every(checkDiagnostic)) {
      return false;
    }
    this.tscStrictDiagnostics.set(file, tscDiagnostics.filter(checkDiagnostic));
    return true;
  }

  private handleFunctionExpression(node: Node): void {
    const funcExpr = node as FunctionExpression;
    const isGenerator = funcExpr.asteriskToken !== undefined;
    const containsThis = this.functionContainsThis(funcExpr.body);
    const hasValidContext = hasPredecessor(funcExpr, isClassLike) ||
                            hasPredecessor(funcExpr, isInterfaceDeclaration);
    const isGeneric = funcExpr.typeParameters !== undefined && funcExpr.typeParameters.length > 0;
    const [hasUnfixableReturnType, newRetTypeNode] = this.handleMissingReturnType(funcExpr);
    const autofixable = !isGeneric && !isGenerator && !containsThis && !hasUnfixableReturnType;

    let autofix: Autofix[] | undefined;
    if (autofixable && shouldAutofix(node, FaultID.FunctionExpression)) {
      autofix = [fixFunctionExpression(funcExpr, funcExpr.parameters, newRetTypeNode)];
    }

    this.incrementCounters(node, FaultID.FunctionExpression, autofixable, autofix);
    if (isGeneric) {
      this.incrementCounters(funcExpr, FaultID.LambdaWithTypeParameters);
    }
    if (isGenerator) {
      this.incrementCounters(funcExpr, FaultID.GeneratorFunction);
    }
    if (containsThis && !hasValidContext) {
      this.incrementCounters(funcExpr, FaultID.FunctionContainsThis);
    }
    if (hasUnfixableReturnType) {
      this.incrementCounters(funcExpr, FaultID.LimitedReturnTypeInference);
    }
  }

  private handleArrowFunction(node: Node): void {
    const arrowFunc = node as ArrowFunction;
    const containsThis = this.functionContainsThis(arrowFunc.body);
    const hasValidContext = hasPredecessor(arrowFunc, isClassLike) ||
                            hasPredecessor(arrowFunc, isInterfaceDeclaration);
    if (containsThis && !hasValidContext) {
      this.incrementCounters(arrowFunc, FaultID.FunctionContainsThis);
    }

    const contextType = TypeScriptLinter.tsTypeChecker.getContextualType(arrowFunc);
    if (!(contextType && isLibraryType(contextType))) {
      if (!arrowFunc.type) {
        this.handleMissingReturnType(arrowFunc);
      }

      if (arrowFunc.typeParameters && arrowFunc.typeParameters.length > 0) {
        this.incrementCounters(node, FaultID.LambdaWithTypeParameters);
      }
    }
  }

  private handleClassExpression(node: Node): void {
    //let tsClassExpr = node as ClassExpression;
    this.incrementCounters(node, FaultID.ClassExpression);
    //this.handleDecorators(tsClassExpr.decorators);
  }

  private handleFunctionDeclaration(node: Node) {
    const tsFunctionDeclaration = node as FunctionDeclaration;
    if (!tsFunctionDeclaration.type) this.handleMissingReturnType(tsFunctionDeclaration);
    if (tsFunctionDeclaration.name) {
      this.countDeclarationsWithDuplicateName(tsFunctionDeclaration.name, tsFunctionDeclaration);
    }
    if (tsFunctionDeclaration.body && this.functionContainsThis(tsFunctionDeclaration.body)) {
      this.incrementCounters(node, FaultID.FunctionContainsThis);
    }
    if (!isSourceFile(tsFunctionDeclaration.parent) && !isModuleBlock(tsFunctionDeclaration.parent)) {
      this.incrementCounters(tsFunctionDeclaration, FaultID.LocalFunction);
    }
    if (tsFunctionDeclaration.asteriskToken) this.incrementCounters(node, FaultID.GeneratorFunction);
  }

  private handleMissingReturnType(funcLikeDecl: FunctionLikeDeclaration): [boolean, TypeNode | undefined] {
    // if (funcLikeDecl.type) return [false, funcLikeDecl.type];

    // Note: Return type can't be inferred for function without body.
    if (!funcLikeDecl.body) return [false, undefined];

    let autofixable = false;
    let autofix: Autofix[] | undefined;
    let newRetTypeNode: TypeNode | undefined;
    const isFuncExpr = isFunctionExpression(funcLikeDecl);

    // Currently, ArkTS can't infer return type of function, when expression
    // in the return statement is a call to a function or method whose return
    // value type is omitted. In that case, we attempt to prepare an autofix.
    let hasLimitedRetTypeInference = this.hasLimitedTypeInferenceFromReturnExpr(funcLikeDecl.body);

    const tsSignature = TypeScriptLinter.tsTypeChecker.getSignatureFromDeclaration(funcLikeDecl);
    if (tsSignature) {
      const tsRetType = TypeScriptLinter.tsTypeChecker.getReturnTypeOfSignature(tsSignature);

      if (!tsRetType || isUnsupportedType(tsRetType)) {
        hasLimitedRetTypeInference = true;
      }
      else if (hasLimitedRetTypeInference) {
        newRetTypeNode = TypeScriptLinter.tsTypeChecker.typeToTypeNode(tsRetType, funcLikeDecl, NodeBuilderFlags.None);
        autofixable = !!newRetTypeNode;

        if (!isFuncExpr && newRetTypeNode && shouldAutofix(funcLikeDecl, FaultID.LimitedReturnTypeInference)) {
          autofix = [fixReturnType(funcLikeDecl, newRetTypeNode)];
        }
      }
    }

    // Don't report here if in function expression context.
    // See handleFunctionExpression for details.
    if (hasLimitedRetTypeInference && !isFuncExpr) {
      this.incrementCounters(funcLikeDecl, FaultID.LimitedReturnTypeInference, autofixable, autofix);
    }
    return [hasLimitedRetTypeInference && !newRetTypeNode, newRetTypeNode];
  }

  private hasLimitedTypeInferenceFromReturnExpr(funBody: ConciseBody): boolean {
    let hasLimitedTypeInference = false;
    function visitNode(tsNode: Node): void {
      if (hasLimitedTypeInference) {
        return;
      }

      if (
        isReturnStatement(tsNode) && tsNode.expression &&
        isCallToFunctionWithOmittedReturnType(unwrapParenthesized(tsNode.expression))
      ) {
        hasLimitedTypeInference = true;
        return;
      }

      // Visit children nodes. Don't traverse other nested function-like declarations.
      if (
        !isFunctionDeclaration(tsNode) &&
        !isFunctionExpression(tsNode) &&
        !isMethodDeclaration(tsNode) &&
        !isAccessor(tsNode) &&
        !isArrowFunction(tsNode)
      ) {
        tsNode.forEachChild(visitNode);
      }
    }

    if (isBlock(funBody)) {
      visitNode(funBody);
    }
    else {
      const tsExpr = unwrapParenthesized(funBody);
      hasLimitedTypeInference = isCallToFunctionWithOmittedReturnType(tsExpr);
    }

    return hasLimitedTypeInference;
  }

  private handlePrefixUnaryExpression(node: Node) {
    const tsUnaryArithm = node as PrefixUnaryExpression;
    const tsUnaryOp = tsUnaryArithm.operator;
    if (
      tsUnaryOp === SyntaxKind.PlusToken ||
      tsUnaryOp === SyntaxKind.MinusToken ||
      tsUnaryOp === SyntaxKind.TildeToken
    ) {
      const tsOperatndType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsUnaryArithm.operand);
      if (!(tsOperatndType.getFlags() & (TypeFlags.NumberLike | TypeFlags.BigIntLiteral)) ||
            (tsUnaryOp === SyntaxKind.TildeToken && tsUnaryArithm.operand.kind === SyntaxKind.NumericLiteral &&
              !isIntegerConstantValue(tsUnaryArithm.operand as NumericLiteral))
          ) {
        this.incrementCounters(node, FaultID.UnaryArithmNotNumber);
      }
    }
  }

  private handleBinaryExpression(node: Node): void {
    const tsBinaryExpr = node as BinaryExpression;
    const tsLhsExpr = tsBinaryExpr.left;
    const tsRhsExpr = tsBinaryExpr.right;

    if (isAssignmentOperator(tsBinaryExpr.operatorToken)) {
      if (isObjectLiteralExpression(tsLhsExpr) || isArrayLiteralExpression(tsLhsExpr)) {
        this.incrementCounters(node, FaultID.DestructuringAssignment);
      }
      if (isPropertyAccessExpression(tsLhsExpr)) {
        const tsLhsSymbol = trueSymbolAtLocation(tsLhsExpr);
        const tsLhsBaseSymbol = trueSymbolAtLocation(tsLhsExpr.expression);
        if (tsLhsSymbol && (tsLhsSymbol.flags & SymbolFlags.Method)) {
          this.incrementCounters(tsLhsExpr, FaultID.NoUndefinedPropAccess);
        }
        if (
          isMethodAssignment(tsLhsSymbol) && tsLhsBaseSymbol &&
          (tsLhsBaseSymbol.flags & SymbolFlags.Function) !== 0
        ) {
          this.incrementCounters(tsLhsExpr, FaultID.PropertyDeclOnFunction);
        }
      }
    }

    const leftOperandType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsLhsExpr);
    const rightOperandType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsRhsExpr);

    if (tsBinaryExpr.operatorToken.kind === SyntaxKind.PlusToken) {
      if (isEnumMemberType(leftOperandType) && isEnumMemberType(rightOperandType)) {
        if (
            ((leftOperandType.flags & (TypeFlags.NumberLike)) && (rightOperandType.getFlags() & (TypeFlags.NumberLike))) ||
            ((leftOperandType.flags & (TypeFlags.StringLike)) && (rightOperandType.getFlags() & (TypeFlags.StringLike)))
          ) {
          return;
        }
      }
      else if (isNumberType(leftOperandType) && isNumberType(rightOperandType)) {
        return;
      }
      else if (isStringLikeType(leftOperandType) || isStringLikeType(rightOperandType)) {
        return;
      }
    }
    else if (
      tsBinaryExpr.operatorToken.kind === SyntaxKind.AmpersandToken ||
      tsBinaryExpr.operatorToken.kind === SyntaxKind.BarToken ||
      tsBinaryExpr.operatorToken.kind === SyntaxKind.CaretToken ||
      tsBinaryExpr.operatorToken.kind === SyntaxKind.LessThanLessThanToken ||
      tsBinaryExpr.operatorToken.kind === SyntaxKind.GreaterThanGreaterThanToken ||
      tsBinaryExpr.operatorToken.kind === SyntaxKind.GreaterThanGreaterThanGreaterThanToken
    ) {
      if (!(isNumberType(leftOperandType) && isNumberType(rightOperandType)) ||
            (tsLhsExpr.kind === SyntaxKind.NumericLiteral && !isIntegerConstantValue(tsLhsExpr as NumericLiteral)) ||
            (tsRhsExpr.kind === SyntaxKind.NumericLiteral && !isIntegerConstantValue(tsRhsExpr as NumericLiteral))
          ) {
        return; //this.incrementCounters(node, FaultID.BitOpWithWrongType);
      }
    }
    else if (tsBinaryExpr.operatorToken.kind === SyntaxKind.CommaToken) {
      // CommaOpertor is allowed in 'for' statement initalizer and incrementor
      let tsExprNode: Node = tsBinaryExpr;
      let tsParentNode = tsExprNode.parent;
      while (tsParentNode && tsParentNode.kind === SyntaxKind.BinaryExpression) {
        tsExprNode = tsParentNode;
        tsParentNode = tsExprNode.parent;
      }

      if (tsParentNode && tsParentNode.kind === SyntaxKind.ForStatement) {
        const tsForNode = tsParentNode as ForStatement;
        if (tsExprNode === tsForNode.initializer || tsExprNode === tsForNode.incrementor) return;
      }
      this.incrementCounters(node, FaultID.CommaOperator);
    }
    else if (tsBinaryExpr.operatorToken.kind === SyntaxKind.InstanceOfKeyword) {
      const leftExpr = unwrapParenthesized(tsBinaryExpr.left);
      const leftSymbol = trueSymbolAtLocation(leftExpr);
      // In STS, the left-hand side expression may be of any reference type, otherwise
      // a compile-time error occurs. In addition, the left operand in STS cannot be a type.
      if (tsLhsExpr.kind === SyntaxKind.ThisKeyword) {
        return;
      }
      if (isPrimitiveType(leftOperandType) || isTypeNode(leftExpr) || isTypeSymbol(leftSymbol)) {
        this.incrementCounters(node, FaultID.InstanceofUnsupported);
      }
    }
    else if (tsBinaryExpr.operatorToken.kind === SyntaxKind.EqualsToken) {
      if (needToDeduceStructuralIdentity(rightOperandType, leftOperandType)) {
        this.incrementCounters(tsBinaryExpr, FaultID.StructuralIdentity);
      }
      const typeNode = getVariableDeclarationTypeNode(tsLhsExpr);
      this.handleEsObjectAssignment(tsBinaryExpr, typeNode, tsRhsExpr);
    }
  }

  private handleVariableDeclarationList(node: Node): void {
    const varDeclFlags = getCombinedNodeFlags(node);
    if (!(varDeclFlags & (NodeFlags.Let | NodeFlags.Const))) {
      this.incrementCounters(node, FaultID.VarDeclaration);
    }
  }

  private handleVariableDeclaration(node: Node): void {
    const tsVarDecl = node as VariableDeclaration;
    if (isArrayBindingPattern(tsVarDecl.name) || isObjectBindingPattern(tsVarDecl.name)) {
      this.incrementCounters(node, FaultID.DestructuringDeclaration);
    }
    {
      // Check variable declaration for duplicate name.
      const visitBindingPatternNames = (tsBindingName: BindingName): void => {
        if (isIdentifier(tsBindingName)) {
          // The syntax kind of the declaration is defined here by the parent of 'BindingName' node.
          this.countDeclarationsWithDuplicateName(tsBindingName, tsBindingName, tsBindingName.parent.kind);
        }
        else {
          for (const tsBindingElem of tsBindingName.elements) {
            if (isOmittedExpression(tsBindingElem)) continue;

            visitBindingPatternNames(tsBindingElem.name);
          }
        }
      };

      visitBindingPatternNames(tsVarDecl.name);
    }

    if (tsVarDecl.type && tsVarDecl.initializer) {
      const tsVarInit = tsVarDecl.initializer;
      const tsVarType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsVarDecl.type);
      const tsInitType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsVarInit);
      if (needToDeduceStructuralIdentity(tsInitType, tsVarType)) {
        this.incrementCounters(tsVarDecl, FaultID.StructuralIdentity);
      }
    }

    this.handleEsObjectDelaration(tsVarDecl);
    this.handleDeclarationInferredType(tsVarDecl);
    this.handleDefiniteAssignmentAssertion(tsVarDecl);
  }

  private handleEsObjectDelaration(node: VariableDeclaration) {
    const isDeclaredESObject = !!node.type && isEsObjectType(node.type);
    const initalizerTypeNode = node.initializer && getVariableDeclarationTypeNode(node.initializer);
    const isInitializedWithESObject = !!initalizerTypeNode && isEsObjectType(initalizerTypeNode);
    const isLocal = isInsideBlock(node);
    if ((isDeclaredESObject || isInitializedWithESObject) && !isLocal) {
      this.incrementCounters(node, FaultID.EsObjectType);
      return;
    }

    if (node.initializer) {
      this.handleEsObjectAssignment(node, node.type, node.initializer);
      return;
    }
  }

  private handleEsObjectAssignment(node: Node, nodeDeclType: TypeNode | undefined, initializer: Node) {
    const isTypeAnnotated = !!nodeDeclType;
    const isDeclaredESObject = !!nodeDeclType && isEsObjectType(nodeDeclType);
    const initalizerTypeNode = getVariableDeclarationTypeNode(initializer);
    const isInitializedWithESObject = !!initalizerTypeNode && isEsObjectType(initalizerTypeNode);
    if (isTypeAnnotated && !isDeclaredESObject && isInitializedWithESObject) {
      this.incrementCounters(node, FaultID.EsObjectType);
      return;
    }

    if (isDeclaredESObject && !isValueAssignableToESObject(initializer)) {
      this.incrementCounters(node, FaultID.EsObjectType);
    }
  }


  private handleCatchClause(node: Node): void {
    const tsCatch = node as CatchClause;
    // In TS catch clause doesn't permit specification of the exception varible type except 'any' or 'unknown'.
    // It is not compatible with STS 'catch' where the exception varilab has to be of type
    // 'Exception' or derived from it.
    // So each 'catch' which has explicite type for the exception object goes to problems in strict mode.
    if (tsCatch.variableDeclaration && tsCatch.variableDeclaration.type) {
      this.incrementCounters(node, FaultID.CatchWithUnsupportedType);
    }
  }

  private handleClassDeclaration(node: Node): void {
    const tsClassDecl = node as ClassDeclaration;
    this.staticBlocks.clear();

    if (tsClassDecl.name) {
      this.countDeclarationsWithDuplicateName(tsClassDecl.name, tsClassDecl);
    }
    this.countClassMembersWithDuplicateName(tsClassDecl);

    const visitHClause = (hClause: HeritageClause) => {
      for (const tsTypeExpr of hClause.types) {
        const tsExprType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsTypeExpr.expression);
        if (tsExprType.isClass() && hClause.token === SyntaxKind.ImplementsKeyword) {
          this.incrementCounters(tsTypeExpr, FaultID.ImplementsClass);
        }
      }
    };

    if (tsClassDecl.heritageClauses) {
      for (const hClause of tsClassDecl.heritageClauses) {
        if (!hClause) {
          continue;
        }
        visitHClause(hClause);
      }
    }

    this.handleDecorators(getDecorators(tsClassDecl));

    if (!this.skipArkTSStaticBlocksCheck) {
      let hasStaticBlock = false;
      for (const element of tsClassDecl.members) {
        if (isClassStaticBlockDeclaration(element)) {
          if (hasStaticBlock) {
            this.incrementCounters(element, FaultID.MultipleStaticBlocks);
          } else {
            hasStaticBlock = true;
          }
        }
      }
    }
  }

  private handleModuleDeclaration(node: Node): void {
    const tsModuleDecl = node as ModuleDeclaration;
    this.countDeclarationsWithDuplicateName(tsModuleDecl.name, tsModuleDecl);

    const tsModuleBody = tsModuleDecl.body;
    const tsModifiers = tsModuleDecl.modifiers; // TSC 4.2 doesn't have 'getModifiers()' method
    if (tsModuleBody) {
      if (isModuleBlock(tsModuleBody)) {
        for (const tsModuleStmt of tsModuleBody.statements) {
          switch (tsModuleStmt.kind) {
            case SyntaxKind.VariableStatement:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.ExportDeclaration:
              break;
            // Nested namespace declarations are prohibited
            // but there is no cookbook recipe for it!
            case SyntaxKind.ModuleDeclaration:
              break;
            default:
              this.incrementCounters(tsModuleStmt, FaultID.NonDeclarationInNamespace);
              break;
          }
        }
      }
    }

    if (!(tsModuleDecl.flags & NodeFlags.Namespace) &&
        hasModifier(tsModifiers, SyntaxKind.DeclareKeyword)) {
      this.incrementCounters(tsModuleDecl, FaultID.ShorthandAmbientModuleDecl);
    }

    if (isStringLiteral(tsModuleDecl.name) && tsModuleDecl.name.text.includes("*")) {
      this.incrementCounters(tsModuleDecl, FaultID.WildcardsInModuleName);
    }
  }

  private handleTypeAliasDeclaration(node: Node): void {
    const tsTypeAlias = node as TypeAliasDeclaration;
    this.countDeclarationsWithDuplicateName(tsTypeAlias.name, tsTypeAlias);
  }

  private handleImportClause(node: Node): void {
    const tsImportClause = node as ImportClause;
    if (tsImportClause.name) {
      this.countDeclarationsWithDuplicateName(tsImportClause.name, tsImportClause);
    }

    if (tsImportClause.namedBindings && isNamedImports(tsImportClause.namedBindings)) {
      const nonDefaultSpecs: ImportSpecifier[] = [];
      let defaultSpec: ImportSpecifier | undefined;
      for (const importSpec of tsImportClause.namedBindings.elements) {
        if (isDefaultImport(importSpec)) {
          defaultSpec = importSpec;
        }
        else nonDefaultSpecs.push(importSpec);
      }
      if (defaultSpec) {
        let autofix: Autofix[] | undefined;
        // if (Autofixer.shouldAutofix(defaultSpec, FaultID.DefaultImport))
        //  autofix = [ Autofixer.fixDefaultImport(tsImportClause, defaultSpec, nonDefaultSpecs) ];
        this.incrementCounters(defaultSpec, FaultID.DefaultImport, true, autofix);
      }
    }
  }

  private handleImportSpecifier(node: Node): void {
    const tsImportSpecifier = node as ImportSpecifier;
    this.countDeclarationsWithDuplicateName(tsImportSpecifier.name, tsImportSpecifier);
  }

  private handleNamespaceImport(node: Node): void {
    const tsNamespaceImport = node as NamespaceImport;
    this.countDeclarationsWithDuplicateName(tsNamespaceImport.name, tsNamespaceImport);
  }

  private handleTypeAssertionExpression(node: Node): void {
    const tsTypeAssertion = node as TypeAssertion;
    if (tsTypeAssertion.type.getText() === "const") {
      this.incrementCounters(tsTypeAssertion, FaultID.ConstAssertion);
    }
    else {
      this.incrementCounters(node, FaultID.TypeAssertion);
    }
  }

  private handleMethodDeclaration(node: Node): void {
    const tsMethodDecl = node as MethodDeclaration;
    const hasThis = this.functionContainsThis(tsMethodDecl);
    let isStatic = false;
    if (tsMethodDecl.modifiers) {
      for (const mod of tsMethodDecl.modifiers) {
        if (mod.kind === SyntaxKind.StaticKeyword) {
          isStatic = true;
          break;
        }
      }
    }

    if (isStatic && hasThis) {
      this.incrementCounters(node, FaultID.FunctionContainsThis);
    }
    if (!tsMethodDecl.type) {
      this.handleMissingReturnType(tsMethodDecl);
    }
    if (tsMethodDecl.asteriskToken) {
      this.incrementCounters(node, FaultID.GeneratorFunction);
    }
    this.handleDecorators(getDecorators(tsMethodDecl));
    this.filterOutDecoratorsDiagnostics(getDecorators(tsMethodDecl), NON_RETURN_FUNCTION_DECORATORS,
      { begin: tsMethodDecl.parameters.end, end: tsMethodDecl.body?.getStart() ?? tsMethodDecl.parameters.end },
      FUNCTION_HAS_NO_RETURN_ERROR_CODE);
  }

  private handleIdentifier(node: Node): void {
    const tsIdentifier = node as Identifier;
    const tsIdentSym = trueSymbolAtLocation(tsIdentifier);

    if (!tsIdentSym) {
      return;
    }

    if (
      (tsIdentSym.flags & SymbolFlags.Module) !== 0 &&
      (tsIdentSym.flags & SymbolFlags.Transient) !== 0 &&
      tsIdentifier.text === "globalThis"
    ) {
      this.incrementCounters(node, FaultID.GlobalThis);
    } else {
      this.handleRestrictedValues(tsIdentifier, tsIdentSym);
    }
  }

  private isAllowedClassValueContext(tsIdentifier: Identifier /* Param not used ! ??, tsIdentSym: Symbol */ /* Param not used ! ??, tsIdentSym: Symbol */): boolean {
    let ctx: Node = tsIdentifier;
    while (isPropertyAccessExpression(ctx.parent) || isQualifiedName(ctx.parent)) {
      ctx = ctx.parent;
    }
    if (isPropertyAssignment(ctx.parent) && isObjectLiteralExpression(ctx.parent.parent)) {
      ctx = ctx.parent.parent;
    }
    if (isArrowFunction(ctx.parent) && ctx.parent.body === ctx) {
      ctx = ctx.parent;
    }

    if (isCallExpression(ctx.parent) || isNewExpression(ctx.parent)) {
      const callee = ctx.parent.expression;
      const isAny = isAnyType(TypeScriptLinter.tsTypeChecker.getTypeAtLocation(callee));
      const isDynamic = isAny || hasLibraryType(callee);
      if (callee !== ctx && isDynamic) {
        return true;
      }
    }
    return false;
  }

  private handleRestrictedValues(tsIdentifier: Identifier, tsIdentSym: Symbol) {
    const illegalValues = SymbolFlags.ConstEnum | SymbolFlags.RegularEnum | SymbolFlags.ValueModule | SymbolFlags.Class;
    // If module name is duplicated by another declaration, this increases the possibility
    // of finding a lot of false positives. Thus, do not check further in that case.
    if ((tsIdentSym.flags & SymbolFlags.ValueModule) !== 0) {
      if (!!tsIdentSym && symbolHasDuplicateName(tsIdentSym, SyntaxKind.ModuleDeclaration)) {
        return;
      }
    }
    if ((tsIdentSym.flags & illegalValues) === 0 || isStruct(tsIdentSym) ||
        !this.identiferUseInValueContext(tsIdentifier, tsIdentSym)) {
          return;
    }
    if ((tsIdentSym.flags & SymbolFlags.Class) !== 0) {
      if (this.isAllowedClassValueContext(tsIdentifier /* param not used!?? , tsIdentSym */)) {
        return;
      }
    }

    if (tsIdentSym.flags & SymbolFlags.ValueModule) {
      this.incrementCounters(tsIdentifier, FaultID.NamespaceAsObject);
    }
    else {
      // missing EnumAsObject
      this.incrementCounters(tsIdentifier, FaultID.ClassAsObject);
    }
  }

  private identiferUseInValueContext(
    ident: Identifier,
    tsSym: Symbol
    ) {
    // If identifier is the right-most name of Property Access chain or Qualified name,
    // or it's a separate identifier expression, then identifier is being referenced as an value.
    let qualifiedStart: Node = ident;
    while (isPropertyAccessExpression(qualifiedStart.parent) || isQualifiedName(qualifiedStart.parent)) {
      qualifiedStart = qualifiedStart.parent;
    }
    const parent = qualifiedStart.parent;
    return !(
      // treat TypeQuery as valid because it's already forbidden (FaultID.TypeQuery)
      (isTypeNode(parent) && !isTypeOfExpression(parent)) ||
      // ElementAccess is allowed for enum types
      this.isEnumPropAccess(ident, tsSym, parent) ||
      isExpressionWithTypeArguments(parent) ||
      isExportAssignment(parent) ||
      isExportSpecifier(parent) ||
      isMetaProperty(parent) ||
      isImportClause(parent) ||
      isClassLike(parent) ||
      isInterfaceDeclaration(parent) ||
      isModuleDeclaration(parent) ||
      isEnumDeclaration(parent) ||
      isNamespaceImport(parent) ||
      isImportSpecifier(parent) ||
      isImportEqualsDeclaration(parent) ||
      (isQualifiedName(qualifiedStart) && ident !== qualifiedStart.right) ||
      (isPropertyAccessExpression(qualifiedStart) &&
        ident !== qualifiedStart.name) ||
      (isNewExpression(qualifiedStart.parent) &&
        qualifiedStart === qualifiedStart.parent.expression) ||
      (isBinaryExpression(qualifiedStart.parent) &&
        qualifiedStart.parent.operatorToken.kind ===
        SyntaxKind.InstanceOfKeyword)
    );
  }

  private isEnumPropAccess(ident: Identifier, tsSym: Symbol, context: Node): boolean {
    return isElementAccessExpression(context) && !!(tsSym.flags & SymbolFlags.Enum) &&
      (context.expression == ident ||
        (isPropertyAccessExpression(context.expression) && context.expression.name === ident));
  }

  private handleElementAccessExpression(node: Node): void {
    const tsElementAccessExpr = node as ElementAccessExpression;
    const tsElemAccessBaseExprType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsElementAccessExpr.expression);
    const tsElemAccessBaseExprTypeNode = TypeScriptLinter.tsTypeChecker.typeToTypeNode(tsElemAccessBaseExprType, undefined, NodeBuilderFlags.None);
    const isDerivedFromArray = isDerivedFrom(tsElemAccessBaseExprType, CheckType.Array);
    const checkClassOrInterface = tsElemAccessBaseExprType.isClassOrInterface() &&
                                  !isGenericArrayType(tsElemAccessBaseExprType) &&
                                  !isDerivedFromArray;
    const checkThisOrSuper = isThisOrSuperExpr(tsElementAccessExpr.expression) && !isDerivedFromArray;

    // if (this.tsUtils.isEnumType(tsElemAccessBaseExprType)) {
    //   implement argument expression type check
    //   let argType = this.tsTypeChecker.getTypeAtLocation(tsElementAccessExpr.argumentExpression);
    //   if (argType.aliasSymbol == this.tsUtils.trueSymbolAtLocation(tsElementAccessExpr.expression)) {
    //     return;
    //   }
    //   check if constant EnumMember inferred ...
    //   this.incrementCounters(node, FaultID.PropertyAccessByIndex, autofixable, autofix);
    // }
    if (
        !isLibraryType(tsElemAccessBaseExprType) && !isTypedArray(tsElemAccessBaseExprTypeNode) &&
          (checkClassOrInterface ||
            isObjectLiteralType(tsElemAccessBaseExprType) || checkThisOrSuper)
        ) {
      let autofix = fixPropertyAccessByIndex(node);
      const autofixable = autofix !== undefined;
      if (!shouldAutofix(node, FaultID.PropertyAccessByIndex)) {
        autofix = undefined;
      }
      this.incrementCounters(node, FaultID.PropertyAccessByIndex, autofixable, autofix);
    }
    if (hasEsObjectType(tsElementAccessExpr.expression)) {
      this.incrementCounters(node, FaultID.EsObjectType);
    }
  }

  private handleEnumMember(node: Node): void {
    const tsEnumMember = node as EnumMember;
    const tsEnumMemberType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsEnumMember);
    const constVal = TypeScriptLinter.tsTypeChecker.getConstantValue(tsEnumMember);

    if (tsEnumMember.initializer && !isValidEnumMemberInit(tsEnumMember.initializer)) {
      this.incrementCounters(node, FaultID.EnumMemberNonConstInit);
    }
    // check for type - all members should be of same type
    const enumDecl = tsEnumMember.parent;
    const firstEnumMember = enumDecl.members[0];
    const firstEnumMemberType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(firstEnumMember);
    const firstElewmVal = TypeScriptLinter.tsTypeChecker.getConstantValue(firstEnumMember);
    // each string enum member has its own type
    // so check that value type is string
    if(constVal !==undefined && typeof constVal === "string" &&
        firstElewmVal !==undefined && typeof firstElewmVal === "string") {
      return;
    }
    if (constVal !==undefined && typeof constVal === "number" &&
        firstElewmVal !==undefined && typeof firstElewmVal === "number") {
      return;
    }
    if(firstEnumMemberType !== tsEnumMemberType) {
      this.incrementCounters(node, FaultID.EnumMemberNonConstInit);
    }
  }

  private handleExportAssignment(node: Node): void {
    // (nsizov): check exportEquals and determine if it's an actual `export assignment`
    //   or a `default export namespace` when this two cases will be determined in cookbook
    const exportAssignment = node as ExportAssignment;
    if (exportAssignment.isExportEquals) {
      this.incrementCounters(node, FaultID.ExportAssignment);
    }
  }

  private handleCallExpression(node: Node): void {
    const tsCallExpr = node as CallExpression;

    const calleeSym = trueSymbolAtLocation(tsCallExpr.expression);
    const calleeType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsCallExpr.expression);
    const callSignature = TypeScriptLinter.tsTypeChecker.getResolvedSignature(tsCallExpr);

    this.handleImportCall(tsCallExpr);
    this.handleRequireCall(tsCallExpr);
    // NOTE: Keep handleFunctionApplyBindPropCall above handleGenericCallWithNoTypeArgs here!!!
    if (calleeSym !== undefined) {
      this.handleStdlibAPICall(tsCallExpr, calleeSym);
      this.handleFunctionApplyBindPropCall(tsCallExpr, calleeSym);
      if (symbolHasEsObjectType(calleeSym)) {
        this.incrementCounters(tsCallExpr, FaultID.EsObjectType);
      }
    }
    if (callSignature !== undefined) {
      if (!isLibrarySymbol(calleeSym)) {
        this.handleGenericCallWithNoTypeArgs(tsCallExpr, callSignature);
      }
      this.handleStructIdentAndUndefinedInArgs(tsCallExpr, callSignature);
    }
    this.handleLibraryTypeCall(tsCallExpr, calleeType);

    if (isPropertyAccessExpression(tsCallExpr.expression) && hasEsObjectType(tsCallExpr.expression.expression)) {
      this.incrementCounters(node, FaultID.EsObjectType);
    }
  }

  private handleImportCall(tsCallExpr: CallExpression): void {
    if (tsCallExpr.expression.kind === SyntaxKind.ImportKeyword) {
      // relax rule#133 "arkts-no-runtime-import"
      // this.incrementCounters(tsCallExpr, FaultID.DynamicImport);
      const tsArgs = tsCallExpr.arguments;
      if (tsArgs.length > 1 && isObjectLiteralExpression(tsArgs[1])) {
        const objLitExpr = tsArgs[1] as ObjectLiteralExpression;
        for (const tsProp of objLitExpr.properties) {
          if (isPropertyAssignment(tsProp) || isShorthandPropertyAssignment(tsProp)) {
            if (tsProp.name.getText() === "assert") {
              this.incrementCounters(tsProp, FaultID.ImportAssertion);
              break;
            }
          }
        }
      }
    }
  }

  private handleRequireCall(tsCallExpr: CallExpression): void {
    if (
      isIdentifier(tsCallExpr.expression) &&
      tsCallExpr.expression.text === "require" &&
      isVariableDeclaration(tsCallExpr.parent)
    ) {
      const tsType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsCallExpr.expression);
      if (isInterfaceType(tsType) && tsType.symbol.name === "NodeRequire") {
        this.incrementCounters(tsCallExpr.parent, FaultID.ImportAssignment);
      }
    }
  }

  private handleGenericCallWithNoTypeArgs(callLikeExpr: CallExpression | NewExpression, callSignature: Signature) {

    const tsSyntaxKind = isNewExpression(callLikeExpr) ? SyntaxKind.Constructor : SyntaxKind.FunctionDeclaration;
    const signDecl = TypeScriptLinter.tsTypeChecker.signatureToSignatureDeclaration(callSignature, tsSyntaxKind,
        undefined, NodeBuilderFlags.WriteTypeArgumentsOfSignature | NodeBuilderFlags.IgnoreErrors);

    if (signDecl?.typeArguments) {
      const resolvedTypeArgs = signDecl.typeArguments;

      const startTypeArg = callLikeExpr.typeArguments?.length ?? 0;
      for (let i = startTypeArg; i < resolvedTypeArgs.length; ++i) {
        const typeNode = resolvedTypeArgs[i];
        // if compiler infers 'unknown' type there are 2 possible cases:
        //   1. Compiler unable to infer type from arguments and use 'unknown'
        //   2. Compiler infer 'unknown' from arguments
        // We report error in both cases. It is ok because we cannot use 'unknown'
        // in ArkTS and already have separate check for it.
        if (typeNode.kind === SyntaxKind.UnknownKeyword) {
          this.incrementCounters(callLikeExpr, FaultID.GenericCallNoTypeArgs);
          break;
        }
      }
    }
  }

  private static listApplyBindCallApis = [
    "Function.apply",
    "Function.call",
    "Function.bind",
    "CallableFunction.apply",
    "CallableFunction.call",
    "CallableFunction.bind"
  ];
  private handleFunctionApplyBindPropCall(tsCallExpr: CallExpression, calleeSym: Symbol) {
    const exprName = TypeScriptLinter.tsTypeChecker.getFullyQualifiedName(calleeSym);
    if (TypeScriptLinter.listApplyBindCallApis.includes(exprName)) {
      this.incrementCounters(tsCallExpr, FaultID.FunctionApplyBindCall);
    }
  }

  private handleStructIdentAndUndefinedInArgs(tsCallOrNewExpr: CallExpression | NewExpression, callSignature: Signature) {
    if (!tsCallOrNewExpr.arguments) {
      return;
    }

    for (let argIndex = 0; argIndex < tsCallOrNewExpr.arguments.length; ++argIndex) {
      const tsArg = tsCallOrNewExpr.arguments[argIndex];
      const tsArgType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsArg);
      if (!tsArgType) continue;

      let paramIndex = argIndex < callSignature.parameters.length ? argIndex : callSignature.parameters.length-1;
      let tsParamSym = callSignature.parameters[paramIndex];
      if (!tsParamSym) continue;

      const tsParamDecl = tsParamSym.valueDeclaration;
      if (tsParamDecl && isParameter(tsParamDecl)) {
        let tsParamType = TypeScriptLinter.tsTypeChecker.getTypeOfSymbolAtLocation(tsParamSym, tsParamDecl);
        if (tsParamDecl.dotDotDotToken && isGenericArrayType(tsParamType) && tsParamType.typeArguments) {
          tsParamType = tsParamType.typeArguments[0];
        }
        if (!tsParamType) continue;

        if (needToDeduceStructuralIdentity(tsArgType, tsParamType)) {
          this.incrementCounters(tsArg, FaultID.StructuralIdentity);
        }
      }
    }
  }

  // let re = new RegExp("^(" + arr.reduce((acc, v) => ((acc ? (acc + "|") : "") + v)) +")$")
  private static LimitedApis = new Map<string, {arr: Array<string> | null, fault: FaultID}> ([
    ["global", {arr: LIMITED_STD_GLOBAL_FUNC, fault: FaultID.LimitedStdLibApi}],
    ["Object", {arr: LIMITED_STD_OBJECT_API, fault: FaultID.LimitedStdLibApi}],
    ["ObjectConstructor", {arr: LIMITED_STD_OBJECT_API, fault: FaultID.LimitedStdLibApi}],
    ["Reflect", {arr: LIMITED_STD_REFLECT_API, fault: FaultID.LimitedStdLibApi}],
    ["ProxyHandler", {arr: LIMITED_STD_PROXYHANDLER_API, fault: FaultID.LimitedStdLibApi}],
    ["Symbol", {arr: null, fault: FaultID.SymbolType}],
    ["SymbolConstructor", {arr: null, fault: FaultID.SymbolType}],
  ])

  private handleStdlibAPICall(callExpr: CallExpression, calleeSym: Symbol) {
    const name = calleeSym.getName();
    const parName = getParentSymbolName(calleeSym);
    if (parName === undefined) {
      if (LIMITED_STD_GLOBAL_FUNC.includes(name)) {
        this.incrementCounters(callExpr, FaultID.LimitedStdLibApi);
        return;
      }
      let escapedName = calleeSym.escapedName;
      if (escapedName === 'Symbol' || escapedName === 'SymbolConstructor') {
        this.incrementCounters(callExpr, FaultID.SymbolType);
      }
      return;
    }
    let lookup = TypeScriptLinter.LimitedApis.get(parName);
    if (lookup !== undefined && (lookup.arr === null || lookup.arr.includes(name))) {
      this.incrementCounters(callExpr, lookup.fault);
    };
  }

  private findNonFilteringRangesFunctionCalls(callExpr: CallExpression): { begin: number, end: number }[] {
    let args = callExpr.arguments;
    let result: { begin: number, end: number }[] = [];
    for (const arg of args) {
      if (isArrowFunction(arg)) {
        let arrowFuncExpr = arg as ArrowFunction;
        result.push({begin: arrowFuncExpr.body.pos, end: arrowFuncExpr.body.end});
      } else if (isCallExpression(arg)) {
        result.push({begin: arg.arguments.pos, end: arg.arguments.end});
      }
      // there may be other cases
    }
    return result;
  }

  private handleLibraryTypeCall(callExpr: CallExpression, calleeType: Type) {
    let inLibCall = isLibraryType(calleeType);
    const diagnosticMessages: Array<DiagnosticMessageChain> = [];
    this.libraryTypeCallDiagnosticChecker.configure(inLibCall, diagnosticMessages);

    let nonFilteringRanges = this.findNonFilteringRangesFunctionCalls(callExpr);
    let rangesToFilter: { begin: number, end: number }[] = [];
    if (nonFilteringRanges.length !== 0) {
      let rangesSize = nonFilteringRanges.length;
      rangesToFilter.push({ begin: callExpr.arguments.pos, end: nonFilteringRanges[0].begin })
      rangesToFilter.push({ begin: nonFilteringRanges[rangesSize - 1].end, end: callExpr.arguments.end })
      for (let i = 0; i < rangesSize - 1; i++) {
        rangesToFilter.push({ begin: nonFilteringRanges[i].end, end: nonFilteringRanges[i + 1].begin })
      }
    } else {
      rangesToFilter.push({ begin: callExpr.arguments.pos, end: callExpr.arguments.end })
    }

    this.filterStrictDiagnostics({
        [ARGUMENT_OF_TYPE_0_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_ERROR_CODE]: (pos: number) => {
          return this.checkInRange([{begin: callExpr.pos, end: callExpr.end}], pos);
        },
        [NO_OVERLOAD_MATCHES_THIS_CALL_ERROR_CODE]: (pos: number) => {
          return this.checkInRange([{begin: callExpr.pos, end: callExpr.end}], pos);
        },
        [TYPE_0_IS_NOT_ASSIGNABLE_TO_TYPE_1_ERROR_CODE]: (pos: number) => {
          return this.checkInRange(rangesToFilter, pos);
        }
      },
      this.libraryTypeCallDiagnosticChecker
    );

    for (const msgChain of diagnosticMessages) {
      TypeScriptLinter.filteredDiagnosticMessages.push(msgChain);
    }
  }

  private handleNewExpression(node: Node): void {
    const tsNewExpr = node as NewExpression;
    let callSignature = TypeScriptLinter.tsTypeChecker.getResolvedSignature(tsNewExpr);
    if (callSignature !== undefined) {
      this.handleStructIdentAndUndefinedInArgs(tsNewExpr, callSignature);
      this.handleGenericCallWithNoTypeArgs(tsNewExpr, callSignature);
    }
  }

  private handleAsExpression(node: Node): void {
    const tsAsExpr = node as AsExpression;
    if (tsAsExpr.type.getText() === "const") this.incrementCounters(node, FaultID.ConstAssertion);

    const targetType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsAsExpr.type).getNonNullableType();
    const exprType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsAsExpr.expression).getNonNullableType();
    if (needToDeduceStructuralIdentity(exprType, targetType, true)) {
      this.incrementCounters(tsAsExpr, FaultID.StructuralIdentity);
    }
    // check for rule#65:   "number as Number" and "boolean as Boolean" are disabled
    if(
        (isNumberType(exprType) && targetType.getSymbol()?.getName() === "Number") ||
        (isBooleanType(exprType) && targetType.getSymbol()?.getName() === "Boolean")
    ) {
      this.incrementCounters(node, FaultID.TypeAssertion);
    }
  }

  private handleTypeReference(node: Node): void {
    const typeRef = node as TypeReferenceNode;

    const isESObject = isEsObjectType(typeRef);
    const isPossiblyValidContext = isEsObjectPossiblyAllowed(typeRef);
    if (isESObject && !isPossiblyValidContext) {
      this.incrementCounters(node, FaultID.EsObjectType);
      return;
    }
    const typeName = entityNameToString(typeRef.typeName);
    const isStdUtilityType = LIMITED_STANDARD_UTILITY_TYPES.includes(typeName);
    if (isStdUtilityType) {
      this.incrementCounters(node, FaultID.UtilityType);
      return;
    }

    // Using Partial<T> type is allowed only when its argument type is either Class or Interface.
    const isStdPartial = entityNameToString(typeRef.typeName) === 'Partial';
    const hasSingleTypeArgument = !!typeRef.typeArguments && typeRef.typeArguments.length === 1;
    const firstTypeArg = !!typeRef.typeArguments && hasSingleTypeArgument && typeRef.typeArguments[0];
    const argType = firstTypeArg && TypeScriptLinter.tsTypeChecker.getTypeFromTypeNode(firstTypeArg);
    if (isStdPartial && argType && !argType.isClassOrInterface()) {
      this.incrementCounters(node, FaultID.UtilityType);
      return;
    }
  }

  private handleMetaProperty(node: Node): void {
    const tsMetaProperty = node as MetaProperty;
    if (tsMetaProperty.name.text === "target") {
      this.incrementCounters(node, FaultID.NewTarget);
    }
  }

  private handleStructDeclaration(node: Node): void {
    node.forEachChild(child => {
      // Skip synthetic constructor in Struct declaration.
      if (!isConstructorDeclaration(child)) this.visitTSNode(child);
    });
  }

  private handleSpreadOp(node: Node) {
    // spread assignment is disabled
    // spread element is allowed only for arrays as rest parameter
    if (isSpreadElement(node)) {
      const spreadElemNode = node;
      const spreadExprType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(spreadElemNode.expression);
      if (spreadExprType) {
        const spreadExprTypeNode = TypeScriptLinter.tsTypeChecker.typeToTypeNode(spreadExprType, undefined, NodeBuilderFlags.None);
        if (spreadExprTypeNode !== undefined &&
              (isCallLikeExpression(node.parent) || isArrayLiteralExpression(node.parent))) {
          if (isArrayTypeNode(spreadExprTypeNode) ||
              isTypedArray(spreadExprTypeNode) ||
              isDerivedFrom(spreadExprType, CheckType.Array)) {
            return;
          }
        }
      }
    }
    this.incrementCounters(node, FaultID.SpreadOperator);
  }

  private handleConstructSignature(node: Node) {
    switch (node.parent.kind) {
      case SyntaxKind.TypeLiteral:
        this.incrementCounters(node, FaultID.ConstructorType);
        break;
      case SyntaxKind.InterfaceDeclaration:
        this.incrementCounters(node, FaultID.ConstructorIface);
        break;
      default:
        return;
    }
  }

  private handleComments(node: Node) {
    // Note: Same comment may be owned by several nodes if their
    // start/end position matches. Thus, look for the most parental
    // owner of the specific comment (by the node's position).
    const srcText = node.getSourceFile().getFullText();

    const parent = node.parent;
    if (!parent || parent.getFullStart() !== node.getFullStart()) {
      const leadingComments = getLeadingCommentRanges(srcText, node.getFullStart());
      if (leadingComments) {
        for (const comment of leadingComments) {
          this.checkErrorSuppressingAnnotation(comment, srcText);
        }
      }
    }

    if (!parent || parent.getEnd() !== node.getEnd()) {
      const trailingComments = getTrailingCommentRanges(srcText, node.getEnd());
      if (trailingComments) {
        for (const comment of trailingComments) {
          this.checkErrorSuppressingAnnotation(comment, srcText);
        }
      }
    }
  }

  private handleExpressionWithTypeArguments(node: Node) {
    const tsTypeExpr = node as ExpressionWithTypeArguments;
    const symbol = trueSymbolAtLocation(tsTypeExpr.expression);
    if (!!symbol && isEsObjectSymbol(symbol)) {
      this.incrementCounters(tsTypeExpr, FaultID.EsObjectType);
    }
  }

  private handleComputedPropertyName(node: Node) {
    const computedProperty = node as ComputedPropertyName;
    const symbol = trueSymbolAtLocation(computedProperty.expression);
    if (!!symbol && isSymbolIterator(symbol)) {
      return;
    }
    this.incrementCounters(node, FaultID.ComputedPropertyName);
  }

  private checkErrorSuppressingAnnotation(comment: CommentRange, srcText: string) {
    const commentContent = comment.kind === SyntaxKind.MultiLineCommentTrivia
      ? srcText.slice(comment.pos + 2, comment.end - 2)
      : srcText.slice(comment.pos + 2, comment.end);
    // if comment is multiline end closing '*/' is not at the same line as '@ts-xxx' - do nothing (#13851)
    if (commentContent.endsWith('\n')) {
      return
    }
    const trimmedContent = commentContent.trim();
    if (trimmedContent.startsWith("@ts-ignore") ||
        trimmedContent.startsWith("@ts-nocheck") ||
        trimmedContent.startsWith("@ts-expect-error")) {
      this.incrementCounters(comment, FaultID.ErrorSuppression);
    }
  }

  private handleDecorators(decorators: readonly Decorator[] | undefined): void {
    if (!decorators) return;

    for (const decorator of decorators) {
      let decoratorName = "";
      if (isIdentifier(decorator.expression)) {
        decoratorName = decorator.expression.text;
      }
      else if (isCallExpression(decorator.expression) && isIdentifier(decorator.expression.expression)) {
        decoratorName = decorator.expression.expression.text;
      }
      if (!ARKUI_DECORATORS.includes(decoratorName)) {
        this.incrementCounters(decorator, FaultID.UnsupportedDecorators);
      }
    }
  }

  private handleGetAccessor(node: Node) {
    this.handleDecorators(getDecorators(node as GetAccessorDeclaration));
  }

  private handleSetAccessor(node: Node) {
    this.handleDecorators(getDecorators(node as SetAccessorDeclaration));
  }

  private handleDeclarationInferredType(
    decl: VariableDeclaration | PropertyDeclaration | ParameterDeclaration
    ) {
    // The type is explicitly specified, no need to check inferred type.
    if (decl.type) return;

    // issue 13161:
    // In TypeScript, the catch clause variable must be 'any' or 'unknown' type. Since
    // ArkTS doesn't support these types, the type for such variable is simply omitted,
    // and we don't report it as an error.
    if (isCatchClause(decl.parent)) return;

    //Destructuring declarations are not supported, do not process them.
    if (isArrayBindingPattern(decl.name) || isObjectBindingPattern(decl.name)) return;

    const type = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(decl);
    if (type) this.validateDeclInferredType(type, decl);
  }

  private handleDefiniteAssignmentAssertion(decl: VariableDeclaration | PropertyDeclaration) {
    if (decl.exclamationToken !== undefined) {
      this.incrementCounters(decl, FaultID.DefiniteAssignment);
    }
  }

  private validatedTypesSet = new Set<Type>();

private checkAnyOrUnknownChildNode(node: Node): boolean {
  if (node.kind === SyntaxKind.AnyKeyword ||
      node.kind === SyntaxKind.UnknownKeyword) {
    return true;
  }
  const isAnyOrUnknown = forEachChild(node, (child) => {
    if (this.checkAnyOrUnknownChildNode(child)) {
      return true;
    }
    return undefined;
  });
  return !!isAnyOrUnknown;
}

  private handleInferredObjectreference(
    type: Type,
    decl: VariableDeclaration | PropertyDeclaration | ParameterDeclaration
    ) {
    const typeArgs = TypeScriptLinter.tsTypeChecker.getTypeArguments(type as TypeReference);
    if (typeArgs) {
      const haveAnyOrUnknownNodes = this.checkAnyOrUnknownChildNode(decl);
      if (!haveAnyOrUnknownNodes) {
        for (const typeArg of typeArgs) {
          this.validateDeclInferredType(typeArg, decl);
        }
      }
    }
  }

  private validateDeclInferredType(
    type: Type,
    decl: VariableDeclaration | PropertyDeclaration | ParameterDeclaration
    ): void {
    if (type.aliasSymbol !== undefined) {
      return;
    }
    const isObject = type.flags & TypeFlags.Object;
    const isReference = (type as ObjectType).objectFlags & ObjectFlags.Reference;
    if (isObject && isReference) {
      this.handleInferredObjectreference(type, decl);
      return;
    }
    if (this.validatedTypesSet.has(type)) {
      return;
    }
    if (type.isUnion()) {
      this.validatedTypesSet.add(type);
      for (let unionElem of type.types) {
        this.validateDeclInferredType(unionElem, decl);
      }
    }

    if (isAnyType(type)) {
      this.incrementCounters(decl, FaultID.AnyType);
    }
    else if (isUnknownType(type)) {
      this.incrementCounters(decl, FaultID.UnknownType);
    }
  }

  private handleClassStaticBlockDeclaration(node: Node): void {
    if (this.skipArkTSStaticBlocksCheck) {
      return;
    }
    const classStaticBlockDecl = node as ClassStaticBlockDeclaration;
    if (!isClassDeclaration(classStaticBlockDecl.parent)) {
      return;
    }
    if (this.functionContainsThis(node)) {
      this.incrementCounters(node, FaultID.FunctionContainsThis);
    }
  }

  public lint(): void {
    this.visitTSNode(this.sourceFile);
  }

}