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
export const cookBookMsg: string[] = [];
export const cookBookTag: string[] = [];

for (let i = 0; i <= 168; i++) {
  cookBookMsg[ i ] = "";
}

cookBookTag[1] = "Objects with property names that are not identifiers are not supported (arkts-identifiers-as-prop-names)";
cookBookTag[2] = "\"Symbol()\" API is not supported (arkts-no-symbol)";
cookBookTag[3] = "Private \"#\" identifiers are not supported (arkts-no-private-identifiers)";
cookBookTag[4] = "Use unique names for types and namespaces. (arkts-unique-names)";
cookBookTag[5] = "Use \"let\" instead of \"var\" (arkts-no-var)";
cookBookTag[6] = "";
cookBookTag[7] = "";
cookBookTag[8] = "Use explicit types instead of \"any\", \"unknown\" (arkts-no-any-unknown)";
cookBookTag[9] = "";
cookBookTag[10] = "";
cookBookTag[11] = "";
cookBookTag[12] = "";
cookBookTag[13] = "";
cookBookTag[14] = "Use \"class\" instead of a type with call signature (arkts-no-call-signatures)";
cookBookTag[15] = "Use \"class\" instead of a type with constructor signature (arkts-no-ctor-signatures-type)";
cookBookTag[16] = "Only one static block is supported (arkts-no-multiple-static-blocks)";
cookBookTag[17] = "Indexed signatures are not supported (arkts-no-indexed-signatures)";
cookBookTag[18] = "";
cookBookTag[19] = "Use inheritance instead of intersection types (arkts-no-intersection-types)";
cookBookTag[20] = "";
cookBookTag[21] = "Type notation using \"this\" is not supported (arkts-no-typing-with-this)";
cookBookTag[22] = "Conditional types are not supported (arkts-no-conditional-types)";
cookBookTag[23] = "";
cookBookTag[24] = "";
cookBookTag[25] = "Declaring fields in \"constructor\" is not supported (arkts-no-ctor-prop-decls)";
cookBookTag[26] = "";
cookBookTag[27] = "Construct signatures are not supported in interfaces (arkts-no-ctor-signatures-iface)";
cookBookTag[28] = "Indexed access types are not supported (arkts-no-aliases-by-index)";
cookBookTag[29] = "Indexed access is not supported for fields (arkts-no-props-by-index)";
cookBookTag[30] = "Structural typing is not supported (arkts-no-structural-typing)";
cookBookTag[31] = "";
cookBookTag[32] = "";
cookBookTag[33] = "";
cookBookTag[34] = "Type inference in case of generic function calls is limited (arkts-no-inferred-generic-params)";
cookBookTag[35] = "";
cookBookTag[36] = "";
cookBookTag[37] = "";
cookBookTag[38] = "Object literal must correspond to some explicitly declared class or interface (arkts-no-untyped-obj-literals)";
cookBookTag[39] = "";
cookBookTag[40] = "Object literals cannot be used as type declarations (arkts-no-obj-literals-as-types)";
cookBookTag[41] = "";
cookBookTag[42] = "";
cookBookTag[43] = "Array literals must contain elements of only inferrable types (arkts-no-noninferrable-arr-literals)";
cookBookTag[44] = "";
cookBookTag[45] = "";
cookBookTag[46] = "Use arrow functions instead of function expressions (arkts-no-func-expressions)";
cookBookTag[47] = "";
cookBookTag[48] = "";
cookBookTag[49] = "";
cookBookTag[50] = "Class literals are not supported (arkts-no-class-literals)";
cookBookTag[51] = "Classes cannot be specified in \"implements\" clause (arkts-implements-only-iface)";
cookBookTag[52] = "Reassigning object methods is not supported (arkts-no-method-reassignment)";
cookBookTag[53] = "Only \"as T\" syntax is supported for type casts (arkts-as-casts)";
cookBookTag[54] = "JSX expressions are not supported (arkts-no-jsx)";
cookBookTag[55] = "Unary operators \"+\", \"-\" and \"~\" work only on numbers (arkts-no-polymorphic-unops)";
cookBookTag[56] = "";
cookBookTag[57] = "";
cookBookTag[58] = "";
cookBookTag[59] = "\"delete\" operator is not supported (arkts-no-delete)";
cookBookTag[60] = "\"typeof\" operator is allowed only in expression contexts (arkts-no-type-query)";
cookBookTag[61] = "";
cookBookTag[62] = "";
cookBookTag[63] = "";
cookBookTag[64] = "";
cookBookTag[65] = "\"instanceof\" operator is partially supported (arkts-instanceof-ref-types)";
cookBookTag[66] = "\"in\" operator is not supported (arkts-no-in)";
cookBookTag[67] = "";
cookBookTag[68] = "";
cookBookTag[69] = "Destructuring assignment is not supported (arkts-no-destruct-assignment)";
cookBookTag[70] = "";
cookBookTag[71] = "The comma operator \",\" is supported only in \"for\" loops (arkts-no-comma-outside-loops)";
cookBookTag[72] = "";
cookBookTag[73] = "";
cookBookTag[74] = "Destructuring variable declarations are not supported (arkts-no-destruct-decls)";
cookBookTag[75] = "";
cookBookTag[76] = "";
cookBookTag[77] = "";
cookBookTag[78] = "";
cookBookTag[79] = "Type annotation in catch clause is not supported (arkts-no-types-in-catch)";
cookBookTag[80] = "\"for .. in\" is not supported (arkts-no-for-in)";
cookBookTag[81] = "";
cookBookTag[82] = "";
cookBookTag[83] = "Mapped type expression is not supported (arkts-no-mapped-types)";
cookBookTag[84] = "\"with\" statement is not supported (arkts-no-with)";
cookBookTag[85] = "";
cookBookTag[86] = "";
cookBookTag[87] = "\"throw\" statements cannot accept values of arbitrary types (arkts-limited-throw)";
cookBookTag[88] = "";
cookBookTag[89] = "";
cookBookTag[90] = "Function return type inference is limited (arkts-no-implicit-return-types)";
cookBookTag[91] = "Destructuring parameter declarations are not supported (arkts-no-destruct-params)";
cookBookTag[92] = "Nested functions are not supported (arkts-no-nested-funcs)";
cookBookTag[93] = "Using \"this\" inside stand-alone functions is not supported (arkts-no-standalone-this)";
cookBookTag[94] = "Generator functions are not supported (arkts-no-generators)";
cookBookTag[95] = "";
cookBookTag[96] = "Type guarding is supported with \"instanceof\" and \"as\" (arkts-no-is)";
cookBookTag[97] = "";
cookBookTag[98] = "";
cookBookTag[99] = "It is possible to spread only arrays or classes derived from arrays into the rest parameter or array literals (arkts-no-spread)";
cookBookTag[100] = "";
cookBookTag[101] = "";
cookBookTag[102] = "Interface can not extend interfaces with the same method (arkts-no-extend-same-prop)";
cookBookTag[103] = "Declaration merging is not supported (arkts-no-decl-merging)";
cookBookTag[104] = "Interfaces cannot extend classes (arkts-extends-only-class)";
cookBookTag[105] = "";
cookBookTag[106] = "Constructor function type is not supported (arkts-no-ctor-signatures-funcs)";
cookBookTag[107] = "";
cookBookTag[108] = "";
cookBookTag[109] = "";
cookBookTag[110] = "";
cookBookTag[111] = "Enumeration members can be initialized only with compile time expressions of the same type (arkts-no-enum-mixed-types)";
cookBookTag[112] = "";
cookBookTag[113] = "\"enum\" declaration merging is not supported (arkts-no-enum-merging)";
cookBookTag[114] = "Namespaces cannot be used as objects (arkts-no-ns-as-obj)";
cookBookTag[115] = "";
cookBookTag[116] = "Non-declaration statements in namespaces are not supported (single semicolons are considered as empty non-delcaration statements) (arkts-no-ns-statements)";
cookBookTag[117] = "";
cookBookTag[118] = "Special import type declarations are not supported (arkts-no-special-imports)";
cookBookTag[119] = "";
cookBookTag[120] = "";
cookBookTag[121] = "\"require\" and \"import\" assignment are not supported (arkts-no-require)";
cookBookTag[122] = "";
cookBookTag[123] = "";
cookBookTag[124] = "";
cookBookTag[125] = "";
cookBookTag[126] = "\"export = ...\" assignment is not supported (arkts-no-export-assignment)";
cookBookTag[127] = "Special \"export type\" declarations are not supported (arkts-no-special-exports)";
cookBookTag[128] = "Ambient module declaration is not supported (arkts-no-ambient-decls)";
cookBookTag[129] = "Wildcards in module names are not supported (arkts-no-module-wildcards)";
cookBookTag[130] = "Universal module definitions (UMD) are not supported (arkts-no-umd)";
cookBookTag[131] = "";
cookBookTag[132] = "\"new.target\" is not supported (arkts-no-new-target)";
cookBookTag[133] = "";
cookBookTag[134] = "Definite assignment assertions are not supported (arkts-no-definite-assignment)";
cookBookTag[135] = "";
cookBookTag[136] = "Prototype assignment is not supported (arkts-no-prototype-assignment)";
cookBookTag[137] = "\"globalThis\" is not supported (arkts-no-globalthis)";
cookBookTag[138] = "Some of utility types are not supported (arkts-no-utility-types)";
cookBookTag[139] = "Declaring properties on functions is not supported (arkts-no-func-props)";
cookBookTag[140] = "'Function.bind' is not supported (arkts-no-func-bind)";
cookBookTag[141] = "";
cookBookTag[142] = "\"as const\" assertions are not supported (arkts-no-as-const)";
cookBookTag[143] = "Import assertions are not supported (arkts-no-import-assertions)";
cookBookTag[144] = "Usage of standard library is restricted (arkts-limited-stdlib)";
cookBookTag[145] = "Strict type checking is enforced (arkts-strict-typing)";
cookBookTag[146] = "Switching off type checks with in-place comments is not allowed (arkts-strict-typing-required)";
cookBookTag[147] = "No dependencies on TypeScript code are currently allowed (arkts-no-ts-deps)";
cookBookTag[148] = "";
cookBookTag[149] = "Classes cannot be used as objects (arkts-no-classes-as-obj)";
cookBookTag[150] = "\"import\" statements after other statements are not allowed (arkts-no-misplaced-imports)";
cookBookTag[151] = "Usage of 'ESObject' type is restricted (arkts-limited-esobj)";
cookBookTag[152] = "'Function.apply', 'Function.call' are not supported (arkts-no-func-apply-call)";
cookBookTag[153] = 'The inheritance for "Sendable" classes is limited (arkts-sendable-class-inheritance)';
cookBookTag[154] = 'Properties in "Sendable" classes and interfaces must have a Sendable data type (arkts-sendable-prop-types)';
cookBookTag[155] = 'Definite assignment assertion is not allowed in "Sendable" classes (arkts-sendable-definite-assignment)';
cookBookTag[156] = 'Type arguments of generic "Sendable" type must be a "Sendable" data type (arkts-sendable-generic-types)';
cookBookTag[157] = 'Only imported variables can be captured by "Sendable" class (arkts-sendable-imported-variables)';
cookBookTag[158] = 'Only "@Sendable" decorator can be used on "Sendable" class (arkts-sendable-class-decorator)';
cookBookTag[159] = 'Objects of "Sendable" type can not be initialized using object literal or array literal (arkts-sendable-obj-init)';
cookBookTag[160] = 'Computed property names are not allowed in "Sendable" classes and interfaces (arkts-sendable-computed-prop-name)';
cookBookTag[161] = 'Casting "Non-sendable" data to "Sendable" type is not allowed (arkts-sendable-as-expr)';
cookBookTag[162] = 'Importing a module for side-effects only is not supported in shared module (arkts-no-side-effects-imports)';
cookBookTag[163] = 'Exported object must have a Sendable data type in shared module (arkts-shared-module-exports)';
cookBookTag[164] = '"export * from \'xxx\'" is not supported in shared module (arkts-shared-module-no-star-export)';
cookBookTag[165] = 'Only "Sendable" classes and "Sendable" interfaces are allowed for importing from ets into ts file (arkts-no-ts-import-ets)';
cookBookTag[166] = 'In ts files, "Sendable" types cannot be used in implements and extends clauses (arkts-no-ts-sendable-type-inheritance)';
cookBookTag[167] = 'In sdk ts files, "Sendable" class and "Sendable" interface can not be exported (arkts-no-dts-sendable-type-export)';
cookBookTag[168] = 'In ts files, entities from ets files can not be re-exported (arkts-no-ts-re-export-ets)';
}
}