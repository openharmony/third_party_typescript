// wrong
eval('1') // should report arkts-limited-stdlib

// right
let nan = NaN
let ini = Infinity
let isfin = isFinite(1)
let isnan = isNaN(1)
let pfloat = parseFloat("123")
let pint = parseInt("123")


export let other = 1;