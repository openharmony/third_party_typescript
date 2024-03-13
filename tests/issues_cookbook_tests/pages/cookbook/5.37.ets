for (let m = 0, n = 0; m < 10; ++m, n += 2) {
  console.log(m.toString())
  console.log(n.toString())
}
let x1 = 0;
x1 = (++x1, x1++)

// right
for (let i = 0, j = 0; i < 10; ++i, j += 2) {
  console.log(i.toString())
  console.log(j.toString())
}
let x = 0
++x
x = x++


export let other = 1;
