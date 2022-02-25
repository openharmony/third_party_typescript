/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6
// @Filename: test.ets

//// @Component
//// struct ParentComponent1{
////     build(){
////         Flex(){
////             Text()./*1*/fontColor("1")./*2*/height(11)
////         }./*3*/flexGrow(132)./*4*/height(11)
////     }
//// }
verify.quickInfoAt("1", "(method) TextAttribute.fontColor(value: string | number): TextAttribute");
verify.quickInfoAt("2", "(method) CommonMethod<TextAttribute>.height(value: string | number): TextAttribute");
verify.quickInfoAt("3", "(method) CommonMethod<FlexAttribute>.flexGrow(value: number): FlexAttribute");
verify.quickInfoAt("4", "(method) CommonMethod<FlexAttribute>.height(value: string | number): FlexAttribute");