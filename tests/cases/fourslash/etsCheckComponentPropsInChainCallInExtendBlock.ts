/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Extend(Text)
//// function test1(color:string){ 
////     .flexGrow(12).[|func|](color)
//// }
verify.getSemanticDiagnostics([{ message: "Property 'func' does not exist on type 'TextAttribute'.", code: 2339 }])