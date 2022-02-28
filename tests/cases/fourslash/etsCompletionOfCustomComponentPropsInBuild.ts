/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Entry
//// @Component
//// struct MyComponent{
////     build() {
////     }
//// }
//// @Component
//// struct ParentComponent{
////     build(){
////        MyComponent()./*1*/
////     }
//// }
verify.completions({ marker: "1", includes: "build" });