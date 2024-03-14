// wrong
function addTen(x: number): number {
  var ten = 10 // should report
  return x + ten
}

// right
function addTen_right(x: number): number {
  let ten = 10
  return x + ten
}


export let other = 1;