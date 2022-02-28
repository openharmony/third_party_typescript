/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Styles
//// function test1(){ 
////     .width()
//// }
//// @Styles
//// function test4(){
////     .height(11)
//// }
//// @Entry
//// @Component
//// struct MyComponent {
////     build() {
////        Flex(){
////            Text()./*1*/
////        }./*2*/
////    }
//// }
verify.completions({
  marker: "1", includes: ["test1", "fontColor", "fontSize", "minFontSize", "maxFontSize", "fontStyle",
    "fontWeight", "textAlign", "lineHeight", "textOverflow", "fontFamily", "maxLines", "decoration", "letterSpacing",
    "textCase", "baselineOffset"]
});
verify.completions({ marker: "2", includes: "test4" });