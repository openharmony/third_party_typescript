/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Extend(Text)
//// function test2(color:string){
////     ./*1*/flexGrow(12)./*2*/fontColor(color)
//// }
verify.quickInfoAt("1", "(method) CommonMethod<TextAttribute>.flexGrow(value: number): TextAttribute");
verify.quickInfoAt("2", "(method) TextAttribute.fontColor(value: string | number): TextAttribute");