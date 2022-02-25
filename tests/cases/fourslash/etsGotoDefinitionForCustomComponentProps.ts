/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Entry
//// @Component
//// struct MyComponent{
////     @State /*definition*/count: number=0;
////     private toggleClick(){
////         this.[|/*reference*/count|]++;
////     }
////     build() {
////     }
//// }

verify.goToDefinition("reference", "definition");