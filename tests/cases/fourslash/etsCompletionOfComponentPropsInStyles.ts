/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
////@Styles
////function test1(){
//// ./**/ 
//// }
verify.completions({
  marker: "",
  includes: ["width", "height", "size",
    "constraintSize", "layoutPriority", "layoutWeight", "navigationTitle",
    "navigationSubTitle", "hideNavigationBar", "hideNavigationBackButton", "toolBar",
    "hideToolBar", "translate", "scale", "gridSpan", "gridOffset", "rotate",
    "transform", "onAppear", "onDisAppear", "flexGrow", "flexShrink", "flexBasis",
    "enabled"]
})