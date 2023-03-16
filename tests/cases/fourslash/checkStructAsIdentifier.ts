/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6
// @allowJs: true

// @Filename: testVariable.ts
//// namespace a {
////     let struct: number = 0
//// }

// @Filename: testInterface.ts
//// namespace b {
////     interface struct {
////         name:string
////     }
//// }

// @Filename: testClass.ts
//// namespace c {
////     class struct {
////     }
////     function foo(struct: number) {
////     }
//// }

// @Filename: testClassProperty.ts
//// namespace c {
////     class House {
////         struct: string;
////     }
//// }

// @Filename: testJsVariable.js
//// var struct = 0

// @Filename: testJsClass.js
//// class struct {
//// }

// @Filename: testJsClass.js
//// class House {
////     struct;        
//// }

verify.noErrors();