import {myFoo} from "./attached/#13940_ts_no_check_attached1";
myFoo({x: "", y: undefined}); // should NOT report



export let other = 1;