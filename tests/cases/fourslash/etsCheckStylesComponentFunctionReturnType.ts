/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Styles
//// function test2(): [|string|]{
////     .width(12)
//// }
verify.errorExistsAtRange(test.ranges()[0], 18039, "Should not add return type to the function that is annotated by Styles.");