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
    ArrayLiteralExpression, ArrowFunction, AsExpression, BinaryExpression, BindingName, Block, CallExpression,
    CatchClause, ClassDeclaration, ClassStaticBlockDeclaration, CommentRange, ComputedPropertyName, ConciseBody,
    Declaration, Decorator, Diagnostic, DiagnosticCategory, DiagnosticMessageChain, ElementAccessExpression, EnumDeclaration, EnumMember,
    ESMap, ExportAssignment, ExportDeclaration, Expression, ExpressionWithTypeArguments, forEachChild, ForInStatement,
    ForOfStatement, ForStatement, FunctionDeclaration, FunctionExpression, FunctionLikeDeclaration,
    GetAccessorDeclaration, getCombinedNodeFlags, getDecorators, getModifiers, HeritageClause, Identifier, ImportClause,
    ImportDeclaration, ImportSpecifier, IndexSignatureDeclaration, InterfaceDeclaration, isAccessor,
    isArrayBindingPattern, isArrayLiteralExpression, isArrowFunction, isBinaryExpression, isBlock, isCallExpression,
    isCallLikeExpression, isCatchClause, isClassDeclaration, isClassExpression, isClassLike,
    isClassStaticBlockDeclaration, isConstructorDeclaration, isDecorator, isElementAccessExpression, isEnumDeclaration,
    isExportAssignment, isExportSpecifier, isExpressionWithTypeArguments, isFunctionDeclaration, isFunctionExpression,
    isFunctionTypeNode, isIdentifier, isImportClause, isImportDeclaration, isImportEqualsDeclaration, isImportSpecifier,
    isInterfaceDeclaration, isMetaProperty, isMethodDeclaration, isMethodSignature, isModuleBlock, isModuleDeclaration,
    isNamespaceExport, isNamespaceImport, isNewExpression, isNumericLiteral, isObjectBindingPattern,
    isObjectLiteralExpression, isOmittedExpression, isParameter, isPrivateIdentifier, isPropertyAccessExpression,
    isPropertyAssignment, isPropertyDeclaration, isQualifiedName, isReturnStatement, isShorthandPropertyAssignment,
    isSourceFile, isSpreadElement, isStringLiteral, isTypeAliasDeclaration, isTypeNode, isTypeOfExpression,
    isTypeReferenceNode, isUnionTypeNode, isVariableDeclaration, isVariableStatement, Map, MetaProperty,
    MethodDeclaration, MethodSignature, ModuleDeclaration, NamedDeclaration, NamespaceImport, NewExpression, Node,
    NodeArray, NodeBuilderFlags, NodeFlags, normalizePath, ObjectFlags, ObjectLiteralExpression,
    ObjectType, ParameterDeclaration, PerformanceDotting, PragmaPseudoMap, PrefixUnaryExpression, Program, PropertyAccessExpression,
    PropertyAssignment, PropertyDeclaration, PropertySignature, ReturnStatement, ScriptKind, Set,
    SetAccessorDeclaration, Signature, SourceFile, Symbol, SymbolFlags, SyntaxKind, TextRange, ThrowStatement, Type,
    TypeAliasDeclaration, TypeAssertion, TypeChecker, TypeFlags, TypeNode, TypeParameterDeclaration, TypeReference,
    TypeReferenceNode, VariableDeclaration, VariableStatement, HasDecorators
} from "../_namespaces/ts";

