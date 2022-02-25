/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @/**/
verify.completions({
    marker: "", includes: [
        { name: "Component", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "Entry", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "Observed", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "Preview", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "State", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "Prop", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "Link", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "ObjectLink", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "Provide", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "Consume", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "StorageProp", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "StorageLink", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "Watch", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "Builder", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "CustomDialog", sortText: completion.SortText.GlobalsOrKeywords }
    ]
})
