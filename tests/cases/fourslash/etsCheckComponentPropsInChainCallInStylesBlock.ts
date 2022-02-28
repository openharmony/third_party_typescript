/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Styles
//// function test1(){ 
////     .width(12).[|func|]()
//// }
verify.getSemanticDiagnostics([{ message: "Property 'func' does not exist on type 'CommonAttribute'.", code: 2339 }])