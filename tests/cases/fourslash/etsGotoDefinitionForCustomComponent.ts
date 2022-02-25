/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Entry
//// @Component
//// struct /*definition*/MyComponent{
////      test1(){
////      }
//// }
//// @Component
//// struct ParentComponent{
////     build(){
////     [|/*reference*/MyComponent|]()
////     }
//// }
//// @Component
//// struct ParentComponent1{
////     build(){
////         Text(){
////          [|/*reference1*/MyComponent|]().test1()
////         }
////    }
//// }
//// @Entry
//// @Component
//// struct /*definition1*/MyComponent1{
////     @Prop varA: number
////     test1():string {
////        return ""
////     }
//// }
//// @Component
//// struct ParentComponent1{
////     build(){
////         [|/*reference2*/MyComponent1|]({varA:1}).test1().charAt(0)
////     }
//// }
verify.goToDefinition("reference", "definition")
verify.goToDefinition("reference1", "definition")
verify.goToDefinition("reference2", "definition1")