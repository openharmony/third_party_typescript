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
////     /*definition*/test2(params:string): string {
////         return params;
////     }
//// }
//// @Component
//// struct ParentComponent{
////     build(){
////         Flex(){
////             MyComponent().[|/*reference*/test2|]("11")
////         }
////     }
//// }

verify.goToDefinition("reference", "definition");