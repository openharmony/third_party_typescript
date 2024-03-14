@Component
struct XXX{
    getA(a: string) {
        console.log(a);
        testA(null);      // report StrictModeError: Argument of type 'null' is not assignable to parameter of type 'string'
        testA(undefined); // report StrictModeError: Argument of type 'undefined' is not assignable to parameter of type 'string
    }
    cb = () => {
        testA(null);      // report StrictModeError: Argument of type 'null' is not assignable to parameter of type 'string
        testA(undefined); //report StrictModeError: Argument of type 'undefined' is not assignable to parameter of type 'string' 
    }
    build(){
        Column() {
            Button('')
                .onClick(this.cb)
                .onClick(() => {
                    testA(null);      // should report StrictModeError,but not 
                    testA(undefined); // should report StrictModeError,but not
                })
        }
    }
}
function testA(a: string) {
    console.log(a);
}


export let other = 1;