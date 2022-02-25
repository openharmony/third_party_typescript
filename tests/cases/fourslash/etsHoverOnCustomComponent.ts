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
//// }
//// @Component
//// struct ParentComponent1{
////     build(){
////     /*1*/MyComponent1()
////     }
//// }
verify.quickInfoAt("1", "struct MyComponent1")