/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// [|@|]Extend(Flex1)
//// function test1(color: string){
////    .flexGrow(12)
//// }
verify.errorExistsAtRange(test.ranges()[0], 18037, "Decorator name must be one of ETS Components");