import { 
  LibraryTypeCallDiagnosticChecker, autofixInfo, cookBookTag, cookBookMsg, ErrorType, FaultID, faultsAttrs, LinterConfig,
  fixLiteralAsPropertyName, shouldAutofix, fixFunctionExpression, fixReturnType, fixPropertyAccessByIndex, Autofix, ProblemSeverity,
  symbolHasDuplicateName, trueSymbolAtLocation, isLibrarySymbol, isAnyType, isPrototypeSymbol, isTypeSymbol, isFunctionSymbol,
  isDestructuringAssignmentLHS, isStructObjectInitializer, isDynamicLiteralInitializer, hasModifier, isSymbolAPI,
  ALLOWED_STD_SYMBOL_API, isStdRecordType, NON_INITIALIZABLE_PROPERTY_DECORATORS, PROPERTY_HAS_NO_INITIALIZER_ERROR_CODE,
  hasPredecessor, isLibraryType, isUnsupportedType, isCallToFunctionWithOmittedReturnType, unwrapParenthesized, isIntegerConstantValue, isAssignmentOperator,
  isMethodAssignment, isPrimitiveType, needToDeduceStructuralIdentity, getVariableDeclarationTypeNode, isEsObjectType, NON_RETURN_FUNCTION_DECORATORS,
  FUNCTION_HAS_NO_RETURN_ERROR_CODE, hasLibraryType, isStruct, isGenericArrayType, isValidEnumMemberInit, isInterfaceType, LIMITED_STD_GLOBAL_FUNC,
  LIMITED_STD_OBJECT_API, LIMITED_STD_REFLECT_API, LIMITED_STD_PROXYHANDLER_API, getParentSymbolName, entityNameToString, LIMITED_STANDARD_UTILITY_TYPES,
  isEsObjectSymbol, isUnknownType, getHighlightRange, isStructDeclaration, typeContainsSendableClassOrInterface, isObjectLiteralAssignable,
  getDecoratorsIfInSendableClass, isOhModulesEtsSymbol, isOrDerivedFrom, isStdErrorType, isSendableFunction, hasSendableTypeAlias,
  NON_INITIALIZABLE_PROPERTY_CLASS_DECORATORS, hasSendableDecorator, isSendableTypeNode, unwrapParenthesizedTypeNode, getDeclaration, checkTypeSet,
  isSendableClassOrInterface, getDecoratorName, hasSendableDecoratorFunctionOverload, getNonSendableDecorators, isStdBigIntType, isStdNumberType,
  isConstEnum, searchFileExportDecl, reduceReference, isArkTSCollectionsArrayLikeType, isNumberLikeType, isArray, isTuple,
  isIndexableArray, isIntrinsicObjectType, isEnumType, isStringType, isStdMapType, getNonNullableType, getTypeOrTypeConstraintAtLocation,
  isShareableEntity, isBooleanLikeType, isStdBooleanType, isObject, isWrongSendableFunctionAssignment, isSymbolIteratorExpression,
  isArkTSCollectionsClassOrInterfaceDeclaration, isValidComputedPropertyName, isShareableType, needStrictMatchType, SENDABLE_DECORATOR,
  SENDABLE_DECORATOR_NODES, getSendableDecorator, isAllowedIndexSignature, PROMISE, isCollectionArrayType, isTaskPoolApi, 
  isDeclarationSymbol, checkTaskpoolFunction, getTypeAtLocationForLinter, isArkUIDecorator, isDisableSendableClassDecoratorCheck
} from "../_namespaces/ts.ArkTSLinter_1_1";
import * as ArkTSLinter_1_1 from "../_namespaces/ts.ArkTSLinter_1_1";
import { perfLogger as Logger } from "../_namespaces/ts";
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
  static sharedModulesCache: ESMap<string, boolean>;
  static strictDiagnosticCache: Set<Diagnostic>;
  static unknowDiagnosticCache: Set<Diagnostic>;
  static disableSendableClassDecoratorCheck: boolean = false;

  public static initGlobals(compilerOptions: ts.CompilerOptions): void {
    TypeScriptLinter.filteredDiagnosticMessages = []
    TypeScriptLinter.sharedModulesCache = new Map<string, boolean>();
    TypeScriptLinter.strictDiagnosticCache = new Set<Diagnostic>();
    TypeScriptLinter.unknowDiagnosticCache = new Set<Diagnostic>();
    TypeScriptLinter.disableSendableClassDecoratorCheck =
      isDisableSendableClassDecoratorCheck(compilerOptions.disableSendableCheckRules || []);
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
    skipArkTSStaticBlocksCheck: boolean;
    private fileExportDeclCaches?: Set<Node>;
    private compatibleSdkVersionStage: string = 'beta1';
    private compatibleSdkVersion: number = 12;
    private mixCompile: boolean = false;
    private enableStrictCheckOHModule: boolean = false;

  constructor(private sourceFile: SourceFile,
              /* private */ tsProgram: Program,
              private tscStrictDiagnostics?: Map<Diagnostic[]>) {
    TypeScriptLinter.tsTypeChecker = tsProgram.getLinterTypeChecker();
    this.currentErrorLine = 0;
    this.currentWarningLine = 0;
    this.staticBlocks = new Set<string>();

    const options = tsProgram.getCompilerOptions();
    this.skipArkTSStaticBlocksCheck = false;
    this.mixCompile = !!options.mixCompile;
    this.enableStrictCheckOHModule = !!options.enableStrictCheckOHModule;
    if (options.skipArkTSStaticBlocksCheck) {
      this.skipArkTSStaticBlocksCheck = options.skipArkTSStaticBlocksCheck as boolean;
    }
    if (options.compatibleSdkVersion) {
      this.compatibleSdkVersion = options.compatibleSdkVersion;
    }
    if (options.compatibleSdkVersionStage) {
      this.compatibleSdkVersionStage = options.compatibleSdkVersionStage;
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

readonly handlersMap = new Map([
  [SyntaxKind.ObjectLiteralExpression, {handler: this.handleObjectLiteralExpression, name: 'handleObjectLiteralExpression'}],
  [SyntaxKind.ArrayLiteralExpression, {handler: this.handleArrayLiteralExpression, name: 'handleArrayLiteralExpression'}],
  [SyntaxKind.Parameter, {handler: this.handleParameter, name: 'handleParameter'}],
  [SyntaxKind.EnumDeclaration, {handler: this.handleEnumDeclaration, name: 'handleEnumDeclaration'}],
  [SyntaxKind.InterfaceDeclaration, {handler: this.handleInterfaceDeclaration, name: 'handleInterfaceDeclaration'}],
  [SyntaxKind.ThrowStatement, {handler: this.handleThrowStatement, name: 'handleThrowStatement'}],
  [SyntaxKind.ImportClause, {handler: this.handleImportClause, name: 'handleImportClause'}],
  [SyntaxKind.ForStatement, {handler: this.handleForStatement, name: 'handleForStatement'}],
  [SyntaxKind.ForInStatement, {handler: this.handleForInStatement, name: 'handleForInStatement'}],
  [SyntaxKind.ForOfStatement, {handler: this.handleForOfStatement, name: 'handleForOfStatement'}],
  [SyntaxKind.ImportDeclaration, {handler: this.handleImportDeclaration, name: 'handleImportDeclaration'}],
  [SyntaxKind.PropertyAccessExpression, {handler: this.handlePropertyAccessExpression, name: 'handlePropertyAccessExpression'}],
  [SyntaxKind.PropertyDeclaration, {handler: this.handlePropertyDeclaration, name: 'handlePropertyDeclaration'}],
  [SyntaxKind.PropertyAssignment, {handler: this.handlePropertyAssignment, name: 'handlePropertyAssignment'}],
  [SyntaxKind.PropertySignature, {handler: this.handlePropertySignature, name: 'handlePropertySignature'}],
  [SyntaxKind.FunctionExpression, {handler: this.handleFunctionExpression, name: 'handleFunctionExpression'}],
  [SyntaxKind.ArrowFunction, {handler: this.handleArrowFunction, name: 'handleArrowFunction'}],
  [SyntaxKind.CatchClause, {handler: this.handleCatchClause, name: 'handleCatchClause'}],
  [SyntaxKind.FunctionDeclaration, {handler: this.handleFunctionDeclaration, name: 'handleFunctionDeclaration'}],
  [SyntaxKind.PrefixUnaryExpression, {handler: this.handlePrefixUnaryExpression, name: 'handlePrefixUnaryExpression'}],
  [SyntaxKind.BinaryExpression, {handler: this.handleBinaryExpression, name: 'handleBinaryExpression'}],
  [SyntaxKind.VariableDeclarationList, {handler: this.handleVariableDeclarationList, name: 'handleVariableDeclarationList'}],
  [SyntaxKind.VariableDeclaration, {handler: this.handleVariableDeclaration, name: 'handleVariableDeclaration'}],
  [SyntaxKind.ClassDeclaration, {handler: this.handleClassDeclaration, name: 'handleClassDeclaration'}],
  [SyntaxKind.ModuleDeclaration, {handler: this.handleModuleDeclaration, name: 'handleModuleDeclaration'}],
  [SyntaxKind.TypeAliasDeclaration, {handler: this.handleTypeAliasDeclaration, name: 'handleTypeAliasDeclaration'}],
  [SyntaxKind.ImportSpecifier, {handler: this.handleImportSpecifier, name: 'handleImportSpecifier'}],
  [SyntaxKind.NamespaceImport, {handler: this.handleNamespaceImport, name: 'handleNamespaceImport'}],
  [SyntaxKind.TypeAssertionExpression, {handler: this.handleTypeAssertionExpression, name: 'handleTypeAssertionExpression'}],
  [SyntaxKind.MethodDeclaration, {handler: this.handleMethodDeclaration, name: 'handleMethodDeclaration'}],
  [SyntaxKind.MethodSignature, {handler: this.handleMethodSignature, name: 'handleMethodSignature'}],
  [SyntaxKind.Identifier, {handler: this.handleIdentifier, name: 'handleIdentifier'}],
  [SyntaxKind.ElementAccessExpression, {handler: this.handleElementAccessExpression, name: 'handleElementAccessExpression'}],
  [SyntaxKind.EnumMember, {handler: this.handleEnumMember, name: 'handleEnumMember'}],
  [SyntaxKind.TypeReference, {handler: this.handleTypeReference, name: 'handleTypeReference'}],
  [SyntaxKind.ExportAssignment, {handler: this.handleExportAssignment, name: 'handleExportAssignment'}],
  [SyntaxKind.CallExpression, {handler: this.handleCallExpression, name: 'handleCallExpression'}],
  [SyntaxKind.MetaProperty, {handler: this.handleMetaProperty, name: 'handleMetaProperty'}],
  [SyntaxKind.NewExpression, {handler: this.handleNewExpression, name: 'handleNewExpression'}],
  [SyntaxKind.AsExpression, {handler: this.handleAsExpression, name: 'handleAsExpression'}],
  [SyntaxKind.SpreadElement, {handler: this.handleSpreadOp, name: 'handleSpreadOp'}],
  [SyntaxKind.SpreadAssignment, {handler: this.handleSpreadOp, name: 'handleSpreadOp'}],
  [SyntaxKind.GetAccessor, {handler: this.handleGetAccessor, name: 'handleGetAccessor'}],
  [SyntaxKind.SetAccessor, {handler: this.handleSetAccessor, name: 'handleSetAccessor'}],
  [SyntaxKind.ConstructSignature, {handler: this.handleConstructSignature, name: 'handleConstructSignature'}],
  [SyntaxKind.ExpressionWithTypeArguments, {handler: this.handleExpressionWithTypeArguments, name: 'handleExpressionWithTypeArguments'}],
  [SyntaxKind.ComputedPropertyName, {handler: this.handleComputedPropertyName, name: 'handleComputedPropertyName'}],
  [SyntaxKind.EtsComponentExpression, {handler: this.handleEtsComponentExpression, name: 'handleEtsComponentExpression'}],
  [SyntaxKind.ClassStaticBlockDeclaration, {handler: this.handleClassStaticBlockDeclaration, name: 'handleClassStaticBlockDeclaration'}],
  [SyntaxKind.IndexSignature, {handler: this.handleIndexSignature, name: 'handleIndexSignature'}],
  [SyntaxKind.ExportKeyword, {handler: this.handleExportKeyword, name: 'handleExportKeyword'}],
  [SyntaxKind.ExportDeclaration, {handler: this.handleExportDeclaration, name: 'handleExportDeclaration'}],
  [SyntaxKind.ReturnStatement, {handler: this.handleReturnStatement, name: 'handleReturnStatement'}],
  [SyntaxKind.Decorator, {handler: this.handleDecorator, name: 'handleDecorator'}]
]);

  public incrementCounters(node: Node | CommentRange, faultId: number, autofixable = false, autofix?: Autofix[]): void {
    if (!TypeScriptLinter.strictMode && faultsAttrs[faultId].migratable) { return; } // In relax mode skip migratable

    const [startOffset, endOffset] = getHighlightRange(node, faultId);
    const startPos = this.sourceFile!.getLineAndCharacterOfPosition(startOffset);
    const line = startPos.line + 1;
    const character = startPos.character + 1;

    TypeScriptLinter.nodeCounters[faultId]++;

    const faultDescr = LinterConfig.nodeDesc[faultId];
    const faultType = "unknown"; //TypeScriptLinter.tsSyntaxKindNames[node.kind];

    const cookBookMsgNum = faultsAttrs[faultId] ? faultsAttrs[faultId].cookBookRef : 0;
    const cookBookTg = cookBookTag[cookBookMsgNum];
    const severity = faultsAttrs[faultId]?.severity ?? ProblemSeverity.ERROR;
    const badNodeInfo: ProblemInfo = {
      line: line,
      column: character,
      start: startOffset,
      end: endOffset,
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

    switch (faultsAttrs[faultId].severity) {
      case ProblemSeverity.ERROR: {
        this.currentErrorLine = line;
        ++TypeScriptLinter.totalErrorLines;
        TypeScriptLinter.errorLineNumbersString += line + ', ';
        break;
      }
      case ProblemSeverity.WARNING: {
        if (line === this.currentWarningLine) {
          break;
        }
        this.currentWarningLine = line;
        ++TypeScriptLinter.totalWarningLines;
        TypeScriptLinter.warningLineNumbersString += line + ', ';
        break;
      }
    }
  }

  private forEachNodeInSubtree(node: Node, cb: (n: Node) => void, stopCond?: (n: Node) => boolean): void {
    cb.call(this, node);
    if (stopCond?.call(this, node)) {
      return;
    }
    forEachChild(node, (child) => {
      this.forEachNodeInSubtree(child, cb, stopCond);
    });
  }

  private visitSourceFile(sf: SourceFile): void {
    const fileName = sf.fileName;
    const callback = (node: Node): void => {
      TypeScriptLinter.totalVisitedNodes++;
      const incrementedType = LinterConfig.incrementOnlyTokens.get(node.kind);
      if (incrementedType !== undefined) {
        this.incrementCounters(node, incrementedType);
      }
      else {
        const handler = this.handlersMap.get(node.kind);
        if (handler !== undefined) {
          PerformanceDotting.start(handler.name, fileName);
          handler.handler.call(this, node);
          PerformanceDotting.stop(handler.name);
        }
      }
    };
    const stopCondition = (node: Node): boolean => {
      if (node === null || node.kind === null) {
        return true;
      }
      // Skip synthetic constructor in Struct declaration.
      if (node.parent && isStructDeclaration(node.parent) && isConstructorDeclaration(node)) {
        return true;
      }
      if (LinterConfig.terminalTokens.has(node.kind)) {
        return true;
      }
      return false;
    };
    this.forEachNodeInSubtree(sf, callback, stopCondition);
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

  private static scopeContainsThis(tsNode: Expression | Block): boolean {
    function scopeContainsThisVisitor(tsNode: Node): boolean {
      if (tsNode.kind === SyntaxKind.ThisKeyword) {
        return true;
      }

      // Visit children nodes. Skip any local declaration that defines
      // its own scope as it needs to be checked separately.
      const isClassLike = isClassDeclaration(tsNode) || isClassExpression(tsNode);
      const isFunctionLike = isFunctionDeclaration(tsNode) || isFunctionExpression(tsNode);
      const isModuleDecl = isModuleDeclaration(tsNode);
      if (isClassLike || isFunctionLike || isModuleDecl) {
        return false;
      }

      const isContain = forEachChild(tsNode, (child) => {
        if (scopeContainsThisVisitor(child)) {
          return true;
        }
        return undefined;
      });
      return !!isContain;
    }

    return scopeContainsThisVisitor(tsNode);
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
      const type = getTypeAtLocationForLinter(curPropAccess);
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
      baseExprType, undefined, NodeBuilderFlags.AllowEmptyTuple
    );

    return ((baseExprTypeNode && isFunctionTypeNode(baseExprTypeNode)) || isAnyType(baseExprType));
  }

  private interfaceInheritanceLint(node: Node, heritageClauses: NodeArray<HeritageClause>): void {
    for (const hClause of heritageClauses) {
      if (hClause.token !== SyntaxKind.ExtendsKeyword) continue;

      const prop2type = new Map<string, string>();
      for (const tsTypeExpr of hClause.types) {
        const tsExprType = getTypeAtLocationForLinter(tsTypeExpr.expression);
        if (tsExprType.isClass()) {
          this.incrementCounters(tsTypeExpr, FaultID.InterfaceExtendsClass);
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
    if (objectLiteralType && typeContainsSendableClassOrInterface(objectLiteralType)) {
      this.incrementCounters(node, FaultID.SendableObjectInitialization);
    } else if (
      // issue 13082: Allow initializing struct instances with object literal.
      !isStructObjectInitializer(objectLiteralExpr) &&
      !isDynamicLiteralInitializer(objectLiteralExpr) &&
      !isObjectLiteralAssignable(objectLiteralType, objectLiteralExpr)
    ) {
      this.incrementCounters(node, FaultID.ObjectLiteralNoContextType);
    }
    if (this.mixCompile) {
      this.handleUnionTypeObjectLiteral(objectLiteralType, objectLiteralExpr);
    }
  }

  private handleUnionTypeObjectLiteral(lhsType: ts.Type | undefined, rhsExpr: ts.ObjectLiteralExpression): void {
    if (!TypeScriptLinter.tsTypeChecker.isStaticSourceFile) {
      return;
    }

    if (lhsType === undefined) {
      return;
    }

    lhsType = getNonNullableType(lhsType);
    if (!lhsType.isUnion()) {
      return;
    }

    const rhsType = getTypeAtLocationForLinter(rhsExpr);
    let assignableTypesCount: number = 0;
    let typeInArkts2: boolean = false;
    for (const compType of lhsType.types) {
      const comTypeSorceFile = this.getSourceFileFromType(compType);
      if (TypeScriptLinter.tsTypeChecker.isTypeAssignableTo(rhsType, compType) &&
        isObjectLiteralAssignable(compType, rhsExpr)) {
        assignableTypesCount = assignableTypesCount + 1;
        if (TypeScriptLinter.tsTypeChecker.isStaticSourceFile(comTypeSorceFile)) {
          typeInArkts2 = true;
        }
      }
    }

    if (assignableTypesCount >= 2 && typeInArkts2) {
      this.incrementCounters(rhsExpr, FaultID.ObjectLiteralAmbiguity);
    }
  }

  private getSourceFileFromType(type: ts.Type): SourceFile | undefined {
    const symbol = type.getSymbol();
    if (symbol) {
      const declaration = symbol.valueDeclaration || symbol.declarations?.[0];
      if (declaration && declaration.getSourceFile) {
        return declaration.getSourceFile();
      }
    }
    
    const constructSignatures = type.getConstructSignatures();
    if (constructSignatures.length > 0) {
      const declaration = constructSignatures[0].declaration;
      if (declaration && declaration.getSourceFile) {
        return declaration.getSourceFile();
      }
    }
    
    const callSignatures = type.getCallSignatures();
    if (callSignatures.length > 0) {
      const declaration = callSignatures[0].declaration;
      if (declaration && declaration.getSourceFile) {
        return declaration.getSourceFile();
      }
    }
    return undefined;
  }

  private handleArrayLiteralExpression(node: Node): void {
    // If array literal is a part of destructuring assignment, then
    // don't process it further.
    if (isDestructuringAssignmentLHS(node as ArrayLiteralExpression)) {
      return;
    }

    const arrayLitNode = node as ArrayLiteralExpression;
    let noContextTypeForArrayLiteral = false;

    const arrayLitType = TypeScriptLinter.tsTypeChecker.getContextualType(arrayLitNode);
    if (arrayLitType && typeContainsSendableClassOrInterface(arrayLitType)) {
      this.incrementCounters(node, FaultID.SendableObjectInitialization);
      return;
    }

    // check that array literal consists of inferrable types
    // e.g. there is no element which is untyped object literals
    const arrayLitElements = arrayLitNode.elements;
    for(const element of arrayLitElements) {
      const elementContextType = TypeScriptLinter.tsTypeChecker.getContextualType(element);
      if(element.kind === SyntaxKind.ObjectLiteralExpression) {
        if (!isDynamicLiteralInitializer(arrayLitNode) &&
            !isObjectLiteralAssignable(elementContextType, element as ObjectLiteralExpression)) {
          noContextTypeForArrayLiteral = true;
          break;
        }
      }
      if (elementContextType) {
        this.checkAssignmentMatching(element, elementContextType, element, true);
      }
    }

    if (noContextTypeForArrayLiteral) {
      this.incrementCounters(node, FaultID.ArrayLiteralNoContextType);
    }
  }

  private handleParameter(node: Node): void {
    const tsParam = node as ParameterDeclaration;

    this.handleDecoratorsSendableClass(tsParam);

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

    this.handleDeclarationInferredType(tsParam);
  }

  private handleDecoratorsSendableClass(declaration: HasDecorators): void {
    const decorators: readonly Decorator[] | undefined = getDecoratorsIfInSendableClass(declaration);
    this.handleSendableClassDecorators(decorators);
  }

  private handleSendableClassDecorators(decorators: readonly Decorator[] | undefined): void {
    const decoratorsToCheck = TypeScriptLinter.disableSendableClassDecoratorCheck
      ? decorators?.filter(isArkUIDecorator) : decorators;
    decoratorsToCheck?.forEach(decorator => {
      this.incrementCounters(decorator, FaultID.SendableClassDecorator);
    });
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
    const throwExprType = getTypeAtLocationForLinter(throwStmt.expression);
    if (!throwExprType.isClassOrInterface() || !isOrDerivedFrom(throwExprType, isStdErrorType)) {
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
      if (importDeclNode.assertClause) {
        this.incrementCounters(importDeclNode.assertClause, FaultID.ImportAssertion);
      }
    }

    //handle no side effect import in sendable module
    this.handleSharedModuleNoSideEffectImport(importDeclNode);
  }


  private handleSharedModuleNoSideEffectImport(node : ImportDeclaration): void {
    //check 'use shared'
    if (TypeScriptLinter.inSharedModule(node) && !node.importClause) {
      this.incrementCounters(node, FaultID.SharedNoSideEffectImport);
    }
  }

  private static inSharedModule(node: Node): boolean {
    const sourceFile: SourceFile = node.getSourceFile();
    const modulePath = normalizePath(sourceFile.fileName);
    if (TypeScriptLinter.sharedModulesCache.has(modulePath)) {
      return TypeScriptLinter.sharedModulesCache.get(modulePath)!;
    }
    const isSharedModule: boolean = ArkTSLinter_1_1.isSharedModule(sourceFile);
    TypeScriptLinter.sharedModulesCache.set(modulePath, isSharedModule);
    return isSharedModule;
  }

  private handlePropertyAccessExpression(node: Node): void {
    if (isCallExpression(node.parent) && node === node.parent.expression) {
      return;
    }

    const propertyAccessNode = node as PropertyAccessExpression;
    const exprSym = trueSymbolAtLocation(propertyAccessNode);
    const baseExprSym = trueSymbolAtLocation(propertyAccessNode.expression);
    const baseExprType = getTypeAtLocationForLinter(propertyAccessNode.expression);
    if (this.isPrototypePropertyAccess(propertyAccessNode, exprSym, baseExprSym, baseExprType)) {
      this.incrementCounters(propertyAccessNode.name, FaultID.Prototype);
    }
    if (!!exprSym && isSymbolAPI(exprSym) && !ALLOWED_STD_SYMBOL_API.includes(exprSym.getName())) {
      this.incrementCounters(propertyAccessNode, FaultID.SymbolType);
    }
    if (isSendableFunction(baseExprType) || hasSendableTypeAlias(baseExprType)) {
      this.incrementCounters(propertyAccessNode, FaultID.SendableFunctionProperty);
    }if (isDeclarationSymbol(exprSym) && isTaskPoolApi(exprSym, node)) {
      this.handleTaskpooApiForNewExpression(node.parent);
    }
  }

  private handleTaskpooApiForNewExpression(node: Node): void {
    const tsNewExpr = node as NewExpression;
    const args = tsNewExpr.arguments || [];
    for (let i = 0; i < Math.min(args.length, 2); i++) {
      const arg = args[i];
      const argType = getTypeAtLocationForLinter(arg);
      if (ArkTSLinter_1_1.isStringLikeType(argType)) {
        continue;
      }
      const argSym = argType.getSymbol();
      if (checkTaskpoolFunction(arg, argType, argSym)) {
        this.incrementCounters(arg, FaultID.TaskpoolFunctionArg);
      }
      break;
    }
  }

  private handlePropertyDeclaration(node: PropertyDeclaration) {
    const propName = node.name;
    if (!!propName && isNumericLiteral(propName)) {
      let autofix: Autofix[] | undefined = fixLiteralAsPropertyName(node);
      const autofixable = autofix !== undefined;
      if (!shouldAutofix(node, FaultID.LiteralAsPropertyName)) {
        autofix = undefined;
      }
      this.incrementCounters(node.name, FaultID.LiteralAsPropertyName, autofixable, autofix);
    }
    const decorators = getDecorators(node);
    this.filterOutDecoratorsDiagnostics(decorators, NON_INITIALIZABLE_PROPERTY_DECORATORS,
      {begin: propName.getStart(), end: propName.getStart()},
      PROPERTY_HAS_NO_INITIALIZER_ERROR_CODE);

    const classDecorators = getDecorators(node.parent);
    const propType = (node as PropertyDeclaration).type?.getText();
    this.filterOutDecoratorsDiagnostics(classDecorators, NON_INITIALIZABLE_PROPERTY_CLASS_DECORATORS,
      {begin: propName.getStart(), end: propName.getStart()}, PROPERTY_HAS_NO_INITIALIZER_ERROR_CODE, propType);
    if (node.type && node.initializer) {
      this.checkAssignmentMatching(node, getTypeAtLocationForLinter(node.type), node.initializer, true);
      this.handleEsObjectAssignment(node, node.type, node.initializer, true);
    }
    this.handleDeclarationInferredType(node);
    this.handleDefiniteAssignmentAssertion(node);
    this.handleSendableClassProperty(node);
  }

  private handleSendableClassProperty(node: PropertyDeclaration): void {
    const classNode = node.parent;
    if (!isClassDeclaration(classNode) || !hasSendableDecorator(classNode)) {
      return;
    }
    const typeNode = node.type;
    if (!typeNode) {
      this.incrementCounters(node, FaultID.SendableExplicitFieldType);
      return;
    }
    this.handleDecoratorsSendableClass(node);
    if (!isSendableTypeNode(typeNode)) {
      this.incrementCounters(node, FaultID.SendablePropType);
    } else {
      this.checkTypeAliasInSendableScope(node);
    }
  }

  private checkTypeAliasInSendableScope(node: PropertyDeclaration | PropertySignature): void {
    if (!node.type) {
      return;
    }

    const typeNode = unwrapParenthesizedTypeNode(node.type);
    const needWarning = 
    (isUnionTypeNode(typeNode) && typeNode.types.some((elemType) => this.isNoneSendableTypeAlias(elemType))) ||
    (isTypeReferenceNode(typeNode) && this.isNoneSendableTypeAlias(typeNode));

    if (needWarning) {
      this.incrementCounters(node.type, FaultID.SendablePropTypeWarning);
    }
  }

  private isNoneSendableTypeAlias(typeNode: TypeNode): boolean {
    if (!isTypeReferenceNode(typeNode)) {
      return false;
    }

    const sym = trueSymbolAtLocation(typeNode.typeName);
    if (!sym || !(sym.getFlags() & SymbolFlags.TypeAlias)) {
      return false;
    }

    const typeDecl = getDeclaration(sym);
    if (!typeDecl || !isTypeAliasDeclaration(typeDecl)) {
      return false;
    }

    const typeArgs = typeNode.typeArguments;

    if (typeArgs && !typeArgs.every((typeArg) => isSendableTypeNode(typeArg))) {
      return true;
    }
    return false;
  }

  private handlePropertyAssignment(node: PropertyAssignment) {
    const propName = node.name;
    if (!(!!propName && isNumericLiteral(propName))) {
      return;
    }

    /*
    * We can use literals as property names only when creating Record or any interop instances.
    * We can also initialize with constant string literals.
    * Assignment with string enum values is handled in handleComputedPropertyName
    */
    let isRecordObjectInitializer = false;
    let isLibraryType = false;
    let isDynamic = false;
    const objectLiteralType = TypeScriptLinter.tsTypeChecker.getContextualType(node.parent);
    if (objectLiteralType) {
      isRecordObjectInitializer = checkTypeSet(objectLiteralType, isStdRecordType);
      isLibraryType = ArkTSLinter_1_1.isLibraryType(objectLiteralType);
    }

    isDynamic = isLibraryType || isDynamicLiteralInitializer(node.parent);
    if (!isRecordObjectInitializer && !isDynamic) {
      let autofix: Autofix[] | undefined = fixLiteralAsPropertyName(node);
      let autofixable = autofix != undefined;
      if (!shouldAutofix(node, FaultID.LiteralAsPropertyName)) {
        autofix = undefined;
      }
      this.incrementCounters(node.name, FaultID.LiteralAsPropertyName, autofixable, autofix);
    }
  }

  private handlePropertySignature(node: PropertySignature): void {
    const propName = node.name;
    if (!!propName && isNumericLiteral(propName)) {
      let autofix: Autofix[] | undefined = fixLiteralAsPropertyName(node);
      const autofixable = autofix !== undefined;
      if (!shouldAutofix(node, FaultID.LiteralAsPropertyName)) {
        autofix = undefined;
      }
      this.incrementCounters(node.name, FaultID.LiteralAsPropertyName, autofixable, autofix);
    }
    this.handleSendableInterfaceProperty(node);
  }

  private handleSendableInterfaceProperty(node: PropertySignature): void {
    const typeNode = node.type;
    if (!typeNode) {
      return;
    }
    const interfaceNode = node.parent;
    const interfaceNodeType = getTypeAtLocationForLinter(interfaceNode);
    if (!isInterfaceDeclaration(interfaceNode) || !isSendableClassOrInterface(interfaceNodeType)) {
      return;
    }
    if (!isSendableTypeNode(typeNode)) {
      this.incrementCounters(node, FaultID.SendablePropType);
    } else {
      this.checkTypeAliasInSendableScope(node);
    }
  }

  private filterOutDecoratorsDiagnostics(decorators: readonly Decorator[] | undefined,
    expectedDecorators: readonly string[],
    range: { begin: number, end: number},
    code: number,
    prop_type?: string) {
    // Filter out non-initializable property decorators from strict diagnostics.
    if (this.tscStrictDiagnostics && this.sourceFile) {
      if (decorators?.some((decorator) => {
        const decoratorName = getDecoratorName(decorator);
        // special case for property of type CustomDialogController of the @CustomDialog-decorated class
        if (expectedDecorators.includes(NON_INITIALIZABLE_PROPERTY_CLASS_DECORATORS[0])) {
          return expectedDecorators.includes(decoratorName) && prop_type === 'CustomDialogController';
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

  private static isClassLikeOrIface(node: Node): boolean {
    return isClassLike(node) || isInterfaceDeclaration(node);
  }

  private handleFunctionExpression(node: Node): void {
    const funcExpr = node as FunctionExpression;
    const isGeneric = funcExpr.typeParameters !== undefined && funcExpr.typeParameters.length > 0;
    const isGenerator = funcExpr.asteriskToken !== undefined;
    const hasThisKeyword = TypeScriptLinter.scopeContainsThis(funcExpr.body);
    const [hasUnfixableReturnType, newRetTypeNode] = this.handleMissingReturnType(funcExpr);
    const autofixable = !isGeneric && !isGenerator && !hasThisKeyword && !hasUnfixableReturnType;

    let autofix: Autofix[] | undefined;
    if (autofixable && shouldAutofix(node, FaultID.FunctionExpression)) {
      autofix = [fixFunctionExpression(funcExpr, funcExpr.parameters, newRetTypeNode)];
    }

    this.incrementCounters(node, FaultID.FunctionExpression, autofixable, autofix);
    if (isGenerator) {
      this.incrementCounters(funcExpr, FaultID.GeneratorFunction);
    }
    if (!hasPredecessor(funcExpr, TypeScriptLinter.isClassLikeOrIface)) {
      this.reportThisKeywordsInScope(funcExpr.body);
    }
    if (hasUnfixableReturnType) {
      this.incrementCounters(funcExpr, FaultID.LimitedReturnTypeInference);
    }
  }

  private handleArrowFunction(node: Node): void {
    const arrowFunc = node as ArrowFunction;
    if (!hasPredecessor(arrowFunc, TypeScriptLinter.isClassLikeOrIface)) {
      this.reportThisKeywordsInScope(arrowFunc.body);
    }

    const contextType = TypeScriptLinter.tsTypeChecker.getContextualType(arrowFunc);
    if (!(contextType && isLibraryType(contextType))) {
      if (!arrowFunc.type) {
        this.handleMissingReturnType(arrowFunc);
      }
    }
  }

  private handleFunctionDeclaration(node: Node) {
    const tsFunctionDeclaration = node as FunctionDeclaration;
    if (!tsFunctionDeclaration.type) {
      this.handleMissingReturnType(tsFunctionDeclaration);
    }
    if (tsFunctionDeclaration.name) {
      this.countDeclarationsWithDuplicateName(tsFunctionDeclaration.name, tsFunctionDeclaration);
    }
    if (tsFunctionDeclaration.body) {
      this.reportThisKeywordsInScope(tsFunctionDeclaration.body);
    }
    const parent = tsFunctionDeclaration.parent;
    if (!isSourceFile(parent) && !isModuleBlock(parent)) {
      this.incrementCounters(tsFunctionDeclaration, FaultID.LocalFunction);
    }
    if (tsFunctionDeclaration.asteriskToken) {
      this.incrementCounters(node, FaultID.GeneratorFunction);
    }
    if (hasSendableDecoratorFunctionOverload(tsFunctionDeclaration)) {
      if (!this.isSendableDecoratorValid(tsFunctionDeclaration)) {
        return;
      }
      getNonSendableDecorators(tsFunctionDeclaration)?.forEach((decorator) => {
        this.incrementCounters(decorator, FaultID.SendableFunctionDecorator);
      });
      if (!hasSendableDecorator(tsFunctionDeclaration)) {
        this.incrementCounters(tsFunctionDeclaration, FaultID.SendableFunctionOverloadDecorator);
      }
      this.scanCapturedVarsInSendableScope(tsFunctionDeclaration, tsFunctionDeclaration, FaultID.SendableFunctionImportedVariables);
    }
  }

  private handleMissingReturnType(funcLikeDecl: FunctionLikeDeclaration | MethodSignature): [boolean, TypeNode | undefined] {
    // if (funcLikeDecl.type) return [false, funcLikeDecl.type];

    // Note: Return type can't be inferred for function without body.
    if (isMethodSignature(funcLikeDecl) || !funcLikeDecl.body) {
      // Ambient flag is not exposed, and ts.NodeFlags is made const enum, so hardcode this value
      const isAmbientDeclaration = !!(funcLikeDecl.flags & (1 << 24));
      const isSignature = isMethodSignature(funcLikeDecl);
      if ((isSignature || isAmbientDeclaration) && !funcLikeDecl.type) {
        this.incrementCounters(funcLikeDecl, FaultID.LimitedReturnTypeInference);
      }
      return [false, undefined];
    }

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
    newRetTypeNode = TypeScriptLinter.tsTypeChecker.typeToTypeNode(tsRetType, funcLikeDecl, NodeBuilderFlags.AllowEmptyTuple);
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
    if (isBlock(funBody)) {
      hasLimitedTypeInference = this.checkReturnExpression(funBody, (expr) => 
        isReturnStatement(expr) && !!expr.expression &&
        isCallToFunctionWithOmittedReturnType(unwrapParenthesized(expr.expression))
      );
    }
    else {
      const tsExpr = unwrapParenthesized(funBody);
      hasLimitedTypeInference = isCallToFunctionWithOmittedReturnType(tsExpr);
    }
    return hasLimitedTypeInference;
  }

  private checkReturnExpression(funBody: ConciseBody, callback: (expr: Node) => boolean): boolean {
    let hasLimitedTypeInference = false;
    const traverseCallback = (node: Node): void => {
      if (hasLimitedTypeInference) {
        return;
      }

      hasLimitedTypeInference = callback(node);
    };
    // Don't traverse other nested function-like declarations.
    const stopCondition = (node: Node): boolean => {
      return hasLimitedTypeInference ||
        isFunctionDeclaration(node) ||
        isFunctionExpression(node) ||
        isMethodDeclaration(node) ||
        isAccessor(node) ||
        isArrowFunction(node);
    };
    this.forEachNodeInSubtree(funBody, traverseCallback, stopCondition);
    return hasLimitedTypeInference;
  }

  private isValidTypeForUnaryArithmeticOperator(type: Type): boolean {
    const typeFlags = type.getFlags();
    const numberLiteralFlags = TypeFlags.BigIntLiteral | TypeFlags.NumberLiteral;
    const numberLikeFlags = TypeFlags.BigIntLike | TypeFlags.NumberLike;
    const isNumberLike = !!(typeFlags & (numberLiteralFlags | numberLikeFlags));

    const isAllowedNumericType = isStdBigIntType(type) || isStdNumberType(type);

    return isNumberLike || isAllowedNumericType;
  }

  private handlePrefixUnaryExpression(node: Node) {
    const tsUnaryArithm = node as PrefixUnaryExpression;
    const tsUnaryOp = tsUnaryArithm.operator;
    const tsUnaryOperand = tsUnaryArithm.operand;
    if (
      tsUnaryOp === SyntaxKind.PlusToken ||
      tsUnaryOp === SyntaxKind.MinusToken ||
      tsUnaryOp === SyntaxKind.TildeToken
    ) {
      const tsOperatndType = getTypeAtLocationForLinter(tsUnaryOperand);
      const isTilde = tsUnaryOp === SyntaxKind.TildeToken;
      const isInvalidTilde =
        isTilde && isNumericLiteral(tsUnaryOperand) && !isIntegerConstantValue(tsUnaryOperand);
      if (!this.isValidTypeForUnaryArithmeticOperator(tsOperatndType) || isInvalidTilde) {
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
          this.incrementCounters(tsLhsExpr, FaultID.MethodReassignment);
        }
        if (
          isMethodAssignment(tsLhsSymbol) && tsLhsBaseSymbol &&
          (tsLhsBaseSymbol.flags & SymbolFlags.Function) !== 0
        ) {
          this.incrementCounters(tsLhsExpr, FaultID.PropertyDeclOnFunction);
        }
      }
    }
    if (tsBinaryExpr.operatorToken.kind === SyntaxKind.EqualsToken) {
      const leftOperandType = getTypeAtLocationForLinter(tsLhsExpr);
      this.checkAssignmentMatching(tsBinaryExpr, leftOperandType, tsRhsExpr);
      const typeNode = getVariableDeclarationTypeNode(tsLhsExpr);
      this.handleEsObjectAssignment(tsBinaryExpr, typeNode, tsRhsExpr);
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
      const leftOperandType = getTypeAtLocationForLinter(tsLhsExpr);
      if (isPrimitiveType(leftOperandType) || isTypeNode(leftExpr) || isTypeSymbol(leftSymbol)) {
        this.incrementCounters(node, FaultID.InstanceofUnsupported);
      }
    } else if (tsBinaryExpr.operatorToken.kind === SyntaxKind.InKeyword) {
      this.incrementCounters(tsBinaryExpr.operatorToken, FaultID.InOperator);
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
      this.checkAssignmentMatching(
        tsVarDecl,
        getTypeAtLocationForLinter(tsVarDecl.type),
        tsVarDecl.initializer
      );
    }

    this.handleDeclarationInferredType(tsVarDecl);
    this.handleDefiniteAssignmentAssertion(tsVarDecl);
    if (tsVarDecl.initializer) {
      this.handleEsObjectAssignment(tsVarDecl, tsVarDecl.type, tsVarDecl.initializer);
    }
  }

  private handleEsObjectAssignment(node: Node, nodeDeclType: TypeNode | undefined, initializer: Node, isPropertyDeclaration: boolean = false): void {
    if (!nodeDeclType) {
      return;
    }

    if (isEsObjectType(nodeDeclType)) {
      if (isObjectLiteralExpression(initializer)) {
        this.incrementCounters(node, FaultID.EsObjectType);
      }
    } else {
      if (isPropertyDeclaration) {
        return;
      }

      const initalizerTypeNode = getVariableDeclarationTypeNode(initializer);
      const isInitializedWithESObject = !!initalizerTypeNode && isEsObjectType(initalizerTypeNode);
      if (isInitializedWithESObject) {
        this.incrementCounters(node, FaultID.EsObjectType);
      }
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

    const isSendableClass = hasSendableDecorator(tsClassDecl);
    if (isSendableClass) {
      const decorators: readonly Decorator[] | undefined = getNonSendableDecorators(tsClassDecl);
      this.handleSendableClassDecorators(decorators);
      tsClassDecl.typeParameters?.forEach((typeParamDecl) => {
        this.checkSendableTypeParameter(typeParamDecl);
      });
    }

    if (tsClassDecl.heritageClauses) {
      for (const hClause of tsClassDecl.heritageClauses) {
        if (!hClause) {
          continue;
        }
        this.checkClassDeclarationHeritageClause(hClause, isSendableClass);
      }
    }

    if (isSendableClass) {
      tsClassDecl.members.forEach((classMember) => {
        this.scanCapturedVarsInSendableScope(classMember, tsClassDecl, FaultID.SendableCapturedVars);
      });
    }

    if (!this.skipArkTSStaticBlocksCheck) {
      this.processClassStaticBlocks(tsClassDecl);
    }
  }

  private scanCapturedVarsInSendableScope(startNode: Node, scope: Node, faultId: FaultID): void {
    const callback = (node: Node): void => {
      // Namespace import will introduce closure in the es2abc compiler stage
      if (!isIdentifier(node) || this.checkNamespaceImportVar(node)) {
        return;
      }

      // The "b" of "A.b" should not be checked since it's load from object "A"
      const parent: Node = node.parent;
      if (isPropertyAccessExpression(parent) && parent.name === node) {
        return;
      }
      // When overloading function, will misreport
      if (isFunctionDeclaration(startNode) && startNode.name === node) {
        return;
      }

      this.checkLocalDecl(node, scope, faultId);
    };
    // Type nodes should not checked because no closure will be introduced
    const stopCondition = (node: Node): boolean => {
      // already existed 'arkts-sendable-class-decoratos' error
      if (isDecorator(node) && node.parent === startNode) {
        return true;
      }
      return isTypeReferenceNode(node);
    };
    this.forEachNodeInSubtree(startNode, callback, stopCondition);
  }

  private checkLocalDecl(node: Identifier, scope: Node, faultId: FaultID): void {
    const trueSym = trueSymbolAtLocation(node);
    // Sendable decorator should be used in method of Sendable classes
    if (trueSym === undefined) {
      return;
    }

    // Const enum member will be replaced by the exact value of it, no closure will be introduced
    if (isConstEnum(trueSym)) {
      return;
    }

    const declarations = trueSym.getDeclarations();
    if (declarations?.length) {
      this.checkLocalDeclWithSendableClosure(node, scope, declarations[0], faultId);
    }
  }

  private checkLocalDeclWithSendableClosure(
    node: Identifier,
    scope: Node,
    decl: Declaration,
    faultId: FaultID
  ): void {
    const declPosition = decl.getStart();
    if (decl.getSourceFile().fileName !== node.getSourceFile().fileName ||
        declPosition !== undefined && declPosition >= scope.getStart() && declPosition < scope.getEnd()) {
      return;
    }
    
    if (this.isFileExportDecl(decl)) {
      return;
    }

    if (this.checkIsTopClosure(decl)) {
      return;
    }

    /**
     * The cases in condition will introduce closure if defined in the same file as the Sendable class. The following
     * cases are excluded because they are not allowed in ArkTS:
     * 1. ImportEqualDecalration
     * 2. BindingElement
     */
    if (isVariableDeclaration(decl) || isFunctionDeclaration(decl) || isClassDeclaration(decl) ||
        isInterfaceDeclaration(decl) || isEnumDeclaration(decl) || isModuleDeclaration(decl) ||
        isParameter(decl)) {
      this.incrementCounters(node, faultId);
    }
  }

  private checkIsTopClosure(decl: Declaration): boolean {
    if (!isSourceFile(decl.parent)) {
      return false;
    }
    if (isClassDeclaration(decl) && isSendableClassOrInterface(getTypeAtLocationForLinter(decl))) {
      return true;
    }
    if (isFunctionDeclaration(decl) && hasSendableDecoratorFunctionOverload(decl)) {
      return true;
    }
    return false;
  }

  private checkNamespaceImportVar(node: Node): boolean {
    // Namespace import cannot be determined by the true symbol
    const sym = TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(node);
    const decls = sym?.getDeclarations();
    if (decls?.length) {
      if (isNamespaceImport(decls[0])) {
        this.incrementCounters(node, FaultID.SendableCapturedVars);
        return true;
      }
    }
    return false;
  }

  isFileExportDecl(decl: Declaration): boolean {
    const sourceFile = decl.getSourceFile();
    if (!this.fileExportDeclCaches) {
      this.fileExportDeclCaches = searchFileExportDecl(sourceFile);
    }
    return this.fileExportDeclCaches.has(decl);
  }

  private checkClassDeclarationHeritageClause(hClause: HeritageClause, isSendableClass: boolean): void {
    for (const tsTypeExpr of hClause.types) {

      /*
      * Always resolve type from 'tsTypeExpr' node, not from 'tsTypeExpr.expression' node,
      * as for the latter, type checker will return incorrect type result for classes in
      * 'extends' clause. Additionally, reduce reference, as mostly type checker returns
      * the TypeReference type objects for classes and interfaces.
      */
      const tsExprType = reduceReference(getTypeAtLocationForLinter(tsTypeExpr));
      const isSendableBaseType = isSendableClassOrInterface(tsExprType);
      if (tsExprType.isClass() && hClause.token === SyntaxKind.ImplementsKeyword) {
        this.incrementCounters(tsTypeExpr, FaultID.ImplementsClass);
      }

      if (!isSendableClass) {
        // Non-Sendable class can not implements sendable interface / extends sendable class
        if (isSendableBaseType) {
          this.incrementCounters(tsTypeExpr, FaultID.SendableClassInheritance);
        }
        continue;
      }

      /*
      * Sendable class can implements any interface / extends only sendable class
      * Sendable class can not extends sendable class variable(local / import)
      */
      if (hClause.token === SyntaxKind.ExtendsKeyword) {
        if (!isSendableBaseType) {
          this.incrementCounters(tsTypeExpr, FaultID.SendableClassInheritance);
          continue;
        }
        if (!this.isValidSendableClassExtends(tsTypeExpr)) {
          this.incrementCounters(tsTypeExpr, FaultID.SendableClassInheritance);
        }
      }
    }
  }

  private isValidSendableClassExtends(tsTypeExpr: ExpressionWithTypeArguments): boolean {
    const expr = tsTypeExpr.expression;
    const sym = TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(expr);
    if (sym && (sym.flags & SymbolFlags.Class) === 0) {
      // handle non-class situation(local / import)
      if ((sym.flags & SymbolFlags.Alias) !== 0) {

        /*
        * Sendable class can not extends imported sendable class variable
        * Sendable class can extends imported sendable class
        */
        const realSym = TypeScriptLinter.tsTypeChecker.getAliasedSymbol(sym);
        if (realSym && (realSym.flags & SymbolFlags.Class) === 0) {
          return false;
        }
        return true;
      }
      return false;
    }
    return true;
  }

  private checkSendableTypeParameter(typeParamDecl: TypeParameterDeclaration): void {
    const defaultTypeNode = typeParamDecl.default;
    if (defaultTypeNode) {
      if (!isSendableTypeNode(defaultTypeNode)) {
        this.incrementCounters(defaultTypeNode, FaultID.SendableGenericTypes);
      }
    }
  }

  private processClassStaticBlocks(classDecl: ClassDeclaration): void {
    let hasStaticBlock = false;
    for (const element of classDecl.members) {
      if (isClassStaticBlockDeclaration(element)) {
        if (hasStaticBlock) {
          this.incrementCounters(element, FaultID.MultipleStaticBlocks);
        } else {
          hasStaticBlock = true;
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
    if (hasSendableDecorator(tsTypeAlias)) {
      if (!this.isSendableDecoratorValid(tsTypeAlias)) {
        return;
      }
      getNonSendableDecorators(tsTypeAlias)?.forEach((decorator) => {
        this.incrementCounters(decorator, FaultID.SendableTypeAliasDecorator);
      });
      if (!isFunctionTypeNode(tsTypeAlias.type)) {
        this.incrementCounters(tsTypeAlias.type, FaultID.SendableTypeAliasDeclaration);
      }
    }
  }

  private handleImportClause(node: Node): void {
    const tsImportClause = node as ImportClause;
    if (tsImportClause.name) {
      this.countDeclarationsWithDuplicateName(tsImportClause.name, tsImportClause);
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
    this.handleDecoratorsSendableClass(tsMethodDecl);
    let isStatic = false;
    if (tsMethodDecl.modifiers) {
      for (const mod of tsMethodDecl.modifiers) {
        if (mod.kind === SyntaxKind.StaticKeyword) {
          isStatic = true;
          break;
        }
      }
    }
    if (tsMethodDecl.body && isStatic) {
      this.reportThisKeywordsInScope(tsMethodDecl.body);
    }
    if (!tsMethodDecl.type) {
      this.handleMissingReturnType(tsMethodDecl);
    }
    if (tsMethodDecl.asteriskToken) {
      this.incrementCounters(node, FaultID.GeneratorFunction);
    }
    this.filterOutDecoratorsDiagnostics(getDecorators(tsMethodDecl), NON_RETURN_FUNCTION_DECORATORS,
      { begin: tsMethodDecl.parameters.end, end: tsMethodDecl.body?.getStart() ?? tsMethodDecl.parameters.end },
      FUNCTION_HAS_NO_RETURN_ERROR_CODE);
  }

  private handleMethodSignature(node: MethodSignature): void {
    const tsMethodSign = node as MethodSignature;
    if (!tsMethodSign.type) {
      this.handleMissingReturnType(tsMethodSign);
    }
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

  private isAllowedClassValueContext(tsIdentifier: Identifier /* Param not used ! ??, tsIdentSym: Symbol */): boolean {
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
      const isAny = isAnyType(getTypeAtLocationForLinter(callee));
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
    if ((tsIdentSym.flags & SymbolFlags.Annotation) !== 0) {
      return;
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

  private isElementAcessAllowed(type: Type, argType: Type): boolean {
    if (type.isUnion()) {
      for (const t of type.types) {
        if (!this.isElementAcessAllowed(t, argType)) {
          return false;
        }
      }
      return true;
    }

    const typeNode = TypeScriptLinter.tsTypeChecker.typeToTypeNode(type, undefined, NodeBuilderFlags.AllowEmptyTuple);

    if (isArkTSCollectionsArrayLikeType(type)) {
      return isNumberLikeType(argType);
    }

    return (
      isLibraryType(type) ||
      isAnyType(type) ||
      isOrDerivedFrom(type, isIndexableArray) ||
      isOrDerivedFrom(type, isTuple) ||
      isOrDerivedFrom(type, isStdRecordType) ||
      isOrDerivedFrom(type, isStringType) ||
      isOrDerivedFrom(type, isStdMapType) ||
      isIntrinsicObjectType(type) ||
      isEnumType(type) ||
      // we allow EsObject here beacuse it is reported later using FaultId.EsObjectType
      isEsObjectType(typeNode)
    );
  }

  private handleElementAccessExpression(node: Node): void {
    const tsElementAccessExpr = node as ElementAccessExpression;
    const tsElementAccessExprSymbol = trueSymbolAtLocation(tsElementAccessExpr.expression);
    const tsElemAccessBaseExprType = getNonNullableType(getTypeOrTypeConstraintAtLocation(tsElementAccessExpr.expression));
    const tsElemAccessArgType = getTypeAtLocationForLinter(tsElementAccessExpr.argumentExpression);

    if (
      // unnamed types do not have symbol, so need to check that explicitly
      !isLibrarySymbol(tsElementAccessExprSymbol) &&
      !isArrayLiteralExpression(tsElementAccessExpr.expression) &&
      !this.isElementAcessAllowed(tsElemAccessBaseExprType, tsElemAccessArgType)
    ) {
      let autofix = fixPropertyAccessByIndex(node);
      const autofixable = autofix !== undefined;
      if (!shouldAutofix(node, FaultID.PropertyAccessByIndex)) {
        autofix = undefined;
      }
      this.incrementCounters(node, FaultID.PropertyAccessByIndex, autofixable, autofix);
    }
  }

  private handleEnumMember(node: Node): void {
    const tsEnumMember = node as EnumMember;
    const tsEnumMemberType = getTypeAtLocationForLinter(tsEnumMember);
    const constVal = TypeScriptLinter.tsTypeChecker.getConstantValue(tsEnumMember);

    if (tsEnumMember.initializer && !isValidEnumMemberInit(tsEnumMember.initializer)) {
      this.incrementCounters(node, FaultID.EnumMemberNonConstInit);
    }
    // check for type - all members should be of same type
    const enumDecl = tsEnumMember.parent;
    const firstEnumMember = enumDecl.members[0];
    const firstEnumMemberType = getTypeAtLocationForLinter(firstEnumMember);
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

    if (!TypeScriptLinter.inSharedModule(node)) {
      return;
    }

    if (!isShareableEntity(exportAssignment.expression)) {
      this.incrementCounters(exportAssignment.expression, FaultID.SharedModuleExports);
    }
  }

  private handleCallExpression(node: Node): void {
    const tsCallExpr = node as CallExpression;

    const calleeSym = trueSymbolAtLocation(tsCallExpr.expression);
    const callSignature = TypeScriptLinter.tsTypeChecker.getResolvedSignature(tsCallExpr);

    this.handleImportCall(tsCallExpr);
    this.handleRequireCall(tsCallExpr);
    // NOTE: Keep handleFunctionApplyBindPropCall above handleGenericCallWithNoTypeArgs here!!!
    if (calleeSym !== undefined) {
      this.handleStdlibAPICall(tsCallExpr, calleeSym);
      this.handleFunctionApplyBindPropCall(tsCallExpr, calleeSym);
    }
    if (callSignature !== undefined && !isLibrarySymbol(calleeSym)) {
      this.handleGenericCallWithNoTypeArgs(tsCallExpr, callSignature);
      this.handleStructIdentAndUndefinedInArgs(tsCallExpr, callSignature);
    }
    if (isDeclarationSymbol(calleeSym) && isTaskPoolApi(calleeSym, tsCallExpr.expression)) {
      this.handleTaskpoolApiForCallExpression(tsCallExpr);
    }
    this.handleLibraryTypeCall(tsCallExpr);
  }

  private handleTaskpoolApiForCallExpression(node: Node): void {
    const tsCallExpr = node as CallExpression;
    const args = tsCallExpr.arguments || [];
    if (args.length === 0) {
      return;
    }
    const arg = args[0];
    const argType = getTypeAtLocationForLinter(arg);
    const argSym = argType.getSymbol();
    if (!argSym || ArkTSLinter_1_1.TASK_LIST.includes(argSym.name)) {
      return;
    }

    if (checkTaskpoolFunction(arg, argType, argSym)) {
      this.incrementCounters(arg, FaultID.TaskpoolFunctionArg);
    }
  }

  private handleEtsComponentExpression(node: Node): void {
    // for all the checks we make EtsComponentExpression is compatible with the CallExpression
    const etsComponentExpression = node as CallExpression;
    this.handleLibraryTypeCall(etsComponentExpression);
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
      const tsType = getTypeAtLocationForLinter(tsCallExpr.expression);
      if (isInterfaceType(tsType) && tsType.symbol.name === "NodeRequire") {
        this.incrementCounters(tsCallExpr.parent, FaultID.ImportAssignment);
      }
    }
  }

  private handleGenericCallWithNoTypeArgs(callLikeExpr: CallExpression | NewExpression, callSignature: Signature) {
    const typeArguments = TypeScriptLinter.tsTypeChecker.getTypeArgumentsForResolvedSignature(callSignature);
    if (typeArguments && typeArguments.length > 0) {
      const startTypeArg = callLikeExpr.typeArguments?.length ?? 0;
      for (let i = startTypeArg; i < typeArguments.length; ++i) {
        // if compiler infers 'unknown' type there are 2 possible cases:
        //   1. Compiler unable to infer type from arguments and use 'unknown'
        //   2. Compiler infer 'unknown' from arguments
        // We report error in both cases. It is ok because we cannot use 'unknown'
        // in ArkTS and already have separate check for it.
        if (typeArguments[i].flags & 2 /* TypeFlags.Unknown */) {
          this.incrementCounters(callLikeExpr, FaultID.GenericCallNoTypeArgs);
          break;
        }
      }
    }
  }

  private static readonly listFunctionApplyCallApis = [
    'Function.apply',
    'Function.call',
    'CallableFunction.apply',
    'CallableFunction.call'
  ];

  private static readonly listFunctionBindApis = [
    'Function.bind',
    'CallableFunction.bind'
  ];

  private handleFunctionApplyBindPropCall(tsCallExpr: CallExpression, calleeSym: Symbol): void {
    const exprName = TypeScriptLinter.tsTypeChecker.getFullyQualifiedName(calleeSym);
    if (TypeScriptLinter.listFunctionApplyCallApis.includes(exprName)) {
      this.incrementCounters(tsCallExpr, FaultID.FunctionApplyCall);
    }
    if (TypeScriptLinter.listFunctionBindApis.includes(exprName)) {
      this.incrementCounters(tsCallExpr, FaultID.FunctionBind);
    }
  }

  private handleStructIdentAndUndefinedInArgs(tsCallOrNewExpr: CallExpression | NewExpression, callSignature: Signature) {
    if (!tsCallOrNewExpr.arguments) {
      return;
    }

    for (let argIndex = 0; argIndex < tsCallOrNewExpr.arguments.length; ++argIndex) {
      const tsArg = tsCallOrNewExpr.arguments[argIndex];
      const tsArgType = getTypeAtLocationForLinter(tsArg);
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

        this.checkAssignmentMatching(tsArg, tsParamType, tsArg);
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


  private handleLibraryTypeCall(expr: CallExpression | NewExpression): void {
    if (!expr.arguments || !this.tscStrictDiagnostics || !this.sourceFile) {
      return;
    }

    const file = normalizePath(this.sourceFile.fileName);
    const tscDiagnostics: readonly Diagnostic[] | undefined = this.tscStrictDiagnostics.get(file);
    if (!tscDiagnostics?.length) {
      return;
    }

    const isOhModulesEts = isOhModulesEtsSymbol(trueSymbolAtLocation(expr.expression));
    const deleteDiagnostics: Set<Diagnostic> = new Set();
    LibraryTypeCallDiagnosticChecker.instance.filterDiagnostics(
      tscDiagnostics,
      expr,
      isLibraryType(getTypeAtLocationForLinter(expr.expression)),
      (diagnostic, errorType) => {

        /*
         * When a diagnostic meets the filter criteria, If it happens in an ets file in the 'oh_modules' directory.
         * the diagnostic is downgraded to warning. For other files, downgraded to nothing.
         */
        if (isOhModulesEts && errorType !== ErrorType.UNKNOW) {
          diagnostic.category = this.enableStrictCheckOHModule ? DiagnosticCategory.Error : DiagnosticCategory.Warning;
        } else {
          deleteDiagnostics.add(diagnostic);
        }
      }
    );

    if (!deleteDiagnostics.size) {
      return;
    }

    this.tscStrictDiagnostics.set(
      file,
      tscDiagnostics.filter((item) => {
        return !deleteDiagnostics.has(item);
      })
    );
  }

  private handleNewExpression(node: Node): void {
    const tsNewExpr = node as NewExpression;
    let callSignature = TypeScriptLinter.tsTypeChecker.getResolvedSignature(tsNewExpr);
    if (callSignature !== undefined) {
      this.handleStructIdentAndUndefinedInArgs(tsNewExpr, callSignature);
      this.handleGenericCallWithNoTypeArgs(tsNewExpr, callSignature);
    }
    this.handleSendableGenericTypes(tsNewExpr);
  }

  private handleSendableGenericTypes(node: NewExpression): void {
    const type = getTypeAtLocationForLinter(node);
    if (!isSendableClassOrInterface(type)) {
      return;
    }

    const typeArgs = node.typeArguments;
    if (!typeArgs || typeArgs.length === 0) {
      return;
    }

    for (const arg of typeArgs) {
      if (!isSendableTypeNode(arg)) {
        this.incrementCounters(arg, FaultID.SendableGenericTypes);
      }
    }
  }

  private handleAsExpression(node: Node): void {
    const tsAsExpr = node as AsExpression;
    if (tsAsExpr.type.getText() === "const") this.incrementCounters(node, FaultID.ConstAssertion);

    const targetType = getTypeAtLocationForLinter(tsAsExpr.type).getNonNullableType();
    const exprType = getTypeAtLocationForLinter(tsAsExpr.expression).getNonNullableType();
    // check for rule#65:   "number as Number" and "boolean as Boolean" are disabled
    if(
      (isNumberLikeType(exprType) && isStdNumberType(targetType)) ||
      (isBooleanLikeType(exprType) && isStdBooleanType(targetType))
    ) {
      this.incrementCounters(node, FaultID.TypeAssertion);
    }
    if (
        !isSendableClassOrInterface(exprType) &&
        !isObject(exprType) &&
        !isAnyType(exprType) &&
        isSendableClassOrInterface(targetType)
    ) {
        this.incrementCounters(tsAsExpr, FaultID.SendableAsExpr);
    }
    if (
      isWrongSendableFunctionAssignment(targetType, exprType)
    ) {
      this.incrementCounters(tsAsExpr, FaultID.SendableFunctionAsExpr);
    }
  }

  isEsObjectPossiblyAllowed(typeRef: TypeReferenceNode): boolean {
    switch (typeRef.parent.kind) {
      case SyntaxKind.VariableDeclaration:
      case SyntaxKind.PropertyDeclaration:
      case SyntaxKind.Parameter:
      case SyntaxKind.FunctionType:
      case SyntaxKind.PropertySignature:
      case SyntaxKind.ArrayType:
      case SyntaxKind.NewExpression:
        return true;
      case SyntaxKind.ArrowFunction:
      case SyntaxKind.FunctionDeclaration:
      case SyntaxKind.MethodDeclaration:
        return this.isObjectLiteralFromFunc(typeRef.parent);
      case SyntaxKind.TypeReference:
        const promiseType = typeRef.parent as ts.TypeReferenceNode;
        if (promiseType.typeName.getText() === PROMISE) {
          return this.isObjectLiteralFromFunc(typeRef.parent.parent, true);
        }
        return true;
      case SyntaxKind.AsExpression:
        return !isObjectLiteralExpression((typeRef.parent as AsExpression).expression);
      default:
        return false;
    }
  }
  
  isObjectLiteralFromFunc(node: Node, isPromise: boolean = false): boolean {
    if (
      (isFunctionDeclaration(node) ||
      isMethodDeclaration(node) ||
      isArrowFunction(node)) &&
      !!node.body && isBlock(node.body)
    ) {
      if (isPromise) {
        const tsModifier = getModifiers(node);
        const hasAsyncKeyword = hasModifier(tsModifier, SyntaxKind.AsyncKeyword);
        if (!hasAsyncKeyword) {
          return true;
        }
      }
      return !this.checkReturnExpression(node.body, (expr) => 
        isReturnStatement(expr) && !!expr.expression &&
        isObjectLiteralExpression(expr.expression)
      );
    }
    return true;
  }

private handleTypeReference(node: Node): void {
    const typeRef = node as TypeReferenceNode;
    if (isEsObjectType(typeRef)) {
      if (!this.isEsObjectPossiblyAllowed(typeRef)) {
        this.incrementCounters(node, FaultID.EsObjectType);
      }
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

    const typeNameType = getTypeAtLocationForLinter(typeRef.typeName);
    if (isSendableClassOrInterface(typeNameType)) {
      this.checkSendableTypeArguments(typeRef);
    }
  }

  private checkSendableTypeArguments(typeRef: TypeReferenceNode): void {
    if (typeRef.typeArguments) {
      for (const typeArg of typeRef.typeArguments) {
        if (!isSendableTypeNode(typeArg)) {
          this.incrementCounters(typeArg, FaultID.SendableGenericTypes);
        }
      }
    }
  }

  private handleMetaProperty(node: Node): void {
    const tsMetaProperty = node as MetaProperty;
    if (tsMetaProperty.name.text === "target") {
      this.incrementCounters(node, FaultID.NewTarget);
    }
  }

  private handleSpreadOp(node: Node) {
    // spread assignment is disabled
    // spread element is allowed only for arrays as rest parameter
    if (isSpreadElement(node)) {
      const spreadExprType = getTypeOrTypeConstraintAtLocation(node.expression);
      if (spreadExprType) {
        if (isCallLikeExpression(node.parent) || isArrayLiteralExpression(node.parent)) {
          if (
            isOrDerivedFrom(spreadExprType, isArray) ||
            isOrDerivedFrom(spreadExprType, isCollectionArrayType)
          ) {
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

  private handleExpressionWithTypeArguments(node: Node) {
    const tsTypeExpr = node as ExpressionWithTypeArguments;
    const symbol = trueSymbolAtLocation(tsTypeExpr.expression);
    if (!!symbol && isEsObjectSymbol(symbol)) {
      this.incrementCounters(tsTypeExpr, FaultID.EsObjectType);
    }
  }

  private handleComputedPropertyName(node: Node) {
    const computedProperty = node as ComputedPropertyName;
    if (this.isSendableCompPropName(computedProperty)) {
      // cancel the '[Symbol.iterface]' restriction of 'sendable class/interface' in the '@arkts.collections.d.ets' file
      if (isSymbolIteratorExpression(computedProperty.expression)) {
        const declNode = computedProperty.parent?.parent;
        if (declNode && isArkTSCollectionsClassOrInterfaceDeclaration(declNode)) {
          return;
        }
      }
      this.incrementCounters(node, FaultID.SendableComputedPropName);
    } else if (!isValidComputedPropertyName(computedProperty, false)) {
      this.incrementCounters(node, FaultID.ComputedPropertyName);
    }
  }

  private isSendableCompPropName(compProp: ComputedPropertyName): boolean {
    const declNode = compProp.parent?.parent;
    if (declNode && isClassDeclaration(declNode) && hasSendableDecorator(declNode)) {
      return true;
    } else if (declNode && isInterfaceDeclaration(declNode)) {
      const declNodeType = getTypeAtLocationForLinter(declNode);
      if (isSendableClassOrInterface(declNodeType)) {
        return true;
      }
    }
    return false;
  }

  private handleGetAccessor(node: GetAccessorDeclaration): void {
    this.handleDecoratorsSendableClass(node);
  }

  private handleSetAccessor(node: SetAccessorDeclaration): void {
    this.handleDecoratorsSendableClass(node);
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

    // issue 13987:
    // When variable have no type annotation and no initial value, and 'noImplicitAny'
    // option is enabled, compiler attempts to infer type from variable references:
    // see https://github.com/microsoft/TypeScript/pull/11263.
    // In this case, we still want to report the error, since ArkTS doesn't allow
    // to omit both type annotation and initializer.
    if (((isVariableDeclaration(decl) && isVariableStatement(decl.parent.parent)) || isPropertyDeclaration(decl)) &&
      !decl.initializer) {
      if (isPropertyDeclaration(decl) &&
        this.sourceFile.scriptKind === ScriptKind.ETS && this.sourceFile.isDeclarationFile &&
        decl.modifiers?.some(m => m.kind === SyntaxKind.PrivateKeyword)) {
        return;
      }
      this.incrementCounters(decl, FaultID.AnyType);
      return;
    }

    const type = getTypeAtLocationForLinter(decl);
    if (type) this.validateDeclInferredType(type, decl);
  }

  private handleDefiniteAssignmentAssertion(decl: VariableDeclaration | PropertyDeclaration) {
    if (decl.exclamationToken === undefined) {
      return;
    }

    if (decl.kind === SyntaxKind.PropertyDeclaration) {
      const parentDecl = decl.parent;
      if (parentDecl.kind === SyntaxKind.ClassDeclaration && hasSendableDecorator(parentDecl)) {
        this.incrementCounters(decl, FaultID.SendableDefiniteAssignment);
        return;
      }
    }
    this.incrementCounters(decl, FaultID.DefiniteAssignment);
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

  private processNoCheckEntry(entry: PragmaPseudoMap[keyof PragmaPseudoMap]): void {
    if (entry.range?.kind === undefined || entry.range?.pos === undefined || entry.range?.end === undefined) {
      return;
    }
    this.incrementCounters(entry.range as CommentRange, FaultID.ErrorSuppression);
  }

  private reportThisKeywordsInScope(scope: Block | Expression): void {
    const callback = (node: Node): void => {
      if (node.kind === SyntaxKind.ThisKeyword) {
        this.incrementCounters(node, FaultID.FunctionContainsThis);
      }
    };
    const stopCondition = (node: Node): boolean => {
      const isClassLike = isClassDeclaration(node) || isClassExpression(node);
      const isFunctionLike = isFunctionDeclaration(node) || isFunctionExpression(node);
      const isModuleDecl = isModuleDeclaration(node);
      return isClassLike || isFunctionLike || isModuleDecl;
    };
    this.forEachNodeInSubtree(scope, callback, stopCondition);
  }

  private handleCommentDirectives(sourceFile: SourceFile): void {

    /*
    * We use a dirty hack to retrieve list of parsed comment directives by accessing
    * internal properties of SourceFile node.
    */

    // Handle comment directive '@ts-nocheck'
    const pragmas = sourceFile.pragmas;
    if (pragmas && pragmas instanceof Map) {
      const noCheckPragma: PragmaPseudoMap[keyof PragmaPseudoMap] | PragmaPseudoMap[keyof PragmaPseudoMap][] = pragmas.get('ts-nocheck');
      if (noCheckPragma) {
        /*
        * The value is either a single entry or an array of entries.
        * Wrap up single entry with array to simplify processing.
        */
        const noCheckEntries = Array.isArray(noCheckPragma) ? noCheckPragma : [noCheckPragma];
        for (const entry of noCheckEntries) {
          this.processNoCheckEntry(entry);
        }
      }
    }

    // Handle comment directives '@ts-ignore' and '@ts-expect-error'
    const commentDirectives = sourceFile.commentDirectives;
    if (commentDirectives && Array.isArray(commentDirectives)) {
      for (const directive of commentDirectives) {
        if (directive.range?.pos === undefined || directive.range?.end === undefined) {
          continue;
        }

        const range = directive.range as TextRange;
        const kind: SyntaxKind =
          sourceFile.text.slice(range.pos, range.pos + 2) === '/*' ?
            SyntaxKind.MultiLineCommentTrivia :
            SyntaxKind.SingleLineCommentTrivia;
        const commentRange: CommentRange = {
          pos: range.pos,
          end: range.end,
          kind
        };

        this.incrementCounters(commentRange, FaultID.ErrorSuppression);
      }
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
    this.reportThisKeywordsInScope(classStaticBlockDecl.body);
  }

  private handleIndexSignature(node: Node): void {
    if (!isAllowedIndexSignature(node as IndexSignatureDeclaration)) {
      this.incrementCounters(node, FaultID.IndexMember);
    }
  }

  public lint(): void {
    this.visitSourceFile(this.sourceFile);
    this.handleCommentDirectives(this.sourceFile);
  }

  private handleExportKeyword(node: Node): void {
    const parentNode = node.parent;
    if (!TypeScriptLinter.inSharedModule(node) || isModuleBlock(parentNode.parent)) {
      return;
    }

    switch (parentNode.kind) {
      case SyntaxKind.EnumDeclaration:
        if (isConstEnum(parentNode.symbol)) {
          break;
        } else {
          this.incrementCounters((parentNode as NamedDeclaration).name ?? parentNode, FaultID.SharedModuleExports);
        }
        return;
      case SyntaxKind.InterfaceDeclaration:
      case SyntaxKind.FunctionDeclaration:
      case SyntaxKind.ClassDeclaration:
        if (!isShareableType(getTypeAtLocationForLinter(parentNode))) {
          this.incrementCounters((parentNode as NamedDeclaration).name ?? parentNode, FaultID.SharedModuleExports);
        }
        return;
      case SyntaxKind.VariableStatement:
        for (const variableDeclaration of (parentNode as VariableStatement).declarationList.declarations) {
          if (!isShareableEntity(variableDeclaration.name)) {
            this.incrementCounters(variableDeclaration.name, FaultID.SharedModuleExports);
          }
        }
        return;
      case SyntaxKind.TypeAliasDeclaration:
        if (!isShareableEntity(parentNode)) {
          this.incrementCounters(parentNode, FaultID.SharedModuleExportsWarning);
        }
        return;
      default:
        this.incrementCounters(parentNode, FaultID.SharedModuleExports);
    }
  }

  private handleExportDeclaration(node: Node): void {
    if (!TypeScriptLinter.inSharedModule(node) || isModuleBlock(node.parent)) {
      return;
    }

    const exportDecl = node as ExportDeclaration;
    if (exportDecl.exportClause === undefined) {
      this.incrementCounters(exportDecl, FaultID.SharedModuleNoWildcardExport);
      return;
    }

    if (isNamespaceExport(exportDecl.exportClause)) {
      if (!isShareableType(getTypeAtLocationForLinter(exportDecl.exportClause.name))) {
        this.incrementCounters(exportDecl.exportClause.name, FaultID.SharedModuleExports);
      }
      return;
    }

    for (const exportSpecifier of exportDecl.exportClause.elements) {
      if (!isShareableEntity(exportSpecifier.name)) {
        this.incrementCounters(exportSpecifier.name, FaultID.SharedModuleExports);
      }
    }
  }

  private handleReturnStatement(node: Node): void {
    // The return value must match the return type of the 'function'
    const returnStat = node as ReturnStatement;
    const expr = returnStat.expression;
    if (!expr) {
      return;
    }
    const lhsType = TypeScriptLinter.tsTypeChecker.getContextualType(expr);
    if (!lhsType) {
      return;
    }
    this.checkAssignmentMatching(node, lhsType, expr, true);
  }

  /**
  * 'arkts-no-structural-typing' check was missing in some scenarios, 
  * in order not to cause incompatibility, 
  * only need to strictly match the type of filling the check again
  */
  private checkAssignmentMatching(
    field: Node,
    lhsType: Type,
    rhsExpr: Expression,
    isMissStructural: boolean = false
  ): void {
    const rhsType = getTypeAtLocationForLinter(rhsExpr);
    // check that 'sendable typeAlias' is assigned correctly
    if (isWrongSendableFunctionAssignment(lhsType, rhsType)) {
      this.incrementCounters(field, FaultID.SendableFunctionAssignment);
    }
    const isStrict = needStrictMatchType(lhsType, rhsType);
    // 'isMissStructural' means that this assignment scenario was previously omitted, so only strict matches are checked now
    if (isMissStructural && !isStrict) {
      return;
    }
    if (needToDeduceStructuralIdentity(lhsType, rhsType, rhsExpr, isStrict)) {
      this.incrementCounters(field, FaultID.StructuralIdentity);
    }
  }

  private handleDecorator(node: Node): void {
    const decorator: Decorator = node as Decorator;
    if (getDecoratorName(decorator) === SENDABLE_DECORATOR) {
      const parent: Node = decorator.parent;
      if (!parent || !SENDABLE_DECORATOR_NODES.includes(parent.kind)) {
        this.incrementCounters(decorator, FaultID.SendableDecoratorLimited);
      }
    }
  }

  private isSendableDecoratorValid(decl: FunctionDeclaration | TypeAliasDeclaration): boolean {
    if (
      this.compatibleSdkVersion > 12 ||
      this.compatibleSdkVersion === 12 && (this.compatibleSdkVersionStage !== 'beta1' && this.compatibleSdkVersionStage !== 'beta2')
    ) {
      return true;
    }
    const curDecorator = getSendableDecorator(decl);
    if (curDecorator) {
      this.incrementCounters(curDecorator, FaultID.SendableBetaCompatible);
    }
    return false;
  }
}
