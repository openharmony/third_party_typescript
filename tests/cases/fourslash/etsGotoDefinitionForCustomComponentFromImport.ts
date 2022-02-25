/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: comp1.ets
//// @Component
//// export struct /*definition1*/Com1{
////     build(){
////     }
//// }

// @Filename: comp2.ets
//// @Component
//// export struct /*definition2*/Com2{
////     build(){
////     }
////     test1(){
////     }
//// }

// @Filename: comp3.ets
//// @Component
//// export struct /*definition3*/Com3{
////     @Prop varA: number
////     build(){
////     }
////     test1():string {
////        return ""
////     }
//// }

// @Filename: test1.ets
//// import {[|/*importCom1*/Com1|]} from './comp1'
//// @Component
//// struct ParentComponent1{
////     build(){
////     [|/*reference1*/Com1|]()
////     }
//// }

// @Filename: test2.ets
//// import {[|/*importCom2*/Com2|]} from './comp2'
//// @Component
//// struct ParentComponent2{
////     build(){
////         Text(){
////          [|/*reference2*/Com2|]().test1()
////         }
////    }
//// }

// @Filename: test3.ets
//// import {[|/*importCom3*/Com3|]} from './comp3'
//// @Component
//// struct ParentComponent3{
////     build(){
////         [|/*reference3*/Com3|]({varA:1}).test1().charAt(0)
////     }
//// }
verify.goToDefinition({
    reference1: "definition1",
    importCom1: "definition1"
})
verify.goToDefinition({
    reference2: "definition2",
    importCom2: "definition2"
})
verify.goToDefinition({
    reference3: "definition3",
    importCom3: "definition3"
})