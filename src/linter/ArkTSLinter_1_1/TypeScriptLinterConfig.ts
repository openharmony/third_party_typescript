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
//import * as ts from 'typescript';
import FaultID = Problems.FaultID;

export class LinterConfig {
  static nodeDesc: string[] = [];

  // The SyntaxKind enum defines additional elements at the end of the enum
  // that serve as markers (FirstX/LastX). Those elements are initialized
  // with indices of the previously defined elements. As result, the enum
  // may return incorrect name for a certain kind index (e.g. 'FirstStatement'
  // instead of 'VariableStatement').
  // The following code creates a map with correct syntax kind names.
  // It can be used when need to print name of syntax kind of certain
  // AST node in diagnostic messages.
  static tsSyntaxKindNames: string[] = [];

  // Use static init method, as TypeScript 4.2 doesn't support static blocks.
  static initStatic(): void {
    // Set the feature descriptions (for the output).
    LinterConfig.nodeDesc[FaultID.AnyType] = "\"any\" type";
    LinterConfig.nodeDesc[FaultID.SymbolType] = "\"symbol\" type";
    LinterConfig.nodeDesc[FaultID.ObjectLiteralNoContextType] = "Object literals with no context Class or Interface type";
    LinterConfig.nodeDesc[FaultID.ArrayLiteralNoContextType] = "Array literals with no context Array type";
    LinterConfig.nodeDesc[FaultID.ComputedPropertyName] = "Computed properties";
    LinterConfig.nodeDesc[FaultID.LiteralAsPropertyName] = "String or integer literal as property name";
    LinterConfig.nodeDesc[FaultID.TypeQuery] = "\"typeof\" operations";
    LinterConfig.nodeDesc[FaultID.IsOperator] = "\"is\" operations";
    LinterConfig.nodeDesc[FaultID.DestructuringParameter] = "destructuring parameters";
    LinterConfig.nodeDesc[FaultID.YieldExpression] = "\"yield\" operations";
    LinterConfig.nodeDesc[FaultID.InterfaceMerging] = "merging interfaces";
    LinterConfig.nodeDesc[FaultID.EnumMerging] = "merging enums";
    LinterConfig.nodeDesc[FaultID.InterfaceExtendsClass] = "interfaces inherited from classes";
    LinterConfig.nodeDesc[FaultID.IndexMember] = "index members";
    LinterConfig.nodeDesc[FaultID.WithStatement] = "\"with\" statements";
    LinterConfig.nodeDesc[FaultID.ThrowStatement] = "\"throw\" statements with expression of wrong type";
    LinterConfig.nodeDesc[FaultID.IndexedAccessType] = "Indexed access type";
    LinterConfig.nodeDesc[FaultID.UnknownType] = "\"unknown\" type";
    LinterConfig.nodeDesc[FaultID.ForInStatement] = "\"for-In\" statements";
    LinterConfig.nodeDesc[FaultID.InOperator] = "\"in\" operations";
    LinterConfig.nodeDesc[FaultID.FunctionExpression] = "function expressions";
    LinterConfig.nodeDesc[FaultID.IntersectionType] = "intersection types and type literals";
    LinterConfig.nodeDesc[FaultID.ObjectTypeLiteral] = "Object type literals";
    LinterConfig.nodeDesc[FaultID.CommaOperator] = "comma operator";
    LinterConfig.nodeDesc[FaultID.LimitedReturnTypeInference] = "Functions with limited return type inference";
    LinterConfig.nodeDesc[FaultID.ClassExpression] = "Class expressions";
    LinterConfig.nodeDesc[FaultID.DestructuringAssignment] = "Destructuring assignments";
    LinterConfig.nodeDesc[FaultID.DestructuringDeclaration] = "Destructuring variable declarations";
    LinterConfig.nodeDesc[FaultID.VarDeclaration] = "\"var\" declarations";
    LinterConfig.nodeDesc[FaultID.CatchWithUnsupportedType] = "\"catch\" clause with unsupported exception type";
    LinterConfig.nodeDesc[FaultID.DeleteOperator] = "\"delete\" operations";
    LinterConfig.nodeDesc[FaultID.DeclWithDuplicateName] = "Declarations with duplicate name";
    LinterConfig.nodeDesc[FaultID.UnaryArithmNotNumber] = "Unary arithmetics with not-numeric values";
    LinterConfig.nodeDesc[FaultID.ConstructorType] = "Constructor type";
    LinterConfig.nodeDesc[FaultID.ConstructorFuncs] = "Constructor function type is not supported";
    LinterConfig.nodeDesc[FaultID.ConstructorIface] = "Construct signatures are not supported in interfaces";
    LinterConfig.nodeDesc[FaultID.CallSignature] = "Call signatures";
    LinterConfig.nodeDesc[FaultID.TypeAssertion] = "Type assertion expressions";
    LinterConfig.nodeDesc[FaultID.PrivateIdentifier] = "Private identifiers (with \"#\" prefix)";
    LinterConfig.nodeDesc[FaultID.LocalFunction] = "Local function declarations";
    LinterConfig.nodeDesc[FaultID.ConditionalType] = "Conditional type";
    LinterConfig.nodeDesc[FaultID.MappedType] = "Mapped type";
    LinterConfig.nodeDesc[FaultID.NamespaceAsObject] = "Namespaces used as objects";
    LinterConfig.nodeDesc[FaultID.ClassAsObject] = "Class used as object";
    LinterConfig.nodeDesc[FaultID.NonDeclarationInNamespace] = "Non-declaration statements in namespaces";
    LinterConfig.nodeDesc[FaultID.GeneratorFunction] = "Generator functions";
    LinterConfig.nodeDesc[FaultID.FunctionContainsThis] = "Functions containing \"this\"";
    LinterConfig.nodeDesc[FaultID.PropertyAccessByIndex] = "property access by index";
    LinterConfig.nodeDesc[FaultID.JsxElement] = "JSX Elements";
    LinterConfig.nodeDesc[FaultID.EnumMemberNonConstInit] = "Enum members with non-constant initializer";
    LinterConfig.nodeDesc[FaultID.ImplementsClass] = "Class type mentioned in \"implements\" clause";
    LinterConfig.nodeDesc[FaultID.MethodReassignment] = "Method reassignment";
    LinterConfig.nodeDesc[FaultID.MultipleStaticBlocks] = "Multiple static blocks";
    LinterConfig.nodeDesc[FaultID.ThisType] = "\"this\" type";
    LinterConfig.nodeDesc[FaultID.IntefaceExtendDifProps] = "Extends same properties with different types";
    LinterConfig.nodeDesc[FaultID.StructuralIdentity] = "Use of type structural identity";
    LinterConfig.nodeDesc[FaultID.ExportAssignment] = "Export assignments (export = ..)";
    LinterConfig.nodeDesc[FaultID.ImportAssignment] = "Import assignments (import = ..)";
    LinterConfig.nodeDesc[FaultID.GenericCallNoTypeArgs] = "Generic calls without type arguments";
    LinterConfig.nodeDesc[FaultID.ParameterProperties] = "Parameter properties in constructor";
    LinterConfig.nodeDesc[FaultID.InstanceofUnsupported] = "Left-hand side of \"instanceof\" is wrong";
    LinterConfig.nodeDesc[FaultID.ShorthandAmbientModuleDecl] = "Shorthand ambient module declaration";
    LinterConfig.nodeDesc[FaultID.WildcardsInModuleName] = "Wildcards in module name";
    LinterConfig.nodeDesc[FaultID.UMDModuleDefinition] = "UMD module definition";
    LinterConfig.nodeDesc[FaultID.NewTarget] = "\"new.target\" meta-property";
    LinterConfig.nodeDesc[FaultID.DefiniteAssignment] = "Definite assignment assertion";
    LinterConfig.nodeDesc[FaultID.Prototype] = "Prototype assignment";
    LinterConfig.nodeDesc[FaultID.GlobalThis] = "Use of globalThis";
    LinterConfig.nodeDesc[FaultID.UtilityType] = "Standard Utility types";
    LinterConfig.nodeDesc[FaultID.PropertyDeclOnFunction] = "Property declaration on function";
    LinterConfig.nodeDesc[FaultID.FunctionApplyCall] = "Invoking methods of function objects";
    LinterConfig.nodeDesc[FaultID.FunctionBind] = "Invoking methods of function objects";
    LinterConfig.nodeDesc[FaultID.ConstAssertion] = "\"as const\" assertion";
    LinterConfig.nodeDesc[FaultID.ImportAssertion] = "Import assertion";
    LinterConfig.nodeDesc[FaultID.SpreadOperator] = "Spread operation";
    LinterConfig.nodeDesc[FaultID.LimitedStdLibApi] = "Limited standard library API";
    LinterConfig.nodeDesc[FaultID.ErrorSuppression] = "Error suppression annotation";
    LinterConfig.nodeDesc[FaultID.StrictDiagnostic] = "Strict diagnostic";
    LinterConfig.nodeDesc[FaultID.ImportAfterStatement] = "Import declaration after other declaration or statement";
    LinterConfig.nodeDesc[FaultID.EsObjectType] = 'Restricted "ESObject" type';
    LinterConfig.nodeDesc[FaultID.SendableClassInheritance] = 'Sendable class inheritance';
    LinterConfig.nodeDesc[FaultID.SendablePropType] = 'Sendable class property';
    LinterConfig.nodeDesc[FaultID.SendableDefiniteAssignment] = 'Use of definite assignment assertion in "Sendable" class';
    LinterConfig.nodeDesc[FaultID.SendableGenericTypes] = 'Sendable generic types';
    LinterConfig.nodeDesc[FaultID.SendableClassDecorator] = 'Sendable class decorator';
    LinterConfig.nodeDesc[FaultID.SendableObjectInitialization] = 'Object literal or array literal is not allowed to \
                                                                      initialize a "Sendable" object';
    LinterConfig.nodeDesc[FaultID.SendableComputedPropName] = 'Sendable computed property name';
    LinterConfig.nodeDesc[FaultID.SendableAsExpr] = 'Sendable as expr';
    LinterConfig.nodeDesc[FaultID.SharedNoSideEffectImport] = 'Shared no side effect import';
    LinterConfig.nodeDesc[FaultID.SharedModuleExports] = 'Shared module exports';
    LinterConfig.nodeDesc[FaultID.SharedModuleNoStarExport] = 'Share module no star export';
  }

