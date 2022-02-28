/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Extend(Flex)
//// function test1(color: string){
////    .[|flexGrow1|](12)
//// }
verify.errorExistsAtRange(test.ranges()[0], 2551, "Property 'flexGrow1' does not exist on type 'FlexAttribute'. Did you mean 'flexGrow'?");