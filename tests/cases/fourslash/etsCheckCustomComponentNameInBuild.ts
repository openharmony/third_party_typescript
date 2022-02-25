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
//// }
//// @Component
//// struct ParentComponent{
////     build(){
////     [|MyComponent11|]
////     }
//// }
verify.getSemanticDiagnostics([{ message: "Cannot find name 'MyComponent11'. Did you mean 'MyComponent'?", code: 2552 }])