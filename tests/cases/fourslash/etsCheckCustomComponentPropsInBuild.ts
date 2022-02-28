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
////     MyComponent().[|nud|]
////     }
//// }
verify.getSemanticDiagnostics([{ message: "Property 'nud' does not exist on type 'MyComponent'.", code: 2339 }])