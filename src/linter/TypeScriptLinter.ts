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

//import Utils = Utils;

import FaultID = Problems.FaultID;
import faultsAttrs = Problems.faultsAttrs;

//import cookBookMsg = cookBookMsg;
//import cookBookTag = ts.cookBookTag;

//import LinterConfig = ts.LinterConfig;

import Autofix = Autofixer.Autofix;
//import Autofixer = ts.Autofixer;

import Logger = ts.perfLogger;

import DiagnosticChecker = DiagnosticCheckerNamespace.DiagnosticChecker;
import ARGUMENT_OF_TYPE_0_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_ERROR_CODE =
      LibraryTypeCallDiagnosticCheckerNamespace.ARGUMENT_OF_TYPE_0_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_ERROR_CODE;
import LibraryTypeCallDiagnosticChecker =
      LibraryTypeCallDiagnosticCheckerNamespace.LibraryTypeCallDiagnosticChecker;

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

    Autofixer.autofixInfo.length = 0;

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

  constructor(private sourceFile: SourceFile,
              /* private */ tsProgram: Program,
              private tscStrictDiagnostics?: Map<Diagnostic[]>) {
    TypeScriptLinter.tsTypeChecker = tsProgram.getTypeChecker();
    this.currentErrorLine = 0;
    this.currentWarningLine = 0;
    this.staticBlocks = new Set<string>();
    this.libraryTypeCallDiagnosticChecker = new LibraryTypeCallDiagnosticChecker(TypeScriptLinter.filteredDiagnosticMessages);
  }

  readonly handlersMap = new Map([
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
    [SyntaxKind.ExportDeclaration, this.handleExportDeclaration],
    [SyntaxKind.ExportAssignment, this.handleExportAssignment],
    [SyntaxKind.CallExpression, this.handleCallExpression], [SyntaxKind.MetaProperty, this.handleMetaProperty],
    [SyntaxKind.NewExpression, this.handleNewExpression], [SyntaxKind.AsExpression, this.handleAsExpression],
    [SyntaxKind.SpreadElement, this.handleSpreadOp], [SyntaxKind.SpreadAssignment, this.handleSpreadOp],
    [SyntaxKind.GetAccessor, this.handleGetAccessor], [SyntaxKind.SetAccessor, this.handleSetAccessor],
    [SyntaxKind.ConstructSignature, this.handleConstructSignature],
    [SyntaxKind.ExpressionWithTypeArguments, this.handleExpressionWithTypeArguments],
  ]);

  public incrementCounters(node: Node | CommentRange, faultId: number, autofixable = false, autofix?: Autofix[]): void {
    if (!TypeScriptLinter.strictMode && faultsAttrs[faultId].migratable) { return; } // In relax mode skip migratable

    const startPos = Utils.getStartPos(node);
    const endPos = Utils.getEndPos(node);

    TypeScriptLinter.nodeCounters[faultId]++;
    // TSC counts lines and columns from zero
    let { line, character } = this.sourceFile.getLineAndCharacterOfPosition(startPos);
    ++line;
    ++character;

    const faultDescr = LinterConfig.nodeDesc[faultId];
    const faultType = "unknown"; //TypeScriptLinter.tsSyntaxKindNames[node.kind];

    const cookBookMsgNum = faultsAttrs[faultId] ? Number(faultsAttrs[faultId].cookBookRef) : 0;
    const cookBookTg = cookBookTag[cookBookMsgNum];
    let severity = Utils.ProblemSeverity.ERROR;
    if (faultsAttrs[faultId] && faultsAttrs[faultId].warning) {
      severity = Utils.ProblemSeverity.WARNING;
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
    if (!!symbol && Utils.symbolHasDuplicateName(symbol, tsDeclKind ?? tsDeclNode.kind)) {
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

  private isPrototypePropertyAccess(tsPropertyAccess: ts.PropertyAccessExpression, propAccessSym: ts.Symbol | undefined, baseExprSym: ts.Symbol | undefined, baseExprType: ts.Type): boolean {
    if (!(isIdentifier(tsPropertyAccess.name) && tsPropertyAccess.name.text === "prototype")) {
      return false;
    }
    // #13600: Relax prototype check when expression comes from interop.
    let curPropAccess: Node = tsPropertyAccess;
    while (curPropAccess && isPropertyAccessExpression(curPropAccess)) {
      const baseExprSym = Utils.trueSymbolAtLocation(curPropAccess.expression);
      if (Utils.isLibrarySymbol(baseExprSym)) {
        return false;
      }
      curPropAccess = curPropAccess.expression;
    }
    if (ts.isIdentifier(curPropAccess) && curPropAccess.text !== 'prototype') {
      const type = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(curPropAccess);
      if (Utils.isAnyType(type)) {
        return false;
      }
    }
    // Check if property symbol is "Prototype"
    if (Utils.isPrototypeSymbol(propAccessSym)) return true;

    // Check if symbol of LHS-expression is Class or Function.
    if (Utils.isTypeSymbol(baseExprSym) || Utils.isFunctionSymbol(baseExprSym)) {
      return true;
    }
    // Check if type of LHS expression Function type or Any type.
    // The latter check is to cover cases with multiple prototype
    // chain (as the 'Prototype' property should be 'Any' type):
    //      X.prototype.prototype.prototype = ...
    const baseExprTypeNode = TypeScriptLinter.tsTypeChecker.typeToTypeNode(
      baseExprType, undefined, NodeBuilderFlags.None
    );

    return ((baseExprTypeNode && isFunctionTypeNode(baseExprTypeNode)) || Utils.isAnyType(baseExprType));
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
    if (Utils.isDestructuringAssignmentLHS(objectLiteralExpr)) {
      return;
    }
    const objectLiteralType = TypeScriptLinter.tsTypeChecker.getContextualType(objectLiteralExpr);
    if (!Utils.isStructObjectInitializer(objectLiteralExpr) &&
        !Utils.isDynamicLiteralInitializer(objectLiteralExpr) &&
        !Utils.isExpressionAssignableToType(objectLiteralType, objectLiteralExpr)
      //  !Utils.validateObjectLiteralType(objectLiteralType) || Utils.hasMemberFunction(objectLiteralExpr) ||
      //  !Utils.validateFields(objectLiteralType, objectLiteralExpr)
    ) {
      this.incrementCounters(node, FaultID.ObjectLiteralNoContextType);
    }
  }

  private handleArrayLiteralExpression(node: Node): void {
    // If array literal is a part of destructuring assignment, then
    // don't process it further.
    if (Utils.isDestructuringAssignmentLHS(node as ArrayLiteralExpression)) return;

    const arrayLitNode = node as ArrayLiteralExpression;
    let noContextTypeForArrayLiteral = false;

    // check that array literal consists of inferrable types
    // e.g. there is no element which is untyped object literals
    const arrayLitElements = arrayLitNode.elements;
    for(const element of arrayLitElements) {
      if(element.kind === SyntaxKind.ObjectLiteralExpression) {
        const objectLiteralType = TypeScriptLinter.tsTypeChecker.getContextualType(element);
        if (!Utils.isDynamicLiteralInitializer(arrayLitNode) &&
            !Utils.isExpressionAssignableToType(objectLiteralType, element)) {
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
    const tsParamMods = tsParam.modifiers;
    if (
      tsParamMods &&
      (Utils.hasModifier(tsParamMods, SyntaxKind.PublicKeyword) ||
        Utils.hasModifier(tsParamMods, SyntaxKind.ProtectedKeyword) ||
        Utils.hasModifier(tsParamMods, SyntaxKind.ReadonlyKeyword) ||
        Utils.hasModifier(tsParamMods, SyntaxKind.PrivateKeyword))
    ) {
      this.incrementCounters(node, FaultID.ParameterProperties);
    }
    this.handleDecorators(tsParam.decorators);

    this.handleDeclarationInferredType(tsParam);
  }

  private handleEnumDeclaration(node: Node): void {
    const enumNode = node as EnumDeclaration;
    this.countDeclarationsWithDuplicateName(enumNode.name, enumNode);

    const enumSymbol = Utils.trueSymbolAtLocation(enumNode.name);
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
    const iSymbol = Utils.trueSymbolAtLocation(interfaceNode.name);
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
    if (!throwExprType.isClassOrInterface() || !Utils.isDerivedFrom(throwExprType, Utils.CheckType.Error)) {
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
    const expr = tsForOfStmt.expression;
    const exprType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(expr);
    const exprTypeNode = TypeScriptLinter.tsTypeChecker.typeToTypeNode(
      exprType, undefined, NodeBuilderFlags.None
    );

    const isArrayLike =
      isArrayLiteralExpression(expr) ||
      (exprTypeNode && isArrayTypeNode(exprTypeNode)) ||
      Utils.isTypedArray(exprTypeNode) ||
      Utils.isDerivedFrom(exprType, Utils.CheckType.Array);
    const isStringLike = exprType.isStringLiteral() || Utils.isStringType(exprType) ||
                          Utils.isDerivedFrom(exprType, Utils.CheckType.String);
    const isSetLike = Utils.isType(exprTypeNode, "Set") ||
                      Utils.isDerivedFrom(exprType, Utils.CheckType.Set);
    const isMapLike = Utils.isType(exprTypeNode, "Map") ||
                      Utils.isDerivedFrom(exprType, Utils.CheckType.Map);
    if (!isArrayLike && !isStringLike && !isSetLike && !isMapLike) {
      this.incrementCounters(node, FaultID.ForOfNonArray);
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
    if (ts.isCallExpression(node.parent) && node == node.parent.expression) {
      return;
    }

    const propertyAccessNode = node as PropertyAccessExpression;
    const exprSym = Utils.trueSymbolAtLocation(propertyAccessNode);
    const baseExprSym = Utils.trueSymbolAtLocation(propertyAccessNode.expression);
    const baseExprType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(propertyAccessNode.expression);
    if (this.isPrototypePropertyAccess(propertyAccessNode, exprSym, baseExprSym, baseExprType)) { 
      this.incrementCounters(propertyAccessNode.name, FaultID.Prototype);
    }
    if (!!exprSym && Utils.isSymbolAPI(exprSym)) {
      this.incrementCounters(propertyAccessNode, FaultID.SymbolType);
    }
    if (baseExprSym !== undefined && Utils.symbolHasEsObjectType(baseExprSym)) {
      this.incrementCounters(propertyAccessNode, FaultID.EsObjectAccess);
    }
  }

  private handlePropertyAssignmentOrDeclaration(node: Node) {
    const propName = (node as PropertyAssignment | PropertyDeclaration).name;

    if (propName && (propName.kind === SyntaxKind.NumericLiteral || propName.kind === SyntaxKind.StringLiteral)) {
      // We can use literals as property names only when creating Record or any interop instances.
      let isRecordObjectInitializer = false;
      let isDynamicLiteralInitializer = false;
      if (isPropertyAssignment(node)) {
        const objectLiteralType = TypeScriptLinter.tsTypeChecker.getContextualType(node.parent);
        isRecordObjectInitializer = !!objectLiteralType && Utils.isStdRecordType(objectLiteralType);
        isDynamicLiteralInitializer = Utils.isDynamicLiteralInitializer(node.parent);
      }

      if (!isRecordObjectInitializer && !isDynamicLiteralInitializer) {
        let autofix: Autofix[] | undefined = Autofixer.fixLiteralAsPropertyName(node);
        const autofixable = autofix !== undefined;
        if (!Autofixer.shouldAutofix(node, FaultID.LiteralAsPropertyName)) {
          autofix = undefined;
        }
        this.incrementCounters(node, FaultID.LiteralAsPropertyName, autofixable, autofix);
      }
    }

    if (isPropertyDeclaration(node)) {
      const decorators = node.decorators;
      this.handleDecorators(decorators);
      this.filterOutDecoratorsDiagnostics(
          decorators,
          Utils.NON_INITIALIZABLE_PROPERTY_DECORATORS,
          { begin: propName.getStart(), end: propName.getStart() },
          Utils.PROPERTY_HAS_NO_INITIALIZER_ERROR_CODE
        );
      const classDecorators = node.parent.decorators;
      const propType = (node as ts.PropertyDeclaration).type?.getText();
      this.filterOutDecoratorsDiagnostics(classDecorators, Utils.NON_INITIALIZABLE_PROPERTY_ClASS_DECORATORS,
        {begin: propName.getStart(), end: propName.getStart()}, Utils.PROPERTY_HAS_NO_INITIALIZER_ERROR_CODE, propType);
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
        if (expectedDecorators.includes(Utils.NON_INITIALIZABLE_PROPERTY_ClASS_DECORATORS[0])) {
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

  private filterStrictDiagnostics(range: { begin: number, end: number }, code: number,
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
      if (val.code !== code) {
        return true;
      }
      if (val.start === undefined || val.start < range.begin || val.start > range.end) {
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
    const hasValidContext = Utils.hasPredecessor(funcExpr, isClassLike) ||
                            Utils.hasPredecessor(funcExpr, isInterfaceDeclaration);
    const isGeneric = funcExpr.typeParameters !== undefined && funcExpr.typeParameters.length > 0;
    const [hasUnfixableReturnType, newRetTypeNode] = this.handleMissingReturnType(funcExpr);
    const autofixable = !isGeneric && !isGenerator && !containsThis && !hasUnfixableReturnType;

    let autofix: Autofix[] | undefined;
    if (autofixable && Autofixer.shouldAutofix(node, FaultID.FunctionExpression)) {
      autofix = [ Autofixer.fixFunctionExpression(funcExpr, funcExpr.parameters, newRetTypeNode) ];
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
    const hasValidContext = Utils.hasPredecessor(arrowFunc, isClassLike) ||
                            Utils.hasPredecessor(arrowFunc, isInterfaceDeclaration);
    if (containsThis && !hasValidContext) {
      this.incrementCounters(arrowFunc, FaultID.FunctionContainsThis);
    }

    const contextType = TypeScriptLinter.tsTypeChecker.getContextualType(arrowFunc);
    if (!(contextType && Utils.isLibraryType(contextType))) {
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

      if (!tsRetType || Utils.isUnsupportedType(tsRetType)) {
        hasLimitedRetTypeInference = true;
      }
      else if (hasLimitedRetTypeInference) {
        newRetTypeNode = TypeScriptLinter.tsTypeChecker.typeToTypeNode(tsRetType, funcLikeDecl, NodeBuilderFlags.None);
        autofixable = !!newRetTypeNode;

        if (!isFuncExpr && newRetTypeNode && Autofixer.shouldAutofix(funcLikeDecl, FaultID.LimitedReturnTypeInference)) {
          autofix = [Autofixer.fixReturnType(funcLikeDecl, newRetTypeNode)];
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
      if (hasLimitedTypeInference) return;

      if (
        isReturnStatement(tsNode) && tsNode.expression &&
        Utils.isCallToFunctionWithOmittedReturnType(Utils.unwrapParenthesized(tsNode.expression))
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
      const tsExpr = Utils.unwrapParenthesized(funBody);
      hasLimitedTypeInference = Utils.isCallToFunctionWithOmittedReturnType(tsExpr);
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
              !Utils.isIntegerConstantValue(tsUnaryArithm.operand as NumericLiteral))
          ) {
        this.incrementCounters(node, FaultID.UnaryArithmNotNumber);
      }
    }
  }

  private handleBinaryExpression(node: Node): void {
    const tsBinaryExpr = node as BinaryExpression;
    const tsLhsExpr = tsBinaryExpr.left;
    const tsRhsExpr = tsBinaryExpr.right;

    if (Utils.isAssignmentOperator(tsBinaryExpr.operatorToken)) {
      if (isObjectLiteralExpression(tsLhsExpr) || isArrayLiteralExpression(tsLhsExpr)) {
        this.incrementCounters(node, FaultID.DestructuringAssignment);
      }
      if (isPropertyAccessExpression(tsLhsExpr)) {
        const tsLhsSymbol = Utils.trueSymbolAtLocation(tsLhsExpr);
        const tsLhsBaseSymbol = Utils.trueSymbolAtLocation(tsLhsExpr.expression);
        if (tsLhsSymbol && (tsLhsSymbol.flags & SymbolFlags.Method)) {
          this.incrementCounters(tsLhsExpr, FaultID.NoUndefinedPropAccess);
        }
        if (
          Utils.isMethodAssignment(tsLhsSymbol) && tsLhsBaseSymbol &&
          (tsLhsBaseSymbol.flags & SymbolFlags.Function) !== 0
        ) {
          this.incrementCounters(tsLhsExpr, FaultID.PropertyDeclOnFunction);
        }
      }
    }

    const leftOperandType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsLhsExpr);
    const rightOperandType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsRhsExpr);

    if (tsBinaryExpr.operatorToken.kind === SyntaxKind.PlusToken) {
      if (Utils.isEnumMemberType(leftOperandType) && Utils.isEnumMemberType(rightOperandType)) {
        if (
            ((leftOperandType.flags & (TypeFlags.NumberLike)) && (rightOperandType.getFlags() & (TypeFlags.NumberLike))) ||
            ((leftOperandType.flags & (TypeFlags.StringLike)) && (rightOperandType.getFlags() & (TypeFlags.StringLike)))
          ) {
          return;
        }
      }
      else if (Utils.isNumberType(leftOperandType) && Utils.isNumberType(rightOperandType)) {
        return;
      }
      else if (Utils.isStringLikeType(leftOperandType) || Utils.isStringLikeType(rightOperandType)) {
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
      if (!(Utils.isNumberType(leftOperandType) && Utils.isNumberType(rightOperandType))||
            (tsLhsExpr.kind === SyntaxKind.NumericLiteral && !Utils.isIntegerConstantValue(tsLhsExpr as NumericLiteral)) ||
            (tsRhsExpr.kind === SyntaxKind.NumericLiteral && !Utils.isIntegerConstantValue(tsRhsExpr as NumericLiteral))
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
      const leftExpr = Utils.unwrapParenthesized(tsBinaryExpr.left);
      const leftSymbol = Utils.trueSymbolAtLocation(leftExpr);
      // In STS, the left-hand side expression may be of any reference type, otherwise
      // a compile-time error occurs. In addition, the left operand in STS cannot be a type.
      if (tsLhsExpr.kind === SyntaxKind.ThisKeyword) {
        return;
      }
      if (Utils.isPrimitiveType(leftOperandType) || isTypeNode(leftExpr) || Utils.isTypeSymbol(leftSymbol)) {
        this.incrementCounters(node, FaultID.InstanceofUnsupported);
      }
    }
    else if (tsBinaryExpr.operatorToken.kind === SyntaxKind.EqualsToken) {
      if (Utils.needToDeduceStructuralIdentity(rightOperandType, leftOperandType)) {
        this.incrementCounters(tsBinaryExpr, FaultID.StructuralIdentity);
      }
      const typeNode = Utils.getVariableDeclarationTypeNode(tsLhsExpr);
      if (!!typeNode) {
        this.handleEsObjectAssignment(tsBinaryExpr, typeNode, tsRhsExpr);
      }
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
      if (Utils.needToDeduceStructuralIdentity(tsInitType, tsVarType)) {
        this.incrementCounters(tsVarDecl, FaultID.StructuralIdentity);
      }
      this.handleEsObjectAssignment(tsVarDecl, tsVarDecl.type, tsVarInit);
    }

    this.handleDeclarationInferredType(tsVarDecl);
    this.handleDefiniteAssignmentAssertion(tsVarDecl);
  }

  private handleEsObjectAssignment(node: Node, type: TypeNode, value: Node) {
    if (!Utils.isEsObjectType(type)) {
      const valueTypeNode = Utils.getVariableDeclarationTypeNode(value);
      if (!!valueTypeNode && Utils.isEsObjectType(valueTypeNode)) {
        this.incrementCounters(node, FaultID.EsObjectAssignment);
      }
      return;
    }

    if (isArrayLiteralExpression(value) || isObjectLiteralExpression(value)) {
      this.incrementCounters(node, FaultID.EsObjectAssignment);
      return;
    }

    const valueType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(value);
    if (Utils.isUnsupportedType(valueType)) {
      return;
    }

    if (Utils.isAnonymousType(valueType)) {
      return;
    }

    this.incrementCounters(node, FaultID.EsObjectAssignment);
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

    this.handleDecorators(tsClassDecl.decorators);
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
        Utils.hasModifier(tsModifiers, SyntaxKind.DeclareKeyword)) {
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
        if (Utils.isDefaultImport(importSpec)) defaultSpec = importSpec;
        else nonDefaultSpecs.push(importSpec);
      }
      if (defaultSpec) {
        let autofix: Autofix[] | undefined;
        // if (Autofixer.shouldAutofix(defaultSpec, FaultID.DefaultImport))
        //  autofix = [ Autofixer.fixDefaultImport(tsImportClause, defaultSpec, nonDefaultSpecs) ];
        this.incrementCounters(defaultSpec, FaultID.DefaultImport, true, autofix);
      }
    }

    if (tsImportClause.isTypeOnly) {
      let autofix: Autofix[] | undefined;
      //if (Autofixer.shouldAutofix(node, FaultID.TypeOnlyImport))
      //  autofix = [ Autofixer.dropTypeOnlyFlag(tsImportClause) ];
      this.incrementCounters(node, FaultID.TypeOnlyImport, true, autofix);
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
    this.handleDecorators(tsMethodDecl.decorators);
    this.filterOutDecoratorsDiagnostics(Utils.getDecorators(tsMethodDecl), Utils.NON_RETURN_FUNCTION_DECORATORS,
      { begin: tsMethodDecl.parameters.end, end: tsMethodDecl.body?.getStart() ?? tsMethodDecl.parameters.end },
      Utils.FUNCTION_HAS_NO_RETURN_ERROR_CODE);
  }

  private handleIdentifier(node: Node): void {
    const tsIdentifier = node as Identifier;
    const tsIdentSym = Utils.trueSymbolAtLocation(tsIdentifier);

    if (tsIdentSym !== undefined) {
      if (
        (tsIdentSym.flags & SymbolFlags.Module) !== 0 &&
        (tsIdentSym.flags & SymbolFlags.Transient) !== 0 &&
        tsIdentifier.text === "globalThis"
      ) {
        this.incrementCounters(node, FaultID.GlobalThis);
      }
      else if (Utils.isGlobalSymbol(tsIdentSym) && Utils.LIMITED_STD_GLOBAL_VAR.includes(tsIdentSym.getName())) {
        this.incrementCounters(node, FaultID.LimitedStdLibApi);
      }
      else
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
      if (callee !== ctx && Utils.hasLibraryType(callee)) {
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
      if (!!tsIdentSym && Utils.symbolHasDuplicateName(tsIdentSym, SyntaxKind.ModuleDeclaration)) {
        return;
      }
    }
    if ((tsIdentSym.flags & illegalValues) === 0 || Utils.isStruct(tsIdentSym) ||
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
      (isElementAccessExpression(parent)
        && (parent as ElementAccessExpression).expression == ident && (tsSym.flags & SymbolFlags.Enum)) ||
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

  private handleElementAccessExpression(node: Node): void {
    const tsElementAccessExpr = node as ElementAccessExpression;
    const tsElemAccessBaseExprType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsElementAccessExpr.expression);
    const tsElemAccessBaseExprTypeNode = TypeScriptLinter.tsTypeChecker.typeToTypeNode(tsElemAccessBaseExprType, undefined, NodeBuilderFlags.None);
    const isDerivedFromArray = Utils.isDerivedFrom(tsElemAccessBaseExprType, Utils.CheckType.Array);
    const checkClassOrInterface = tsElemAccessBaseExprType.isClassOrInterface() &&
                                  !Utils.isGenericArrayType(tsElemAccessBaseExprType) &&
                                  !isDerivedFromArray;
    const checkThisOrSuper = Utils.isThisOrSuperExpr(tsElementAccessExpr.expression) && !isDerivedFromArray;

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
        !Utils.isLibraryType(tsElemAccessBaseExprType) && !Utils.isTypedArray(tsElemAccessBaseExprTypeNode) &&
          (checkClassOrInterface ||
            Utils.isObjectLiteralType(tsElemAccessBaseExprType) || checkThisOrSuper)
        ) {
      let autofix = Autofixer.fixPropertyAccessByIndex(node);
      const autofixable = autofix !== undefined;
      if (!Autofixer.shouldAutofix(node, FaultID.PropertyAccessByIndex)) {
        autofix = undefined;
      }
      this.incrementCounters(node, FaultID.PropertyAccessByIndex, autofixable, autofix);
    }
    if (Utils.hasEsObjectType(tsElementAccessExpr.expression)) {
      this.incrementCounters(node, FaultID.EsObjectAccess);
    }
  }

  private handleEnumMember(node: Node): void {
    const tsEnumMember = node as EnumMember;
    const tsEnumMemberType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsEnumMember);
    const constVal = TypeScriptLinter.tsTypeChecker.getConstantValue(tsEnumMember);

    if (tsEnumMember.initializer && !Utils.isValidEnumMemberInit(tsEnumMember.initializer)) {
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

  private handleExportDeclaration(node: Node): void {
    const tsExportDecl = node as ExportDeclaration;
    if (tsExportDecl.isTypeOnly) {
      let autofix: Autofix[] | undefined;
      //if (Autofixer.shouldAutofix(node, FaultID.TypeOnlyExport))
      //  autofix = [ Autofixer.dropTypeOnlyFlag(tsExportDecl) ];
      this.incrementCounters(node, FaultID.TypeOnlyExport, true, autofix);
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

    const calleeSym = Utils.trueSymbolAtLocation(tsCallExpr.expression);
    const calleeType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsCallExpr.expression);
    const callSignature = TypeScriptLinter.tsTypeChecker.getResolvedSignature(tsCallExpr);

    this.handleImportCall(tsCallExpr);
    this.handleRequireCall(tsCallExpr);
    // NOTE: Keep handleFunctionApplyBindPropCall above handleGenericCallWithNoTypeArgs here!!!
    if (calleeSym !== undefined) {
      this.handleStdlibAPICall(tsCallExpr, calleeSym);
      this.handleFunctionApplyBindPropCall(tsCallExpr, calleeSym);
      if (Utils.symbolHasEsObjectType(calleeSym)) {
        this.incrementCounters(tsCallExpr, FaultID.EsObjectAccess);
      }
    }
    if (callSignature !== undefined) {
      if (!Utils.isLibrarySymbol(calleeSym)) {
        this.handleGenericCallWithNoTypeArgs(tsCallExpr, callSignature);
      }
      this.handleStructIdentAndUndefinedInArgs(tsCallExpr, callSignature);
    }
    this.handleLibraryTypeCall(tsCallExpr, calleeType);
    
    if (ts.isPropertyAccessExpression(tsCallExpr.expression) && Utils.hasEsObjectType(tsCallExpr.expression.expression)) {
      this.incrementCounters(node, FaultID.EsObjectAccess);
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
      if (Utils.isInterfaceType(tsType) && tsType.symbol.name === "NodeRequire") {
        this.incrementCounters(tsCallExpr.parent, FaultID.ImportAssignment);
      }
    }
  }

  private handleGenericCallWithNoTypeArgs(callLikeExpr: ts.CallExpression | ts.NewExpression, callSignature: ts.Signature) {

    const tsSyntaxKind = isNewExpression(callLikeExpr) ? SyntaxKind.Constructor : SyntaxKind.FunctionDeclaration;
    const signDecl = TypeScriptLinter.tsTypeChecker.signatureToSignatureDeclaration(callSignature, tsSyntaxKind,
        undefined, NodeBuilderFlags.WriteTypeArgumentsOfSignature | NodeBuilderFlags.IgnoreErrors);

    if (signDecl?.typeArguments) {
      const resolvedTypeArgs = signDecl.typeArguments;

      const startTypeArg = callLikeExpr.typeArguments?.length ?? 0;
      for (let i = startTypeArg; i < resolvedTypeArgs.length; ++i) {
        if (!Utils.isSupportedType(resolvedTypeArgs[i])) {
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
  private handleFunctionApplyBindPropCall(tsCallExpr: ts.CallExpression, calleeSym: ts.Symbol) {
    const exprName = TypeScriptLinter.tsTypeChecker.getFullyQualifiedName(calleeSym);
    if (TypeScriptLinter.listApplyBindCallApis.includes(exprName)) {
      this.incrementCounters(tsCallExpr, FaultID.FunctionApplyBindCall);
    }
  }

  private handleStructIdentAndUndefinedInArgs(tsCallOrNewExpr: ts.CallExpression | ts.NewExpression, callSignature: ts.Signature) {
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
        if (tsParamDecl.dotDotDotToken && Utils.isGenericArrayType(tsParamType) && tsParamType.typeArguments) {
          tsParamType = tsParamType.typeArguments[0];
        }
        if (!tsParamType) continue;

        if (Utils.needToDeduceStructuralIdentity(tsArgType, tsParamType)){
          this.incrementCounters(tsArg, FaultID.StructuralIdentity);
        }
      }
    }
  }

  // let re = new RegExp("^(" + arr.reduce((acc, v) => ((acc ? (acc + "|") : "") + v)) +")$")
  private static LimitedApis = new Map<string, {arr: Array<string> | null, fault: FaultID}> ([
    ["global", {arr: Utils.LIMITED_STD_GLOBAL_FUNC, fault: FaultID.LimitedStdLibApi}],
    ["Object", {arr: Utils.LIMITED_STD_OBJECT_API, fault: FaultID.LimitedStdLibApi}],
    ["ObjectConstructor", {arr: Utils.LIMITED_STD_OBJECT_API, fault: FaultID.LimitedStdLibApi}],
    ["Reflect", {arr: Utils.LIMITED_STD_REFLECT_API, fault: FaultID.LimitedStdLibApi}],
    ["ProxyHandler", {arr: Utils.LIMITED_STD_PROXYHANDLER_API, fault: FaultID.LimitedStdLibApi}],
    ["ArrayBuffer", {arr: Utils.LIMITED_STD_ARRAYBUFFER_API, fault: FaultID.LimitedStdLibApi}],
    ["ArrayBufferConstructor", {arr: Utils.LIMITED_STD_ARRAYBUFFER_API, fault: FaultID.LimitedStdLibApi}],
    ["Symbol", {arr: null, fault: FaultID.SymbolType}],
    ["SymbolConstructor", {arr: null, fault: FaultID.SymbolType}],
  ])

  private handleStdlibAPICall(callExpr: ts.CallExpression, calleeSym: ts.Symbol) {
    const name = calleeSym.getName();
    const parName = Utils.getParentSymbolName(calleeSym);
    if (parName === undefined) {
      if (Utils.LIMITED_STD_GLOBAL_FUNC.includes(name)) {
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

    
  private handleLibraryTypeCall(callExpr: ts.CallExpression, calleeType: ts.Type) {
    let inLibCall = Utils.isLibraryType(calleeType);
    const diagnosticMessages: Array<ts.DiagnosticMessageChain> = []
    this.libraryTypeCallDiagnosticChecker.configure(inLibCall, diagnosticMessages);

    this.filterStrictDiagnostics({ begin: callExpr.pos, end: callExpr.end },
      ARGUMENT_OF_TYPE_0_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_ERROR_CODE,
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
    if (Utils.needToDeduceStructuralIdentity(exprType, targetType, true)) {
      this.incrementCounters(tsAsExpr, FaultID.StructuralIdentity);
    }
    // check for rule#65:   "number as Number" and "boolean as Boolean" are disabled
    if(
        (Utils.isNumberType(exprType) && targetType.getSymbol()?.getName() === "Number") ||
        (Utils.isBooleanType(exprType) && targetType.getSymbol()?.getName() === "Boolean")
    ) {
      this.incrementCounters(node, FaultID.TypeAssertion);
    }
  }

  private handleTypeReference(node: Node): void {
    const typeRef = node as TypeReferenceNode;

    if (isIdentifier(typeRef.typeName) && Utils.LIMITED_STANDARD_UTILITY_TYPES.includes(typeRef.typeName.text)) {
      this.incrementCounters(node, FaultID.UtilityType);
    }
    else if (Utils.isEsObjectType(typeRef) && !Utils.isEsObjectAllowed(typeRef)) {
      this.incrementCounters(node, FaultID.EsObjectType);
    }
    else if (
      isIdentifier(typeRef.typeName) && typeRef.typeName.text === "Partial" &&
      typeRef.typeArguments && typeRef.typeArguments.length === 1
    ) {
      // Using Partial<T> type is allowed only when its argument type is either Class or Interface.
      const argType = TypeScriptLinter.tsTypeChecker.getTypeFromTypeNode(typeRef.typeArguments[0]);
      if (!argType || !argType.isClassOrInterface()) {
        this.incrementCounters(node, FaultID.UtilityType);
      }
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
              Utils.isTypedArray(spreadExprTypeNode) ||
              Utils.isDerivedFrom(spreadExprType, Utils.CheckType.Array)) {
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
    const symbol = Utils.trueSymbolAtLocation(tsTypeExpr.expression);
    if (!!symbol && Utils.isEsObjectSymbol(symbol)) {
      this.incrementCounters(tsTypeExpr, FaultID.EsObjectType);
    }
  }

  private checkErrorSuppressingAnnotation(comment: CommentRange, srcText: string) {
    const commentContent = comment.kind === SyntaxKind.MultiLineCommentTrivia
      ? srcText.slice(comment.pos + 2, comment.end - 2)
      : srcText.slice(comment.pos + 2, comment.end);

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
      if (!Utils.ARKUI_DECORATORS.includes(decoratorName)) {
        this.incrementCounters(decorator, FaultID.UnsupportedDecorators);
      }
    }
  }

  private handleGetAccessor(node: Node) {
    this.handleDecorators((node as GetAccessorDeclaration).decorators);
  }

  private handleSetAccessor(node: Node) {
    this.handleDecorators((node as SetAccessorDeclaration).decorators);
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

  private checkAnyOrUnknownChildNode(node: ts.Node): boolean {
    if (node.kind === ts.SyntaxKind.AnyKeyword ||
        node.kind === ts.SyntaxKind.UnknownKeyword) {
      return true;
    }
    for (let child of node.getChildren()) {
      if (this.checkAnyOrUnknownChildNode(child)) {
        return true;
      }
    }
    return false;
  }

  private handleInferredObjectreference(
    type: ts.Type,
    decl: ts.VariableDeclaration | ts.PropertyDeclaration | ts.ParameterDeclaration
  ) {
    const typeArgs = TypeScriptLinter.tsTypeChecker.getTypeArguments(type as ts.TypeReference);
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
    const isObject = type.flags & ts.TypeFlags.Object;
    const isReference = (type as ts.ObjectType).objectFlags & ts.ObjectFlags.Reference;
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

    if (Utils.isAnyType(type)) {
      this.incrementCounters(decl, FaultID.AnyType);
    }
    else if (Utils.isUnknownType(type)) {
      this.incrementCounters(decl, FaultID.UnknownType);
    }
  }

  public lint(): void {
    this.visitTSNode(this.sourceFile);
  }

}
}
