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
////         this.[|test12|]("1")
////         return params;
////     }
////     test2(params:string): string {
////         return params;
////     }
//// }
verify.getSemanticDiagnostics([{ message: "Property 'test12' does not exist on type 'MyComponent'. Did you mean 'test2'?", code: 2551 }])