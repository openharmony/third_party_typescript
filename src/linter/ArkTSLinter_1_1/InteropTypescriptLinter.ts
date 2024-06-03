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
  import faultsAttrs = Problems.faultsAttrs;
  
  import Autofix = Autofixer.Autofix;
  
  import Logger = ts.perfLogger;
  
  export class InteropTypescriptLinter {
    static strictMode: boolean;
    static totalVisitedNodes: number;
    static nodeCounters: number[];
    static lineCounters: number[];
  
    static totalErrorLines: number;
    static errorLineNumbersString: string;
    static totalWarningLines: number;
    static warningLineNumbersString: string;
    static reportDiagnostics = true;
  
    static problemsInfos: ProblemInfo[] = [];
  
    public static initGlobals(): void {}
  
    public static initStatic(): void {
      InteropTypescriptLinter.strictMode = true;
      InteropTypescriptLinter.totalVisitedNodes = 0;
      InteropTypescriptLinter.nodeCounters = [];
      InteropTypescriptLinter.lineCounters = [];
  
      InteropTypescriptLinter.totalErrorLines = 0;
      InteropTypescriptLinter.totalWarningLines = 0;
      InteropTypescriptLinter.errorLineNumbersString = '';
      InteropTypescriptLinter.warningLineNumbersString = '';
  
      for (let i = 0; i < FaultID.LAST_ID; i++) {
        InteropTypescriptLinter.nodeCounters[i] = 0;
        InteropTypescriptLinter.lineCounters[i] = 0;
      }
  
      InteropTypescriptLinter.problemsInfos = [];
    }
  
    public static tsTypeChecker: TypeChecker;
    public static etsLoaderPath: string | undefined;
  
    currentErrorLine: number;
    currentWarningLine: number;
  
    constructor(private sourceFile: SourceFile,
                /* private */ tsProgram: Program,
                private isInSdk: boolean) {
      InteropTypescriptLinter.tsTypeChecker = tsProgram.getLinterTypeChecker();
      InteropTypescriptLinter.etsLoaderPath = tsProgram.getCompilerOptions().etsLoaderPath;
      this.currentErrorLine = 0;
      this.currentWarningLine = 0;
    }
  
    public static clearTsTypeChecker(): void {
      InteropTypescriptLinter.tsTypeChecker = {} as TypeChecker;
    }
  
    readonly handlersMap = new Map([
      [ts.SyntaxKind.ImportDeclaration, this.handleImportDeclaration],
      [ts.SyntaxKind.InterfaceDeclaration, this.handleInterfaceDeclaration],
      [ts.SyntaxKind.ClassDeclaration, this.handleClassDeclaration],
      [ts.SyntaxKind.NewExpression, this.handleNewExpression],
      [ts.SyntaxKind.ObjectLiteralExpression, this.handleObjectLiteralExpression],
      [ts.SyntaxKind.ArrayLiteralExpression, this.handleArrayLiteralExpression],
      [ts.SyntaxKind.AsExpression, this.handleAsExpression],
      [ts.SyntaxKind.ExportDeclaration, this.handleExportDeclaration]
    ]);
  
    public incrementCounters(node: Node | CommentRange, faultId: number, autofixable = false, autofix?: Autofix[]): void {
      const [startOffset, endOffset] = Utils.getHighlightRange(node, faultId);
      const startPos = this.sourceFile!.getLineAndCharacterOfPosition(startOffset);
      const line = startPos.line + 1;
      const character = startPos.character + 1;
  
      InteropTypescriptLinter.nodeCounters[faultId]++;
  
      const faultDescr = LinterConfig.nodeDesc[faultId];
      const faultType = 'unknown';
  
      const cookBookMsgNum = faultsAttrs[faultId] ? faultsAttrs[faultId].cookBookRef : 0;
      const cookBookTg = cookBookTag[cookBookMsgNum];
      const severity = faultsAttrs[faultId]?.severity ?? Common.ProblemSeverity.ERROR;
      const badNodeInfo: ProblemInfo = {
        line: line,
        column: character,
        start: startOffset,
        end: endOffset,
        type: faultType,
        severity: severity,
        problem: FaultID[faultId],
        suggest: cookBookMsgNum > 0 ? cookBookMsg[cookBookMsgNum] : '',
        rule: cookBookMsgNum > 0 && cookBookTg !== '' ? cookBookTg : faultDescr ? faultDescr : faultType,
        ruleTag: cookBookMsgNum,
        autofixable: autofixable,
        autofix: autofix
      };
  
      InteropTypescriptLinter.problemsInfos.push(badNodeInfo);
  
      if (!InteropTypescriptLinter.reportDiagnostics) {
        Logger.logEvent(
          `Warning: ${this.sourceFile.fileName} (${line}, ${character}): ${faultDescr ? faultDescr : faultType}`
        );
      }
  
      InteropTypescriptLinter.lineCounters[faultId]++;
  
      switch (faultsAttrs[faultId].severity) {
        case Common.ProblemSeverity.ERROR: {
          this.currentErrorLine = line;
          ++InteropTypescriptLinter.totalErrorLines;
          InteropTypescriptLinter.errorLineNumbersString += line + ', ';
          break;
        }
        case Common.ProblemSeverity.WARNING: {
          if (line === this.currentWarningLine) {
            break;
          }
          this.currentWarningLine = line;
          ++InteropTypescriptLinter.totalWarningLines;
          InteropTypescriptLinter.warningLineNumbersString += line + ', ';
          break;
        }
      }
    }
  
    private forEachNodeInSubtree(node: ts.Node, cb: (n: ts.Node) => void, stopCond?: (n: ts.Node) => boolean): void {
      cb.call(this, node);
      if (stopCond?.call(this, node)) {
        return;
      }
      ts.forEachChild(node, (child) => {
        this.forEachNodeInSubtree(child, cb, stopCond);
      });
    }
  
    private visitSourceFile(sf: ts.SourceFile): void {
      const callback = (node: ts.Node): void => {
        InteropTypescriptLinter.totalVisitedNodes++;
        const handler = this.handlersMap.get(node.kind);
        if (handler !== undefined) {
          handler.call(this, node);
        }
      };
      const stopCondition = (node: ts.Node): boolean => {
        if (node === null || node.kind === null) {
          return true;
        }
        if (LinterConfig.terminalTokens.has(node.kind)) {
          return true;
        }
        return false;
      };
      this.forEachNodeInSubtree(sf, callback, stopCondition);
    }
  
    private handleImportDeclaration(node: Node): void {
      const importDeclNode = node as ImportDeclaration;
      this.checkSendableClassorISendable(importDeclNode);
    }

    private checkSendableClassorISendable(node: ts.ImportDeclaration): void {
      const currentSourceFile = ts.getSourceFileOfNode(node);
      const contextSpecifier = node.moduleSpecifier;
      if (!isStringLiteralLike(contextSpecifier)) {
        return;
      }
      const mode = getModeForUsageLocation(currentSourceFile, contextSpecifier);
      const resolvedModule = ts.getResolvedModule(currentSourceFile, contextSpecifier.text, mode);
      const importClause = node.importClause;
      if (!resolvedModule) {
        return;
      }
      if (resolvedModule?.extension !== '.ets' && resolvedModule?.extension !== '.d.ets') {
        return;
      }
      if (Utils.isInImportWhiteList(resolvedModule)) {
        return;
      }
      if (!importClause) {
        this.incrementCounters(node, FaultID.NoTsImportEts);
        return;
      }

      this.checkImportClause(importClause, resolvedModule);
    }

    private checkImportClause(node: ts.ImportClause, resolvedModule: ResolvedModuleFull): void {
      const checkAndIncrement = (identifier: ts.Identifier | undefined): void => {
        if (identifier && !Utils.isShareableClassOrInterfaceEntity(identifier)) {
          this.incrementCounters(identifier, FaultID.NoTsImportEts);
        }
      };
      if (node.name) {
        checkAndIncrement(node.name);
      }
      if (!node.namedBindings) {
        return;
      }
      if (ts.isNamespaceImport(node.namedBindings)) {
          if (this.allowInSdkImportSendable(resolvedModule)) {
              return;
          }
          this.incrementCounters(node.namedBindings, FaultID.NoTsImportEts);
          return;
      }
      if (ts.isNamedImports(node.namedBindings)) {
          node.namedBindings.elements.forEach(element => {
              checkAndIncrement(element.name);
          });
      }    
    }

    private allowInSdkImportSendable(resolvedModule: ResolvedModuleFull): boolean {
      const resolvedModuleIsInSdk = InteropTypescriptLinter.etsLoaderPath ?
        normalizePath(resolvedModule.resolvedFileName).startsWith(resolvePath(InteropTypescriptLinter.etsLoaderPath, '../../')) :
        false;
      return resolvedModuleIsInSdk && ts.getBaseFileName(resolvedModule.resolvedFileName).indexOf('sendable') !== -1;
    }

    private handleClassDeclaration(node: Node): void {
      const tsClassDecl = node as ClassDeclaration;
      if (!tsClassDecl.heritageClauses) {
        return;
      }

      for (const hClause of tsClassDecl.heritageClauses) {
        if (hClause) {
          this.checkClassOrInterfaceDeclarationHeritageClause(hClause);
        }
      }
    }

    // In ts files, sendable classes and sendable interfaces can not be extended or implemented.
    private checkClassOrInterfaceDeclarationHeritageClause(hClause: ts.HeritageClause): void {
      for (const tsTypeExpr of hClause.types) {

        /*
         * Always resolve type from 'tsTypeExpr' node, not from 'tsTypeExpr.expression' node,
         * as for the latter, type checker will return incorrect type result for classes in
         * 'extends' clause. Additionally, reduce reference, as mostly type checker returns
         * the TypeReference type objects for classes and interfaces.
         */
        const tsExprType = Utils.reduceReference(InteropTypescriptLinter.tsTypeChecker.getTypeAtLocation(tsTypeExpr));
        const isSendableBaseType = Utils.isSendableClassOrInterface(tsExprType);
        if (isSendableBaseType) {
          this.incrementCounters(tsTypeExpr, FaultID.SendableTypeInheritance);
        }
      }
    }

    private handleInterfaceDeclaration(node: Node): void {
      const interfaceNode = node as InterfaceDeclaration;
      const iSymbol = Utils.trueSymbolAtLocation(interfaceNode.name);
      const iDecls = iSymbol ? iSymbol.getDeclarations() : null;
      if (!iDecls) {
        return;
      }

      if (!interfaceNode.heritageClauses) {
        return;
      }

      for (const hClause of interfaceNode.heritageClauses) {
        if (hClause) {
          this.checkClassOrInterfaceDeclarationHeritageClause(hClause);
        }
      }
    }

    private handleNewExpression(node: Node): void {
      const tsNewExpr = node as NewExpression;
      this.handleSendableGenericTypes(tsNewExpr);
    }
  
    private handleSendableGenericTypes(node: ts.NewExpression): void {
      const type = InteropTypescriptLinter.tsTypeChecker.getTypeAtLocation(node);
      if (!Utils.isSendableClassOrInterface(type)) {
        return;
      }
  
      const typeArgs = node.typeArguments;
      if (!typeArgs || typeArgs.length === 0) {
        return;
      }
  
      for (const arg of typeArgs) {
        if (!Utils.isSendableTypeNode(arg)) {
          this.incrementCounters(arg, FaultID.SendableGenericTypes);
        }
      }
    }

    private handleObjectLiteralExpression(node: Node): void {
      const objectLiteralExpr = node as ObjectLiteralExpression;
      const objectLiteralType = InteropTypescriptLinter.tsTypeChecker.getContextualType(objectLiteralExpr);
      if (objectLiteralType && Utils.typeContainsSendableClassOrInterface(objectLiteralType)) {
        this.incrementCounters(node, FaultID.SendableObjectInitialization);
      }
    }
  
    private handleArrayLiteralExpression(node: Node): void {
      const arrayLitNode = node as ArrayLiteralExpression;
      const arrayLitType = InteropTypescriptLinter.tsTypeChecker.getContextualType(arrayLitNode);
      if (arrayLitType && Utils.typeContainsSendableClassOrInterface(arrayLitType)) {
        this.incrementCounters(node, FaultID.SendableObjectInitialization);
      }
    }

    private handleAsExpression(node: Node): void {
      const tsAsExpr = node as AsExpression;
      const targetType = InteropTypescriptLinter.tsTypeChecker.getTypeAtLocation(tsAsExpr.type).getNonNullableType();
      const exprType = InteropTypescriptLinter.tsTypeChecker.getTypeAtLocation(tsAsExpr.expression).getNonNullableType();

      if (
          !Utils.isSendableClassOrInterface(exprType) &&
          !Utils.isObject(exprType) &&
          !Utils.isAnyType(exprType) &&
          Utils.isSendableClassOrInterface(targetType)
      ) {
          this.incrementCounters(tsAsExpr, FaultID.SendableAsExpr);
      }
    }

    private handleExportDeclaration(node: ts.Node): void {
      const exportDecl = node as ts.ExportDeclaration;
      const currentSourceFile = ts.getSourceFileOfNode(node);
      const contextSpecifier = exportDecl.moduleSpecifier;

      // In ts files, re-export from .ets files is not supported.
      if (contextSpecifier && isStringLiteralLike(contextSpecifier)) {
        const mode = contextSpecifier && isStringLiteralLike(contextSpecifier) ? getModeForUsageLocation(currentSourceFile, contextSpecifier) : currentSourceFile.impliedNodeFormat;
        const resolvedModule = ts.getResolvedModule(currentSourceFile, contextSpecifier.text, mode);
        if (resolvedModule?.extension === ".ets" || resolvedModule?.extension === ".d.ets") {
          this.incrementCounters(node,FaultID.SendableNoTsExportEts);
        }
        return;
      }
      if (!this.isInSdk) {
        return;
      }

      // In sdk .d.ts files, sendable classes and sendable interfaces can not be exported.
      if (!exportDecl.exportClause) {
        return;
      }

      if (!ts.isNamedExports(exportDecl.exportClause)) {
        return;
      }

      for (const exportSpecifier of exportDecl.exportClause.elements) {
        if (Utils.isShareableClassOrInterfaceEntity(exportSpecifier.name)) {
          this.incrementCounters(exportSpecifier.name, FaultID.SendableTypeExported);
        }
      }
    }

    public lint(): void {
      this.visitSourceFile(this.sourceFile);
    }
  }
}
}
  