  /*
  private static initTsSyntaxKindNames(): void {
    const keys = Object.keys(SyntaxKind);
    const values = Object.values(SyntaxKind);

    for (let i = 0; i < values.length; i++) {
      const val = values[i];
      const kindNum = typeof val === "string" ? parseInt(val) : val;
      if (kindNum && !LinterConfig.tsSyntaxKindNames[kindNum]) {
        LinterConfig.tsSyntaxKindNames[kindNum] = keys[i];
      }
    }
  }
*/
  // must detect terminals during parsing
  static terminalTokens: Set<SyntaxKind> = new Set([
    SyntaxKind.OpenBraceToken, SyntaxKind.CloseBraceToken, SyntaxKind.OpenParenToken,
    SyntaxKind.CloseParenToken, SyntaxKind.OpenBracketToken, SyntaxKind.CloseBracketToken,
    SyntaxKind.DotToken, SyntaxKind.DotDotDotToken, SyntaxKind.SemicolonToken, SyntaxKind.CommaToken,
    SyntaxKind.QuestionDotToken, SyntaxKind.LessThanToken, SyntaxKind.LessThanSlashToken,
    SyntaxKind.GreaterThanToken, SyntaxKind.LessThanEqualsToken, SyntaxKind.GreaterThanEqualsToken,
    SyntaxKind.EqualsEqualsToken, SyntaxKind.ExclamationEqualsToken, SyntaxKind.EqualsEqualsEqualsToken,
    SyntaxKind.ExclamationEqualsEqualsToken, SyntaxKind.EqualsGreaterThanToken, SyntaxKind.PlusToken,
    SyntaxKind.MinusToken, SyntaxKind.AsteriskToken, SyntaxKind.AsteriskAsteriskToken,
    SyntaxKind.SlashToken, SyntaxKind.PercentToken, SyntaxKind.PlusPlusToken, SyntaxKind.MinusMinusToken,
    SyntaxKind.LessThanLessThanToken, SyntaxKind.GreaterThanGreaterThanToken,
    SyntaxKind.GreaterThanGreaterThanGreaterThanToken, SyntaxKind.AmpersandToken, SyntaxKind.BarToken,
    SyntaxKind.CaretToken, SyntaxKind.ExclamationToken, SyntaxKind.TildeToken,
    SyntaxKind.AmpersandAmpersandToken, SyntaxKind.BarBarToken, SyntaxKind.QuestionQuestionToken,
    SyntaxKind.QuestionToken, SyntaxKind.ColonToken, SyntaxKind.AtToken, SyntaxKind.BacktickToken,
    SyntaxKind.EqualsToken, SyntaxKind.PlusEqualsToken, SyntaxKind.MinusEqualsToken,
    SyntaxKind.AsteriskEqualsToken, SyntaxKind.AsteriskAsteriskEqualsToken, SyntaxKind.SlashEqualsToken,
    SyntaxKind.PercentEqualsToken, SyntaxKind.LessThanLessThanEqualsToken,
    SyntaxKind.GreaterThanGreaterThanEqualsToken, SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken,
    SyntaxKind.AmpersandEqualsToken, SyntaxKind.BarEqualsToken, SyntaxKind.CaretEqualsToken,
    SyntaxKind.EndOfFileToken, SyntaxKind.SingleLineCommentTrivia,
    SyntaxKind.MultiLineCommentTrivia, SyntaxKind.NewLineTrivia, SyntaxKind.WhitespaceTrivia,
    SyntaxKind.ShebangTrivia, /* We detect and preserve #! on the first line */ SyntaxKind.ConflictMarkerTrivia,
  ]);

