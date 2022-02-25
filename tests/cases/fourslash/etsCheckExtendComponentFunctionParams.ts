/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Extend(Flex)
//// function test1(color: string){
////    .[|flexGrow()|]
//// }
verify.errorExistsAtRange(test.ranges()[0], 2554, "Expected 1 arguments, but got 0.");