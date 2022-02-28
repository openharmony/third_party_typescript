/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
////@Extend(Text)
////function test1(color:string){
//// ./**/ 
//// }
verify.completions({
    marker: "",
    includes: ["fontColor", "fontSize", "minFontSize",
        "maxFontSize", "fontStyle", "fontWeight", "textAlign",
        "lineHeight", "textOverflow", "fontFamily", "maxLines",
        "decoration", "letterSpacing", "textCase", "baselineOffset"]
})