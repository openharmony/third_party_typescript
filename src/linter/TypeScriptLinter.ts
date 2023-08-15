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

//const logger = Logger.getLogger();

export function consoleLog(...args: any[]): void {
  if (TypeScriptLinter.ideMode) return;

  let outLine = "";
  for (let k = 0; k < args.length; k++) {
    outLine += `${args[k]} `;
  }

  Logger.logEvent(outLine);
}

enum ProblemSeverity { WARNING = 1, ERROR = 2 }
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

  static reportDiagnostics: boolean = true;

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

  public static initStatic(): void {
    TypeScriptLinter.ideMode = false;
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

  constructor(private sourceFile: SourceFile, /* private */ tsProgram: Program) {
    TypeScriptLinter.tsTypeChecker = tsProgram.getTypeChecker();
    this.currentErrorLine = 0;
    this.currentWarningLine = 0;
    this.staticBlocks = new Set<string>();
  }

  readonly handlersMap = new Map([
    [SyntaxKind.ObjectLiteralExpression, this.handleObjectLiteralExpression],
    [SyntaxKind.ArrayLiteralExpression, this.handleArrayLiteralExpression],
    [SyntaxKind.Parameter, this.handleParameter], [SyntaxKind.TypeOperator, this.handleTypeOperator],
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
    [SyntaxKind.SwitchStatement, this.handleSwitchStatement], [SyntaxKind.Identifier, this.handleIdentifier],
    [SyntaxKind.ElementAccessExpression, this.handleElementAccessExpression],
    [SyntaxKind.EnumMember, this.handleEnumMember], [SyntaxKind.TypeReference, this.handleTypeReference],
    [SyntaxKind.ExportDeclaration, this.handleExportDeclaration],
    [SyntaxKind.ExportAssignment, this.handleExportAssignment],
    [SyntaxKind.CallExpression, this.handleCallExpression], [SyntaxKind.MetaProperty, this.handleMetaProperty],
    [SyntaxKind.NewExpression, this.handleNewExpression], [SyntaxKind.AsExpression, this.handleAsExpression],
    [SyntaxKind.SpreadElement, this.handleSpreadOp], [SyntaxKind.SpreadAssignment, this.handleSpreadOp],
    [SyntaxKind.NonNullExpression, this.handleNonNullExpression],
    [SyntaxKind.GetAccessor, this.handleGetAccessor], [SyntaxKind.SetAccessor, this.handleSetAccessor],
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

    if (TypeScriptLinter.reportDiagnostics) {
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
    }
    else {
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
      if (node.kind === SyntaxKind.StructDeclaration) {
      //if ( SyntaxKind[node.kind] === 'StructDeclaration') {
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

  private typeHierarchyHasTypeError(type: Type): boolean {
    const symbol = type.getSymbol();
    if (symbol?.getName() === "Error") return true;

    const baseTypes = type.getBaseTypes();
    if (baseTypes) {
      for (const baseType of baseTypes) {
        if (this.typeHierarchyHasTypeError(baseType)) return true;
      }
    }
    return false;
  }

  private countDeclarationsWithDuplicateName(
    symbol: Symbol | undefined, tsDeclNode: Node, tsDeclKind?: SyntaxKind
  ): void {
    // Sanity check.
    if (!symbol) return;

    // If specific declaration kind is provided, check against it.
    // Otherwise, use syntax kind of corresponding declaration node.
    if (Utils.symbolHasDuplicateName(symbol, tsDeclKind ?? tsDeclNode.kind)) {
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

  private isPropertyRuntimeCheck(expr: PropertyAccessExpression): boolean {
    // Check whether base expression is 'any' type and its property
    // is being checked in runtime (i.e. expression appears as condition
    // of if/for/while, or is an operand of '&&', '||' or '!' operators).
    const tsBaseExprType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(expr.expression);

    // Get parent node of the expression, pass through enclosing parentheses if needed.
    let exprParent = expr.parent;
    while (isParenthesizedExpression(exprParent)) {
      exprParent = exprParent.parent;
    }
    return (
      Utils.isAnyType(tsBaseExprType) &&
      (
        (isIfStatement(exprParent) && expr === Utils.unwrapParenthesized(exprParent.expression)) ||
        (isWhileStatement(exprParent) && expr === Utils.unwrapParenthesized(exprParent.expression)) ||
        (isDoStatement(exprParent) && expr === Utils.unwrapParenthesized(exprParent.expression)) ||
        (isForStatement(exprParent) && exprParent.condition &&
          expr === Utils.unwrapParenthesized(exprParent.condition)) ||
        (isConditionalExpression(exprParent) && expr === Utils.unwrapParenthesized(exprParent.condition)) ||
        (isBinaryExpression(exprParent) &&
          (exprParent.operatorToken.kind === SyntaxKind.AmpersandAmpersandToken ||
            exprParent.operatorToken.kind === SyntaxKind.BarBarToken)) ||
        (isPrefixUnaryExpression(exprParent) && exprParent.operator === SyntaxKind.ExclamationToken)
      )
    );
  }

  private isIIFEasNamespace(tsExpr: PropertyAccessExpression): boolean {
    const nameSymbol = TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(tsExpr.name);
    if (!nameSymbol) {
      const leftHandSymbol = TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(tsExpr.expression);
      if (leftHandSymbol) {
        const decls = leftHandSymbol.getDeclarations();
        if (!decls || decls.length !== 1) return false;

        const leftHandDecl = decls[0];
        if (!isVariableDeclaration(leftHandDecl)) return false;
        const varDecl = leftHandDecl;

        if (varDecl.initializer && isCallExpression(varDecl.initializer)) {
          const callExpr = varDecl.initializer;
          const expr = Utils.unwrapParenthesized(callExpr.expression);
          if (isFunctionExpression(expr)) return true;
        }
      }
    }

    return false;
  }

  private isPrototypePropertyAccess(tsPropertyAccess: PropertyAccessExpression): boolean {
    if (!(isIdentifier(tsPropertyAccess.name) && tsPropertyAccess.name.text === "prototype")) {
      return false;
    }
    // Check if property symbol is "Prototype"
    const propAccessSym = TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(tsPropertyAccess);
    if (Utils.isPrototypeSymbol(propAccessSym)) return true;

    // Check if symbol of LHS-expression is Class or Function.
    const tsBaseExpr = tsPropertyAccess.expression;
    const baseExprSym = TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(tsBaseExpr);
    if (Utils.isTypeSymbol(baseExprSym) || Utils.isFunctionSymbol(baseExprSym)) {
      return true;
    }
    // Check if type of LHS expression Function type or Any type.
    // The latter check is to cover cases with multiple prototype
    // chain (as the 'Prototype' property should be 'Any' type):
    //      X.prototype.prototype.prototype = ...
    const baseExprType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsBaseExpr);
    const baseExprTypeNode = TypeScriptLinter.tsTypeChecker.typeToTypeNode(
      baseExprType, undefined, NodeBuilderFlags.None
    );

    return ((baseExprTypeNode && isFunctionTypeNode(baseExprTypeNode)) || Utils.isAnyType(baseExprType));
  }

  private interfaceInharitanceLint(node: Node, heritageClauses: NodeArray<HeritageClause>): void {
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
    if (!Utils.areTypesAssignable(objectLiteralType, objectLiteralExpr)
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

    // check element types
    if (isUnionTypeNode(arrayLitNode)) this.incrementCounters(node, FaultID.TupleLiteral);

    let noContextTypeForArrayLiteral = false;

    // check that array literal consists of inferrable types
    // e.g. there is no element which is untyped object literals
    const arrayLitElements = arrayLitNode.elements;
    for(const element of arrayLitElements) {
      if(element.kind === SyntaxKind.ObjectLiteralExpression) {
        const objectLiteralType = TypeScriptLinter.tsTypeChecker.getContextualType(element);
        if (!Utils.areTypesAssignable(objectLiteralType, element)) {
        //if ( !Utils.validateObjectLiteralType(objectLiteralType) ) {
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
        Utils.hasModifier(tsParamMods, SyntaxKind.PrivateKeyword))
    ) {
      this.incrementCounters(node, FaultID.ParameterProperties);
    }
    this.handleDecorators(tsParam.decorators);

    this.handleDeclarationInferredType(tsParam);
  }

  private handleEnumDeclaration(node: Node): void {
    const enumNode = node as EnumDeclaration;
    this.countDeclarationsWithDuplicateName(
      TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(enumNode.name), enumNode
    );

    const enumSymbol = TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(enumNode.name);
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

    if (enumDeclCount > 1) this.incrementCounters(node, FaultID.InterfaceOrEnumMerging);
  }

  private handleInterfaceDeclaration(node: Node): void {
    const interfaceNode = node as InterfaceDeclaration;
    const iSymbol = TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(interfaceNode.name);
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

      if (iDeclCount > 1) this.incrementCounters(node, FaultID.InterfaceOrEnumMerging);
    }

    if (interfaceNode.heritageClauses) this.interfaceInharitanceLint(node, interfaceNode.heritageClauses);

    this.countDeclarationsWithDuplicateName(
      TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(interfaceNode.name), interfaceNode
    );
  }

  private handleThrowStatement(node: Node): void {
    const throwStmt = node as ThrowStatement;
    const throwExprType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(throwStmt.expression);
    if (!throwExprType.isClassOrInterface() || !this.typeHierarchyHasTypeError(throwExprType)) {
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

    if (!(isArrayLiteralExpression(expr) || Utils.isArrayNotTupleType(exprTypeNode))) {
      this.incrementCounters(node, FaultID.ForOfNonArray);
    }
  }

  private handleTypeOperator(node: Node): void {
    const fullText = node.getFullText().trim();
    if (fullText.startsWith("keyof")) {
      this.incrementCounters(node, FaultID.KeyOfOperator);
    }
    else if (fullText.startsWith("readonly")) {
      this.incrementCounters(node, FaultID.ReadonlyArr);
    }
  }

  private handleImportDeclaration(node: Node): void {
    const importDeclNode = node as ImportDeclaration;
    const expr1 = importDeclNode.moduleSpecifier;
    if (expr1.kind === SyntaxKind.StringLiteral) {
      if (!importDeclNode.importClause) this.incrementCounters(node, FaultID.ImportFromPath);

      const text = expr1.getText();
      if (text.endsWith(".js\"") || text.endsWith(".js\'")) {
        this.incrementCounters(node, FaultID.JSExtensionInModuleIdent);
      }
    }
  }

  private handlePropertyAccessExpression(node: Node): void {
    const propertyAccessNode = node as PropertyAccessExpression;
    if (this.isPropertyRuntimeCheck(propertyAccessNode)) this.incrementCounters(node, FaultID.PropertyRuntimeCheck);
    if (this.isIIFEasNamespace(propertyAccessNode)) this.incrementCounters(node, FaultID.IifeAsNamespace);
    if (this.isPrototypePropertyAccess(propertyAccessNode)) {
      this.incrementCounters(propertyAccessNode.name, FaultID.Prototype);
    }
    const symbol = TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(propertyAccessNode);
    if(!!symbol && Utils.isSymbolAPI(symbol)) {
      this.incrementCounters(node, FaultID.SymbolType);
    }
  }

  private handlePropertyAssignmentOrDeclaration(node: Node) {
    const propName = (node as PropertyAssignment | PropertyDeclaration).name;

    if (propName && (propName.kind === SyntaxKind.NumericLiteral || propName.kind === SyntaxKind.StringLiteral)) {
      // We can use literals as property names only when creating Record instances.
      let isRecordObjectInitializer = false;
      if (isPropertyAssignment(node)) {
        const objectLiteralType = TypeScriptLinter.tsTypeChecker.getContextualType(node.parent);
        isRecordObjectInitializer = !!objectLiteralType && Utils.isStdRecordType(objectLiteralType);
      }

      if (!isRecordObjectInitializer) {
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
      //this.filterOutStrictDiagnostics(decorators, propName);
      this.handleDeclarationInferredType(node);
    }
  }

  /***** it seems not need in SDK
  private filterOutStrictDiagnostics(decorators: readonly ts.Decorator[] | undefined, propName: ts.PropertyName) {
    // Filter out non-initializable property decorators from strict diagnostics.
    if (this.tscStrictDiagnostics && this.sourceFile) {
      if (decorators?.some(x => {
        let decoratorName = '';
        if (ts.isIdentifier(x.expression))
          decoratorName = x.expression.text;
        else if (ts.isCallExpression(x.expression) && ts.isIdentifier(x.expression.expression))
          decoratorName = x.expression.expression.text;

        return Utils.NON_INITIALIZABLE_PROPERTY_DECORATORS.includes(decoratorName);
      })) {
        let file = path.normalize(this.sourceFile.fileName);
        let tscDiagnostics = this.tscStrictDiagnostics.get(file)
        if (tscDiagnostics) {
          let filteredDiagnostics = tscDiagnostics.filter(
            (val, idx, array) => !(
              val.code === TsUtils.PROPERTY_HAS_NO_INITIALIZER_ERROR_CODE &&
              val.start === propName.getStart()
            )
          );
          this.tscStrictDiagnostics.set(file, filteredDiagnostics);
        }
      }
    }
  }
*/
  private handleFunctionExpression(node: Node): void {
    const funcExpr = node as FunctionExpression;
    const isGenerator = funcExpr.asteriskToken !== undefined;
    const containsThis = this.functionContainsThis(funcExpr.body);
    const isGeneric = funcExpr.typeParameters !== undefined && funcExpr.typeParameters.length > 0;

    const newParams = this.handleMissingParameterTypes(funcExpr);

    const [hasUnfixableReturnType, newRetTypeNode] = this.handleMissingReturnType(funcExpr);

    const autofixable = !isGeneric && !isGenerator && !containsThis &&
      newParams && !hasUnfixableReturnType;

    let autofix: Autofix[] | undefined;
    if (autofixable && Autofixer.shouldAutofix(node, FaultID.FunctionExpression)) {
      autofix = [ Autofixer.fixFunctionExpression(funcExpr, newParams, newRetTypeNode) ];
    }

    this.incrementCounters(node, FaultID.FunctionExpression, autofixable, autofix);
    if (!newParams) this.incrementCounters(funcExpr, FaultID.ArrowFunctionWithOmittedTypes, false);
    if (isGeneric) this.incrementCounters(funcExpr, FaultID.LambdaWithTypeParameters);
    if (isGenerator) this.incrementCounters(funcExpr, FaultID.GeneratorFunction);
    if (containsThis) this.incrementCounters(funcExpr, FaultID.FunctionContainsThis);
    if (hasUnfixableReturnType) this.incrementCounters(funcExpr, FaultID.LimitedReturnTypeInference);
  }

  private handleArrowFunction(node: Node): void {
    const arrowFunc = node as ArrowFunction;
    const contextType = TypeScriptLinter.tsTypeChecker.getContextualType(arrowFunc);
    if (!(contextType && Utils.isLibraryType(contextType))) {
      this.handleMissingParameterTypes(arrowFunc);

      if (!arrowFunc.type) this.handleMissingReturnType(arrowFunc);

      if (arrowFunc.typeParameters && arrowFunc.typeParameters.length > 0) {
        this.incrementCounters(node, FaultID.LambdaWithTypeParameters);
      }
    }
  }

  private handleMissingParameterTypes(signDecl: SignatureDeclaration):
  NodeArray<ParameterDeclaration> | undefined {
    let hasOmittedType = false;
    let autofixable = true;
    let autofix: Autofix[] | undefined;
    const isFuncExpr = signDecl.kind === SyntaxKind.FunctionExpression;
    const newParams: ParameterDeclaration[] = [];
    for (const param of signDecl.parameters) {
      if (isFuncExpr) newParams.push(param);
      if (param.type) continue;

      hasOmittedType = true;
      const paramType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(param);
      const paramTypeNode = TypeScriptLinter.tsTypeChecker.typeToTypeNode(paramType, param, NodeBuilderFlags.None);
      if (!paramType || Utils.isUnsupportedType(paramType) || !paramTypeNode) {
        autofixable = false;
        continue;
      }

      if (isFuncExpr) {
        const newParam = Autofixer.fixParamWithoutType(param, paramTypeNode, true) as ParameterDeclaration;
        newParams[newParams.length-1] = newParam;
      }
      else if (Autofixer.shouldAutofix(signDecl, FaultID.ArrowFunctionWithOmittedTypes)) {
        if (!autofix) autofix = [];
        autofix.push(Autofixer.fixParamWithoutType(param, paramTypeNode) as Autofix);
      }
    }
    // Don't report here if in function expression context.
    // See handleFunctionExpression for details.
    if (hasOmittedType && !isFuncExpr) {
      this.incrementCounters(signDecl, FaultID.ArrowFunctionWithOmittedTypes, autofixable, autofix);
    }
    return isFuncExpr && autofixable ? factory.createNodeArray(newParams) : undefined;
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
      this.countDeclarationsWithDuplicateName(
        TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(tsFunctionDeclaration.name), tsFunctionDeclaration
      );
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
      if (!(tsOperatndType.getFlags() & TypeFlags.NumberLike)||
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
        const tsLhsSymbol = TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(tsLhsExpr);
        const tsLhsBaseSymbol = TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(tsLhsExpr.expression);
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
        else {
          this.incrementCounters(node, FaultID.AddWithWrongType);
        }
      } else if (Utils.isNumberType(leftOperandType) && Utils.isNumberType(rightOperandType)) {
        return;
      }
      else if (Utils.isStringType(leftOperandType) || Utils.isStringType(rightOperandType)) {
        return;
      }
      else {
        this.incrementCounters(node, FaultID.AddWithWrongType);
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
      const leftSymbol = TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(leftExpr);
      // In STS, the left-hand side expression may be of any reference type, otherwise
      // a compile-time error occurs. In addition, the left operand in STS cannot be a type.
      if (isTypeNode(leftExpr) || !Utils.isReferenceType(leftOperandType) || Utils.isTypeSymbol(leftSymbol)) {
        this.incrementCounters(node, FaultID.InstanceofUnsupported);
      }
    }
    else if (tsBinaryExpr.operatorToken.kind === SyntaxKind.EqualsToken) {
      if (
        leftOperandType.isClassOrInterface() && rightOperandType.isClassOrInterface() &&
        !Utils.relatedByInheritanceOrIdentical(rightOperandType, leftOperandType)
      ) {
        this.incrementCounters(tsBinaryExpr, FaultID.StructuralIdentity);
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
          this.countDeclarationsWithDuplicateName(
            TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(tsBindingName), tsBindingName,
            tsBindingName.parent.kind
          );
        }
        else {
          for (const tsBindingElem of tsBindingName.elements) {
            if (isOmittedExpression(tsBindingElem)) continue;

            visitBindingPatternNames(tsBindingElem.name);
          }
        }
      };

      if (tsVarDecl.exclamationToken) this.incrementCounters(node, FaultID.DefiniteAssignment);

      visitBindingPatternNames(tsVarDecl.name);
    }

    if (tsVarDecl.type && tsVarDecl.initializer) {
      const tsVarInit = tsVarDecl.initializer;
      const tsVarType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsVarDecl.type);
      const tsInitType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsVarInit);
      if (
        tsVarType.isClassOrInterface() && tsInitType.isClassOrInterface() &&
        !Utils.relatedByInheritanceOrIdentical(tsInitType, tsVarType)
      ) {
        this.incrementCounters(tsVarDecl, FaultID.StructuralIdentity);
      }
    }

    this.handleDeclarationInferredType(tsVarDecl);
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
    if (tsClassDecl.name) {
      this.countDeclarationsWithDuplicateName(
        TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(tsClassDecl.name),
        tsClassDecl
      );
    }
    this.countClassMembersWithDuplicateName(tsClassDecl);

    if (tsClassDecl.heritageClauses) {
      for (const hClause of tsClassDecl.heritageClauses) {
        if (hClause && hClause.token === SyntaxKind.ImplementsKeyword) {
          for (const tsTypeExpr of hClause.types) {
            const tsExprType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsTypeExpr.expression);
            if (tsExprType.isClass()) this.incrementCounters(tsTypeExpr, FaultID.ImplementsClass);
          }
        }
      }
    }

    this.handleDecorators(tsClassDecl.decorators);
  }

  private handleModuleDeclaration(node: Node): void {
    const tsModuleDecl = node as ModuleDeclaration;
    this.countDeclarationsWithDuplicateName(
      TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(tsModuleDecl.name),
      tsModuleDecl
    );

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
    else if (Utils.hasModifier(tsModifiers, SyntaxKind.DeclareKeyword)) {
      this.incrementCounters(tsModuleDecl, FaultID.ShorthandAmbientModuleDecl);
    }

    if (isStringLiteral(tsModuleDecl.name) && tsModuleDecl.name.text.includes("*")) {
      this.incrementCounters(tsModuleDecl, FaultID.WildcardsInModuleName);
    }
  }

  private handleTypeAliasDeclaration(node: Node): void {
    const tsTypeAlias = node as TypeAliasDeclaration;
    this.countDeclarationsWithDuplicateName(
      TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(tsTypeAlias.name), tsTypeAlias
    );
  }

  private handleImportClause(node: Node): void {
    const tsImportClause = node as ImportClause;
    if (tsImportClause.name) {
      this.countDeclarationsWithDuplicateName(
        TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(tsImportClause.name), tsImportClause
      );
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
    this.countDeclarationsWithDuplicateName(
      TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(tsImportSpecifier.name), tsImportSpecifier
    );
  }

  private handleNamespaceImport(node: Node): void {
    const tsNamespaceImport = node as NamespaceImport;
    this.countDeclarationsWithDuplicateName(
      TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(tsNamespaceImport.name), tsNamespaceImport
    );
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
    if (!tsMethodDecl.type) {
      this.handleMissingReturnType(tsMethodDecl);
    }
    if (tsMethodDecl.asteriskToken) {
      this.incrementCounters(node, FaultID.GeneratorFunction);
    }
    this.handleDecorators(tsMethodDecl.decorators);
  }

  private handleSwitchStatement(node: Node): void {
    const tsSwitchStmt = node as SwitchStatement;
    const tsSwitchExprType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsSwitchStmt.expression);

    if (
      !(tsSwitchExprType.getFlags() & (TypeFlags.NumberLike | TypeFlags.StringLike)) &&
      !Utils.isEnumType(tsSwitchExprType)
    ) {
      this.incrementCounters(tsSwitchStmt.expression, FaultID.SwitchSelectorInvalidType);
    }
    for (const tsCaseClause of tsSwitchStmt.caseBlock.clauses) {
      if (isCaseClause(tsCaseClause)) {
        const tsCaseExpr = tsCaseClause.expression;
        const tsCaseExprType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsCaseExpr);
        if (
          !(
            isNumericLiteral(tsCaseExpr) ||
            isStringLiteralLike(tsCaseExpr) ||
            tsCaseExprType.flags & TypeFlags.EnumLike
          )
        ) {
          this.incrementCounters(tsCaseExpr, FaultID.CaseExpressionNonConst);
        }
      }
    }
  }

  private handleIdentifier(node: Node): void {
    const tsIdentifier = node as Identifier;
    const tsIdentSym = TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(tsIdentifier);

    if (tsIdentSym) {
      this.handleNamespaceAsObject(tsIdentifier, tsIdentSym);

      if (
        (tsIdentSym.flags & SymbolFlags.Module) !== 0 &&
        (tsIdentSym.flags & SymbolFlags.Transient) !== 0 &&
        tsIdentifier.text === "globalThis"
      ) {
        this.incrementCounters(node, FaultID.GlobalThis);
      }
      if (Utils.isGlobalSymbol(tsIdentSym) && Utils.LIMITED_STD_GLOBAL_VAR.includes(tsIdentSym.getName())) {
        this.incrementCounters(node, FaultID.LimitedStdLibApi);
      }
    }
  }

  private handleNamespaceAsObject(tsIdentifier: Identifier, tsIdentSym: Symbol): void {
    if (
      tsIdentSym &&
      (tsIdentSym.getFlags() & SymbolFlags.Module) !== 0 &&
      (tsIdentSym.getFlags() & SymbolFlags.Variable) === 0 &&
      !isModuleDeclaration(tsIdentifier.parent)
    ) {
      // If module name is duplicated by another declaration, this increases the possibility
      // of finding a lot of false positives. Thus, do not check further in that case.
      if (!Utils.symbolHasDuplicateName(tsIdentSym, SyntaxKind.ModuleDeclaration)) {
        // If module name is the right-most name of Property Access chain or Qualified name,
        // or it's a separate identifier expression, then module is being referenced as an object.
        let tsIdentParent: Node = tsIdentifier;

        while (isPropertyAccessExpression(tsIdentParent.parent) || isQualifiedName(tsIdentParent.parent)) {
          tsIdentParent = tsIdentParent.parent;
        }
        if (
          (!isPropertyAccessExpression(tsIdentParent) && !isQualifiedName(tsIdentParent)) ||
          (isPropertyAccessExpression(tsIdentParent) && tsIdentifier === tsIdentParent.name) ||
          (isQualifiedName(tsIdentParent) && tsIdentifier === tsIdentParent.right)
        ) {
          this.incrementCounters(tsIdentifier, FaultID.NamespaceAsObject);
        }
      }
    }
  }

  private handleElementAccessExpression(node: Node): void {
    const tsElementAccessExpr = node as ElementAccessExpression;
    const tsElemAccessBaseExprType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsElementAccessExpr.expression);

    if (
      !Utils.isLibraryType(tsElemAccessBaseExprType) &&
      ((tsElemAccessBaseExprType.isClassOrInterface() && !Utils.isGenericArrayType(tsElemAccessBaseExprType)) ||
      Utils.isObjectLiteralType(tsElemAccessBaseExprType) || Utils.isEnumType(tsElemAccessBaseExprType) ||
      Utils.isThisOrSuperExpr(tsElementAccessExpr.expression))
         ) {
      let autofix = Autofixer.fixPropertyAccessByIndex(node);
      const autofixable = autofix !== undefined;
      if (!Autofixer.shouldAutofix(node, FaultID.PropertyAccessByIndex)) {
        autofix = undefined;
      }
      this.incrementCounters(node, FaultID.PropertyAccessByIndex, autofixable, autofix);
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

    if (tsExportDecl.moduleSpecifier && !tsExportDecl.exportClause) {
      this.incrementCounters(node, FaultID.LimitedReExporting);
    }
  }

  private handleExportAssignment(node: Node): void {
    const tsExportAssignment = node as ExportAssignment;
    if (tsExportAssignment.isExportEquals) {
      this.incrementCounters(node, FaultID.ExportAssignment);
    }
  }

  private handleCallExpression(node: Node): void {
    const tsCallExpr = node as CallExpression;

    this.handleImportCall(tsCallExpr);
    this.handleRequireCall(tsCallExpr);
    // NOTE: Keep handleFunctionApplyBindPropCall above handleGenericCallWithNoTypeArgs here!!!
    this.handleFunctionApplyBindPropCall(tsCallExpr);
    this.handleGenericCallWithNoTypeArgs(tsCallExpr);
    this.handleStructIdentAndUndefinedInArgs(tsCallExpr);
    this.handleStdlibAPICall(tsCallExpr);
  }

  private handleImportCall(tsCallExpr: CallExpression): void {
    if (tsCallExpr.expression.kind === SyntaxKind.ImportKeyword) {
      this.incrementCounters(tsCallExpr, FaultID.DynamicImport);
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

  private handleGenericCallWithNoTypeArgs(callLikeExpr: CallExpression | NewExpression): void {
    const callSignature = TypeScriptLinter.tsTypeChecker.getResolvedSignature(callLikeExpr);
    if (!callSignature) return;

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

  private handleFunctionApplyBindPropCall(tsCallExpr: CallExpression): void {
    const tsExpr = tsCallExpr.expression;
    if (
      isPropertyAccessExpression(tsExpr) &&
      (tsExpr.name.text === "apply" || tsExpr.name.text === "bind" || tsExpr.name.text === "call")
    ) {
      const tsSymbol = TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(tsExpr.expression);
      if (Utils.isFunctionOrMethod(tsSymbol)) {
        this.incrementCounters(tsCallExpr, FaultID.FunctionApplyBindCall);
      }
    }
  }

  private handleStructIdentAndUndefinedInArgs(tsCallOrNewExpr: CallExpression | NewExpression): void {
    const tsSignature = TypeScriptLinter.tsTypeChecker.getResolvedSignature(tsCallOrNewExpr);
    if (!tsSignature || !tsCallOrNewExpr.arguments) return;

    for (let argIndex = 0; argIndex < tsCallOrNewExpr.arguments.length; ++argIndex) {
      const tsArg = tsCallOrNewExpr.arguments[argIndex];
      const tsArgType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsArg);
      if (!tsArgType) continue;

      const paramIndex = argIndex < tsSignature.parameters.length ? argIndex : tsSignature.parameters.length-1;
      const tsParamSym = tsSignature.parameters[paramIndex];
      if (!tsParamSym) continue;

      const tsParamDecl = tsParamSym.valueDeclaration;
      if (tsParamDecl && isParameter(tsParamDecl)) {
        let tsParamType = TypeScriptLinter.tsTypeChecker.getTypeOfSymbolAtLocation(tsParamSym, tsParamDecl);
        if (tsParamDecl.dotDotDotToken && Utils.isGenericArrayType(tsParamType) && tsParamType.typeArguments) {
          tsParamType = tsParamType.typeArguments[0];
        }
        if (!tsParamType) continue;

        if (
          tsArgType.isClassOrInterface() && tsParamType.isClassOrInterface() &&
          !Utils.relatedByInheritanceOrIdentical(tsArgType, tsParamType)
        ) {
          this.incrementCounters(tsArg, FaultID.StructuralIdentity);
        }
      }
    }
  }

  private handleStdlibAPICall(callExpr: CallExpression): void {
    const callSignature = TypeScriptLinter.tsTypeChecker.getResolvedSignature(callExpr);
    if (!callSignature) return;

    const sym = TypeScriptLinter.tsTypeChecker.getSymbolAtLocation(callExpr.expression);
    if (sym) {
      const name = sym.getName();
      if (
        (Utils.isGlobalSymbol(sym) && Utils.LIMITED_STD_GLOBAL_FUNC.includes(name)) ||
        (Utils.isStdObjectAPI(sym) && Utils.LIMITED_STD_OBJECT_API.includes(name)) ||
        (Utils.isStdReflectAPI(sym) && Utils.LIMITED_STD_REFLECT_API.includes(name)) ||
        (Utils.isStdProxyHandlerAPI(sym) && Utils.LIMITED_STD_PROXYHANDLER_API.includes(name)) ||
        (Utils.isStdArrayAPI(sym) && Utils.LIMITED_STD_ARRAY_API.includes(name)) ||
        (Utils.isStdArrayBufferAPI(sym) && Utils.LIMITED_STD_ARRAYBUFFER_API.includes(name))
      ) {
        this.incrementCounters(callExpr, FaultID.LimitedStdLibApi);
      }
      if(Utils.isSymbolAPI(sym)) {
        this.incrementCounters(callExpr, FaultID.SymbolType);
      }
    }
  }

  private handleNewExpression(node: Node): void {
    const tsNewExpr = node as NewExpression;
    this.handleGenericCallWithNoTypeArgs(tsNewExpr);
    this.handleStructIdentAndUndefinedInArgs(tsNewExpr);
  }

  private handleAsExpression(node: Node): void {
    const tsAsExpr = node as AsExpression;
    if (tsAsExpr.type.getText() === "const") this.incrementCounters(node, FaultID.ConstAssertion);

    const targetType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsAsExpr.type);
    const exprType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(tsAsExpr.expression);
    if (
      targetType.isClassOrInterface() && exprType.isClassOrInterface() &&
      !Utils.relatedByInheritanceOrIdentical(exprType, targetType) &&
      !Utils.relatedByInheritanceOrIdentical(targetType, exprType)
    ) {
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

    if (isIdentifier(typeRef.typeName) && LinterConfig.standardUtilityTypes.has(typeRef.typeName.text)) {
      this.incrementCounters(node, FaultID.UtilityType);
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
    // spread element is allowed only for arrays as rest parameer
    if (isSpreadElement(node)) {
      const spreadElemNode = node;
      const spreadExprType = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(spreadElemNode.expression);
      if (spreadExprType) {
        const spreadExprTypeNode = TypeScriptLinter.tsTypeChecker.typeToTypeNode(spreadExprType, undefined, NodeBuilderFlags.None);
        if (spreadExprTypeNode && Utils.isArrayNotTupleType(spreadExprTypeNode) && isCallLikeExpression(node.parent)) {
          // rest parameter should be the last and the one
          return;
        }
      }
    }
    this.incrementCounters(node, FaultID.SpreadOperator);
  }

  private handleNonNullExpression(node: Node): void {
    const nonNullExprNode = node as NonNullExpression;
    // increment only at innermost exclamation
    // this ensures that only one report is generated for sequenced exclamations
    if (nonNullExprNode.expression.kind !== SyntaxKind.NonNullExpression) {
      this.incrementCounters(node, FaultID.DefiniteAssignment);
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

  private checkErrorSuppressingAnnotation(comment: CommentRange, srcText: string) {
    const commentContent = comment.kind === SyntaxKind.MultiLineCommentTrivia
      ? srcText.slice(comment.pos + 2, comment.end - 2)
      : srcText.slice(comment.pos + 2, comment.end);

    if (commentContent.includes("@ts-ignore") || commentContent.includes("@ts-nocheck")) {
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

    // Destructuring declarations are not supported.
    if (isArrayBindingPattern(decl.name) || isObjectBindingPattern(decl.name)) return;

    const type = TypeScriptLinter.tsTypeChecker.getTypeAtLocation(decl);
    if (type) this.validateDeclInferredType(type, decl);
  }

  private validateDeclInferredType(
    type: Type,
    decl: VariableDeclaration | PropertyDeclaration | ParameterDeclaration
  ): void {
    if (type.isUnion()) {
      for (const unionElem of type.types) {
        this.validateDeclInferredType(unionElem, decl);
      }
    }

    if (type.flags & TypeFlags.Object && (type as ObjectType).objectFlags & ObjectFlags.Reference) {
      const typeArgs = TypeScriptLinter.tsTypeChecker.getTypeArguments(type as TypeReference);
      if (typeArgs) {
        for (const typeArg of typeArgs) {
          this.validateDeclInferredType(typeArg, decl);
        }
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
