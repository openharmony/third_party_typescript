/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Entry
//// @Component
//// struct MyComponent {
////     build() {
////        Text()./**/
////     }
//// }
verify.completions({ marker: "", includes: ["fontColor", "fontSize", "minFontSize", "maxFontSize", "fontStyle", "fontWeight", "textAlign", "lineHeight", "textOverflow", "fontFamily", "maxLines", "decoration", "letterSpacing", "textCase", "baselineOffset"] })
