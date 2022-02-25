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
////        Flex(){
////            Text()./*1*/
////        }./*2*/
////    }
//// }
verify.completions({
    marker: "1",
    includes: ["fontColor", "fontSize", "minFontSize", "maxFontSize",
        "fontStyle", "fontWeight", "textAlign", "lineHeight",
        "textOverflow", "fontFamily", "maxLines", "decoration",
        "letterSpacing", "textCase", "baselineOffset"]
});
verify.completions({
    marker: "2",
    includes: ["enabled", "flexBasis", "flexShrink", "flexGrow",
        "onDisAppear", "onAppear", "transform", "rotate",
        "gridOffset", "gridSpan", "scale", "translate",
        "hideToolBar", "toolBar", "hideNavigationBackButton"]
})