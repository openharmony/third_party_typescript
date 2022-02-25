/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @[|Entry1|]
//// @Component
//// struct MyComponent {
////     build() {
////     }
//// }

verify.getSemanticDiagnostics([{ message: "Cannot find name 'Entry1'. Did you mean 'Entry'?", code: 2552 }])