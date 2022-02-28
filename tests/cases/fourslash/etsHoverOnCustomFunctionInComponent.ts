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
////     test(color: string){
////     }
//// }
//// @Component
//// struct ParentComponent1{
////     build(){
////     MyComponent1()./*1*/test("1")
////     }
//// }
verify.quickInfoAt("1", "(method) MyComponent1.test(color: string): void")