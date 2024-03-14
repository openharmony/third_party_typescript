// wrong
type X<T> = T extends number ? T : never               // should report
type Y<T> = T extends Array<infer Item> ? Item : never // should report


// right
type X1<T extends number> = T
type X2<T> = Object
type YI<Item, T extends Array<Item>> = Item


export let other = 1;