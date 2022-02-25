/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Entry
//// @Component
//// struct MyComponent1{
////     build() {
////     }
////     test(color: string){
////     }
//// }
//// @Component
//// struct ParentComponent1{
////    build(){
////      /*1*/Text(){
////        /*2*/MyComponent1()./*3*/test("1")
////      }./*4*/fontColor("12")
////   }
//// }
verify.quickInfoAt("1", "const Text: TextInterface");
verify.quickInfoAt("2", "struct MyComponent1");
verify.quickInfoAt("3", "(method) MyComponent1.test(color: string): void");
verify.quickInfoAt("4", "(method) TextAttribute.fontColor(value: string | number): TextAttribute");