/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Component
//// struct ParentComponent{
////     build(){
////      Text().fontSize(11).[|test|]()
////     }
//// }
verify.getSemanticDiagnostics([{ message: "Property 'test' does not exist on type 'TextAttribute'.", code: 2339 }])