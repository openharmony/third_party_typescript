/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Builder
//// function test1(){
////   Text().flexGrow(12)
////   Text() {}.flexGrow(12)
//// }
verify.noErrors();