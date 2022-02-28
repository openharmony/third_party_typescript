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
////        MyComponent1()./*1*/identity(1);
////     }
//// }
verify.quickInfoAt("1", "(method) MyComponent1.identity<1>(arg: 1): 1");

