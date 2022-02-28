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
////     identity<T>(arg: T): T {
////         return arg;
////     }
//// }
//// @Component
//// struct ParentComponent1{
////     build(){
////        MyComponent1()./*1*/
////     }
//// }

verify.completions({ marker: "1", includes: "identity" });

