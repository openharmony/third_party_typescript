let generic_arrow_func = <T extends String> (x: T) => { return x }
generic_arrow_func('string')


function generic_func<T extends String>(x: T): T {
  return x
}
generic_func<String>('string')


export let other = 1;