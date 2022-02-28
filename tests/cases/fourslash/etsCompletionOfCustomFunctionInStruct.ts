/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Entry
//// @Component
//// struct Comp1{
////     build(){
////       this./**/
////     }
////     func1(){
////     }
//// }
verify.completions({ marker: "", includes: "func1" });