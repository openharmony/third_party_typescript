/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Styles
//// function test2(){
////     ./*check1*/width(12)./*check2*/height(12)
//// }
verify.quickInfoAt("check1", "(method) CommonMethod<CommonAttribute>.width(value: string | number): CommonAttribute");
verify.quickInfoAt("check2", "(method) CommonMethod<CommonAttribute>.height(value: string | number): CommonAttribute");