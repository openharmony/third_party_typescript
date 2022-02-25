/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Entry
//// @Component
//// struct /*typeDefinition*/MyComponent{
//// }
//// @Component
//// struct ParentComponent{
////     build(){
////       Flex(){
////          /*reference*/MyComponent()
////       } 
////     }
//// }
verify.goToType("reference", "typeDefinition")