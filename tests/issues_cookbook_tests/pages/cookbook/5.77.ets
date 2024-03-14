// wrong
// should report
// @ts-nocheck
// ...
// Some code with switched off type checker
// ...
let s1: string =null

// should report
// @ts-ignore
let s2: string = null


// right
let s1_right: string | null=null
let s2_right: string = null // Compile-time error


export let other = 1;