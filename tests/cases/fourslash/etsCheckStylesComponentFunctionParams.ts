/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Styles
//// function test1(){
////    .[|width()|]
//// }
verify.errorExistsAtRange(test.ranges()[0], 2554, "Expected 1 arguments, but got 0.");