  // tokens which can be reported without additional parsing
  static incrementOnlyTokens: ESMap<SyntaxKind , FaultID> = new Map([
    [SyntaxKind.AnyKeyword, FaultID.AnyType],
    [SyntaxKind.SymbolKeyword, FaultID.SymbolType],
    [SyntaxKind.ThisType, FaultID.ThisType],
    [SyntaxKind.TypeQuery, FaultID.TypeQuery],
    [SyntaxKind.DeleteExpression, FaultID.DeleteOperator],
    [SyntaxKind.TypePredicate, FaultID.IsOperator],
    [SyntaxKind.YieldExpression, FaultID.YieldExpression],
    [SyntaxKind.WithStatement, FaultID.WithStatement],
    [SyntaxKind.IndexedAccessType, FaultID.IndexedAccessType],
    [SyntaxKind.UnknownKeyword, FaultID.UnknownType],
    [SyntaxKind.CallSignature, FaultID.CallSignature],
    [SyntaxKind.IntersectionType, FaultID.IntersectionType],
    [SyntaxKind.ConstructorType, FaultID.ConstructorFuncs],
    [SyntaxKind.PrivateIdentifier, FaultID.PrivateIdentifier],
    [SyntaxKind.ConditionalType, FaultID.ConditionalType],
    [SyntaxKind.MappedType, FaultID.MappedType],
    [SyntaxKind.JsxElement, FaultID.JsxElement],
    [SyntaxKind.JsxSelfClosingElement, FaultID.JsxElement],
    [SyntaxKind.ImportEqualsDeclaration, FaultID.ImportAssignment],
    [SyntaxKind.NamespaceExportDeclaration, FaultID.UMDModuleDefinition],
    [SyntaxKind.ClassExpression, FaultID.ClassExpression],
  ]);
}

}
}
