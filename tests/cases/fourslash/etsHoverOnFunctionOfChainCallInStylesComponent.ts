/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Styles
//// function test2(){
////     ./*1*/width(12)./*2*/height(color)
//// }
verify.quickInfoAt("1", "(method) CommonMethod<CommonAttribute>.width(value: string | number): CommonAttribute");
verify.quickInfoAt("2", "(method) CommonMethod<CommonAttribute>.height(value: string | number): CommonAttribute");