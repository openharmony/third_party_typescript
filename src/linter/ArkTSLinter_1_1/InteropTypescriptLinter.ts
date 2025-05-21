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
import * as ts from "../_namespaces/ts"
import {
    ArrayLiteralExpression, AsExpression, ClassDeclaration, CommentRange, ExportAssignment, ExportDeclaration,
    forEachChild, getBaseFileName, getModeForUsageLocation, getResolvedModule, getSourceFileOfNode, HeritageClause,
    Identifier, ImportClause, ImportDeclaration, InterfaceDeclaration, isModuleDeclaration, isNamedExports,
    isNamedImports, isNamespaceImport, isStringLiteralLike, Map, NamedExports, NamedImports, NewExpression, Node,
    normalizePath, ObjectLiteralExpression, Program, ResolvedModuleFull, resolvePath, SourceFile, SyntaxKind,
    TypeChecker, perfLogger as Logger
} from "../_namespaces/ts";
import { 
  Autofix, faultsAttrs, FaultID, LinterConfig, ProblemInfo, getHighlightRange, isInImportWhiteList, D_TS, getDeclarationNode, ARKTS_COLLECTIONS_D_ETS,
  ARKTS_LANG_D_ETS, isSendableClassOrInterfaceEntity, reduceReference, isSendableClassOrInterface, trueSymbolAtLocation, isSendableTypeNode,
  typeContainsSendableClassOrInterface, isObject, isAnyType, cookBookTag, cookBookMsg, ProblemSeverity
} from "../_namespaces/ts.ArkTSLinter_1_1";
export interface KitSymbol {
  source: string
  bindings: string
}

export type KitSymbols = Record<string, KitSymbol>;

