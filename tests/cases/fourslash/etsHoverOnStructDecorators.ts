/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @/*1*/Entry
//// @/*2*/Component
//// struct MyComponent{
////     @/*3*/Watch('test2')
////     @/*4*/State count: number=0;
////     @/*5*/Prop count1;
////     build() {
////         Text().fontSize(11).test1('11')
////     }
////     @/*6*/Builder fuc1(){
////     }
//// }
verify.quickInfoAt("1", "const Entry: ClassDecorator")
verify.quickInfoAt("2", "const Component: ClassDecorator")
verify.quickInfoAt("3", "const Watch: (value: string) => PropertyDecorator")
verify.quickInfoAt("4", "const State: PropertyDecorator")
verify.quickInfoAt("5", "const Prop: PropertyDecorator")
verify.quickInfoAt("6", "const Builder: MethodDecorator")