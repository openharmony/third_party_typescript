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
import {
    ConstructorDeclaration, createPrinter, EmitHint, Expression, factory, FunctionExpression, FunctionLikeDeclaration,
    isArrowFunction, isElementAccessExpression, isIdentifier, isPropertyAssignment, isPropertyDeclaration, Node,
    NodeArray, NumericLiteral, ParameterDeclaration, Printer, PropertyName, Statement, StringLiteral, SyntaxKind,
    TypeNode, 
} from "../_namespaces/ts";
import { AutofixInfo, FaultID, hasAccessModifier } from "../_namespaces/ts.ArkTSLinter_1_0";

//import Utils = Utils;

export const AUTOFIX_ALL: AutofixInfo = { problemID: "", start: -1, end: -1 };

// Some fixes are potentially risky and may break source code if fixes
// are applied separately.
// Temporary solution is to disable all risky autofixes, until the
// algorithm is improved to guarantee that fixes can be applied
// safely and won't break program code.
const UNSAFE_FIXES: FaultID[] = [ FaultID.LiteralAsPropertyName, FaultID.PropertyAccessByIndex ];

export const autofixInfo: AutofixInfo[] = [];

export function shouldAutofix(node: Node, faultID: FaultID): boolean {
  if (UNSAFE_FIXES.includes(faultID)) return false;
  if (autofixInfo.length === 0) return false;
  if (autofixInfo.length === 1 && autofixInfo[0] === AUTOFIX_ALL) return true;
  return autofixInfo.findIndex(
    value => value.start === node.getStart() && value.end === node.getEnd() && value.problemID === FaultID[faultID]
  ) !== -1;
}

export interface Autofix {
  replacementText: string;
  start: number;
  end: number;
}

const printer: Printer = createPrinter({ omitTrailingSemicolon: false, removeComments: false });

function numericLiteral2IdentifierName(numeric: NumericLiteral): string {
  return "__" + numeric.getText();
}

function stringLiteral2IdentifierName(str: StringLiteral): string {
  const text = str.getText();
  return text.substring(1, text.length-1); // cut out starting and ending quoters.
}

function propertyName2IdentifierName(name: PropertyName): string {
  if (name.kind === SyntaxKind.NumericLiteral) {
    return numericLiteral2IdentifierName(name);
  }

  if (name.kind === SyntaxKind.StringLiteral) {
    return stringLiteral2IdentifierName(name);
  }

  return "";
}

function indexExpr2IdentifierName(index: Expression): string {
  if (index.kind === SyntaxKind.NumericLiteral) {
    return numericLiteral2IdentifierName(index as NumericLiteral);
  }

  if (index.kind === SyntaxKind.StringLiteral) {
    return stringLiteral2IdentifierName(index as StringLiteral);
  }

  return "";
}

export function fixLiteralAsPropertyName(node: Node): Autofix[] | undefined {
  if (isPropertyDeclaration(node) || isPropertyAssignment(node)) {
    const propName = node.name;
    const identName = propertyName2IdentifierName(propName);
    if (identName) {
      return [{ replacementText: identName, start: propName.getStart(), end: propName.getEnd() }];
    }
  }

  return undefined;
}

export function fixPropertyAccessByIndex(node: Node): Autofix[] | undefined {
  if (isElementAccessExpression(node)) {
    const elemAccess = node;
    const identifierName = indexExpr2IdentifierName(elemAccess.argumentExpression);
    if (identifierName) {
      return [{
        replacementText: elemAccess.expression.getText() + "." + identifierName,
        start: elemAccess.getStart(), end: elemAccess.getEnd()
      }];
    }
  }

  return undefined;
}

export function fixFunctionExpression(funcExpr: FunctionExpression,
  params: NodeArray<ParameterDeclaration> = funcExpr.parameters,
  retType: TypeNode | undefined = funcExpr.type): Autofix {
    const arrowFunc = factory.createArrowFunction(
      undefined, undefined, params, retType, factory.createToken(SyntaxKind.EqualsGreaterThanToken),
      funcExpr.body
    );
    const text = printer.printNode(EmitHint.Unspecified, arrowFunc, funcExpr.getSourceFile());
    return { start: funcExpr.getStart(), end: funcExpr.getEnd(), replacementText: text };
}

export function fixReturnType(funcLikeDecl: FunctionLikeDeclaration, typeNode: TypeNode): Autofix {
  const text = ": " + printer.printNode(EmitHint.Unspecified, typeNode, funcLikeDecl.getSourceFile());
  const pos = getReturnTypePosition(funcLikeDecl);
  return { start: pos, end: pos, replacementText: text };
}

function getReturnTypePosition(funcLikeDecl: FunctionLikeDeclaration): number {
  if (funcLikeDecl.body) {
  // Find position of the first node or token that follows parameters.
  // After that, iterate over child nodes in reverse order, until found
  // first closing parenthesis.
  const postParametersPosition = isArrowFunction(funcLikeDecl)
    ? funcLikeDecl.equalsGreaterThanToken.getStart()
    : funcLikeDecl.body.getStart();

  const children = funcLikeDecl.getChildren();
  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i];
    if (child.kind === SyntaxKind.CloseParenToken && child.getEnd() < postParametersPosition) {
      return child.getEnd();
    }
  }
  }

  // Shouldn't get here.
  return -1;
}

export function fixCtorParameterProperties(ctorDecl: ConstructorDeclaration, paramTypes: TypeNode[]): Autofix[] | undefined {
  const fieldInitStmts: Statement[] = [];
  const newFieldPos = ctorDecl.getStart();
  const autofixes: Autofix[] = [{ start: newFieldPos, end: newFieldPos, replacementText: "" }];

  for (let i = 0; i < ctorDecl.parameters.length; i++) {
    const param = ctorDecl.parameters[i];

    // Parameter property can not be a destructuring parameter.
    if (!isIdentifier(param.name)) {
      continue;
    }

    if (hasAccessModifier(param)) {
      const propIdent = factory.createIdentifier(param.name.text);

      const newFieldNode = factory.createPropertyDeclaration(
        param.modifiers, propIdent, undefined, paramTypes[i], undefined
      );
      const newFieldText = printer.printNode(EmitHint.Unspecified, newFieldNode, ctorDecl.getSourceFile()) + "\n";
      autofixes[0].replacementText += newFieldText;

      const newParamDecl = factory.createParameterDeclaration(
        undefined, undefined, param.name, param.questionToken, param.type, param.initializer
      );
      const newParamText = printer.printNode(EmitHint.Unspecified, newParamDecl, ctorDecl.getSourceFile());
      autofixes.push({ start: param.getStart(), end: param.getEnd(), replacementText: newParamText });

      fieldInitStmts.push(factory.createExpressionStatement(factory.createAssignment(
        factory.createPropertyAccessExpression(
          factory.createThis(),
          propIdent,
        ),
        propIdent
      )));
    }
  }

  // Note: Bodyless ctors can't have parameter properties.
  if (ctorDecl.body) {
    const newBody = factory.createBlock(fieldInitStmts.concat(ctorDecl.body.statements), true);
    const newBodyText = printer.printNode(EmitHint.Unspecified, newBody, ctorDecl.getSourceFile());
    autofixes.push({ start: ctorDecl.body.getStart(), end: ctorDecl.body.getEnd(), replacementText: newBodyText });
  }

  return autofixes;
}
