/*
 * Copyright (c) 2023-2023 Huawei Device Co., Ltd.
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
export namespace Autofixer_1_1 {

export interface Autofix {
  replacementText: string;
  start: number;
  end: number;
}

export class Autofixer {
  
  fixLiteralAsPropertyNamePropertyAssignment(_node: ts.PropertyAssignment): Autofix[] | undefined {
    // mock
    return [];
  }

  fixLiteralAsPropertyNamePropertyName(_node: ts.PropertyName): Autofix[] | undefined {
    // mock
    return [];
  }

  fixPropertyAccessByIndex(_node: Node): Autofix[] | undefined {
    // mock
    return [];
  }
  
  fixFunctionExpression(
    funcExpr: ts.FunctionExpression,
    _retType: ts.TypeNode | undefined = funcExpr.type,
    _modifiers: readonly ts.Modifier[] | undefined,
    _isGenerator: boolean,
    _hasUnfixableReturnType: boolean
  ): Autofix[] | undefined {
    // mock
    return [];
  }

  fixVarDeclaration(_node: ts.VariableDeclarationList): Autofix[] | undefined {
    // mock
    return [];
  }
  
  fixMissingReturnType(_funcLikeDecl: FunctionLikeDeclaration, _typeNode: TypeNode): Autofix[] {
    // mock
    return [];
  }

  dropTypeOnVarDecl(_varDecl: ts.VariableDeclaration): Autofix[] {
    // mock
    return [];
  }

  fixTypeAssertion(_typeAssertion: ts.TypeAssertion): Autofix[] {
    // mock
    return [];
  }
  
  fixCommaOperator(_tsNode: ts.Node): Autofix[] {
    // mock
    return [];
  }

  fixEnumMerging(_enumSymbol: ts.Symbol, _enumDeclsInFile: ts.Declaration[]): Autofix[] | undefined {
    // mock
    return [];
  }

  fixCtorParameterProperties(_ctorDecl: ConstructorDeclaration, _paramTypes: ts.TypeNode[] | undefined): Autofix[] | undefined {
    // mock
    return [];
  }

  fixPrivateIdentifier(_ident: ts.PrivateIdentifier): Autofix[] | undefined {
    // mock
    return [];
  }


  fixNestedFunction(_tsFunctionDeclaration: ts.FunctionDeclaration): Autofix[] | undefined {
    // mock
    return [];
  }

  fixMultipleStaticBlocks(_nodes: ts.Node[]): Autofix[] | undefined {
    // mock
    return [];
  }

  fixUntypedObjectLiteral(
    _objectLiteralExpr: ts.ObjectLiteralExpression,
    _objectLiteralType: ts.Type | undefined
  ): Autofix[] | undefined {
    // mock
    return [];
  }

  fixTypeliteral(_typeLiteral: ts.TypeLiteralNode): Autofix[] | undefined {
    // mock
    return [];
  }

};


}
}
}
