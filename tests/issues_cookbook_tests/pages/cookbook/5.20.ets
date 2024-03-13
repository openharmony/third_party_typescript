// wrong
let regex: RegExp = /bc*d/  // should not report


// right
let regex_right: RegExp = new RegExp('bc*d')


export let other = 1;
