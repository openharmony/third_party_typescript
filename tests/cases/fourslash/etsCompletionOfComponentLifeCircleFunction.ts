/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Entry
//// @Component
//// struct C {
////  build(){   
////  }
//// }
//// @Component
//// struct D {
////  build(){
////    C()./**/      
////  }
//// }
verify.completions({
    marker: "", includes: [
        "build","aboutToAppear","aboutToDisappear"
    ]
})
