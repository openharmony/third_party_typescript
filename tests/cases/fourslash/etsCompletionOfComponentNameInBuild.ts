/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Entry
//// @Component
//// struct Comp1{
////     build(){
////      /**/       
////     }
//// }
verify.completions({
    marker: "",
    includes: [{ name: "Text", sortText: completion.SortText.GlobalsOrKeywords },
    { name: "Flex", sortText: completion.SortText.GlobalsOrKeywords }]
}
);