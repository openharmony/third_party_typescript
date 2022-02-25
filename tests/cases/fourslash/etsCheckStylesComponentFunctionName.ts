/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Styles
//// function test1(){
////    .[|width1|](12)
//// }
verify.errorExistsAtRange(test.ranges()[0], 2551, "Property 'width1' does not exist on type 'CommonAttribute'. Did you mean 'width'?");