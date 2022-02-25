/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Extend(/**/)
verify.completions({
    marker: "",
    includes: [{ name: "Text", sortText: completion.SortText.GlobalsOrKeywords },
    { name: "Flex", sortText: completion.SortText.GlobalsOrKeywords }],
    isNewIdentifierLocation: true
})