
function temp1(b: object) {
    b['z'] // should report,but not
}
function temp2(b: Object) {
    b['z']
}


export let other = 1;