/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Entry
//// @Component
//// struct [|Button|] {
////     build() {
////     }
//// }
verify.getSemanticDiagnostics([{message:  "The struct name cannot contain reserved tag name: 'Button'.", code: 28001}]);