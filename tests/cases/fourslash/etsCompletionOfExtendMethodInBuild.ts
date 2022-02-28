/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Extend(Text)
//// function test1(color:string){ 
////     .fontColor(color)
//// }
//// @Entry
//// @Component
//// struct MyComponent {
////     build() {
////        Text('Hello')./**/
////     }
//// }
verify.completions({
    marker: "",
    includes: ["test1", "fontColor", "fontSize", "minFontSize",
        "maxFontSize", "fontStyle", "fontWeight", "textAlign",
        "lineHeight", "textOverflow", "fontFamily", "maxLines",
        "decoration", "letterSpacing", "textCase", "baselineOffset"]
})