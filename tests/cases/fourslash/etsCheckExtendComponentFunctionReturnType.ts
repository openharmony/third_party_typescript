/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Extend(Flex)
//// function test2(color:string): [|string|]{
////     .flexGrow(12)
//// }
verify.errorExistsAtRange(test.ranges()[0], 18036, "Should not add return type to the function that is annotated by Extend.");