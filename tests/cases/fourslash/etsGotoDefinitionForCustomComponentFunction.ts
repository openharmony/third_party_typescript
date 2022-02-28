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
////     test3(params:string): string {
////         this.[|/*reference*/test2|]('test')
////         return params;
////     }
////     /*definition*/test2(params:string): string {
////         return params;
////     }
//// }

verify.goToDefinition("reference", "definition");