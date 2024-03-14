function readOnlyNum(num: readonly number[]): number {
  let arr: number[] = num as number[]
  let a = num;
  let b = num[0];
  return arr[0]
}

let arr0: readonly number[] = [1, 2, 3]
readOnlyNum(arr0)


function readOnlyNumSpread(...num: readonly number[]): number {
  return 0;
}

let arr: readonly number[] = [1, 2, 3]
readOnlyNumSpread(1, ...arr)


export let other = 1;