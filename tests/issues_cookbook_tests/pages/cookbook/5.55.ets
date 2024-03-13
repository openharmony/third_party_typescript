enum E1 {
  A = 0xa,
  B = 0xb,
  C = Math.random(),
  D = 0xd,
  E // 0xe inferred
}
enum E2 {
  A = 0xa,
  B = '0xb',
  C = 0xc,
  D = '0xd'
}



enum E1_right {
  A = 0xa,
  B = 0xb,
  C = 0xc,
  D = 0xd,
  E // 0xe inferred
}
enum E2_right {
  A = '0xa',
  B = '0xb',
  C = '0xc',
  D = '0xd'
}


export let other = 1;