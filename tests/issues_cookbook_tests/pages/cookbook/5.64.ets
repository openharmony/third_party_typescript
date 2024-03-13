// wrong
import fileContent from 'some.txt!text'


// right
import * as m from './attached/5.64_attached2'
console.log('N.foo called: ', m.N.foo(42))


export let other = 1;