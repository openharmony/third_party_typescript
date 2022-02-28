/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Extend(Text)
//// function test2(color:string){
////     ./*check1*/flexGrow(12)./*check2*/fontColor(color)
//// }
verify.quickInfoAt("check1", "(method) CommonMethod<TextAttribute>.flexGrow(value: number): TextAttribute");
verify.quickInfoAt("check2", "(method) TextAttribute.fontColor(value: string | number): TextAttribute");