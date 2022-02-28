/// <reference path='./fourslash.ts' />

// @experimentaldecorators: true
// @ets: {}
// @target: es6
// @lib: es6

// @Filename: test.ets
//// @Entry
//// @Component
//// struct MyComponent{
////     @State count: number=0;
////     @Prop count1;
////     build() {
////     }
//// }
//// @Component
//// struct ParentComponent{
////     build(){
////         MyComponent({/**/})  
////     }
//// }
verify.completions(
    {
        marker: "",
        includes: [{ name: "count", sortText: completion.SortText.OptionalMember },
        { name: "count1", sortText: completion.SortText.OptionalMember }]
    }
);