export interface KitInfo {
  symbols?: KitSymbols;
}

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
    InteropTypescriptLinter.kitInfos = new Map<string, KitInfo>();
  }

  public static tsTypeChecker: TypeChecker;
  public static etsLoaderPath?: string;
  public static kitInfos: Map<KitInfo>;

  private KIT: string = '@kit.';
  private D_TS: string = '.d.ts';
  private D_ETS: string = '.d.ets';
  private ETS: string = '.ets';
  private SDK_PATH: string | undefined;

  currentErrorLine: number;
  currentWarningLine: number;

  constructor(private sourceFile: SourceFile,
              /* private */ tsProgram: Program,
              private isInSdk: boolean) {
    InteropTypescriptLinter.tsTypeChecker = tsProgram.getLinterTypeChecker();
    InteropTypescriptLinter.etsLoaderPath = tsProgram.getCompilerOptions().etsLoaderPath;
    this.currentErrorLine = 0;
    this.currentWarningLine = 0;
    this.SDK_PATH = InteropTypescriptLinter.etsLoaderPath ? resolvePath(InteropTypescriptLinter.etsLoaderPath, '../../') : undefined;
  }

  public static clearTsTypeChecker(): void {
    InteropTypescriptLinter.tsTypeChecker = {} as TypeChecker;
  }

  readonly handlersMap: ts.ESMap<SyntaxKind, (node: Node) => void> = new Map([
    [SyntaxKind.ImportDeclaration, this.handleImportDeclaration],
    [SyntaxKind.InterfaceDeclaration, this.handleInterfaceDeclaration],
    [SyntaxKind.ClassDeclaration, this.handleClassDeclaration],
    [SyntaxKind.NewExpression, this.handleNewExpression],
    [SyntaxKind.ObjectLiteralExpression, this.handleObjectLiteralExpression],
    [SyntaxKind.ArrayLiteralExpression, this.handleArrayLiteralExpression],
    [SyntaxKind.AsExpression, this.handleAsExpression],
    [SyntaxKind.ExportDeclaration, this.handleExportDeclaration],
    [SyntaxKind.ExportAssignment, this.handleExportAssignment]
  ]);

  public incrementCounters(node: Node | CommentRange, faultId: number, autofixable = false, autofix?: Autofix[]): void {
    const [startOffset, endOffset] = getHighlightRange(node, faultId);
    const startPos = this.sourceFile!.getLineAndCharacterOfPosition(startOffset);
    const line = startPos.line + 1;
    const character = startPos.character + 1;

    InteropTypescriptLinter.nodeCounters[faultId]++;

    const faultDescr = LinterConfig.nodeDesc[faultId];
    const faultType = 'unknown';

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
      case ProblemSeverity.ERROR: {
        this.currentErrorLine = line;
        ++InteropTypescriptLinter.totalErrorLines;
        InteropTypescriptLinter.errorLineNumbersString += line + ', ';
        break;
      }
      case ProblemSeverity.WARNING: {
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
    const callback = (node: Node): void => {
      InteropTypescriptLinter.totalVisitedNodes++;
      const handler = this.handlersMap.get(node.kind);
      if (handler !== undefined) {
        handler.call(this, node);
      }
    };
    const stopCondition = (node: Node): boolean => {
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

  private checkSendableClassorISendable(node: ImportDeclaration): void {
    const currentSourceFile = getSourceFileOfNode(node);
    const contextSpecifier = node.moduleSpecifier;
    if (!isStringLiteralLike(contextSpecifier)) {
      return;
    }
    const mode = getModeForUsageLocation(currentSourceFile, contextSpecifier);
    const resolvedModule = getResolvedModule(currentSourceFile, contextSpecifier.text, mode);
    const importClause = node.importClause;
    if (!resolvedModule) {
      return;
    }

    // handle kit
    let baseFileName = getBaseFileName(resolvedModule.resolvedFileName);
    if (baseFileName.startsWith(this.KIT) && baseFileName.endsWith(this.D_TS)) {
      if (!InteropTypescriptLinter.etsLoaderPath) {
        return;
      }
      this.initKitInfos(baseFileName);

      if (!importClause) {
        return;
      }

      // skip default import
      if (importClause.name) {
        return;
      }

      if (importClause.namedBindings && isNamedImports(importClause.namedBindings)) {
        this.checkKitImportClause(importClause.namedBindings, baseFileName);
      }
      return;
    }

    if (
      resolvedModule?.extension !== this.ETS &&
      resolvedModule?.extension !== this.D_ETS ||
      isInImportWhiteList(resolvedModule)
    ) {
      return;
    }

    // import 'path'
    if (!importClause) {
      this.incrementCounters(node, FaultID.NoSideEffectImportEtsToTs);
      return;
    }

    this.checkImportClause(importClause, resolvedModule);
  }

  private checkKitImportClause(node: NamedImports | NamedExports, kitFileName: string): void {
    const length = node.elements.length;
    for (let i = 0; i < length; i++) {
      const fileName = this.getKitModuleFileNames(kitFileName, node, i);
      if (fileName === '' || fileName.endsWith(D_TS)) {
        continue;
      }

      const element = node.elements[i];
      const decl = getDeclarationNode(element.name);
      if (!decl) {
        continue;
      }
      if (isModuleDeclaration(decl)) {
        if (fileName !== ARKTS_COLLECTIONS_D_ETS && fileName !== ARKTS_LANG_D_ETS) {
          this.incrementCounters(element, FaultID.NoTsImportEts);
        }
      } else if (!isSendableClassOrInterfaceEntity(element.name)) {
        this.incrementCounters(element, FaultID.NoTsImportEts);
      }
    }
  }

  private checkImportClause(node: ImportClause, resolvedModule: ResolvedModuleFull): void {
    const checkAndIncrement = (identifier: Identifier | undefined): void => {
      if (identifier && !isSendableClassOrInterfaceEntity(identifier)) {
        this.incrementCounters(identifier, FaultID.NoTsImportEts);
      }
    };
    if (node.name) {
      if (this.allowInSdkImportSendable(resolvedModule)) {
        return;
      }
      checkAndIncrement(node.name);
    }
    if (!node.namedBindings) {
      return;
    }
    if (isNamespaceImport(node.namedBindings)) {
      this.incrementCounters(node.namedBindings, FaultID.NoNamespaceImportEtsToTs);
      return;
    }
    if (isNamedImports(node.namedBindings)) {
      node.namedBindings.elements.forEach(element => {
          checkAndIncrement(element.name);
      });
    }    
  }

  private allowInSdkImportSendable(resolvedModule: ResolvedModuleFull): boolean {
    const resolvedModuleIsInSdk = this.SDK_PATH ?
      normalizePath(resolvedModule.resolvedFileName).startsWith(this.SDK_PATH) :
      false;
    return this.isInSdk && resolvedModuleIsInSdk && getBaseFileName(resolvedModule.resolvedFileName).indexOf('sendable') !== -1;
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
  private checkClassOrInterfaceDeclarationHeritageClause(hClause: HeritageClause): void {
    for (const tsTypeExpr of hClause.types) {

      /*
      * Always resolve type from 'tsTypeExpr' node, not from 'tsTypeExpr.expression' node,
      * as for the latter, type checker will return incorrect type result for classes in
      * 'extends' clause. Additionally, reduce reference, as mostly type checker returns
      * the TypeReference type objects for classes and interfaces.
      */
      const tsExprType = reduceReference(InteropTypescriptLinter.tsTypeChecker.getTypeAtLocation(tsTypeExpr));
      const isSendableBaseType = isSendableClassOrInterface(tsExprType);
      if (isSendableBaseType) {
        this.incrementCounters(tsTypeExpr, FaultID.SendableTypeInheritance);
      }
    }
  }

  private handleInterfaceDeclaration(node: Node): void {
    const interfaceNode = node as InterfaceDeclaration;
    const iSymbol = trueSymbolAtLocation(interfaceNode.name);
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

  private handleSendableGenericTypes(node: NewExpression): void {
    const type = InteropTypescriptLinter.tsTypeChecker.getTypeAtLocation(node);
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

  private handleObjectLiteralExpression(node: Node): void {
    const objectLiteralExpr = node as ObjectLiteralExpression;
    const objectLiteralType = InteropTypescriptLinter.tsTypeChecker.getContextualType(objectLiteralExpr);
    if (objectLiteralType && typeContainsSendableClassOrInterface(objectLiteralType)) {
      this.incrementCounters(node, FaultID.SendableObjectInitialization);
    }
  }

  private handleArrayLiteralExpression(node: Node): void {
    const arrayLitNode = node as ArrayLiteralExpression;
    const arrayLitType = InteropTypescriptLinter.tsTypeChecker.getContextualType(arrayLitNode);
    if (arrayLitType && typeContainsSendableClassOrInterface(arrayLitType)) {
      this.incrementCounters(node, FaultID.SendableObjectInitialization);
    }
  }

  private handleAsExpression(node: Node): void {
    const tsAsExpr = node as AsExpression;
    const targetType = InteropTypescriptLinter.tsTypeChecker.getTypeAtLocation(tsAsExpr.type).getNonNullableType();
    const exprType = InteropTypescriptLinter.tsTypeChecker.getTypeAtLocation(tsAsExpr.expression).getNonNullableType();

    if (
        !isSendableClassOrInterface(exprType) &&
        !isObject(exprType) &&
        !isAnyType(exprType) &&
        isSendableClassOrInterface(targetType)
    ) {
        this.incrementCounters(tsAsExpr, FaultID.SendableAsExpr);
    }
  }

  private handleExportDeclaration(node: Node): void {
    const exportDecl = node as ExportDeclaration;
    const currentSourceFile = getSourceFileOfNode(node);
    const contextSpecifier = exportDecl.moduleSpecifier;

    // In ts files, re-export from .ets files is not supported.
    if (contextSpecifier && isStringLiteralLike(contextSpecifier)) {
      const mode = contextSpecifier && isStringLiteralLike(contextSpecifier) ? getModeForUsageLocation(currentSourceFile, contextSpecifier) : currentSourceFile.impliedNodeFormat;
      const resolvedModule = getResolvedModule(currentSourceFile, contextSpecifier.text, mode);
      if (!resolvedModule) {
        return;
      }
      // handle kit
      let baseFileName = getBaseFileName(resolvedModule.resolvedFileName);
      if (baseFileName.startsWith(this.KIT) && baseFileName.endsWith(this.D_TS)) {
        if (!InteropTypescriptLinter.etsLoaderPath) {
          return;
        }
        this.initKitInfos(baseFileName);
        const exportClause = exportDecl.exportClause;

        if (exportClause && isNamedExports(exportClause)) {
          this.checkKitImportClause(exportClause, baseFileName);
        }
        return;
      }

      if (resolvedModule?.extension === this.ETS || resolvedModule?.extension === this.D_ETS) {
        this.incrementCounters(contextSpecifier, FaultID.NoTsReExportEts);
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

    if (!isNamedExports(exportDecl.exportClause)) {
      return;
    }

    for (const exportSpecifier of exportDecl.exportClause.elements) {
      if (isSendableClassOrInterfaceEntity(exportSpecifier.name)) {
        this.incrementCounters(exportSpecifier.name, FaultID.SendableTypeExported);
      }
    }
  }

  private handleExportAssignment(node: Node): void {
    if (!this.isInSdk) {
      return;
    }

    // In sdk .d.ts files, sendable classes and sendable interfaces can not be "default" exported.
    const exportAssignment = node as ExportAssignment;

    if (isSendableClassOrInterfaceEntity(exportAssignment.expression)) {
      this.incrementCounters(exportAssignment.expression, FaultID.SendableTypeExported);
    }
  }

  private initKitInfos(fileName: string): void {
    if (InteropTypescriptLinter.kitInfos.has(fileName)) {
      return;
    }

    let _path = require('path');
    let _fs = require('fs');

    const JSON_SUFFIX = '.json';
    const KIT_CONFIGS = '../ets-loader/kit_configs';
    const KIT_CONFIG_PATH = './build-tools/ets-loader/kit_configs';
    
    const kitConfigs: string[] = [_path.resolve(InteropTypescriptLinter.etsLoaderPath, KIT_CONFIGS)];
    if (process.env.externalApiPaths) {
      const externalApiPaths = process.env.externalApiPaths.split(_path.delimiter);
      externalApiPaths.forEach(sdkPath => {
        kitConfigs.push(_path.resolve(sdkPath, KIT_CONFIG_PATH));
      });
    }

    for (const kitConfig of kitConfigs) {
      const kitModuleConfigJson = _path.resolve(kitConfig, './' + fileName.replace(this.D_TS, JSON_SUFFIX));
      if (_fs.existsSync(kitModuleConfigJson)) {
        InteropTypescriptLinter.kitInfos.set(fileName, JSON.parse(_fs.readFileSync(kitModuleConfigJson, 'utf-8')));
      }
    }
  }

  private getKitModuleFileNames(fileName: string, node: NamedImports | NamedExports, index: number): string {
    if (!InteropTypescriptLinter.kitInfos.has(fileName)) {
      return '';
    }

    const kitInfo = InteropTypescriptLinter.kitInfos.get(fileName);
    if (!kitInfo || !kitInfo.symbols) {
      return '';
    }

    const element = node.elements[index];
    return element.propertyName ?
      kitInfo.symbols[element.propertyName.text].source :
      kitInfo.symbols[element.name.text].source;
  }

  public lint(): void {
    this.visitSourceFile(this.sourceFile);
  }
}
  