/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Entry
//// @Component
//// struct MyComponent{
////     build() {
////     }
////     test3(params:string): string {
////         this.[|test2()|]
////         return params;
////     }
////     test2(params:string): string {
////         return params;
////     }
//// }
verify.getSemanticDiagnostics([{ message: "Expected 1 arguments, but got 0.", code: 2554 }])