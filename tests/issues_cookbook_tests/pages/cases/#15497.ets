interface I1{
  __a:number;
}

function f1():I1 {
  return {
    __a: 1,
  }
}

interface I2{
  _a:number;
}
function f():I2 {
  return {
    _a: 1
  }
}



export let other = 1;