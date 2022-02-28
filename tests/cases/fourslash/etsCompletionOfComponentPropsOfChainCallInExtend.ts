/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
////@Extend(Text)
////function test1(color:string){
//// ./*1*/fontColor(color)./*2*/
//// }
verify.completions({
    marker: "1",
    includes: ["fontColor", "fontSize", "minFontSize",
        "maxFontSize", "fontStyle", "fontWeight", "textAlign",
        "lineHeight", "textOverflow", "fontFamily", "maxLines",
        "decoration", "letterSpacing", "textCase", "baselineOffset"]
})
verify.completions({
    marker: "2",
    includes: ["fontColor", "fontSize", "minFontSize",
        "maxFontSize", "fontStyle", "fontWeight", "textAlign",
        "lineHeight", "textOverflow", "fontFamily", "maxLines",
        "decoration", "letterSpacing", "textCase", "baselineOffset"]
})