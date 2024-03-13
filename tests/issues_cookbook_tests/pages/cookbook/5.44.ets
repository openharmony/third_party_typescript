function f(x: number) {
  if (x <= 0) {
    return x;
  }
  return g(x);
}
function g(x: number) {
  return f(x - 1);
}
function doOperation(x: number, y: number) {
  return x + y;
}
f(10);
doOperation(2, 3);




function f_right(x: number): number {
  if (x <= 0) {
    return x;
  }
  return g_right(x);
}
function g_right(x: number): number {
  return f_right(x - 1);
}
function doOperation_right(x: number, y: number) {
  return x + y;
}
f_right(10);
doOperation_right(2, 3);


export let other = 1;