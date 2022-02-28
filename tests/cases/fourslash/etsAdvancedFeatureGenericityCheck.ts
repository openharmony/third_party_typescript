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
////        MyComponent1().[|identity()|];
////     }
//// }

verify.getSemanticDiagnostics([{ message: "Expected 1 arguments, but got 0.", code: 2554 }]);
