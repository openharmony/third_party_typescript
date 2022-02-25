/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Entry
//// @Component
//// struct MyComponent1{
////     build() {
////     }
////     test(color: string): [|string|]{
////     }
//// }
verify.errorExistsAtRange(test.ranges()[0], 2355, "A function whose declared type is neither 'void' nor 'any' must return a value.");