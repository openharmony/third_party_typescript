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
export namespace Problems {

export enum FaultID {
  AnyType, SymbolType, TupleType, ObjectLiteralNoContextType, ArrayLiteralNoContextType,
  ComputedPropertyName, LiteralAsPropertyName, TypeQuery, TupleLiteral, RegexLiteral, IsOperator,
  DestructuringParameter, YieldExpression, InterfaceMerging, EnumMerging, InterfaceExtendsClass, IndexMember, WithStatement,
  ThrowStatement, IndexedAccessType, UnknownType, ForInStatement, InOperator,
  KeyOfOperator, ImportFromPath, FunctionExpression, IntersectionType,
  ObjectTypeLiteral, AddWithWrongType, CommaOperator, LimitedReturnTypeInference,
  LambdaWithTypeParameters, ClassExpression, DestructuringAssignment,
  DestructuringDeclaration, ForOfNonArray, VarDeclaration, CatchWithUnsupportedType, DeleteOperator,
  DeclWithDuplicateName, UnaryArithmNotNumber, ConstructorType, ConstructorIface, ConstructorFuncs, CallSignature,
  TypeAssertion, PrivateIdentifier, LocalFunction,
  SwitchSelectorInvalidType, CaseExpressionNonConst, ConditionalType, MappedType, NamespaceAsObject, ClassAsObject,
  NonDeclarationInNamespace, GeneratorFunction, FunctionContainsThis, PropertyAccessByIndex, JsxElement,
  EnumMemberNonConstInit, ImplementsClass, MultipleStaticBlocks, ThisType, InferType,
  IntefaceExtendDifProps, StructuralIdentity, TypeOnlyImport, TypeOnlyExport, DefaultImport,
  LimitedReExporting, ExportAssignment, ImportAssignment, PropertyRuntimeCheck,
  GenericCallNoTypeArgs, ParameterProperties,
  InstanceofUnsupported, ShorthandAmbientModuleDecl, WildcardsInModuleName, UMDModuleDefinition,
  JSExtensionInModuleIdent, NewTarget, DynamicImport, DefiniteAssignment, IifeAsNamespace, Prototype, GlobalThis,
  UtilityType, PropertyDeclOnFunction, FunctionApplyBindCall, ReadonlyArr, ConstAssertion, ImportAssertion,
  SpreadOperator, LimitedStdLibApi, ErrorSuppression, StrictDiagnostic, UnsupportedDecorators, ImportAfterStatement,
  LAST_ID, // this should always be last enum`
}

export class FaultAttributs {
  migratable?: boolean;
  warning?: boolean;
  cookBookRef = "-1";
}

export const faultsAttrs: FaultAttributs[] = [];

faultsAttrs[FaultID.LiteralAsPropertyName] = { migratable: true, cookBookRef: "1", };
faultsAttrs[FaultID.ComputedPropertyName] = { cookBookRef: "1", };
faultsAttrs[FaultID.SymbolType] = { cookBookRef: "2", };
faultsAttrs[FaultID.PrivateIdentifier] = { migratable: true, cookBookRef: "3", };
faultsAttrs[FaultID.DeclWithDuplicateName] = { migratable: true, cookBookRef: "4", };
faultsAttrs[FaultID.VarDeclaration] = { migratable: true, cookBookRef: "5", };
faultsAttrs[FaultID.AnyType] = { cookBookRef: "8" };
faultsAttrs[FaultID.UnknownType] = { cookBookRef: "8", };
faultsAttrs[FaultID.TupleType] = { cookBookRef: "13", };
faultsAttrs[FaultID.TupleLiteral] = { cookBookRef: "13", };
faultsAttrs[FaultID.CallSignature] = { cookBookRef: "14", };
faultsAttrs[FaultID.ConstructorType] = { cookBookRef: "15", };
faultsAttrs[FaultID.MultipleStaticBlocks] = { cookBookRef: "16", };
faultsAttrs[FaultID.IndexMember] = { cookBookRef: "17", };
faultsAttrs[FaultID.IntersectionType] = { cookBookRef: "19", };
faultsAttrs[FaultID.ThisType] = { cookBookRef: "21", };
faultsAttrs[FaultID.ConditionalType] = { cookBookRef: "22", };
faultsAttrs[FaultID.ParameterProperties] = { migratable: true, cookBookRef: "25", };
faultsAttrs[FaultID.ConstructorIface] = { cookBookRef: "27", };
faultsAttrs[FaultID.IndexedAccessType] = { cookBookRef: "28", };
faultsAttrs[FaultID.PropertyAccessByIndex] = { migratable: true, cookBookRef: "29", };
faultsAttrs[FaultID.StructuralIdentity] = { cookBookRef: "30", };
faultsAttrs[FaultID.GenericCallNoTypeArgs] = { cookBookRef: "34", };
faultsAttrs[FaultID.RegexLiteral] = { cookBookRef: "37", };
faultsAttrs[FaultID.ObjectLiteralNoContextType] = { cookBookRef: "38", };
faultsAttrs[FaultID.ObjectTypeLiteral] = { cookBookRef: "40", };
faultsAttrs[FaultID.ArrayLiteralNoContextType] = { cookBookRef: "43", };
faultsAttrs[FaultID.FunctionExpression] = { migratable: true, cookBookRef: "46", };
faultsAttrs[FaultID.LambdaWithTypeParameters] = { migratable: true, cookBookRef: "49", };
faultsAttrs[FaultID.ClassExpression] = { migratable: true, cookBookRef: "50", };
faultsAttrs[FaultID.ImplementsClass] = { cookBookRef: "51", };
faultsAttrs[FaultID.TypeAssertion] = { migratable: true, cookBookRef: "53", };
faultsAttrs[FaultID.JsxElement] = { cookBookRef: "54", };
faultsAttrs[FaultID.UnaryArithmNotNumber] = { cookBookRef: "55", };
faultsAttrs[FaultID.DeleteOperator] = { cookBookRef: "59", };
faultsAttrs[FaultID.TypeQuery] = { cookBookRef: "60", };
// remove as rule#61: FaultID.BitOpWithWrongType => { cookBookRef: "61", };
faultsAttrs[FaultID.AddWithWrongType] = { cookBookRef: "63", };
faultsAttrs[FaultID.InstanceofUnsupported] = { cookBookRef: "65", };
faultsAttrs[FaultID.InOperator] = { cookBookRef: "66", };
faultsAttrs[FaultID.DestructuringAssignment] = { migratable: true, cookBookRef: "69", };
faultsAttrs[FaultID.CommaOperator] = { cookBookRef: "71", };
faultsAttrs[FaultID.DestructuringDeclaration] = { migratable: true, cookBookRef: "74", };
faultsAttrs[FaultID.InferType] = { cookBookRef: "76", };
faultsAttrs[FaultID.CatchWithUnsupportedType] = { migratable: true, cookBookRef: "79", };
faultsAttrs[FaultID.ForInStatement] = { cookBookRef: "80", };
faultsAttrs[FaultID.ForOfNonArray] = { migratable: true, cookBookRef: "82", };
faultsAttrs[FaultID.MappedType] = { cookBookRef: "83", };
faultsAttrs[FaultID.WithStatement] = { cookBookRef: "84", };
faultsAttrs[FaultID.CaseExpressionNonConst] = { cookBookRef: "85", };
faultsAttrs[FaultID.SwitchSelectorInvalidType] = { cookBookRef: "86", };
faultsAttrs[FaultID.ThrowStatement] = { migratable: true, cookBookRef: "87", };
faultsAttrs[FaultID.LimitedReturnTypeInference] = { migratable: true, cookBookRef: "90", };
faultsAttrs[FaultID.DestructuringParameter] = { cookBookRef: "91", };
faultsAttrs[FaultID.LocalFunction] = { migratable: true, cookBookRef: "92", };
faultsAttrs[FaultID.FunctionContainsThis] = { cookBookRef: "93", };
faultsAttrs[FaultID.GeneratorFunction] = { cookBookRef: "94", };
faultsAttrs[FaultID.YieldExpression] = { cookBookRef: "94", };
faultsAttrs[FaultID.IsOperator] = { cookBookRef: "96", };
faultsAttrs[FaultID.KeyOfOperator] = { cookBookRef: "97", };
faultsAttrs[FaultID.SpreadOperator] = { cookBookRef: "99", };
faultsAttrs[FaultID.IntefaceExtendDifProps] = { cookBookRef: "102", };
faultsAttrs[FaultID.InterfaceMerging] = { cookBookRef: "103", };
faultsAttrs[FaultID.InterfaceExtendsClass] = { cookBookRef: "104", };
faultsAttrs[FaultID.PropertyRuntimeCheck] = { cookBookRef: "105", };
faultsAttrs[FaultID.ConstructorFuncs] = { cookBookRef: "106", };
faultsAttrs[FaultID.EnumMemberNonConstInit] = { cookBookRef: "111", };
faultsAttrs[FaultID.EnumMerging] = { cookBookRef: "113", };
faultsAttrs[FaultID.NamespaceAsObject] = { cookBookRef: "114", };
faultsAttrs[FaultID.NonDeclarationInNamespace] = { cookBookRef: "116", };
faultsAttrs[FaultID.ImportFromPath] = { cookBookRef: "119", };
faultsAttrs[FaultID.TypeOnlyImport] = { migratable: true, cookBookRef: "118", };
faultsAttrs[FaultID.DefaultImport] = { migratable: true, cookBookRef: "120", };
faultsAttrs[FaultID.ImportAssignment] = { cookBookRef: "121", };
faultsAttrs[FaultID.LimitedReExporting] = { cookBookRef: "125", };
faultsAttrs[FaultID.ExportAssignment] = { cookBookRef: "126", };
faultsAttrs[FaultID.TypeOnlyExport] = { migratable: true, cookBookRef: "127", };
faultsAttrs[FaultID.ShorthandAmbientModuleDecl] = { cookBookRef: "128", };
faultsAttrs[FaultID.WildcardsInModuleName] = { cookBookRef: "129", };
faultsAttrs[FaultID.UMDModuleDefinition] = { cookBookRef: "130", };
faultsAttrs[FaultID.JSExtensionInModuleIdent] = { cookBookRef: "131", };
faultsAttrs[FaultID.NewTarget] = { cookBookRef: "132", };
faultsAttrs[FaultID.DynamicImport] = { cookBookRef: "133", };
faultsAttrs[FaultID.DefiniteAssignment] = { cookBookRef: "134", };
faultsAttrs[FaultID.IifeAsNamespace] = { cookBookRef: "135", };
faultsAttrs[FaultID.Prototype] = { cookBookRef: "136", };
faultsAttrs[FaultID.GlobalThis] = { cookBookRef: "137", };
faultsAttrs[FaultID.UtilityType] = { cookBookRef: "138", };
faultsAttrs[FaultID.PropertyDeclOnFunction] = { cookBookRef: "139", };
faultsAttrs[FaultID.FunctionApplyBindCall] = { cookBookRef: "140", };
faultsAttrs[FaultID.ReadonlyArr] = { migratable: true, cookBookRef: "141", };
faultsAttrs[FaultID.ConstAssertion] = { cookBookRef: "142", };
faultsAttrs[FaultID.ImportAssertion] = { cookBookRef: "143", };
faultsAttrs[FaultID.LimitedStdLibApi] = { cookBookRef: "144", };
faultsAttrs[FaultID.StrictDiagnostic] = { cookBookRef: "145", };
faultsAttrs[FaultID.ErrorSuppression] = { cookBookRef: "146", };
faultsAttrs[FaultID.UnsupportedDecorators] = { cookBookRef: "148", };
faultsAttrs[FaultID.ClassAsObject] = { cookBookRef: "149", };
faultsAttrs[FaultID.ImportAfterStatement] = { cookBookRef: "150", };
}
}