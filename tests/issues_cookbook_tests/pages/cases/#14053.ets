declare function foo(); // no error: should report arkts-no-implicit-return-types?
declare interface M {
    bar(); // no error: should report arkts-no-implicit-return-types?
}


export let other = 1;